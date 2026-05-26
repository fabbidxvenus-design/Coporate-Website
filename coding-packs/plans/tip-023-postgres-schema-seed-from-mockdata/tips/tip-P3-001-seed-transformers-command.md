# TIP-P3-001: Seed Transformers and Seed Command

**Agent:** TypeScript data implementer
**Model:** sonnet
**File ownership:** `lib/db/**`, `scripts/**`, `tests/**`, `package.json`
**Blocked by:** tip-P2-001-migration-runner-ddl

## Acceptance criteria
- [ ] Seed transformers produce deterministic repository-compatible rows.
- [ ] `pnpm db:seed` validates `DATABASE_URL` and reports per-entity counts.
- [ ] Running seed twice does not duplicate rows.
- [ ] Image paths are browser-safe and admin credentials are not plaintext.

## Context
[CORE] Convert existing mock/crawled data into PostgreSQL upsert rows without creating a second independent dataset.

## Implementation Notes
Prefer pure transformer functions with unit tests. Keep DB command thin: load env, validate, call transformers, execute parameterized upserts, print summary.
