# TIP-029: Remove Strapi and Adopt Payload CMS

## HEADER
- TIP-ID: TIP-029
- Project: Coporate_Website
- Module: CMS Backend / Payload CMS Migration
- Priority: P0
- Depends on: TIP-023, TIP-024, TIP-025, TIP-026, TIP-027
- Estimated: XL

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: Authoritative stack from `coding-packs/product/tech-stack.md` is Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, and Vercel + Supabase deployment. This TIP supersedes TIP-028's Strapi direction: do not implement Strapi; migrate CMS planning/runtime toward Payload CMS instead.
- Key files to read first:
  - `coding-packs/tips/TIP-028-strapi-cms-migration.md` — read only to identify and remove/avoid Strapi direction.
  - `coding-packs/02-TASK-GRAPH.md`
  - `coding-packs/product/tech-stack.md`
  - `.env.example`
  - `package.json`
  - `lib/config/data-source.ts`
  - `lib/cms/types.ts`
  - `lib/cms/mock-data.ts`
  - `lib/db/repositories/jobs.ts`
  - `lib/db/repositories/news.ts`
  - `lib/db/repositories/applications.ts`
  - `lib/db/repositories/settings.ts`
  - `lib/db/repositories/about.ts`
  - `app/api/jobs/route.ts`
  - `app/api/news/route.ts`
  - `app/api/applications/route.ts`
  - `app/api/settings/route.ts`
  - `app/admin/*`
  - `app/[locale]/jobs/*`, `app/[locale]/news/*`, `app/[locale]/about/*`
- Patterns to follow:
  - Preserve existing Next.js public/admin route structure and visual composition.
  - Preserve mock-data isolation from TIP-021: `USE_MOCK_DATA=true` must not require Payload, Postgres, Supabase, or network access.
  - Keep Payload-specific types and clients behind `lib/payload/*` or `payload/*`; do not import Payload internals directly into UI components.
  - Prefer a first-party Payload-in-Next integration when it fits the current Next.js App Router architecture.
  - Keep server-only secrets outside client bundles.

## APPLICABLE STANDARDS
Builder MUST conform to these matched standards:
- [cms/admin-shell](../standards/cms/admin-shell.md) — protected CMS shell, consistent navigation, management UX, mutation feedback.
- [database/supabase-saas](../standards/database/supabase-saas.md) — security baseline still applies to auth, private CV storage, environment variables, and database access.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — jobs, applications, and news content model rules.
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — preserve exported design composition and typed component boundaries.
- [ui/design-tokens](../standards/ui/design-tokens.md) — preserve Professional Tech Hub design tokens and screenshot parity.

## TASK
Remove the Strapi CMS direction from the current plan/codebase and replace it with a Payload CMS migration path. Payload CMS should become the preferred production CMS backend for jobs, news/articles, applications, settings, about content, and CMS-managed media while the existing Next.js public/admin UI and mock mode remain stable.

This TIP must produce an implementation-ready plan for Payload integration, including dependency changes, Payload config/collections, repository/data-source boundary changes, environment docs, migration cleanup for Strapi artifacts, and verification tests. The builder must not silently keep Strapi code or docs as an active path after this TIP.

## SPECIFICATIONS

### Business Rules
1. Payload CMS replaces Strapi as the intended CMS backend. Any active Strapi implementation files, environment variables, scripts, and docs must be removed or rewritten as Payload-specific guidance.
2. Production CMS data source for non-mock mode becomes Payload-backed for:
   - jobs
   - news/articles
   - applications
   - site settings
   - about/company content
   - CMS media metadata/assets where applicable
3. Existing public route URLs must remain unchanged:
   - `/vi/jobs`, `/ja/jobs`
   - `/vi/jobs/[slug]`, `/ja/jobs/[slug]`
   - `/vi/news`, `/ja/news`
   - `/vi/news/[slug]`, `/ja/news/[slug]`
   - `/vi/about`, `/ja/about`
