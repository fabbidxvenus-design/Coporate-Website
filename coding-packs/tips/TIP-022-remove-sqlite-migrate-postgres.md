# TIP-022: Remove SQLite Runtime and Migrate to PostgreSQL

## HEADER
- TIP-ID: TIP-022
- Project: Corporate Website
- Module: Database Runtime / PostgreSQL Migration
- Priority: P0
- Depends on: TIP-020, TIP-021
- Estimated: XL

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` defines the original target stack as Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers/Server Actions, and Supabase Postgres. Current code temporarily migrated to local SQLite in TIP-019/TIP-020, but Windows native binding issues with `better-sqlite3` make SQLite unsuitable for this project workflow.
- Key files to read first:
  - `package.json`
  - `.env.example`
  - `lib/db/connection.ts`
  - `lib/db/migrate.ts`
  - `lib/db/init.ts`
  - `lib/db/seed.ts`
  - `lib/db/crawl-parser.ts`
  - `lib/db/types.ts`
  - `lib/db/repositories/jobs.ts`
  - `lib/db/repositories/news.ts`
  - `lib/db/repositories/about.ts`
  - `lib/db/repositories/applications.ts`
  - `lib/db/repositories/contact.ts`
  - `lib/db/repositories/settings.ts`
  - `lib/db/repositories/admin-auth.ts`
  - `app/api/**/route.ts`
  - `app/(public)/**/page.tsx`
  - `app/[locale]/**/page.tsx`
  - `middleware.ts`
  - `scripts/import-crawled-data.mjs`
  - `scripts/import-crawled-data-lib.mjs`
  - `tests/import-crawled-data.spec.ts`
- Patterns to follow:
  - Preserve existing repository API shapes so page/API code changes are minimal.
  - Preserve `USE_MOCK_DATA=true` mock-only semantics from TIP-021.
  - Reuse `lib/db/crawl-parser.ts` parser behavior from TIP-020, but write parsed data into PostgreSQL instead of SQLite.
  - Use parameterized SQL only; no SQL string interpolation with user/crawled values.

## APPLICABLE STANDARDS
Builder MUST conform:
- [database/supabase-saas](../standards/database/supabase-saas.md) — PostgreSQL/Supabase schema, auth/RLS/storage baseline, environment documentation, public published reads, admin write protection.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — jobs, applications, news, about/settings content model behavior.
- [cms/admin-shell](../standards/cms/admin-shell.md) — admin mutation feedback and protected CMS workflow must remain intact.

## TASK
Remove the SQLite runtime dependency and migrate persistence to PostgreSQL. Replace `better-sqlite3` connection, migrations, repositories, seed/import scripts, and environment configuration with PostgreSQL-compatible code while preserving public routes, CMS routes, mock mode, crawled-data import behavior, and visual UI.

## SPECIFICATIONS
### Business Rules
1. Remove `better-sqlite3` and SQLite-specific runtime assumptions from the application code and package dependencies.
2. Add PostgreSQL access through a server-only database module, preferably using `pg` or a Supabase-compatible Postgres connection string.
3. Required environment variables must be documented in `.env.example`:
   - `DATABASE_URL` for PostgreSQL direct connection.
   - `USE_MOCK_DATA=true|false` with exact semantics from TIP-021.
   - Any Supabase-specific variables only if the implementation uses Supabase client APIs instead of raw Postgres for auth/storage.
4. Preserve repository method names and return shapes where possible:
   - jobs repository returns `Job[]`/`Job | null` with parsed JSON arrays.
   - news repository returns `NewsArticle[]`/`NewsArticle | null` with parsed tags.
   - applications/contact/settings/about/admin-auth repositories preserve existing page/API contracts.
5. Replace SQLite migrations with PostgreSQL migrations:
   - Use PostgreSQL-compatible DDL, types, defaults, unique constraints, indexes, checks, and timestamps.
   - Create a `migrations` tracking mechanism or use existing Supabase SQL migration files if already present.
   - Include tables for jobs, news_articles, applications, contact_submissions, site_settings, admin_users/admin_sessions (or Supabase Auth-compatible profiles if auth is restored), about_content.
6. Preserve TIP-020 crawled-data import:
   - `parseCrawledPages`, `parseImageMapping`, and `buildImportPlan` behavior stays available and tested.
   - Import writes news/about/settings into PostgreSQL with idempotent upserts.
   - Copied browser-facing images remain `/images/<filename>` and no absolute Windows paths are stored.
7. Preserve TIP-021 data-source boundary:
   - `USE_MOCK_DATA=true` must not connect to PostgreSQL or run migrations/imports during normal page/API rendering.
   - `USE_MOCK_DATA=false` must use PostgreSQL and fail clearly when `DATABASE_URL` or database access is unavailable.
8. Remove or quarantine SQLite-only files only after replacements are working:
   - Replace `lib/db/connection.ts`, `lib/db/migrate.ts`, `lib/db/init.ts`, `lib/db/seed.ts` contents with PostgreSQL equivalents or new file names.
   - Delete `.data` assumptions from runtime code and docs.
   - Remove `better-sqlite3` and `@types/better-sqlite3` from dependency manifests.
9. Do not redesign public/CMS UI, route structure, locale routing, or visual styling.
10. Do not reintroduce silent fallback from PostgreSQL mode to mock mode.

### Validation
1. Validate `DATABASE_URL` at server boundary before attempting DB mode operations; produce a clear setup error if missing.
2. Validate all crawled/imported values before database writes:
   - required slugs/titles/content defaults are handled deterministically.
   - JSON arrays are serialized/deserialized consistently.
   - browser image URLs must start with `/images/` or be null.
3. Ensure migration SQL is PostgreSQL syntax, not SQLite syntax:
   - no `INSERT OR IGNORE`, `INSERT OR REPLACE`, SQLite `DATETIME`, SQLite-only pragmas, or `better-sqlite3` transactions.
   - use `ON CONFLICT (...) DO UPDATE`, `TIMESTAMPTZ`, `JSONB` or `TEXT` JSON with explicit parsing.
4. Ensure public visibility rules are preserved: only published jobs/news appear on public pages.
5. Ensure admin/session behavior is either preserved through the existing admin tables or explicitly migrated to Supabase Auth if that path is selected.
6. Add or update tests for:
   - PostgreSQL SQL generation/repository behavior using a test database or mocked `pg` pool.
   - `USE_MOCK_DATA=true` does not initialize PostgreSQL.
   - crawled parser tests continue to pass.
   - idempotent import upserts update rather than duplicate records.

### Error Handling
1. PostgreSQL connection failures in DB mode must throw/log clear errors that mention missing/unreachable `DATABASE_URL`, not native binding or SQLite errors.
2. Mock mode must remain operational without PostgreSQL installed, configured, or reachable.
3. Migration failures must stop the process and identify the migration/table/SQL phase that failed.
4. Import should report counts for parsed pages, inserted/updated/skipped records, copied/skipped assets, and should not delete existing public images.
5. API routes must preserve existing error response conventions and must not leak stack traces, local paths, or secrets.

## ACCEPTANCE CRITERIA
- Given `better-sqlite3` is removed from `package.json`, When `pnpm install` is run on Windows without Visual Studio Build Tools, Then install succeeds without native SQLite build errors.
- Given `USE_MOCK_DATA=true` and no `DATABASE_URL`, When public pages `/vi/jobs`, `/vi/news`, and `/vi/about` render, Then they use mock data and do not initialize PostgreSQL.
- Given `USE_MOCK_DATA=false` and a valid PostgreSQL `DATABASE_URL`, When migrations run, Then all required tables, indexes, constraints, and migration records are created successfully.
- Given crawled markdown/image files exist, When the PostgreSQL import/seed command runs twice, Then the second run does not duplicate rows and reports idempotent upsert behavior.
- Given imported content exists in PostgreSQL, When `/vi/news`, `/vi/news/[slug]`, `/vi/about`, and jobs pages render in DB mode, Then they read PostgreSQL data and preserve the existing UI layout.
- Given PostgreSQL is unavailable in DB mode, When a DB-backed page/API route loads, Then the failure is explicit and not masked by mock fallback.
- Given implementation is complete, When `pnpm exec vitest run tests/import-crawled-data.spec.ts`, `pnpm run type-check`, and `pnpm run build` are executed, Then all pass.
- Given the dependency cleanup is complete, When searching the codebase, Then no runtime imports of `better-sqlite3`, SQLite pragmas, `.data/sqlite.db`, `INSERT OR IGNORE`, or `INSERT OR REPLACE` remain outside historical plan/docs if intentionally retained.

## CONSTRAINTS
- DO NOT: Keep SQLite as an active runtime fallback.
- DO NOT: Keep `better-sqlite3` or `@types/better-sqlite3` in app dependencies after migration.
- DO NOT: Change public/CMS UI design, layout, copy, colors, or route structure.
- DO NOT: Remove mock mode; `USE_MOCK_DATA=true` must stay database-independent.
- DO NOT: Store absolute local filesystem paths in DB or browser-facing fields.
- DO NOT: Delete existing crawled source files or `public/images` assets as part of migration.
- DO NOT: Use string concatenation/interpolation for SQL values.
- REUSE: Existing repository method contracts and TypeScript entity types where compatible.
- REUSE: TIP-020 crawl parser tests and parser helpers.
- REUSE: Existing Next.js route handlers/pages and update only their data access if needed.
- SKIP: UI redesign, new CMS features, multi-tenant SaaS permissions, email notifications, and production deployment automation beyond environment docs.

## QUALITY GATE: SELF-REVIEW
- [x] TIP is self-contained and names concrete files to modify/remove.
- [x] TIP explains why SQLite is being removed and PostgreSQL restored as target runtime.
- [x] Acceptance criteria cover dependency removal, mock isolation, PostgreSQL migrations, idempotent crawled import, public rendering, and build/test gates.
- [x] Constraints prevent UI redesign, silent fallback, SQL injection, and destructive asset/data deletion.
- [x] Applicable database/domain/CMS standards are cross-referenced.
- Gaps: Exact PostgreSQL host/provider is intentionally not fixed; builder may use Supabase Postgres, Neon, local Docker Postgres, or another PostgreSQL-compatible `DATABASE_URL` as long as runtime code uses standard PostgreSQL semantics and docs state setup steps.
