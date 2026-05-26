# Spec — PostgreSQL Runtime and Migrations

## Requirement Mapping

- TIP-022 Business Rules: 1, 2, 3, 5, 8
- TIP-022 Validation: 1, 3
- TIP-022 Acceptance: PostgreSQL migrations run; DB mode fails clearly without valid `DATABASE_URL`; no SQLite runtime remains.

## Given / When / Then

### Scenario 1: DB mode requires DATABASE_URL

Given `USE_MOCK_DATA=false` and `DATABASE_URL` is not configured  
When a DB-backed repository or migration runner is initialized  
Then it throws a clear setup error mentioning `DATABASE_URL` and PostgreSQL configuration  
And it does not fall back to mock data.

### Scenario 2: PostgreSQL migrations are PostgreSQL syntax

Given the migration runner loads migration SQL  
When migration files/statements are inspected  
Then they use PostgreSQL-compatible DDL, `TIMESTAMPTZ`, constraints, indexes, and `ON CONFLICT` upserts  
And they do not contain SQLite-only pragmas, `DATETIME`, `INSERT OR IGNORE`, or `INSERT OR REPLACE`.

### Scenario 3: Migration ledger is idempotent

Given an empty PostgreSQL database  
When migrations run twice  
Then the second run skips previously applied migrations without duplicating schema objects  
And migration failures identify the migration/table/SQL phase.

## Red Test Shape

Add targeted tests that assert:

- `createDatabasePool` or equivalent validates `DATABASE_URL` in DB mode.
- Migration SQL inventory contains no SQLite-only syntax.
- Migration runner records applied migrations and is idempotent.

## Notes

Use a mocked `pg` pool for SQL-shape tests if a live PostgreSQL test database is unavailable. Live DB tests can be gated by an explicit test database environment variable.