4. Existing admin route URLs should remain unchanged unless explicitly documented as a Payload Admin handoff:
   - `/admin`
   - `/admin/jobs`
   - `/admin/news`
   - `/admin/applications`
   - `/admin/settings`
5. Public pages may only render published content. Draft/review/closed/archived jobs must not appear publicly.
6. Mock mode remains fully independent:
   - `USE_MOCK_DATA=true` must render public and admin mock flows without Payload env variables, DB connections, or network calls.
   - `USE_MOCK_DATA=false` may require Payload/database configuration and must fail loudly with missing variable names only.
7. Candidate CV handling must remain private:
   - Existing Supabase Storage private CV flow may remain if safer for MVP.
   - If moved into Payload upload collections, files must be private or served only through authenticated server-mediated routes.
   - Raw private file URLs, storage paths, and signed token internals must never be exposed to public/client responses.
8. Auth strategy must be explicit:
   - If continuing Supabase Auth for the existing admin UI, Payload access must be server-mediated with admin checks in Next.js.
   - If using Payload Admin auth, document the handoff and do not weaken protection of existing `/admin/*` routes.
9. Payload collections must support Vietnamese and Japanese content. Use explicit `locale` fields or Payload localization; choose one and document the rationale.
10. Do not redesign public/admin UI. This TIP changes CMS backend direction only.

### Payload CMS Architecture Requirements
1. Choose one integration architecture and document it in implementation notes:
   - **Embedded Payload in the Next.js app** using Payload's supported Next.js integration; preferred if compatible with current deployment.
   - **Separate Payload app/package** under `apps/payload` or `payload/`; acceptable if isolation is needed.
2. Payload config must be isolated from UI code:
   - `payload.config.ts` or equivalent Payload config entry.
   - Collection definitions under `payload/collections/*` or `collections/*`.
   - Shared field helpers under `payload/fields/*` only if repetition is real.
3. Database adapter must be explicit:
   - Prefer PostgreSQL if production already relies on Postgres/Supabase Postgres.
   - Do not reintroduce SQLite as the production CMS runtime.
4. Media/upload behavior must be explicit:
   - Public marketing images may be public if intended.
   - Candidate CV uploads must be private.
5. Payload admin route must not conflict with existing `/admin` UI unless intentionally chosen:
   - If Payload Admin uses `/payload-admin`, keep existing `/admin` UI.
   - If Payload Admin uses `/admin`, migrate the existing CMS shell strategy deliberately and update acceptance tests/docs.

### Payload Collections
Define Payload collections/globals matching the current recruitment domain:

1. `jobs`
   - `title`
   - `slug`
   - `locale` or localized fields
   - `department` / `category`
   - `location`
   - `employmentType`
   - `salaryRange`
   - `skills` / `tags`
   - `description`
   - `requirements`
   - `benefits`
   - `status`: `draft`, `review`, `published`, `closed`, `archived`
   - `publishedAt`
   - `expiresAt`
   - optional `coverImage`
2. `articles` or `news`
   - `title`
   - `slug`
   - `locale` or localized fields
   - `excerpt`
   - rich text `body`
   - `coverImage`
   - `category`
   - `tags`
   - `author`
   - `status`
   - `publishedAt`
3. `applications`
   - candidate name/contact fields matching current forms
   - selected job relation or job snapshot
   - CV metadata/private storage reference
   - message/portfolio/source fields
   - status
   - timestamps
4. `media`
   - public marketing/media assets
   - explicit separation or metadata flag for private assets if using Payload uploads
5. `siteSettings` global or collection
   - localized site metadata
   - contact details
   - social links
   - footer/settings fields currently used by the app
6. `aboutPages` collection/global
   - locale
   - hero/title/intro fields
   - stats
   - activity/company sections used by current `/about` UI
   - image/media references where applicable

