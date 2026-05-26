# TIP-016: Production-Like Mock Data from Crawled Fabbi Content

## HEADER
- TIP-ID: TIP-016
- Project: Coporate_Website
- Module: Content Data / Mock Data / Media Assets
- Priority: P0
- Depends on: TIP-010
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS with project-owned design tokens, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase.
- Key files to read first:
  - `coding-packs/crawlings/crawled_raw_data.json`
  - `coding-packs/crawlings/crawled_all_pages.md`
  - `coding-packs/crawlings/crawled_content.md`
  - `coding-packs/crawlings/images/**`
  - `lib/mock-data.ts`
  - `lib/i18n/vi.json`
  - `lib/i18n/ja.json`
  - `app/[locale]/about/page.tsx`
  - `app/[locale]/jobs/page.tsx`
  - `app/[locale]/news/page.tsx`
  - `app/api/about/[locale]/route.ts`
- Patterns to follow:
  - Keep public routes mock-first compatible with current `USE_MOCK_DATA=true` behavior.
  - Preserve visual composition from `.design` and only replace content/assets.
  - Use the same response envelope already used by API routes: `{ success, data, error }`.

## APPLICABLE STANDARDS
Builder MUST conform to:
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — jobs, applications, and news content model rules.
- [database/supabase-saas](../standards/database/supabase-saas.md) — mock data must map cleanly to Supabase-backed tables and seed strategy.
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — replace generated/remote placeholder content with managed local assets while preserving UI fidelity.

## TASK
Create a production-like mock content package from the crawled Fabbi Holdings data and downloaded image assets. The output must include structured JSON files for app consumption and Markdown documentation that explains source mapping, selected assets, content assumptions, and how the mock data should later seed Supabase.

This TIP does not require redesigning pages. It upgrades existing mock data and content sources so the site looks credible in fresh checkout/mock mode using real Fabbi company information, services, leadership, culture, news, portfolio, contact details, and locally downloaded images.

## SPECIFICATIONS
### Business Rules
1. Create a new data directory: `coding-packs/crawlings/processed/`.
2. Produce the following JSON files:
   - `coding-packs/crawlings/processed/site-content.vi.json`
   - `coding-packs/crawlings/processed/site-content.ja.json`
   - `coding-packs/crawlings/processed/news.vi.json`
   - `coding-packs/crawlings/processed/news.ja.json`
   - `coding-packs/crawlings/processed/portfolio.vi.json`
   - `coding-packs/crawlings/processed/portfolio.ja.json`
   - `coding-packs/crawlings/processed/media-manifest.json`
   - `coding-packs/crawlings/processed/mock-seed.json`
3. Produce the following Markdown documentation files:
   - `coding-packs/crawlings/processed/CONTENT-SOURCE-MAP.md`
   - `coding-packs/crawlings/processed/MOCK-DATA-GUIDE.md`
4. Extract and normalize company data from `crawled_raw_data.json` and `crawled_all_pages.md`, including:
   - company names and member companies
   - vision, mission, core values
   - representative/founder/leadership profiles
   - offices and contact details
   - services: system/application development, AI, CRM/Salesforce, blockchain, DX support
   - certifications and associations
   - history/timeline milestones
   - portfolio/project highlights
   - culture highlights
   - news/article-like content
5. Use downloaded files under `coding-packs/crawlings/images/**` as the only image source for the processed mock package.
6. `media-manifest.json` must map each selected asset to:
   - `id`
   - `fileName`
   - `relativePath`
   - `type` (`logo`, `leadership`, `culture`, `news`, `portfolio`, `technology`, `partner`, `decorative`, `unknown`)
   - `alt.vi`
   - `alt.ja`
   - `recommendedUsage`
   - `sourceEvidence`
7. `mock-seed.json` must be shaped as a future Supabase seed source and include top-level collections:
   - `siteSettings`
   - `aboutContent`
   - `jobs`
   - `newsArticles`
   - `portfolioItems`
   - `mediaAssets`
8. Jobs in `mock-seed.json` must look production-like even if the crawl data has limited recruitment-specific jobs. Create 6-10 realistic Fabbi hiring records aligned with Fabbi service domains. Each job must include:
   - `id`, `slug`, `title`, `department`, `location`, `employment_type`, `salary_range`, `skills`, `description`, `requirements`, `benefits`, `status`, `published_at`
