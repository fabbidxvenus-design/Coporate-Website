# Phase 05 — Dependency Cleanup + Verification

## Objective

Remove SQLite runtime dependency residue and verify TIP-022 acceptance criteria with automated checks.

## Inputs

- Phase 02-04 implementation.
- `package.json`
- `package-lock.json`
- `pnpm-lock.yaml`
- `.env.example`
- Active source files under `lib/`, `app/`, `scripts/`, and `tests/`.

## Tasks

1. Remove `better-sqlite3` and `@types/better-sqlite3` from dependency manifests.
2. Regenerate lockfiles using the project package manager.
3. Remove active runtime references to SQLite-only files/configuration.
4. Update `.env.example` to show PostgreSQL setup and mock-mode semantics.
5. Search active runtime source for forbidden residue:
   - `better-sqlite3`
   - `.data/sqlite.db`
   - `journal_mode`
   - `foreign_keys = ON`
   - `INSERT OR IGNORE`
   - `INSERT OR REPLACE`
   - SQLite-only `DATETIME` DDL
6. Run verification commands:

```text
pnpm exec vitest run tests/import-crawled-data.spec.ts
pnpm run type-check
pnpm run build
```

7. If build/type-check fails, use the build resolver workflow and fix minimally.

## Exit Gate

- No active runtime SQLite dependency remains.
- Mock mode works without `DATABASE_URL` by test/static evidence.
- Type-check and build pass.
- Parser/import tests pass.
- Dependency cleanup is reflected in lockfiles.

## Handoff

Proceed to Phase 06 for independent reviews, DESLOP, regression, and final report.
