# PLAN: TIP-019 SQLite Migration

## HEADER
- Plan ID: `tip-019-sqlite-migration`
- Source TIP: `coding-packs/tips/TIP-019-sqlite-migration.md`
- Created: 2026-05-25
- Mode: zflow standalone planning output for later implementation
- Target tier: THOROUGH

## INTAKE

### Complexity Score
- Lexical signals:
  - `migrate` / `migration`: +20 architecture keyword
  - `database`, `auth`, `security`: +15 risk keywords
  - Many file paths and system-wide scope: +10
- Structural signals:
  - Estimated subtasks > 5: +25
  - Cross-file dependencies: +15
  - Test requirements: +5
  - Impact scope system-wide: +20
  - Reversibility difficult due to auth/database migration: +15
- Score: 100/100
- Tier: THOROUGH

### Scope Decision
[CORE] This plan migrates runtime persistence/auth from Supabase to SQLite while preserving route structure and visual UI.
[DECISION] Keep the work as an internal data-access migration first; only remove Supabase dependencies after all runtime imports are eliminated and build/type-check pass.
[DECISION] Use repository boundaries so server pages/API routes do not depend directly on the SQLite driver.

## SUCCESS CRITERIA

1. SQLite schema/migrations/seeds exist for jobs, news, applications, contact submissions, site settings, admin users, and sessions.
2. Public job/news routes read SQLite or explicit mock fallback and only expose published records.
3. Admin login/session and `/admin/*` protection work without Supabase env vars.
4. CMS jobs/news/applications/settings workflows persist through SQLite repositories.
5. Application submission stores CV files outside public web root and persists metadata safely.
6. `.env.example`, package scripts, and test helpers document SQLite setup.
7. `npm run type-check`, `npm run build`, and SQLite-specific tests pass.

## PHASES

### Phase 0 — Baseline Audit and Red Gate Setup
**Goal:** Capture current behavior and write tests that fail before implementation.

Tasks:
1. Inventory Supabase runtime imports with grep for `@supabase`, `createClient`, `USE_MOCK_DATA`, and `Database['public']`.
2. Inventory existing test framework and add SQLite migration specs under `coding-packs/plans/tip-019-sqlite-migration/specs/`.
3. Add failing tests before implementation:
   - Repository migration/seed tests.
   - Public visibility tests for jobs/news.
   - Auth/session tests.
   - Application submission metadata/file safety tests.
4. Run Red Gate:
   - Test files compile.
   - At least one test fails because `lib/db/*` and SQLite repositories do not exist yet.

Deliverables:
- `coding-packs/plans/tip-019-sqlite-migration/specs/sqlite-migration.md`
- New test files in existing test layout.
- Red Gate evidence captured in `.zflow/red-gate.md`.

### Phase 1 — SQLite Foundation
**Goal:** Add server-only DB foundation without changing UI flows yet.

Tasks:
1. Add SQLite package dependency, preferably `better-sqlite3` plus types if needed.
2. Add server-only DB modules:
   - `lib/db/connection.ts`
   - `lib/db/schema.ts`
   - `lib/db/migrate.ts`
   - `lib/db/seed.ts`
   - `lib/db/types.ts`
   - `lib/db/json.ts`
3. Add package scripts:
   - `db:migrate`
   - `db:seed`
   - `db:reset`
4. Define migrations for tables from TIP-019.
5. Seed from `lib/mock-data.ts` with published/draft mix.
6. Update `.env.example` with SQLite DB path, upload path, admin bootstrap credentials, and mock fallback flags.

Quality gates:
- Migration is idempotent.
- Seed can run twice without duplicate natural keys.
- SQLite code is server-only.

### Phase 2 — Repository Layer and Domain Types
**Goal:** Abstract DB access before replacing route/page internals.

Tasks:
1. Create repositories:
   - `lib/db/repositories/jobs.ts`
   - `lib/db/repositories/news.ts`
   - `lib/db/repositories/applications.ts`
   - `lib/db/repositories/contact.ts`
   - `lib/db/repositories/settings.ts`
   - `lib/db/repositories/admin-auth.ts`
2. Preserve Supabase-like row shapes where useful to minimize UI churn.
3. Add type-safe JSON serialization for `skills`, `tags`, rich settings values.
4. Add pagination/filter helpers matching current API behavior.
5. Add validation helpers for slug uniqueness and allowed statuses.

