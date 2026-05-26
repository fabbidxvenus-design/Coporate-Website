# TIP-028: Strapi CMS Migration

## HEADER
- TIP-ID: TIP-028
- Project: Coporate_Website
- Module: CMS Data Backend / Strapi Integration
- Priority: P0
- Depends on: TIP-023, TIP-024, TIP-025, TIP-026, TIP-027
- Estimated: XL

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: Authoritative stack from `coding-packs/product/tech-stack.md` is Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase deployment. This TIP changes the CMS content backend target for public/admin content to Strapi while preserving the existing Next.js UI and route structure.
- Current implementation areas to read first:
  - `app/admin/layout.tsx`
  - `app/admin/page.tsx`
  - `app/admin/jobs/page.tsx`
  - `app/admin/jobs/new/page.tsx`
  - `app/admin/jobs/[id]/edit/page.tsx`
  - `app/admin/news/page.tsx`
  - `app/admin/news/new/page.tsx`
  - `app/admin/news/[id]/edit/page.tsx`
  - `app/admin/applications/page.tsx`
  - `app/admin/applications/[id]/page.tsx`
  - `app/admin/settings/page.tsx`
  - `app/api/jobs/route.ts`
  - `app/api/jobs/[id]/route.ts`
  - `app/api/news/route.ts`
  - `app/api/news/[id]/route.ts`
  - `app/api/settings/route.ts`
  - `app/api/applications/route.ts`
  - `app/api/applications/[id]/route.ts`
  - `app/api/applications/[id]/cv/route.ts`
  - `app/[locale]/jobs/page.tsx`
  - `app/[locale]/jobs/[slug]/page.tsx`
  - `app/[locale]/news/page.tsx`
  - `app/[locale]/news/[slug]/page.tsx`
  - `lib/cms/data-source.ts`
  - `lib/cms/types.ts`
  - `lib/cms/mock-data.ts`
  - `lib/config/data-source.ts`
  - `lib/db/repositories/jobs.ts`
  - `lib/db/repositories/news.ts`
  - `lib/db/repositories/applications.ts`
  - `lib/db/repositories/settings.ts`
  - `lib/db/repositories/about.ts`
  - `lib/api-response.ts`
  - `lib/auth.ts`
- Patterns to follow:
  - Preserve the current public and admin page visual structure; this TIP is a data/backend migration, not a redesign.
  - Preserve mock-data isolation from TIP-021: when `USE_MOCK_DATA=true`, no database or Strapi network call may run.
  - Preserve the current repository/API boundary shape where possible so UI components do not import Strapi SDK/client code directly.
  - Keep existing API response envelope from `lib/api-response.ts` for Next.js route handlers.

## APPLICABLE STANDARDS
Builder MUST conform to these matched standards:
- [cms/admin-shell](../standards/cms/admin-shell.md) — protected CMS shell, consistent navigation, mutation feedback.
- [database/supabase-saas](../standards/database/supabase-saas.md) — security baseline still applies to authentication, private CV storage, environment variables, and any remaining Supabase/PostgreSQL usage.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — jobs, applications, and news content model rules.
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — preserve exported design composition and typed component boundaries.
- [ui/design-tokens](../standards/ui/design-tokens.md) — no visual redesign; keep Professional Tech Hub tokens and screenshot parity.

## TASK
Migrate the project's CMS-backed content workflows to Strapi so jobs, news/articles, applications, settings, about/company content, and CMS media can be managed through Strapi instead of the current PostgreSQL repository-backed admin CRUD. Keep the existing Next.js public routes, admin routes, localized pages, visual design, and mock-data mode intact while replacing the production CMS data source with a typed Strapi integration layer.

This TIP should produce a working Next.js-to-Strapi boundary, Strapi content-type documentation/configuration artifacts, environment configuration, and updated route handlers/loaders so the public site reads published Strapi content and admin/CMS operations either delegate to Strapi or clearly link/redirect to Strapi Admin where in-app editing is intentionally removed.

## SPECIFICATIONS

### Business Rules
1. Strapi becomes the production source of truth for CMS content:
   - jobs
   - news/articles
   - applications
   - site settings
   - about/company content
   - media assets used by CMS/public content
2. Public pages must keep their current URLs and locale behavior:
   - `/vi/jobs`, `/ja/jobs`
   - `/vi/jobs/[slug]`, `/ja/jobs/[slug]`
   - `/vi/news`, `/ja/news`
   - `/vi/news/[slug]`, `/ja/news/[slug]`
   - `/vi/about`, `/ja/about`
3. Public pages may only render published Strapi content.
4. Draft/review/closed/archived jobs must not appear on public jobs pages unless their public visibility status is explicitly published and active.
5. In-app admin routes must keep the current CMS shell and navigation, but content editing behavior may be one of two explicit patterns:
   - Preferred: in-app admin pages use Next.js API routes that call Strapi REST/GraphQL APIs with a server-only Strapi API token.
   - Acceptable: in-app admin pages become read-only management dashboards with clear "Open in Strapi" actions for create/edit workflows.
