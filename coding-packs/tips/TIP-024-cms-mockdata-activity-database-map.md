# TIP-024: CMS Mock Data, Activity Feed, and Database Usage Map

## HEADER
- TIP-ID: TIP-024
- Project: Coporate_Website
- Module: CMS data layer / admin mock activity
- Priority: P1
- Depends on: TIP-016, TIP-018, TIP-021, TIP-022
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: authoritative target stack from `coding-packs/product/tech-stack.md`: Next.js App Router, TypeScript, Tailwind CSS with project-owned design tokens, Next.js Route Handlers / Server Actions, Supabase Postgres, Supabase Auth, Supabase Storage, Vercel + Supabase deployment.
- Key files to read first:
  - `lib/mock-data.ts` — current corporate/public mock data source for jobs, news, settings, about content, and related public entities.
  - `lib/db/*` — current local/database abstraction, if present after SQLite/Postgres migration work.
  - `lib/config/*` — data-source flag and runtime config patterns from TIP-021/TIP-022.
  - `app/admin/page.tsx` — CMS dashboard surface.
  - `app/admin/jobs/page.tsx` — CMS jobs management surface.
  - `app/admin/news/page.tsx` and `app/admin/news/[id]/edit/page.tsx` — CMS news management/edit surfaces.
  - `app/admin/applications/page.tsx` and `app/admin/applications/[id]/page.tsx` — CMS applications surfaces.
  - `app/admin/settings/page.tsx` — CMS settings surface.
  - `app/api/applications/route.ts`, `app/api/applications/[id]/route.ts`, `app/api/news/route.ts`, `app/api/news/[id]/route.ts`, `app/api/settings/route.ts` — API boundaries that may need database-backed data.
- Patterns to follow:
  - Keep mock data and database-backed data strictly isolated by call-time data-source evaluation.
  - Reuse the existing bilingual `Translation` shape and existing corporate mock records instead of duplicating unrelated fixture objects.
  - Keep admin UI visually aligned with existing CMS screens and do not redesign the shell.

## APPLICABLE STANDARDS
Builder MUST conform to:
- [cms/admin-shell](../standards/cms/admin-shell.md) — protected CMS shell, navigation, management UX, and mutation feedback.
- [database/supabase-saas](../standards/database/supabase-saas.md) — schema/auth/RLS/storage/environment baseline; local prototypes may use seed data, production must be RLS/storage-policy ready.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — jobs, applications, and news content model rules.

## TASK
Create CMS-focused mock data and an admin activity model derived from the existing corporate/public mock data, then map which CMS data surfaces should stay mock-only for local demo and which ones must be database-backed. The goal is to let CMS pages show realistic recent activity, dashboard metrics, and management lists while preserving a clean migration path to Supabase/Postgres for jobs, news, applications, settings, and admin audit/activity records.

## SPECIFICATIONS

### Business Rules
1. Add a CMS mock data layer that derives from existing `jobs`, `news`, `siteSettings`, and application-like data rather than creating a second inconsistent source of truth.
2. Model CMS activity records for admin-visible events, at minimum:
   - job created/updated/published/closed/archived
   - news draft created/updated/published/unpublished
   - application submitted/viewed/status changed/CV downloaded
   - settings updated
   - admin sign-in/sign-out where already represented by local auth flow
3. Each activity record must include stable `id`, `type`, `entityType`, `entityId`, bilingual or locale-ready title/message, actor display name, timestamp, and optional metadata for status transitions.
4. Dashboard metrics must be computed from mock jobs/news/applications/activity data, not hardcoded as unrelated counters.
5. CMS management pages must use the same data source decision boundary used by the rest of the app: mock mode reads derived mock CMS data; database mode calls database/query helpers or API boundaries.
6. Database-needed surfaces must be explicitly documented in code-adjacent exports or typed metadata so future implementation can distinguish:
   - `databaseRequired: true` for jobs, news/articles, applications, settings, CV metadata/download audit, and persisted admin activity/audit log.
   - `databaseRequired: false` for purely presentational dashboard helper summaries that can be recomputed from database data.
7. Do not persist real activity in localStorage/sessionStorage as a replacement for the database; transient UI state is allowed only for filters, search input, and selected rows.
8. If current database helpers are Postgres-ready after TIP-022, use their shape in the map; otherwise keep this TIP limited to typed mock repositories and a database usage map without adding a new database client.

### Data Model Requirements
1. Create or extend TypeScript types for:
   - `CmsActivity`
   - `CmsActivityType`
   - `CmsEntityType`
   - `CmsDashboardMetrics`
   - `CmsDatabaseUsageItem`
