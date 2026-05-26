# TIP-021: Separate Independent Data Flag Boundary

## HEADER
- TIP-ID: TIP-021
- Project: Corporate Website
- Module: Data Source Boundary / Mock-vs-SQLite Isolation
- Priority: P0
- Depends on: TIP-020
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` is the original target stack reference, but current persistence has moved from Supabase to SQLite in TIP-019/TIP-020. Current implementation uses Next.js App Router, TypeScript, Tailwind CSS, local SQLite via `better-sqlite3`, `.data/sqlite.db`, and repository modules under `lib/db/repositories/`.
- Key files to read first:
  - `.env.example`
  - `.env.local` if present
  - `lib/db/connection.ts`
  - `lib/db/init.ts`
  - `lib/db/repositories/jobs.ts`
  - `lib/db/repositories/news.ts`
  - `lib/db/repositories/about.ts`
  - `lib/mock-data.ts`
  - `lib/corporate-mock-data.ts` or current mock/crawled JSON data modules if present
  - `app/(public)/**/page.tsx`
  - `app/[locale]/**/page.tsx`
  - `app/api/**/route.ts`
  - `middleware.ts`
- Patterns to follow:
  - Existing repository pattern under `lib/db/repositories/`.
  - Existing mock-data modules used by public pages.
  - Existing environment flag convention: `USE_MOCK_DATA=true` means local/mock mode; `USE_MOCK_DATA=false` means SQLite-backed DB mode.

## APPLICABLE STANDARDS
Builder MUST conform where compatible with the current SQLite runtime:
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — public recruitment data must expose only the correct intended source and published content.
- [database/supabase-saas](../standards/database/supabase-saas.md) — legacy database baseline; apply only the generic data-safety and explicit environment-boundary intent, not Supabase/RLS/storage details because TIP-019 replaced Supabase with SQLite.

## TASK
Create a strict data-source boundary so `USE_MOCK_DATA=true` is fully independent from SQLite. When mock mode is enabled, public pages, API routes, middleware decisions, and repository reads must use only mock/crawled mock data and must not open, initialize, migrate, seed, read, or write `.data/sqlite.db`.

## SPECIFICATIONS
### Business Rules
1. Introduce or consolidate one server-only data-source flag helper, for example `lib/config/data-source.ts`, that exposes explicit booleans such as `isMockDataMode` and `isSqliteDataMode`.
2. The helper MUST define semantics exactly:
   - `USE_MOCK_DATA=true` → mock-only mode.
   - `USE_MOCK_DATA=false` → SQLite mode.
   - Missing or invalid `USE_MOCK_DATA` must resolve to the existing documented project default, and that default must be written in `.env.example`.
3. Audit all code paths that can load public or CMS data and replace scattered direct checks of `process.env.USE_MOCK_DATA` with the shared helper.
4. In mock-only mode, do not call `getDb()`, `initializeDatabase()`, `runMigrations()`, SQLite repositories, import scripts, or any code that opens `.data/sqlite.db` during normal page/API rendering.
5. In SQLite mode, keep the existing SQLite-backed behavior from TIP-019/TIP-020 and do not fall back silently to mock data when the database is missing or invalid.
6. Public pages affected by this boundary include at minimum:
   - `/vi/jobs`
   - `/vi/jobs/[slug]`
   - `/vi/news`
   - `/vi/news/[slug]`
   - `/vi/about`
   - the equivalent `/ja/*` routes where implemented
   - unlocalized legacy public routes under `app/(public)` if still active
7. API routes affected by this boundary include any route that reads/writes jobs, news, about, contact, applications, settings, or dashboard data.
8. Admin/CMS routes may use SQLite only when SQLite mode is enabled. If mock mode supports admin screens, they must use mock state or safe no-op mock behavior instead of SQLite.
9. Add tests or verification hooks that prove SQLite connection code is not invoked in mock mode.
10. Keep visual layout, page structure, copy, and design tokens unchanged.

### Validation
1. Validate the data-source helper with unit tests for `USE_MOCK_DATA=true`, `USE_MOCK_DATA=false`, missing value, uppercase/lowercase variants if supported, and invalid values.
2. Add at least one behavioral test that sets `USE_MOCK_DATA=true` and asserts public data loading does not call the SQLite connection module.
3. Add at least one behavioral test that sets `USE_MOCK_DATA=false` and asserts SQLite mode uses repository/database paths rather than mock-only loaders.
4. Ensure `.env.example` documents `USE_MOCK_DATA` clearly with allowed values and the local-development recommendation.
5. If code uses module-level constants derived from env vars, ensure tests can isolate env changes without stale cached values.

### Error Handling
1. In SQLite mode, fail clearly if `.data/sqlite.db` or required migrations are unavailable; do not silently serve mock data.
2. In mock mode, avoid database initialization errors entirely because no database code should run.
3. If `USE_MOCK_DATA` has an invalid value, either fail fast with a clear message or normalize according to the documented helper behavior; do not let scattered code disagree.
4. API routes must return existing project error envelopes or visible user-facing errors; do not expose stack traces or local filesystem paths.

## ACCEPTANCE CRITERIA
- Given `USE_MOCK_DATA=true`, When `/vi/jobs`, `/vi/news`, and `/vi/about` are rendered, Then the pages use only mock/crawled mock data and no SQLite connection is opened.
- Given `USE_MOCK_DATA=true`, When `.data/sqlite.db` is missing, locked, or corrupt, Then public mock-mode pages still render successfully without attempting DB recovery or migration.
- Given `USE_MOCK_DATA=true`, When tests spy on the SQLite connection module, Then `getDb()`, migration, and seed/init functions are not called during normal public page/API data loading.
- Given `USE_MOCK_DATA=false`, When the same public pages are rendered after TIP-020 import, Then they read the imported SQLite content from `.data/sqlite.db`.
- Given `USE_MOCK_DATA=false` and SQLite is unavailable, When a SQLite-backed page/API route loads, Then the failure is explicit and not masked by mock fallback.
- Given the implementation is complete, When `pnpm run test`, `pnpm run type-check`, and `pnpm run build` are executed, Then all pass.

## CONSTRAINTS
- DO NOT: Change public/CMS visual design, layout, colors, copy, or route structure.
- DO NOT: Reintroduce Supabase runtime dependencies or Supabase environment variables.
- DO NOT: Read from SQLite, initialize SQLite, run migrations, or seed the database in `USE_MOCK_DATA=true` mode.
- DO NOT: Add silent fallback from SQLite mode to mock mode.
- DO NOT: Delete `.data/` or public images as part of this TIP.
- REUSE: Existing mock/crawled mock data modules and repository shapes.
- REUSE: Existing SQLite connection/repository code for `USE_MOCK_DATA=false` mode.
- REUSE: Existing tests/build scripts and project error response conventions.
- SKIP: Crawled-data import parser changes, database schema redesign, admin auth redesign, UI redesign, and production deployment changes.

## QUALITY GATE: SELF-REVIEW
- [x] TIP is self-contained and defines exact `USE_MOCK_DATA` semantics.
- [x] TIP names concrete files and route families to audit.
- [x] Acceptance criteria prove mock mode does not touch SQLite and DB mode does not silently fall back.
- [x] Constraints preserve TIP-020 SQLite behavior while isolating mock mode.
- [x] Applicable standards were cross-referenced and Supabase-only details were marked legacy/incompatible with current SQLite runtime.
- Gaps: Exact helper filename may differ if the builder finds an existing config module; builder must reuse the closest existing pattern if present.
