# Phase 05 — Repository Boundary and Route Migration

## zflow Phase Mapping
- EXECUTE Green phase for production data-source migration.
- DECOMPOSE ownership must keep route/API files separate from Strapi core when parallelized.

## Goal
[CORE] Switch non-mock CMS/public data access from PostgreSQL repositories to Strapi repositories while preserving current public/admin routes, API response envelope, and visual components.

## Files to Modify
- `lib/config/data-source.ts`
- `lib/cms/data-source.ts`
- any repository factory/barrel that chooses mock vs production repositories.
- `app/api/jobs/route.ts`
- `app/api/jobs/[id]/route.ts`
- `app/api/news/route.ts`
- `app/api/news/[id]/route.ts`
- `app/api/settings/route.ts`
- `app/api/applications/route.ts`
- `app/api/applications/[id]/route.ts`
- Public route loaders/pages only where repository contracts require changes:
  - `app/[locale]/about/page.tsx`
  - `app/[locale]/jobs/page.tsx`
  - `app/[locale]/jobs/[slug]/page.tsx`
  - `app/[locale]/news/page.tsx`
  - `app/[locale]/news/[slug]/page.tsx`

## Required Behavior
1. `USE_MOCK_DATA=true`
   - Uses existing mock data only.
   - Does not import/initialize Strapi client in the request path.
   - Does not require `STRAPI_URL` or `STRAPI_API_TOKEN`.
2. `USE_MOCK_DATA=false`
   - Uses Strapi repositories for CMS content.
   - Fails loudly when Strapi env is missing.
   - Does not silently fall back to mock data.
3. API routes
   - Keep existing API envelope.
   - Map Strapi errors to safe error codes/messages.
   - Validate request payloads before Strapi writes.
4. Public routes
   - Keep current URLs and localized behavior.
   - Render only published content.
   - Use `notFound()` for missing detail content when current behavior expects 404.

## Acceptance Criteria
- [ ] `/vi/jobs` and `/ja/jobs` use mock data with no Strapi env in mock mode.
- [ ] `/vi/jobs` and `/ja/jobs` use Strapi published jobs in production mode.
- [ ] `/vi/news/[slug]` and `/ja/news/[slug]` render transformed Strapi article content.
- [ ] Draft/review/closed/archived content is excluded from public pages.
- [ ] API routes keep the existing success/error envelope.
- [ ] Production Strapi failures return safe errors, not mock fallback.

## Tests to Prepare
- Data-source boundary tests for mock vs Strapi mode.
- Route handler tests for jobs/news/settings/applications where existing test tooling supports them.
- Fixture-based tests for public status filtering and locale filtering.
