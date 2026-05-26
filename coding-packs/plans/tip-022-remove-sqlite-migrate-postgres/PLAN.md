# PLAN — TIP-022 Remove SQLite Runtime and Migrate to PostgreSQL

## Source TIP

- TIP: `coding-packs/tips/TIP-022-remove-sqlite-migrate-postgres.md`
- Plan directory: `coding-packs/plans/tip-022-remove-sqlite-migrate-postgres`
- Mode: zflow plan-supervised
- Tier: THOROUGH

## Complexity Score

| Axis | Score | Evidence |
|---|---:|---|
| Scope | 25 | Replaces persistence/auth/data access across public pages, CMS, APIs, scripts, tests, and dependency manifests. |
| Coupling | 25 | Repository contracts are consumed by App Router pages, route handlers, admin CMS, import scripts, and tests. |
| Risk | 25 | Database migration, auth/session behavior, crawled import, and dependency removal are hard to reverse if done partially. |
| Total | 75 | THOROUGH tier. |

## Goals

1. Remove SQLite as an active runtime dependency.
2. Replace SQLite connection, migrations, repositories, seed/import scripts, and runtime assumptions with PostgreSQL-compatible equivalents.
3. Preserve existing public/CMS UI, route structure, locale routing, and repository method contracts.
4. Preserve `USE_MOCK_DATA=true` as database-independent mode.
5. Preserve TIP-020 crawled parser/import behavior, writing imported content into PostgreSQL idempotently.
6. Make DB mode explicit: missing or unreachable `DATABASE_URL` fails clearly and never silently falls back to mock data.

## Non-Goals

- No UI redesign, route redesign, or copy/color/layout changes.
- No SQLite fallback shim.
- No Supabase Auth rewrite unless explicitly selected during implementation.
- No destructive deletion of crawled sources or `public/images` assets.
- No production deployment automation beyond environment documentation.

## Evidence Inputs

Read before execution:

- `package.json`
- `.env.example`
- `lib/db/connection.ts`
- `lib/db/migrate.ts`
- `lib/db/init.ts`
- `lib/db/seed.ts`
- `lib/db/crawl-parser.ts`
- `lib/db/types.ts`
- `lib/db/repositories/*.ts`
- `scripts/import-crawled-data.mjs`
- `scripts/import-crawled-data-lib.mjs`
- `tests/import-crawled-data.spec.ts`
- `app/api/**/route.ts`
- `app/(public)/**/page.tsx`
- `app/[locale]/**/page.tsx`
- `middleware.ts`

## Phase Map

| Phase | File | Purpose | Exit Gate |
|---|---|---|---|
| 01 | `phase-01-inventory-red-gate.md` | SQLite inventory and failing specs/tests. | Red Gate documented and failing for current runtime. |
| 02 | `phase-02-postgres-runtime-migrations.md` | PostgreSQL connection, migrations, setup validation. | Migration tests pass against PostgreSQL-compatible SQL expectations. |
| 03 | `phase-03-repositories-mock-boundary.md` | Migrate repositories and centralize mock-vs-DB semantics. | Public/API/CMS contracts preserved; mock mode opens no DB. |
| 04 | `phase-04-crawled-import-postgres.md` | Migrate crawled-data import/seed path to PostgreSQL idempotent upserts. | Import can run twice without duplicates. |
| 05 | `phase-05-dependency-cleanup-verification.md` | Remove SQLite deps/docs/runtime references and run verification. | Type-check/build/tests pass; no runtime SQLite references. |
| 06 | `phase-06-review-deslop-regress.md` | Separate review, security review, DESLOP, regression, final report. | Green Gate + verifier + final report complete. |

## Red Gate Specs

Create tests/specs before implementation:

- `specs/spec-postgres-runtime.md`
- `specs/spec-mock-boundary.md`
- `specs/spec-crawled-import-postgres.md`
- `specs/spec-dependency-cleanup.md`

Expected initial failure reasons:

- Current runtime imports `better-sqlite3`.
- Current DB mode uses SQLite-specific connection/migration APIs.
- Current import script writes to SQLite.
- Dependency manifests still include SQLite native dependency.

## Green Gate Commands

Run during verification:

```text
pnpm exec vitest run tests/import-crawled-data.spec.ts
pnpm run type-check
pnpm run build
```

Add targeted tests during execution for PostgreSQL SQL generation, mock boundary isolation, and idempotent import behavior.

## Implementation Order

1. Inventory all SQLite runtime imports, SQL syntax, `.data/sqlite.db` references, and dependency manifest entries.
2. Write Red Gate specs/tests.
3. Add PostgreSQL server-only connection module and migration runner.
4. Port schema from SQLite DDL to PostgreSQL DDL.
5. Port repositories to async parameterized PostgreSQL queries while preserving return shapes.
6. Centralize `USE_MOCK_DATA` semantics so mock mode never imports/opens the DB module during normal rendering.
7. Port crawled-data import to PostgreSQL idempotent upserts.
8. Remove `better-sqlite3`, `@types/better-sqlite3`, SQLite runtime docs/config, and `.data` runtime assumptions.
9. Run verification, review, security audit, and final regressions.

## Risk Controls

- Keep each repository migration behaviorally equivalent to the existing repository contract.
- Use parameter placeholders for every user/crawled/imported value.
- Keep crawled image destinations browser-safe (`/images/<filename>` only).
- Do not delete existing images; copy only missing/updated assets non-destructively.
- Do not catch PostgreSQL failures and substitute mock data in DB mode.
- Do not introduce UI changes while changing data internals.

## Completion Definition

TIP-022 is complete when:

- PostgreSQL migrations/imports are implemented and documented.
- Mock mode renders without `DATABASE_URL` and without DB initialization.
- DB mode uses PostgreSQL and fails clearly if `DATABASE_URL` is missing/unreachable.
- Crawled import is idempotent.
- No active runtime SQLite dependency or import remains.
- Required tests, type-check, and build pass.
- Separate verifier review reports no CRITICAL or HIGH blockers.
