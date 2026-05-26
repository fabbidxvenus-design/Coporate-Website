# TIP-023: PostgreSQL Schema Migration and Seed from Mock Data

## HEADER
- TIP-ID: TIP-023
- Project: Corporate Website
- Module: Database schema / mock data seed migration
- Priority: P0
- Depends on: TIP-021, TIP-022
- Estimated: L

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: Next.js App Router, TypeScript, Tailwind CSS, repository-pattern data access, PostgreSQL via `DATABASE_URL`, and strict `USE_MOCK_DATA` mock/database isolation.
- Key files to read first:
  - `package.json` — scripts and database dependency state after TIP-022.
  - `.env.example` — required PostgreSQL and mock-mode configuration.
  - `lib/config/data-source.ts` — call-time `USE_MOCK_DATA` boundary from TIP-021.
  - `lib/mock-data.ts` and/or `lib/mock-data/**` — authoritative mock data source for jobs, news, about, settings, applications-like fixtures, and CMS-related content.
  - `coding-packs/crawlings/crawled_all_pages.md` — authoritative crawled Fabbi content source.
  - `coding-packs/crawlings/content_image_mapping.json` — local image mapping source.
  - `lib/db/types.ts` — entity type contracts used by repositories/pages.
  - `lib/db/repositories/jobs.ts`, `news.ts`, `about.ts`, `applications.ts`, `contact.ts`, `settings.ts`, `admin-auth.ts` — repository return shapes and JSON field parsing rules.
  - `scripts/import-crawled-data.mjs` and `scripts/import-crawled-data-lib.mjs` if still present — parser/import behavior from TIP-020/TIP-022.
  - `tests/data-source-boundary.spec.ts` and `tests/import-crawled-data.spec.ts` — regression coverage to preserve.
- Patterns to follow:
  - Keep mock data as the local source of truth for seed content; database seed is generated from it, not a second hand-written dataset.
  - Keep repository contracts stable so public/CMS pages do not need redesign.
  - Use idempotent PostgreSQL migrations and seed upserts.
  - Use parameterized SQL only.

## APPLICABLE STANDARDS
Builder MUST conform:
- [database/supabase-saas](../standards/database/supabase-saas.md) — PostgreSQL/Supabase schema, RLS-ready structure, environment documentation, public reads and admin write protection.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — jobs, applications, news, and recruitment-domain content behavior.
- [cms/admin-shell](../standards/cms/admin-shell.md) — CMS mutation feedback, protected workflow, and admin data visibility.

## TASK
Design and implement PostgreSQL migrations plus a repeatable seed pipeline that converts the existing mock/crawled data into durable PostgreSQL records. The result must let `USE_MOCK_DATA=false` run from PostgreSQL with realistic jobs, news, about/company content, settings, applications/contact seed records where appropriate, and admin auth/session seed data without breaking `USE_MOCK_DATA=true` mock-only mode.

## SPECIFICATIONS

### Business Rules
1. Treat current mock data and crawled content as sufficiently complete for initial database seeding, but normalize it into PostgreSQL tables rather than copying arbitrary JSON blobs everywhere.
2. Seed data must be generated from existing project-owned sources:
   - `lib/mock-data.ts` / `lib/mock-data/**` for app-ready mock records.
   - `coding-packs/crawlings/crawled_all_pages.md` for rich corporate content when mock data lacks detail.
   - `coding-packs/crawlings/content_image_mapping.json` for browser-safe image paths.
3. Create or update PostgreSQL migrations for all runtime entities needed by public and CMS flows:
   - `jobs`
   - `news_articles`
   - `applications`
   - `contact_submissions`
   - `site_settings`
   - `about_content` or equivalent company/about page content table
   - `admin_users`
   - `admin_sessions`
   - optional `cms_activities` / `admin_activity_log` if TIP-024 activity data is implemented or the schema is ready for it
   - optional `media_assets` if image metadata is consumed by CMS or public pages
4. Migration SQL must be PostgreSQL-compatible and idempotent through a migrations tracking table or equivalent migration runner.
5. Seed script must be repeatable:
   - Running it multiple times updates existing records by stable IDs/slugs/keys.
   - It must not duplicate jobs, news, settings, about content, admin users, or media records.
   - It must report inserted/updated/skipped counts per entity.