### Files to Create or Modify
1. Remove or avoid active Strapi artifacts:
   - remove `lib/strapi/*` if present
   - remove `infra/strapi/*` if present
   - remove `scripts/smoke-strapi.mjs` if present
   - remove `coding-packs/strapi/*` active docs or rewrite them to Payload docs
   - remove `STRAPI_*` variables from `.env.example`
   - remove `smoke:strapi` package script if present
2. Add Payload dependencies/config:
   - `package.json`
   - lockfile used by the repo
   - `payload.config.ts` or equivalent
   - `payload/collections/jobs.ts`
   - `payload/collections/news.ts`
   - `payload/collections/applications.ts`
   - `payload/collections/media.ts`
   - `payload/globals/site-settings.ts`
   - `payload/globals/about-page.ts` or equivalent structure
3. Add Payload integration/repository layer:
   - `lib/payload/config.ts`
   - `lib/payload/client.ts`
   - `lib/payload/types.ts`
   - `lib/payload/transformers.ts`
   - `lib/payload/repositories/jobs.ts`
   - `lib/payload/repositories/news.ts`
   - `lib/payload/repositories/applications.ts`
   - `lib/payload/repositories/settings.ts`
   - `lib/payload/repositories/about.ts`
4. Modify data-source selection:
   - `lib/config/data-source.ts`
   - any repository barrel/helper choosing mock vs database/CMS runtime
5. Modify Next.js route handlers/loaders only as needed to call Payload-backed repositories when `USE_MOCK_DATA=false`:
   - `app/api/jobs/*`
   - `app/api/news/*`
   - `app/api/applications/*`
   - `app/api/settings/route.ts`
   - public jobs/news/about loaders/pages
6. Add docs:
   - `coding-packs/payload/setup.md`
   - `coding-packs/payload/content-types.md`
   - `coding-packs/payload/permissions.md`
   - update `.env.example`
7. Add tests:
   - `tests/unit/lib/payload/config.test.ts`
   - `tests/unit/lib/payload/transformers.test.ts`
   - `tests/unit/lib/repositories/payload-boundary.test.ts`
   - targeted route tests for public published-only reads and admin/application privacy boundaries
8. Add smoke verification script if useful:
   - `scripts/smoke-payload.mjs`
   - package script `smoke:payload`

### Validation
1. Validate required env variables in Payload mode without printing secret values:
   - `PAYLOAD_SECRET`
   - Payload database connection variable, preferably `DATABASE_URL` or a clearly named Payload DB URL
   - optional `PAYLOAD_PUBLIC_SERVER_URL` / server URL if needed
2. Validate `USE_MOCK_DATA=true` does not import/init Payload or open a database connection.
3. Validate locales are bounded to supported locales (`vi`, `ja`) at public/API boundaries.
4. Validate public queries filter by published status and locale.
5. Validate admin/application mutation inputs before writing through Payload.
6. Validate Payload responses are transformed into existing app domain types before reaching UI components.
7. Validate private CV references are omitted from public API responses.
8. Validate no `STRAPI_` env names, package scripts, imports, or docs remain as active implementation paths.

### Error Handling
1. Missing Payload configuration in non-mock mode:
   - fail fast server-side with missing variable names only;
   - API routes return the existing safe error envelope.
2. Payload/database unavailable:
   - do not fall back to mock mode when `USE_MOCK_DATA=false`;
   - public pages show existing error/empty states;
   - admin mutations show visible error feedback.
3. Payload validation errors:
   - map to user-friendly form-level or field-level errors.
4. Unauthorized admin access:
   - deny before reading/writing candidate PII or CV metadata;
   - do not rely only on client-side visibility.
5. Missing content:
   - list pages show existing empty states;
   - detail pages return `notFound()` where appropriate.
6. CV/media failures:
   - never expose raw storage paths, private URLs, or signed token internals.

