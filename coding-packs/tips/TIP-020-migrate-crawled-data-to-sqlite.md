# TIP-020: Migrate Crawled Data to SQLite

## HEADER
- TIP-ID: TIP-020
- Project: Corporate Website
- Module: SQLite Content Seeding / Crawled Data Migration
- Priority: P0
- Depends on: TIP-019
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` is outdated for persistence because the runtime has been migrated from Supabase to SQLite in TIP-019. Current implementation uses Next.js App Router, TypeScript, Tailwind CSS, SQLite via `better-sqlite3`, local `.data/`, and repository modules under `lib/db/repositories/`.
- Key files to read first:
  - `lib/db/migrate.ts`
  - `lib/db/seed.ts`
  - `lib/db/init.ts`
  - `lib/db/types.ts`
  - `lib/db/repositories/jobs.ts`
  - `lib/db/repositories/news.ts`
  - `lib/db/repositories/about.ts`
  - `coding-packs/crawlings/crawled_all_pages.md`
  - `coding-packs/crawlings/crawled_with_images.md`
  - `coding-packs/crawlings/images/`
- Patterns to follow:
  - Existing SQLite migration style in `lib/db/migrate.ts`.
  - Existing repository/data shape in `lib/db/types.ts`.
  - Public published-only visibility rule from `jobsRepository.findAllPublished()` and `newsRepository.findAllPublished()`.
  - Existing local image URL convention: use `/images/<filename>` for public assets.

## APPLICABLE STANDARDS
Builder MUST conform where compatible with the current SQLite runtime:
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — jobs, applications, news content model rules and published-only public visibility.
- [database/supabase-saas](../standards/database/supabase-saas.md) — legacy database baseline; apply only the generic data-safety intent, not Supabase/RLS/storage implementation details because TIP-019 replaced Supabase with SQLite.

## TASK
Build a complete, repeatable migration path from the crawled Fabbi content files and crawled image directory into the local SQLite database under `.data/`. The result must let the site run with `USE_MOCK_DATA=false` and render crawled jobs/news/about content from SQLite, while `USE_MOCK_DATA=true` remains mock-only behavior.

## SPECIFICATIONS
### Business Rules
1. Add a project script that imports crawled content into SQLite, for example `scripts/import-crawled-data.ts` or `scripts/import-crawled-data.mjs`.
2. The script MUST read these exact inputs:
   - `coding-packs/crawlings/crawled_all_pages.md`
   - `coding-packs/crawlings/crawled_with_images.md`
   - `coding-packs/crawlings/images/`
3. The script MUST write to the active SQLite database path used by `lib/db/connection.ts` (`process.env.SQLITE_DB_PATH || '.data/sqlite.db'`).
4. The script MUST run existing migrations before importing content so a fresh checkout can populate `.data/sqlite.db` in one command.
5. Import at minimum:
   - Jobs into `jobs` with title, slug, department, location, employment type, salary/range when inferable, skills/tags, description, requirements, benefits, status, `published_at`, and timestamps.
   - News into `news_articles` with title, slug, excerpt, content/body, thumbnail image, category/tags, author, status, `published_at`, and timestamps.
   - About/company content into `about_content` where the crawled sources contain suitable company/about sections.
   - Site/contact settings into `site_settings` where the crawled sources contain email, phone, address, social links, company name, or slogan.
6. Copy crawled images from `coding-packs/crawlings/images/` into `public/images/` without destroying existing assets.
7. Map imported image references in SQLite to browser-safe URLs (`/images/<filename>`), not absolute local filesystem paths.
8. Import must be idempotent: repeated runs update/replace deterministic records by slug/key/locale instead of duplicating rows.
9. Preserve `USE_MOCK_DATA=true` behavior: do not make mock mode read from SQLite. Only DB mode (`USE_MOCK_DATA=false`) should depend on imported `.data` content.
10. If crawled content cannot be perfectly classified, prefer logging a skipped record with reason over inserting malformed or misleading data.

### Validation
1. Validate required fields before insertion:
   - Job: `title`, `slug`, `description`, `status`.
   - News: `title`, `slug`, `content`, `excerpt`, `status`.
   - About: `locale`, hero/title/body fields needed by the current repository/page contract.
2. Generate stable slugs from headings when the crawl lacks explicit slugs.
3. Normalize statuses to existing SQLite unions:
   - Jobs: `draft | review | published | closed | archived`.
   - News: `draft | published`.
4. Normalize arrays (`skills`, `tags`, `values`, `team_members`, `stats`) as JSON strings matching existing repository parse behavior.
5. Validate copied image extensions and skip non-image files.
6. Validate that imported public image URLs resolve to files under `public/images/`.

### Error Handling
1. Print a clear import summary: inserted, updated, skipped, and failed counts per entity type.
2. For each skipped/failed record, include enough context to identify the source section and reason.
3. Fail the command if required source files are missing.
4. Do not fail the whole import for one malformed optional record; continue and report the issue.
5. If SQLite native bindings are unavailable, show an actionable message to run `pnpm approve-builds` and reinstall/build dependencies.

## ACCEPTANCE CRITERIA
- Given a fresh checkout and crawled source files, When the import script is run, Then `.data/sqlite.db` exists and contains imported jobs, news, about content, settings, and migrations.
- Given the import script has already run once, When it is run again, Then row counts remain stable for deterministic crawled records and existing records are updated rather than duplicated.
- Given crawled images exist, When the import script is run, Then valid image files exist under `public/images/` and SQLite content references use `/images/<filename>` URLs.
- Given `USE_MOCK_DATA=true`, When the public site is loaded, Then public pages continue using mock data and do not require SQLite imported data.
- Given `USE_MOCK_DATA=false`, When `/vi/jobs`, `/vi/news`, `/vi/about`, job detail, and news detail are loaded, Then they render imported SQLite content from `.data/sqlite.db`.
- Given invalid or unclassifiable crawl sections, When the import script is run, Then those sections are skipped with logged reasons and the import summary reports them.
- Given the implementation is complete, When `pnpm run type-check` and `pnpm run build` are executed, Then both pass.

## CONSTRAINTS
- DO NOT: Reintroduce Supabase runtime dependencies or Supabase environment variables.
- DO NOT: Change admin auth/session behavior while importing crawled content.
- DO NOT: Delete existing files from `public/images/` or `.data/` without explicit user approval.
- DO NOT: Store absolute Windows paths in SQLite fields used by the browser.
- REUSE: Existing SQLite connection, migration, seed, repository, and type patterns under `lib/db/`.
- REUSE: Current public image convention and existing public/CMS page contracts.
- SKIP: Email sending, third-party storage, advanced AI extraction, and CMS UI redesign are out of scope.

## QUALITY GATE: SELF-REVIEW
- [x] TIP is self-contained and names exact source paths.
- [x] TIP specifies files/patterns to reuse and constraints to avoid Supabase regression.
- [x] Acceptance criteria cover fresh import, idempotency, image copying, mock-vs-db flag behavior, visible public pages, and build/type-check.
- [x] Applicable standards were cross-referenced; Supabase-specific standard is explicitly marked legacy/incompatible where appropriate.
- Gaps: The exact crawl markdown structure must be inspected during implementation before final parser decisions; this is intentionally assigned to the builder because the TIP names the source files and required outputs.
