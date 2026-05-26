# TIP-022 Plan Directory

This plan implements `coding-packs/tips/TIP-022-remove-sqlite-migrate-postgres.md` in zflow plan-supervised mode.

## Execute

```text
/zflow --plan D:\WORKSPACE\CODE\Coporate_Website\coding-packs\plans\tip-022-remove-sqlite-migrate-postgres --quality=max --effort=high
```

## Scope

Remove the active SQLite runtime and migrate persistence to PostgreSQL through `DATABASE_URL`, while preserving existing public routes, CMS routes, repository contracts, crawled-data import behavior, and `USE_MOCK_DATA=true` database isolation.

This directory is planning-only. Runtime code changes happen only during execution of the phase files.

## Phases

1. Inventory + Red Gate
2. PostgreSQL Runtime + Migrations
3. Repository Migration + Mock Boundary
4. Crawled Data Import to PostgreSQL
5. Dependency Cleanup + Verification
6. Review / DESLOP / Regress

## Hard Gates

- Red Gate before implementation: PostgreSQL/migration/boundary specs must exist and fail against current SQLite runtime.
- Mock mode must not initialize PostgreSQL or require `DATABASE_URL`.
- DB mode must fail clearly when `DATABASE_URL` is missing or unreachable.
- No SQLite runtime fallback may remain.
- `better-sqlite3` and `@types/better-sqlite3` must be removed from dependency manifests.
- Parameterized SQL only.
- Separate verifier required before completion.