6. Preserve `USE_MOCK_DATA` semantics:
   - `USE_MOCK_DATA=true` must never require PostgreSQL, migrations, or seed execution during normal page/API rendering.
   - `USE_MOCK_DATA=false` must use PostgreSQL and fail clearly when `DATABASE_URL` or migrations are missing.
7. Use stable IDs where mock records already have IDs; otherwise derive deterministic IDs from slugs/keys.
8. Store JSON-like fields as `JSONB` where useful (`skills`, `tags`, localized payloads, metadata) or normalized columns where repositories already expect simple scalar fields.
9. Browser-facing image paths must be `/images/<filename>` or external HTTPS URLs already accepted by the app; do not store absolute Windows paths.
10. If the project has moved fully away from Supabase client usage, use standard PostgreSQL tables and `DATABASE_URL`; do not reintroduce Supabase-only runtime requirements unless the existing code already depends on them.

### Database Design Requirements
1. Define table columns to match repository and page needs, including stable timestamps:
   - `id TEXT PRIMARY KEY` or `UUID PRIMARY KEY` with deterministic seed IDs where appropriate.
   - `slug TEXT UNIQUE NOT NULL` for public detail entities.
   - `status TEXT NOT NULL` with check constraints for publish/workflow states.
   - `created_at TIMESTAMPTZ NOT NULL DEFAULT now()` and `updated_at TIMESTAMPTZ NOT NULL DEFAULT now()`.
   - `published_at TIMESTAMPTZ` for public visibility entities.
2. Required job fields should cover current `JobCard` and CMS needs:
   - title, slug, description, requirements, benefits, location, employment type, salary min/max/currency, skills, status, published_at.
3. Required news fields should cover current `NewsCard`, list/detail, and CMS needs:
   - title, slug, content/body, excerpt, thumbnail_url, author_name, author_role, tags, category, status, views, published_at.
4. Required about/company fields should support bilingual corporate content without hardcoded page-only values.
5. Required settings fields should support key/value or typed settings records used by the public footer/header/contact/company metadata.
6. Required applications/contact fields must preserve existing validation and admin list/detail workflows.
7. Admin auth tables may be simple local admin tables if TIP-022 kept local auth; if Supabase Auth is restored, document which local admin/session tables are skipped.
8. Add useful indexes for public queries:
   - published jobs by `published_at DESC`.
   - published news by `published_at DESC`.
   - slug lookup indexes for jobs/news.
   - status filters for CMS lists.
   - application status/created_at filters.

### Seed Script Requirements
1. Add scripts such as:
   - `pnpm db:migrate`
   - `pnpm db:seed`
   - `pnpm db:reset` only if safe and clearly documented; do not make destructive reset the default.
2. Seed script must load environment variables consistently with the app runtime.
3. Seed script must use parameterized SQL or a safe query helper for every insert/upsert.
4. Seed script must transform mock/crawled data into repository-compatible database rows.
5. Seed script must hash/admin password values using the existing admin-auth hashing approach or a stronger project-approved replacement; never store plain-text admin passwords.
6. Seed script must not overwrite user-created production content unless explicitly run with a documented development flag. Default seed should upsert only known seed IDs/keys.
7. Add a dry-run or summary mode if practical, at minimum print clear counts before exit.

### Validation
1. Validate `DATABASE_URL` before migrations/seeds run and fail with a clear setup message if missing.
2. Validate seed records before writing:
   - required ID/slug/title fields exist.
   - status values are within known unions.
   - JSON fields are arrays/objects as expected.
   - image paths are browser-safe.
3. Validate migrations are PostgreSQL syntax only:
   - no SQLite pragmas.
   - no `INSERT OR IGNORE` / `INSERT OR REPLACE`.
   - no SQLite-only `DATETIME` assumptions.
4. Validate imported dates are valid ISO timestamps or deterministically defaulted.
5. Add tests for seed transformation functions independent of a live database where possible.
6. Add database integration tests only if the project already has a test PostgreSQL setup; otherwise document the manual verification command and keep unit tests around SQL/transform behavior.