9. News/articles must be derived from crawled content where possible, not lorem ipsum. Each item must include:
   - `id`, `slug`, `title`, `excerpt`, `body`, `cover_image`, `category`, `tags`, `status`, `author`, `published_at`, `locale`
10. Japanese content must be filled using crawled Japanese pages when available. If a section exists only in Vietnamese, translate/summarize professionally into Japanese and mark `translationStatus: "machine_draft_needs_review"` for that item.
11. Vietnamese content must preserve factual claims from crawl sources and avoid inventing certifications, dates, offices, headcount, awards, or partner names.
12. Content should be polished and production-like, but source evidence must remain traceable through `CONTENT-SOURCE-MAP.md`.

### Validation
1. Every JSON file must be valid JSON and parseable with Node.js.
2. Every image path referenced by JSON must exist under `coding-packs/crawlings/images/`.
3. Every public-facing text field must be non-empty for both VI and JA where required.
4. Every slug must be lowercase, URL-safe, and unique within its collection.
5. No `lorem`, `placeholder`, `TODO`, `TBD`, or fake-looking generated text may remain in processed JSON.
6. No remote image URLs may be used in processed JSON.
7. `mock-seed.json` must align with the existing app domain model names as closely as possible so later implementation can wire it into `lib/mock-data.ts` without reshaping everything.

### Error Handling
1. If a crawled page has ambiguous category or incomplete content, include the item but set `qualityFlags` with the reason.
2. If an image cannot be confidently matched to content, include it in `media-manifest.json` with `type: "unknown"` and do not use it in primary UI data.
3. If Japanese source text is missing, use a concise draft translation and mark it for review using `translationStatus`.
4. If source data conflicts, prefer `crawled_raw_data.json` raw text over summarized Markdown and document the conflict in `CONTENT-SOURCE-MAP.md`.

## ACCEPTANCE CRITERIA
- Given `coding-packs/crawlings/processed/*.json` exists When `node -e "JSON.parse(require('fs').readFileSync(file,'utf8'))"` is run for each file Then all files parse successfully.
- Given processed JSON references images When each `relativePath` is checked Then every file exists under `coding-packs/crawlings/images/`.
- Given a fresh checkout runs in mock mode When the processed package is later wired into `lib/mock-data.ts` Then public pages can render credible Fabbi production-like content without Supabase.
- Given `CONTENT-SOURCE-MAP.md` is reviewed When a fact such as office address, phone number, certificate, service, or timeline appears Then it references the crawled source page/section.
- Given Japanese content was generated from Vietnamese-only source When reviewed Then the item clearly carries `translationStatus: "machine_draft_needs_review"`.
- Given `MOCK-DATA-GUIDE.md` is read by a builder When implementing the wiring Then it explains which JSON collections map to site settings, about content, jobs, news, portfolio, and media assets.

## CONSTRAINTS
- DO NOT: invent factual company claims, certifications, office addresses, awards, or partner names not present in crawl data.
- DO NOT: use remote images, CDN images, lorem ipsum, or generic AI filler copy.
- DO NOT: modify visual components in this TIP unless strictly necessary to support local asset paths.
- DO NOT: commit real secrets or production credentials.
- REUSE: `coding-packs/crawlings/crawled_raw_data.json`, `coding-packs/crawlings/crawled_all_pages.md`, and `coding-packs/crawlings/images/**` as source of truth.
- REUSE: current mock-first pattern from `lib/mock-data.ts` and localized dictionary structure from `lib/i18n/*.json`.
- SKIP: actual Supabase import/migration execution; this TIP only prepares production-like mock data and documentation.

## QUALITY GATE: SELF-REVIEW
- Completeness: All required TIP fields are included, including context, applicable standards, task, specifications, acceptance criteria, and constraints.
- Cross-reference: Aligns with REQ-B02, REQ-B03, REQ-B04, REQ-B07, REQ-D06, REQ-E02, REQ-F05, and the crawl asset source under `coding-packs/crawlings/`.
- Blueprint fit: Preserves existing Next.js + Supabase + mock-first architecture while preparing cleaner seed-shaped data.
- Gaps: Actual image-to-content matching may require human review because downloaded filenames are not always semantically explicit.
- Builder note: Treat source traceability as mandatory; production-like copy is acceptable only when factual claims remain backed by crawl evidence.
