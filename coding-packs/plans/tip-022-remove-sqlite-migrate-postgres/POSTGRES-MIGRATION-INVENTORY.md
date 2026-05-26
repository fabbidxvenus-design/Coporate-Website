# PostgreSQL Migration Inventory — TIP-022

## Purpose

Track every SQLite/runtime surface that must be replaced or verified during TIP-022 execution.

## Runtime Modules

| Area | Current SQLite surface | PostgreSQL target | Status |
|---|---|---|---|
| Connection | `lib/db/connection.ts`: `better-sqlite3`, `.data/sqlite.db`, `WAL` mode, `foreign_keys` | Server-only PostgreSQL pool/client from `DATABASE_URL` | Identified |
| Migrations | `lib/db/migrate.ts` Sync `db.exec`, SQLite DDL | PostgreSQL DDL + async migration ledger | Identified |
| Seeding | `lib/db/seed.ts`: `INSERT OR IGNORE` | Parameterized PostgreSQL upserts (`ON CONFLICT`) | Identified |
| Tests | `tests/unit/sqlite-migration.test.ts` references `.data/sqlite.db` | PostgreSQL test-db or mocked pool | Identified |

## Repositories

| Repository | Must preserve | Migration notes | Status |
|---|---|---|---|
| `jobs.ts` | Published-only public reads; admin CRUD | Calls `getDb()` from `lib/db/connection.ts` | Identified |
| `news.ts` | Published-only reads; mock fallback; tags/thumbnail | Has existing `USE_MOCK_DATA` check, calls `getDb()` in DB mode | Identified |
| `about.ts` | Locale-specific about content | Likely calls repository or mock | Identified |
| `applications.ts` | Application create + admin list | Calls `getDb()` from connection | Identified |
| `contact.ts` | Contact submission persistence | Calls `getDb()` from connection | Identified |
| `settings.ts` | Settings read/write | Calls `getDb()` from connection | Identified |
| `admin-auth.ts` | Admin session behavior | Likely calls `getDb()` | Identified |

> All repositories depend transitively on `lib/db/connection.ts` via `getDb()`. After connection is replaced, repository SQL queries must be converted to PostgreSQL parameterized queries.

## Scripts and Tests

| File | Action | Status |
|---|---|---|
| `scripts/import-crawled-data.mjs` | Replace SQLite writes with PostgreSQL writes or wrap TypeScript implementation | Planned |
| `scripts/import-crawled-data-lib.mjs` | Preserve parser behavior or consolidate with `lib/db/crawl-parser.ts` | Planned |
| `tests/import-crawled-data.spec.ts` | Keep parser coverage passing | Planned |
| New PostgreSQL tests | Add SQL/runtime/mock-boundary/import idempotency coverage | Planned |

## Dependency and Config Cleanup

| Surface | Required action | Status |
|---|---|---|
| `package.json` | Remove `better-sqlite3`, `@types/better-sqlite3`; add PostgreSQL client dependency if needed | Planned |
| lockfiles | Regenerate after dependency changes | Planned |
| `.env.example` | Document `DATABASE_URL` and exact `USE_MOCK_DATA` semantics | Planned |
| Runtime references | Remove `.data/sqlite.db` and SQLite pragma assumptions from active code/docs | Planned |

## Forbidden Runtime Residue

Search should find no active runtime occurrences outside historical planning/docs:

- `better-sqlite3`
- `@types/better-sqlite3`
- `journal_mode`
- `foreign_keys = ON`
- `.data/sqlite.db`
- `INSERT OR IGNORE`
- `INSERT OR REPLACE`
- SQLite-only `DATETIME` DDL
