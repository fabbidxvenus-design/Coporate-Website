# SPEC: PostgreSQL Migrations

## AC-01: Missing DATABASE_URL fails clearly
- Given: `USE_MOCK_DATA=false` and `DATABASE_URL` is missing
- When: `pnpm db:migrate` is executed
- Then: migration exits non-zero with a setup message mentioning `DATABASE_URL`

## AC-02: Required tables and indexes are created
- Given: a valid PostgreSQL database
- When: migrations run successfully
- Then: jobs, news_articles, applications, contact_submissions, site_settings, about_content, admin_users, admin_sessions, and migration tracking tables exist with required indexes and constraints

## AC-03: Migrations are idempotent
- Given: migrations have already been applied
- When: `pnpm db:migrate` is executed again
- Then: already-applied migrations are skipped and no duplicate-object DDL error occurs

## AC-04: PostgreSQL-only syntax
- Given: runtime migration/seed files are searched
- When: checking prohibited SQLite patterns
- Then: no SQLite pragma, `.data/sqlite.db`, `INSERT OR IGNORE`, `INSERT OR REPLACE`, or active `better-sqlite3` import appears in runtime DB code
