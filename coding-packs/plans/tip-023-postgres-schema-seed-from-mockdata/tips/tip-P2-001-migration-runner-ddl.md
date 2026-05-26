# TIP-P2-001: PostgreSQL Migration Runner and DDL

**Agent:** database implementer
**Model:** sonnet
**File ownership:** `lib/db/**`, `scripts/**`, `package.json`, `.env.example`, tests for migrations
**Blocked by:** tip-P1-001-schema-contract

## Acceptance criteria
- [ ] `pnpm db:migrate` exists and validates `DATABASE_URL`.
- [ ] PostgreSQL DDL creates required tables/indexes/constraints and migration tracking.
- [ ] Running migrations twice is safe.
- [ ] No SQLite runtime syntax or native SQLite dependency is introduced.

## Context
[CORE] Implement the schema contract from Phase 01 using PostgreSQL-compatible migrations only.

## Implementation Notes
Use parameterized execution where dynamic values exist. Keep DDL explicit and readable. Do not run migrations during app render.
