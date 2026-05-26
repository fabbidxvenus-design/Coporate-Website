# Phase 02 — PostgreSQL Runtime + Migrations

## Objective

Replace SQLite connection and migration internals with PostgreSQL-compatible runtime infrastructure.

## Inputs

- Phase 01 inventory and Red Gate tests.
- `lib/db/connection.ts`
- `lib/db/migrate.ts`
- `lib/db/init.ts`
- `.env.example`
- `package.json`

## Tasks

1. Add PostgreSQL client dependency if not present.
2. Replace `lib/db/connection.ts` with a server-only PostgreSQL pool/client module using `DATABASE_URL`.
3. Validate `DATABASE_URL` only in DB mode or migration/import command paths.
4. Replace SQLite migration DDL with PostgreSQL DDL:
   - `TIMESTAMPTZ` timestamps.
   - PostgreSQL-compatible defaults.
   - Unique constraints and indexes.
   - JSON arrays as `JSONB` or text JSON with explicit parsing.
   - Migration ledger table.
5. Update `lib/db/init.ts` to run PostgreSQL migrations/seeds in DB mode without touching DB in mock mode.
6. Document `DATABASE_URL` and `USE_MOCK_DATA` in `.env.example`.
7. Run the Phase 02 targeted tests.

## Exit Gate

- PostgreSQL connection setup validates missing `DATABASE_URL` clearly.
- Migration SQL contains no SQLite-only syntax.
- Migration runner is idempotent by design.
- No UI or route files are changed in this phase unless required to compile against the new runtime API.

## Handoff

Proceed to Phase 03 with the PostgreSQL connection/migration layer in place, even if repositories still need migration.
