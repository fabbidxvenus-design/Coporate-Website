# TIP-P1-001: Schema Contract and Seed Source Map

**Agent:** database architect
**Model:** opus
**File ownership:** `coding-packs/plans/tip-023-postgres-schema-seed-from-mockdata/.zflow/schema-contract.md`, read-only audit of `lib/db/**`, `lib/mock-data*`, `coding-packs/crawlings/**`
**Blocked by:** none

## Acceptance criteria
- [ ] Every repository field has a PostgreSQL schema mapping.
- [ ] Every seeded table has a source file, conflict key, and deterministic ID/slug/key strategy.
- [ ] Schema gaps are documented before DDL implementation.

## Context
[CORE] TIP-023 requires durable PostgreSQL schema/seed design from mock/crawled data while preserving repository contracts and mock isolation.

## Implementation Notes
Read current types and repositories first. Do not write functional code in this TIP; produce the schema contract and seed map artifact only.
