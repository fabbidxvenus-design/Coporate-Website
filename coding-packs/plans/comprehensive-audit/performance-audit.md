# Performance Audit Report

## Findings

| ID | Category | File | Issue | Impact | Recommendation |
|----|----------|------|--------|--------|----------------|
| PERF-001 | N+1/SequentialDB | `app/admin/jobs/page.tsx:53-83` | `getStats()` makes 4 sequential `count()` queries: total, published, draft, closed. Each query hits the database separately. | HIGH | Combine into a single query using conditional aggregation: `SELECT COUNT(*) FILTER (WHERE ...)` or use Supabase RPC with a single query returning all counts. |
| PERF-002 | N+1/SequentialDB | `app/admin/news/page.tsx:53-83` | `getStats()` makes 4 sequential `count()` queries: total, published, draft, review. Each query hits the database separately. | HIGH | Same fix as PERF-001 - single query with `COUNT(*) FILTER (WHERE status = 'published')`, etc. |
| PERF-003 | MissingPagination | `app/admin/jobs/page.tsx:36-51` | `getJobs()` has no LIMIT clause. Fetches ALL jobs from the database on every admin page load. As job count grows, this will cause memory bloat and slow page loads. | HIGH | Add pagination with `range(offset, offset + limit)`. The UI already has pagination controls - they are static but wired to `stats.total`. Implement real server-side pagination with `page` and `limit` searchParams. |
| PERF-004 | MissingPagination | `app/admin/news/page.tsx:36-51` | `getArticles()` has no LIMIT clause. Fetches ALL news articles from the database. | HIGH | Add pagination with `range(offset, offset + limit)`. Match the pattern used in the public news page. |
| PERF-005 | MissingPagination | `app/admin/applications/page.tsx:34-52` | `getApplications()` has no LIMIT clause, selecting all applications with an eager join to jobs. No pagination implemented on the admin applications page at all. | HIGH | Add pagination with `range(offset, offset + limit)`. The UI has no pagination controls - add them and wire to the query. |
| PERF-006 | UnboundedQuery | `app/admin/jobs/page.tsx:45-49` | Query uses `select('*')` with no LIMIT. As data grows this will cause memory exhaustion. | MEDIUM | Replace `select('*')` with explicit column list and add LIMIT. |
| PERF-007 | UnboundedQuery | `app/admin/news/page.tsx:45-49` | Query uses `select('*')` with no LIMIT. | MEDIUM | Replace with explicit columns and add LIMIT. |
| PERF-008 | UnboundedQuery | `app/admin/applications/page.tsx:46-51` | Query uses `select('*, jobs(id, title, slug)')` with no LIMIT. | MEDIUM | Add LIMIT and pagination. |
| PERF-009 | Re-render | `app/admin/jobs/page.tsx:90-155` | `JobRow` component receives `job` as a prop. On any parent re-render all `JobRow` children re-render, even if the specific row's job data hasn't changed. No `React.memo` applied. | MEDIUM | Wrap with `React.memo(JobRow)` to prevent unnecessary re-renders when sibling rows update. |
| PERF-010 | Re-render | `app/admin/news/page.tsx:90-167` | `ArticleRow` has the same issue - no memoization. Every parent state change triggers re-render of all article rows. | MEDIUM | Wrap with `React.memo(ArticleRow)`. |
| PERF-011 | Re-render | `app/(public)/jobs/page.tsx:64-138` | `JobCard` component renders large markup but is not memoized. Maps over all jobs in the list. | MEDIUM | Wrap with `React.memo(JobCard)`. |
| PERF-012 | Re-render | `app/(public)/jobs/[slug]/page.tsx:102-176` | `RelatedJobCard` is not memoized. Re-renders when parent page re-renders due to unrelated state changes. | LOW | Wrap with `React.memo(RelatedJobCard)`. |
| PERF-013 | Re-render | `app/(public)/news/page.tsx:59-90,92-123,125-160` | `FeaturedArticle`, `ArticleGridCard`, and `HorizontalArticleCard` are not memoized. These render on every parent re-render. | MEDIUM | Memoize all three card components with `React.memo`. |
| PERF-014 | Re-render | `app/(public)/news/[slug]/page.tsx:191-215` | Related article cards inside `news/[slug]/page.tsx` are not memoized. | LOW | Wrap with `React.memo`. |
| PERF-015 | ImageOptimization | `app/admin/news/page.tsx:100` | `<img>` tag has no `width`, `height`, `loading`, or `fetchpriority` attributes. Causes layout shift (CLS) and prevents browser from optimizing loading. | HIGH | Add explicit `width="64" height="64"` to prevent CLS. Add `loading="lazy"` since these are below-the-fold. Use Next.js `<Image>` component for automatic optimization. |
| PERF-016 | ImageOptimization | `app/(public)/jobs/page.tsx:77,114` | Job cards use `<img>` via FontAwesome icons (not image tags) but no Next.js Image. Location icons use text. No significant image optimization issues here. | LOW | N/A - icon-based. Monitor if actual job thumbnail images are added. |
| PERF-017 | ImageOptimization | `app/(public)/jobs/[slug]/page.tsx:342-346` | Map placeholder div has no dimensions but is inside a flex container. No CLS issue since height is explicit. | LOW | N/A |
| PERF-018 | ImageOptimization | `app/(public)/news/page.tsx:67-75,99-109,131-143` | Multiple `<img>` tags with no `width`, `height`, `loading="lazy"`, or `fetchpriority`. These are above-fold on article listing pages. Missing `fetchpriority="high"` on the featured article hero image will hurt LCP. | HIGH | Use Next.js `<Image>` component with explicit `width`/`height` or `fill`. Add `priority` prop to the featured article image for LCP improvement. Add `loading="lazy"` to non-critical images. |
| PERF-019 | ImageOptimization | `app/(public)/news/[slug]/page.tsx:136-140,194-205` | Featured image (520px height) and related article thumbnails have no performance attributes. The featured image is above the fold and critical for LCP. | HIGH | Add `fetchpriority="high"` to the featured article image. Use Next.js `<Image>` for automatic optimization and WebP/AVIF conversion. |
| PERF-020 | LazyLoading | All pages | No `next/dynamic` or `React.lazy` found anywhere in the codebase. Heavy components like `ApplyForm`, `ApplicationModal`, rich text editors, and admin forms are bundled together. | HIGH | Identify heavy components (>20KB) and lazy load them: `const ApplicationModal = dynamic(() => import('@/components/...'), { loading: (...) => <Skeleton /> })`. Priority: ApplyForm in job detail, ApplicationModal in job detail, admin form components. |
| PERF-021 | BundleSize | `lib/sanitize.ts` | Uses `isomorphic-dompurify` which bundles the full DOMPurify implementation for both server and client. This adds ~50KB+ to the bundle. | MEDIUM | Consider using `dompurify` only on the client (lazy-loaded) and a lighter sanitizer (e.g., `sanitize-html` or custom) on the server. Since this is only used in `dangerouslySetInnerHTML`, can also lazy-load the sanitize function on client-only. |
| PERF-022 | Caching | `app/api/applications/route.ts` | No Cache-Control headers on GET response. Public job listing endpoint has no caching. | MEDIUM | Add `Cache-Control: public, max-age=60, stale-while-revalidate=300` to public data endpoints. Use Next.js `revalidate` option for ISR pattern on public job/news pages. |
| PERF-023 | Caching | `app/api/news/route.ts` | Same issue - no cache headers on GET response. | MEDIUM | Add appropriate Cache-Control headers based on data volatility. |
| PERF-024 | Caching | `app/(public)/jobs/page.tsx`, `app/(public)/news/page.tsx` | Public pages use server-side rendering without `revalidate` export. Every request hits the database fresh. | MEDIUM | Add `export const revalidate = 60` (or appropriate TTL) to enable ISR. This will cache pages and reduce database load. |
| PERF-025 | Caching | `app/(public)/jobs/[slug]/page.tsx`, `app/(public)/news/[slug]/page.tsx` | Detail pages also lack revalidation. Individual job/article detail pages regenerate on every request. | MEDIUM | Add `export const revalidate = 300` for detail pages (less volatile than listing pages). |
| PERF-026 | QueryOptimization | `app/admin/jobs/page.tsx:45-49` | `select('*')` fetches all columns including large text fields (`description`, `requirements`, `benefits`) that are not displayed in the admin table. Increases data transfer and memory usage. | MEDIUM | Select only needed columns: `select('id, title, slug, location, employment_type, status, published_at, closed_at, created_at')`. |
| PERF-027 | QueryOptimization | `app/admin/news/page.tsx:45-49` | `select('*')` fetches all columns including `body` (article content) which can be large. Not needed in the admin list view. | MEDIUM | Select only needed columns: `select('id, title, slug, excerpt, cover_image_url, category, status, published_at, author_id, created_at')`. |
| PERF-028 | QueryOptimization | `app/admin/applications/page.tsx:46-51` | `select('*, jobs(id, title, slug)')` fetches all application columns including potentially large text fields (`message`). | MEDIUM | Select only needed columns explicitly, limit join to: `select('id, full_name, email, phone, job_id, status, cv_file_name, cv_file_size, submitted_at, jobs(id, title, slug)')`. |
| PERF-029 | QueryOptimization | `app/api/news/route.ts:116-127` | Uses `select('*', { count: 'exact' })` for news listing API. Fetches all columns including `body`. | LOW | Use explicit column selection for API responses. |
| PERF-030 | BundleSize | `next.config.mjs` | No bundle analyzer configuration. Cannot measure bundle size changes or detect large dependencies. | MEDIUM | Add `+ bundle-analyzer` plugin configuration to measure gzip sizes per chunk. |
| PERF-031 | BundleSize | `next.config.mjs` | Image `remotePatterns` only includes `unsplash` and `picsum`. No optimization pipeline configured (formats, sizes). | LOW | Configure `formats: ['image/avif', 'image/webp']` and add image domains for all external image sources. |
| PERF-032 | ReactPattern | `app/(public)/jobs/page.tsx:188-226` | `JobsSearchForm` is a client component rendered inside a server component. It creates a new client boundary unnecessarily and could cause waterfall rendering. | LOW | Evaluate if this component truly needs client-side interactivity. If it does, consider inline the search into the server component with form action for better performance. |
| PERF-033 | ReactPattern | `app/(public)/news/page.tsx:203-225` | `NewsSearchForm` has the same pattern - separate client component boundary. | LOW | Same consideration as PERF-032. |