6. Do not expose Strapi admin tokens, API tokens, or private media credentials to browser bundles.
7. Applications/CV handling must remain privacy-safe:
   - If CV files stay in Supabase Storage, keep private signed-download behavior.
   - If moved to Strapi Media Library, document and enforce private-access expectations; do not make candidate CVs public assets by accident.
8. Mock mode remains fully independent:
   - `USE_MOCK_DATA=true` must render public and admin mock flows without Strapi URL/token/env variables.
   - `USE_MOCK_DATA=false` may require Strapi configuration and should fail loudly with a clear setup error when required variables are missing.
9. Existing visual QC constraints remain active: do not change colors, layout, card shapes, spacing, or responsive composition except where needed to support data rendering safely.
10. Keep localized content explicit. Strapi content types must support Vietnamese and Japanese either through Strapi i18n or through locale fields; choose one approach and document it in the implementation notes.

### Strapi Content Model
Create Strapi content-type guidance or checked-in schema/config artifacts for these models. If this repository does not host the Strapi app, create `coding-packs/strapi/content-types.md` and `coding-packs/strapi/setup.md` instead of Strapi source files.

1. `job`
   - `title`
   - `slug`
   - `locale`
   - `department` / `category`
   - `location`
   - `employmentType`
   - `salaryRange`
   - `skills` / `tags`
   - `description`
   - `requirements`
   - `benefits`
   - `status` with values compatible with existing workflow: `draft`, `review`, `published`, `closed`, `archived`
   - `publishedAt`
   - `expiresAt`
   - `coverImage` or related media if needed by current UI
2. `article` / `newsArticle`
   - `title`
   - `slug`
   - `locale`
   - `excerpt`
   - `body` rich text
   - `coverImage`
   - `category`
   - `tags`
   - `author`
   - `status`
   - `publishedAt`
3. `application`
   - candidate name/contact fields matching current forms
   - selected job relation or job slug/id snapshot
   - CV metadata and storage reference
   - message/portfolio/source fields
   - status
   - timestamps
4. `siteSetting`
   - localized site metadata, contact details, social links, footer/settings fields currently used by the app.
5. `aboutPage`
   - locale
   - hero/title/intro fields
   - stats
   - activity/company sections used by current `/about` UI
   - image/media references where applicable

### Files to Create or Modify
1. Create Strapi integration layer:
   - `lib/strapi/client.ts`
   - `lib/strapi/config.ts`
   - `lib/strapi/types.ts`
   - `lib/strapi/transformers.ts`
   - `lib/strapi/repositories/jobs.ts`
   - `lib/strapi/repositories/news.ts`
   - `lib/strapi/repositories/applications.ts`
   - `lib/strapi/repositories/settings.ts`
   - `lib/strapi/repositories/about.ts`
2. Modify data-source/repository selection:
   - `lib/config/data-source.ts`
   - `lib/cms/data-source.ts`
   - any repository barrel/helper that currently chooses mock vs PostgreSQL.
3. Modify API route handlers to call the production Strapi repository when mock mode is off:
   - `app/api/jobs/route.ts`
   - `app/api/jobs/[id]/route.ts`
   - `app/api/news/route.ts`
   - `app/api/news/[id]/route.ts`
   - `app/api/settings/route.ts`
   - `app/api/applications/route.ts`
   - `app/api/applications/[id]/route.ts`
   - `app/api/applications/[id]/cv/route.ts` if CV access changes or needs Strapi metadata.
4. Modify public loaders/pages only if needed to use the updated repository contract:
   - `app/[locale]/about/page.tsx`
   - `app/[locale]/jobs/page.tsx`
   - `app/[locale]/jobs/[slug]/page.tsx`
   - `app/[locale]/news/page.tsx`
   - `app/[locale]/news/[slug]/page.tsx`
5. Modify admin pages only as required for the chosen admin strategy:
   - Keep forms wired through Next.js API routes if implementing in-app Strapi mutations.
   - Or replace create/edit buttons/forms with accessible links/actions to Strapi Admin while preserving the CMS shell and explaining the external handoff.
6. Update environment documentation:
   - `.env.example`
   - deployment/readiness docs if present.
7. Create Strapi setup documentation if Strapi source is external:
   - `coding-packs/strapi/setup.md`
   - `coding-packs/strapi/content-types.md`
   - `coding-packs/strapi/permissions.md`
8. Add or update tests around the repository/data-source boundary and API routes.

### Validation
1. Validate required environment variables at the server boundary when `USE_MOCK_DATA=false`:
   - `STRAPI_URL`
   - `STRAPI_API_TOKEN`
   - any optional media/base URL variable if needed.
2. Validate all user/admin mutation inputs before calling Strapi.
3. Validate locale values as supported locales only (`vi`, `ja`, plus existing default behavior if present).
4. Validate job/news status transitions before public visibility transforms.
5. Validate application/CV metadata before creating Strapi application records.
6. Normalize Strapi responses through typed transformers before returning them to UI components.
7. Do not pass raw Strapi response objects into React components unless they exactly match existing app domain types.