Quality gates:
- Unit tests cover repository CRUD and public published-only queries.
- Repositories return safe errors; no raw driver exceptions leak beyond repository boundary.

### Phase 3 — Admin Auth and Middleware Migration
**Goal:** Replace Supabase Auth with SQLite-backed cookie sessions.

Tasks:
1. Replace `lib/auth.ts` internals with SQLite session lookup:
   - `getCurrentUser()`
   - `requireAdmin()`
   - `isAdmin()`
   - `getSession()` compatible enough for existing callers.
2. Replace `/api/auth/signin` with password verification and secure session cookie creation.
3. Replace `/api/auth/signout` with session invalidation and cookie clearing.
4. Replace `middleware.ts` Supabase session verification with cookie/session validation or a lightweight signed-cookie guard that can run in middleware.
5. Ensure server-side `requireAdmin()` performs authoritative DB validation even if middleware uses a lightweight check.

Security constraints:
- No plaintext passwords.
- No raw session tokens stored; store hashed tokens.
- Cookies must be HttpOnly, SameSite, Secure in production, and scoped appropriately.

Quality gates:
- Unauthenticated admin access redirects to login.
- Authenticated admin access works.
- Invalid/expired session is rejected.

### Phase 4 — Public Page Runtime Migration
**Goal:** Public pages read jobs/news/about/settings from SQLite repositories or explicit mock fallback.

Tasks:
1. Update public jobs list/detail pages to use `jobsRepository`.
2. Update public news list/detail pages to use `newsRepository`.
3. Update about content loader if it still depends on Supabase runtime.
4. Keep current i18n route structure and UI composition unchanged.
5. Remove Supabase env requirement for these public pages.

Quality gates:
- Published-only visibility tests pass.
- `/vi/jobs`, `/ja/jobs`, `/vi/news`, `/ja/news` render from SQLite seed data.
- Draft/review/closed/archived records do not render publicly.

### Phase 5 — API Routes and CMS Migration
**Goal:** Replace Supabase calls inside APIs and admin screens with repositories.

Tasks:
1. Migrate APIs:
   - `app/api/applications/route.ts`
   - `app/api/applications/[id]/route.ts`
   - `app/api/contact/route.ts`
   - `app/api/news/route.ts`
   - `app/api/news/[id]/route.ts`
   - `app/api/settings/route.ts`
   - any jobs API if present or admin jobs server logic.
2. Migrate admin pages/components data loading for dashboard, jobs, news, applications, settings.
3. Preserve existing response envelopes where current UI expects them.
4. Preserve visible success/error feedback.
5. Ensure admin-only mutations call `requireAdmin()`.

Quality gates:
- Admin CRUD tests for news/jobs/settings pass.
- Application list/detail reads SQLite data.
- Contact submissions persist to SQLite.

### Phase 6 — CV Upload Safety
**Goal:** Replace Supabase Storage with local safe upload storage.

Tasks:
1. Define upload root env, e.g. `SQLITE_UPLOAD_DIR` or `LOCAL_UPLOAD_DIR`.
2. Store CV files outside `public/` by default, e.g. `.data/uploads/candidate-cvs`.
3. Sanitize filenames and use UUID storage keys.
4. Persist original filename, mime type, size, and internal storage path/key.
5. Add admin-only controlled CV access route if existing UI needs download/view access.
6. Roll back file if application insert fails.

Quality gates:
- Invalid type/oversize CV rejected.
- Failed DB insert removes uploaded file.
- Public URL cannot access uploaded CV directly.

### Phase 7 — Supabase Runtime Removal and Cleanup
**Goal:** Remove Supabase runtime dependency from migrated flows after all tests pass.

Tasks:
1. Grep for remaining Supabase imports and `types/database.ts` usage.
2. Replace remaining runtime references or document intentionally deferred references.
3. Remove Supabase env requirements from `.env.example` for migrated flows.
4. Only remove `@supabase/*` packages after build/type-check confirm no imports remain.
5. Update docs or migration notes to reflect SQLite canonical persistence.

Quality gates:
- `npm run type-check` passes.
- `npm run build` passes without Supabase env vars.
- No public/CMS runtime path depends on Supabase config.

### Phase 8 — Verification, Review, and Regression
**Goal:** Confirm behavior with separate verification and no visual regression.