## Summary

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| N+1 / Sequential DB | 0 | 2 | 0 | 0 |
| Missing Pagination | 0 | 3 | 0 | 0 |
| Unbounded Queries | 0 | 0 | 3 | 0 |
| Re-renders | 0 | 2 | 5 | 2 |
| Image Optimization | 0 | 3 | 1 | 2 |
| Lazy Loading | 0 | 1 | 0 | 0 |
| Bundle Size | 0 | 0 | 3 | 2 |
| Caching | 0 | 0 | 4 | 0 |
| Query Optimization | 0 | 0 | 4 | 2 |
| **Total** | **0** | **11** | **20** | **8** |

### Top 5 Priority Fixes

1. **[PERF-001] N+1 queries in admin jobs stats** - 4 sequential DB calls that can be 1 query
2. **[PERF-002] N+1 queries in admin news stats** - Same pattern, fix together with PERF-001
3. **[PERF-003] Missing pagination on admin jobs page** - Will cause OOM as data grows
4. **[PERF-004] Missing pagination on admin news page** - Same risk
5. **[PERF-005] Missing pagination on admin applications page** - Highest risk for memory issues with CV data

### Estimated Impact

| Fix | Estimated Improvement |
|-----|----------------------|
| N+1 stats queries (PERF-001, PERF-002) | 75% reduction in stats DB calls (4 queries -> 1) |
| Admin pagination (PERF-003, PERF-004, PERF-005) | 90%+ reduction in data transfer for admin pages |
| Image optimization (PERF-018, PERF-019) | 20-40% improvement in LCP score |
| ISR caching (PERF-024, PERF-025) | 50%+ reduction in TTFB for public pages |
| React memoization (PERF-009 to PERF-014) | 30-50% reduction in render time for list pages |
| Lazy loading (PERF-020) | 100-200KB reduction in initial JS bundle |