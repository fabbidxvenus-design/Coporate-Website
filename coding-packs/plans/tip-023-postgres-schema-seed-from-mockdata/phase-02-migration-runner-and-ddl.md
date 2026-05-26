# Phase 02 — Migration Runner and PostgreSQL DDL

## Objective
[CORE] Implement idempotent PostgreSQL migrations and package scripts required by TIP-023.

## Inputs
- Phase 01 schema contract.
- Current `lib/db` connection/migration files after TIP-022.
- `package.json` script conventions.

## Tasks
1. [CORE] Create or update PostgreSQL migration runner with migration tracking table.
2. [CORE] Add PostgreSQL DDL for required tables:
   - jobs
   - news_articles
   - applications
   - contact_submissions
   - site_settings
   - about_content
   - admin_users
   - admin_sessions
   - optional cms_activities/admin_activity_log if approved in schema contract
   - optional media_assets if approved in schema contract
3. [SAFETY] Use PostgreSQL syntax only: `TIMESTAMPTZ`, `JSONB`, `ON CONFLICT`, check constraints, indexes.
4. [CORE] Add `pnpm db:migrate` script if missing.
5. [VALIDATION] Validate `DATABASE_URL` before running migrations with a clear setup error.

## Deliverables
- PostgreSQL migration files or migration SQL module.
- Migration runner script/module.
- `package.json` script update for `db:migrate`.
- `.env.example` update if `DATABASE_URL`/seed variables are incomplete.

## Acceptance Criteria
- Given `DATABASE_URL` is missing When `pnpm db:migrate` runs Then it fails with a clear setup message.
- Given a valid PostgreSQL database When `pnpm db:migrate` runs Then all required tables, indexes, constraints, and migration records are created.
- Given migrations are run twice When checking migration tracking Then already-applied migrations are skipped without DDL duplication errors.
- Given the codebase is searched Then no new SQLite pragma, `INSERT OR IGNORE`, `INSERT OR REPLACE`, or `.data/sqlite.db` runtime dependency is introduced.

## Verification
- Red test first: migration config/DDL tests should fail before implementation.
- Green gate: migration tests and type-check pass after implementation.