### Error Handling
1. Migration failure must identify the migration file/name and stop immediately.
2. Seed failure must identify the entity type and seed record ID/slug/key that failed.
3. Database connection failures must mention missing/unreachable PostgreSQL configuration, not SQLite/native binding errors.
4. Public/API routes in DB mode must not silently fall back to mock data.
5. Mock mode must remain usable even when PostgreSQL is not installed, configured, or reachable.
6. API responses must not leak stack traces, local filesystem paths, or secrets.

## ACCEPTANCE CRITERIA
- Given `USE_MOCK_DATA=true` and no `DATABASE_URL` When `/vi`, `/vi/jobs`, `/vi/news`, and `/vi/about` render Then they use mock data and no PostgreSQL connection is attempted.
- Given `USE_MOCK_DATA=false` and a valid PostgreSQL `DATABASE_URL` When `pnpm db:migrate` runs Then all required tables, indexes, constraints, and migration tracking records are created successfully.
- Given migrations have run When `pnpm db:seed` runs Then jobs, news, about/company content, settings, and admin seed data are inserted or updated from mock/crawled sources.
- Given `pnpm db:seed` is run twice When row counts are checked Then the second run does not duplicate seeded rows and reports idempotent upsert behavior.
- Given seeded PostgreSQL data exists When public pages render in DB mode Then featured jobs, latest news, about/company content, and settings-backed UI use PostgreSQL records while preserving existing layout.
- Given a seeded news/job record has a slug When the public detail route loads Then repository lookup by slug returns the database row with parsed JSON fields matching TypeScript types.
- Given a seed image path is stored When rendered in the browser Then the path is `/images/<filename>` or an allowed HTTPS URL, never an absolute local path.
- Given database mode is selected but migrations are missing When a DB-backed repository runs Then the error is explicit and not masked by mock fallback.
- Given implementation is complete When `pnpm run type-check`, relevant unit tests, and seed transformation tests run Then they pass.
- Given the codebase is searched after completion Then no active SQLite seed/migration syntax remains in runtime DB scripts.

## CONSTRAINTS
- DO NOT: Create a new independent seed dataset that drifts from existing mock/crawled content.
- DO NOT: Reintroduce SQLite, `better-sqlite3`, `.data/sqlite.db`, SQLite pragmas, or SQLite insert syntax.
- DO NOT: Use SQL string interpolation for seed values or user/crawled content.
- DO NOT: Make normal app rendering run migrations or seed scripts automatically.
- DO NOT: Change public/CMS visual design, layout, colors, or route structure while implementing database seed work.
- DO NOT: Store plain-text admin passwords or secrets in source code.
- DO NOT: Store absolute Windows paths in PostgreSQL or public-facing data.
- DO NOT: Delete existing public images or crawled source files during seed.
- REUSE: existing mock data, crawled parser behavior, repository contracts, `parseJson` helpers, data-source flag helpers, admin auth hashing/session patterns, and API response conventions.
- REUSE: TIP-021 mock isolation and TIP-022 PostgreSQL runtime decisions.
- SKIP: production backup/restore automation, cloud deployment setup, multi-tenant permissions, email notifications, and full CMS redesign.

## QUALITY GATE: SELF-REVIEW
- Completeness: PASS — TIP includes concrete context, schema scope, seed source rules, migration requirements, validation, error handling, acceptance criteria, and constraints.
- Cross-reference: PASS — aligns with TIP-021 mock isolation, TIP-022 PostgreSQL migration, and TIP-024 CMS database usage direction.
- Implementation clarity: PASS — names concrete files/sources and expected scripts without requiring follow-up questions.
- Safety: PASS — blocks SQLite reintroduction, SQL injection, plain-text passwords, destructive resets, and silent DB-to-mock fallback.
- Gap declared: Exact current mock-data file split and final PostgreSQL client (`pg` direct vs Supabase-compatible connection) must be confirmed by the builder from current code before implementation, but this TIP constrains behavior and outputs regardless of client choice.
- Verdict: PASS — ready for Claude Code implementation.