### Error Handling
1. Missing Strapi configuration in production mode:
   - fail fast with a clear server-side error message;
   - route handlers return the existing API error envelope without leaking token values.
2. Strapi network/API failure:
   - public pages should render the existing error boundary or empty/error state consistently;
   - admin pages/API routes should show visible failure feedback.
3. Strapi validation errors:
   - map to current field-level or form-level user-friendly messages.
4. Unauthorized/forbidden Strapi responses:
   - do not retry with client-side credentials;
   - return a safe admin error and log server-side context.
5. Missing published content:
   - public list pages show current empty-state UI;
   - detail pages return `notFound()` where current route behavior expects 404.
6. CV/media access errors:
   - never expose private bucket paths/tokens;
   - show a clear admin-only error state.

## ACCEPTANCE CRITERIA
- Given `USE_MOCK_DATA=true` and no `STRAPI_URL`/`STRAPI_API_TOKEN` are configured When `/vi/jobs`, `/vi/news`, `/vi/about`, and `/admin` are loaded Then the app uses mock data only and does not attempt any Strapi request.
- Given `USE_MOCK_DATA=false` and valid Strapi configuration When `/vi/jobs` is loaded Then the page renders only Strapi jobs that are published for Vietnamese content and preserves the current visual layout.
- Given `USE_MOCK_DATA=false` and valid Strapi configuration When `/ja/news/[slug]` is loaded for a published Japanese article Then the existing news detail page renders the transformed Strapi rich text/content without raw Strapi shape leaking into components.
- Given a Strapi job has status `draft`, `review`, `closed`, or `archived` When public jobs pages are loaded Then that job is not displayed publicly.
- Given a Strapi job or article is created/updated through the chosen admin workflow When the operation succeeds Then the CMS shows visible success feedback or the user is clearly taken to Strapi Admin for that workflow.
- Given Strapi returns a validation or authorization error When an admin mutation is attempted Then the UI shows a safe visible error and no token or internal Strapi details are exposed.
- Given an application is submitted from the public form When the submission is valid Then the application record is created in Strapi or in the documented privacy-safe hybrid storage path and the candidate sees the existing success state.
- Given an application includes a CV When an admin opens the application detail Then CV access remains private and works through the existing signed/server-mediated pattern or a documented Strapi-private equivalent.
- Given the app is built for production When `npm run build` or the project equivalent runs Then TypeScript/build checks pass without requiring mock-only assumptions.
- Given repository tests run When mock mode and Strapi mode are exercised Then tests prove the data-source boundary does not silently fall back from Strapi to mock data.

## CONSTRAINTS
- DO NOT: redesign public or CMS pages while migrating data sources.
- DO NOT: expose `STRAPI_API_TOKEN` or private media/CV credentials to client components or browser network calls.
- DO NOT: let production Strapi failures silently fall back to mock data.
- DO NOT: remove `USE_MOCK_DATA` isolation or make fresh checkout/mock mode depend on Strapi.
- DO NOT: pass raw Strapi entities directly into UI components if existing domain types differ.
- DO NOT: make candidate CV files publicly accessible through Strapi Media Library without explicit private-access enforcement.
- DO NOT: remove the existing Next.js public/admin routes unless the user explicitly approves a route-level product change.
- REUSE: existing UI components in `components/ui/*`, admin shell components in `components/cms/*`, public cards/forms in `components/public/*`, and existing API response utilities.
- REUSE: existing domain types where possible from `lib/cms/types.ts`; introduce Strapi-specific types only behind `lib/strapi/*`.
- REUSE: existing mock data and data-source flag behavior from `lib/cms/mock-data.ts`, `lib/mock-data.ts`, and `lib/config/data-source.ts`.
- SKIP: multi-tenant Strapi organizations, complex workflow automation, email notifications, and full ATS integrations.
- SKIP: visual QC fixes unrelated to Strapi migration.
- SKIP: changing Supabase Auth unless auth becomes incompatible with the chosen Strapi admin strategy; document any auth handoff before changing it.

## QUALITY GATE: SELF-REVIEW
- Completeness: Covers context, standards, task scope, business rules, validation, error handling, files, acceptance criteria, constraints, and out-of-scope boundaries for migrating the CMS data backend to Strapi.
- Cross-reference: Aligns with `coding-packs/product/tech-stack.md`, `coding-packs/01-REQUIREMENTS-MATRIX.md` domains B-E, `coding-packs/02-TASK-GRAPH.md` current post-TIP-027 state, and applicable standards for CMS shell, recruitment content, frontend visual parity, design tokens, and security baseline.
- Gaps:
  - The repository does not currently show a checked-in Strapi app, so the builder must either add an app if approved or create setup/content-type docs for an external Strapi instance.
  - The exact Strapi API style (REST vs GraphQL) is not mandated; REST is acceptable by default unless the project already has a Strapi GraphQL plugin configured.
  - The final choice between in-app admin CRUD backed by Strapi and external Strapi Admin handoff is intentionally left as an implementation decision with explicit acceptance requirements.
- Action needed: Implement TIP-028, then run build/type checks plus manual smoke tests for mock mode and Strapi-configured mode.
