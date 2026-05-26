# tip-P2-001 — PostgreSQL Runtime + Migrations

## Goal

Replace SQLite connection/migration internals with PostgreSQL-compatible server-only runtime infrastructure.

## Instructions

1. Add PostgreSQL client dependency if required.
2. Replace DB connection with a `DATABASE_URL`-driven PostgreSQL module.
3. Convert migration DDL to PostgreSQL.
4. Add a migration ledger and idempotent migration runner.
5. Update `.env.example` with PostgreSQL and mock-mode semantics.

## Acceptance

- Missing `DATABASE_URL` fails clearly in DB mode.
- Migration SQL has no SQLite-only syntax.
- Migration runner is idempotent by design and test evidence.