## ACCEPTANCE CRITERIA
- Given the repository contains TIP-028 Strapi direction When TIP-029 is implemented Then active Strapi code, scripts, env docs, and setup docs are removed or rewritten so Payload is the only CMS migration target.
- Given `USE_MOCK_DATA=true` and no Payload/database env variables are configured When `/vi/jobs`, `/vi/news`, `/vi/about`, and `/admin` are loaded Then the app renders mock data and does not initialize Payload or connect to a database.
- Given `USE_MOCK_DATA=false` and Payload env variables are missing When a CMS-backed route is executed Then the server fails loudly with missing variable names and does not silently fall back to mock data.
- Given Payload contains published Vietnamese jobs When `/vi/jobs` is loaded Then only published Vietnamese jobs render in the existing visual layout.
- Given Payload contains draft/review/closed/archived jobs When public jobs pages are loaded Then those jobs do not appear publicly.
- Given Payload contains published Japanese news When `/ja/news/[slug]` is loaded Then the page renders transformed Payload content without leaking raw Payload response shape into components.
- Given a candidate submits an application When the input is valid Then application metadata is stored through Payload or the documented privacy-safe hybrid path and the candidate sees the existing success state.
- Given an admin opens an application detail When the request is unauthenticated Then candidate PII and CV metadata are not returned.
- Given an admin accesses CV files When CV storage remains Supabase-backed or moves to Payload uploads Then the file remains private and is served only through authenticated server-mediated access.
- Given browser/client bundles are inspected When Payload env secrets or private CV references exist Then none appear in client components, public env vars, or API responses.
- Given source imports are inspected When production CMS routes are scanned Then there are no active imports from `lib/strapi/*` and no `STRAPI_*` runtime dependency remains.
- Given final validation runs When `pnpm type-check`, targeted Payload tests, and `pnpm build` complete Then all pass.

## CONSTRAINTS
- DO NOT: implement or preserve Strapi as an active CMS backend.
- DO NOT: redesign public or admin UI while migrating CMS backend direction.
- DO NOT: expose `PAYLOAD_SECRET`, database credentials, private media paths, or CV signed URLs to the browser.
- DO NOT: silently fall back from Payload/non-mock mode to mock data on errors.
- DO NOT: make mock mode depend on Payload, Postgres, Supabase, Docker, or network access.
- DO NOT: reintroduce SQLite as the production CMS runtime.
- DO NOT: place Payload admin/config code in client components.
- DO NOT: route Payload Admin to `/admin` if it breaks the existing CMS shell without explicit documentation and route updates.
- REUSE: existing Next.js routes, visual components, public/admin layouts, mock data, API response envelope, validation patterns, and domain types where possible.
- REUSE: existing Supabase private CV storage if it is safer than moving CV binaries into Payload during MVP.
- REUSE: existing PostgreSQL/Supabase database target where compatible with Payload's adapter.
- SKIP: multi-tenant organizations, advanced ATS integrations, email automation, and visual QC fixes unrelated to CMS backend.
- SKIP: production infrastructure provisioning unless explicitly requested; provide deploy-ready docs and local/dev setup guidance only.

## QUALITY GATE: SELF-REVIEW
- Completeness: Covers Strapi removal, Payload adoption, collection models, data-source boundaries, env docs, privacy/auth requirements, tests, smoke verification, acceptance criteria, and constraints.
- Cross-reference: Aligns with `coding-packs/product/tech-stack.md`, RRI domains B-E, existing task graph post-TIP-027 state, and standards for CMS shell, Supabase/security baseline, recruitment content, HTML-to-Next.js visual preservation, and design tokens.
- Gaps:
  - Exact Payload major version and adapter package must be verified during implementation against current docs before editing dependencies.
  - The final integration shape (embedded Payload in Next.js vs separate app/package) is intentionally a builder decision because it depends on the current app structure and deployment constraints.
  - CV binary storage may remain Supabase-backed as a hybrid path if Payload private uploads add too much risk for MVP.
- Action needed: Implement TIP-029 after confirming Payload version/docs, then run targeted Payload boundary tests, `pnpm type-check`, and `pnpm build`.