Tasks:
1. Run targeted tests:
   - SQLite migrations/seeds
   - Repositories
   - Auth protection
   - Public visibility
   - Application/contact submissions
2. Run regression commands:
   - `npm run type-check`
   - `npm run build`
   - `npm test` or targeted Vitest suite
   - Existing Playwright smoke tests if dev server can run.
3. Use a separate code-reviewer agent for implementation review.
4. If UI routes changed visually, open and screenshot key routes:
   - `/vi/jobs`
   - `/vi/news`
   - `/admin`
   - `/admin/applications`

Deliverables:
- `.zflow/verify-report.md`
- `.zflow/final-report.md`

## FILE OWNERSHIP PLAN

### New files
- `lib/db/connection.ts`
- `lib/db/schema.ts`
- `lib/db/migrate.ts`
- `lib/db/seed.ts`
- `lib/db/types.ts`
- `lib/db/json.ts`
- `lib/db/repositories/*.ts`
- `scripts/db-migrate.*` or equivalent
- `scripts/db-seed.*` or equivalent
- `tests/**/sqlite-*.test.ts`
- `coding-packs/plans/tip-019-sqlite-migration/specs/*.md`

### Existing files likely modified
- `package.json`
- `package-lock.json` / `pnpm-lock.yaml` depending on package manager used
- `.env.example`
- `lib/auth.ts`
- `middleware.ts`
- `app/api/auth/signin/route.ts`
- `app/api/auth/signout/route.ts`
- `app/api/applications/route.ts`
- `app/api/applications/[id]/route.ts`
- `app/api/contact/route.ts`
- `app/api/news/route.ts`
- `app/api/news/[id]/route.ts`
- `app/api/settings/route.ts`
- Public job/news/about pages using Supabase
- Admin jobs/news/applications/settings pages using Supabase
- Components that import `Database` types directly

## RISK REGISTER

| Risk | Impact | Mitigation |
|---|---|---|
| Middleware cannot use Node SQLite driver in Edge runtime | Admin route protection can break | Use middleware only for locale/basic cookie presence; perform DB-backed authorization in server `requireAdmin()`, or configure Node runtime-compatible route guards where possible. |
| Native `better-sqlite3` install/build issues on Windows/Next | Build failures | Verify package compatibility early; fallback to async SQLite package if native install fails. |
| Supabase generated types are deeply coupled to UI | Type churn | Introduce domain row types preserving current field names before broad replacements. |
| CV storage path accidentally public | Candidate data exposure | Default upload directory under `.data/`, reject paths under `public/`, add tests. |
| Existing mock fallback conflicts with SQLite canonical mode | Inconsistent data source | Centralize data-source resolution in `lib/db/runtime.ts` or equivalent. |
| Removing Supabase too early breaks auth/API | Regression | Keep packages until final cleanup; replace imports incrementally. |

## TEST STRATEGY

### Red Gate test files
1. `tests/unit/sqlite-schema.test.ts`
   - AC: migrations create required tables and seed demo rows.
2. `tests/unit/repositories-public-visibility.test.ts`
   - AC: public jobs/news only return published rows.
3. `tests/unit/sqlite-auth.test.ts`
   - AC: session token validation returns admin and rejects invalid/expired sessions.
4. `tests/unit/application-submission-sqlite.test.ts`
   - AC: valid application persists metadata; invalid CV rejected.

### Integration/E2E follow-up
1. API route tests for applications/contact/news/settings if current setup supports route-handler testing.
2. Playwright smoke for public jobs/news and admin redirect/login.

## IMPLEMENTATION ORDER

1. Red Gate specs/tests.
2. SQLite package + DB foundation.
3. Migrations/seeds.
4. Repository layer.
5. Auth/session migration.
6. Public read migration.
7. API/CMS mutation migration.
8. CV file storage migration.
9. Supabase runtime cleanup.
10. Verification + separate review.

## DONE DEFINITION

- All TIP-019 acceptance criteria are covered by tests or explicit verification notes.
- Red Gate evidence exists before implementation.
- Green Gate evidence shows SQLite tests and regression checks pass.
- No runtime Supabase env vars are required for migrated public/CMS flows.
- UI composition and routes remain unchanged.
- Separate verifier/code-reviewer reviewed implementation.