2. Activity types should be string literal unions, not free-form strings.
3. Entity IDs must reference existing mock records where possible (`job.id`, `news.id`, application IDs, settings key).
4. Timestamps should be deterministic fixed ISO strings, not `Date.now()` at module load, so screenshots/tests remain stable.
5. Status values must align with domain standards: jobs support draft/review/published/closed/archived when available; news supports draft/published; applications support pending/reviewing/interview/accepted/rejected or the current app's existing status union.

### Files to Create or Modify
1. Prefer modifying existing files over creating new ones, but create focused files if needed to keep `lib/mock-data.ts` cohesive.
2. Expected implementation options:
   - `lib/mock-data.ts` — add CMS-derived exports only if the file remains readable and under project size limits.
   - `lib/mock-data/cms.ts` or `lib/cms/mock-data.ts` — preferred if `lib/mock-data.ts` is already large.
   - `lib/cms/types.ts` — shared CMS activity/dashboard/database usage types if there is no existing type home.
   - `lib/cms/data-source.ts` or existing data-source helper — expose call-time helpers such as `getCmsDashboardData()` / `getCmsActivities()` if this pattern already exists.
   - `app/admin/page.tsx` — replace hardcoded recent activity/metric placeholders with derived mock/database-aware data.
   - `app/admin/jobs/page.tsx`, `app/admin/news/page.tsx`, `app/admin/applications/page.tsx`, `app/admin/settings/page.tsx` — use shared CMS data helpers where current pages duplicate placeholder data.
3. Do not touch public page visual layout except where types/imports require compatibility.

### Validation
1. Validate at API/server boundaries only; do not add unnecessary runtime validation for internal static mock arrays.
2. If exposing activity through an API route, validate query params for `limit`, `entityType`, and `entityId`.
3. `limit` must be bounded to a safe range such as 1–50.
4. Unknown entity filters must return a typed empty result or a consistent API error envelope, following existing API response conventions.

### Error Handling
1. Mock-mode helpers should not silently swallow impossible internal errors; keep static data deterministic.
2. Database-mode helpers must surface visible admin error states on CMS pages, reusing existing error UI patterns.
3. API routes must not leak stack traces or database internals in response messages.
4. If database mode is selected but required database configuration is missing, fail fast with the project's existing configuration error pattern.

## ACCEPTANCE CRITERIA
- Given mock mode is active When an admin opens `/admin` Then dashboard metrics and recent activity are derived from the shared CMS mock data and match current jobs/news/applications/settings fixtures.
- Given existing corporate mock jobs and news When CMS mock data is built Then CMS list records reference the same IDs/slugs/titles instead of duplicating unrelated placeholder records.
- Given a CMS activity item references a job/news/application/settings entity When rendered in recent activity Then it shows the correct entity title, activity type, actor, and deterministic timestamp.
- Given a builder reviews the CMS database usage map When deciding what needs Supabase/Postgres Then jobs, news/articles, applications, settings, CV metadata/download audit, and persisted admin activity are marked database-required.
- Given local demo mode is active When CMS pages render Then no Supabase/Postgres client is required and no real database write is attempted.
- Given database mode is active When CMS pages need persisted data Then they go through the existing database/API abstraction instead of importing mock arrays directly.
- Given tests or snapshots run multiple times When mock activity is generated Then timestamps and ordering remain stable.
- Given a CMS page mutation succeeds or fails When the result is shown Then visible success/error feedback remains consistent with the CMS admin-shell standard.

## CONSTRAINTS
- DO NOT: create a second independent mock dataset that drifts from `lib/mock-data.ts` public/corporate records.
- DO NOT: use `Date.now()`, random IDs, random ordering, or generated timestamps in module-level mock data.
- DO NOT: persist real CMS activity/audit records in browser storage as a database substitute.
- DO NOT: reintroduce SQLite-specific assumptions removed by TIP-022.
- DO NOT: redesign CMS pages, sidebar, topbar, table layout, or public visual surfaces.
- DO NOT: hardcode dashboard counters that cannot be traced to data records.
- REUSE: existing `Translation` type, jobs/news/site settings mock data, API response envelope, config/data-source flag patterns, admin shell components, and existing status badges/styles.
- REUSE: existing mock/database isolation rule from TIP-021; evaluate mode at call time rather than import time.
- SKIP: real Supabase migrations, RLS policy implementation, auth role expansion, email notifications, and full audit-log persistence unless already present and trivial to wire.

## QUALITY GATE: SELF-REVIEW
- Completeness: TIP defines context, standards, business rules, data model, file targets, validation, error handling, acceptance criteria, and constraints.
- Cross-reference: Aligns with requirements REQ-D01, REQ-D08, REQ-D09, REQ-E02, REQ-E04, REQ-F04 and standards `cms/admin-shell`, `database/supabase-saas`, `domain/recruitment-content`.
- Gap declared: Exact current app data-source helper names must be confirmed by the builder before implementation because this TIP is generated from coding-pack context plus current file inventory, not a full implementation pass.
- Verdict: PASS — ready for Claude Code implementation.
