# PLAN: TIP-021 Separate Independent Data Flag Boundary

## INTAKE
- [CORE] Source TIP: `coding-packs/tips/TIP-021-separate-independent-data-flag.md`
- [CORE] Goal: enforce a strict data-source boundary so `USE_MOCK_DATA=true` uses only mock/crawled mock data and never opens, initializes, migrates, seeds, reads, or writes SQLite.
- [CORE] Active zflow mode: `--plan` supervised mode.
- [CORE] Plan directory: `coding-packs/plans/tip-021-separate-independent-data-flag/`
- [CORE] State scope: `coding-packs/plans/tip-021-separate-independent-data-flag/.zflow/`
- [CORE] TIP scope: `coding-packs/plans/tip-021-separate-independent-data-flag/tips/`
- [CORE] Active tier: THOROUGH
- [DECISION] Complexity score: 85
  - +15 database keyword/risk
  - +10 regression/debugging risk from current suspected mock/SQLite mixing
  - +10 file path count >3
  - +25 estimated subtasks
  - +15 cross-file dependencies
  - +5 test requirements
  - +20 system-wide public/API/CMS data-source impact
  - +5 moderate reversibility
  - Clamped to 85
- [DECISION] Use THOROUGH because this is a cross-cutting runtime boundary affecting public pages, API routes, admin/CMS behavior, tests, and database failure semantics.

## SOURCE OF TRUTH
- [CORE] Primary instruction: `coding-packs/tips/TIP-021-separate-independent-data-flag.md`
- [CORE] Upstream dependency: `coding-packs/tips/TIP-020-migrate-crawled-data-to-sqlite.md`
- [CORE] Current data/runtime files to inspect during execution:
  - `.env.example`
  - `.env.local` if present
  - `lib/db/connection.ts`
  - `lib/db/init.ts`
  - `lib/db/migrate.ts`
  - `lib/db/seed.ts`
  - `lib/db/repositories/jobs.ts`
  - `lib/db/repositories/news.ts`
  - `lib/db/repositories/about.ts`
  - `lib/mock-data.ts`
  - `lib/corporate-mock-data.ts` or current mock/crawled JSON data modules if present
  - `app/(public)/**/page.tsx`
  - `app/[locale]/**/page.tsx`
  - `app/api/**/route.ts`
  - `middleware.ts`
- [CORE] Verification commands:
  - `pnpm run test -- tests/data-source-boundary.spec.ts`
  - `pnpm run test`
  - `pnpm run type-check`
  - `pnpm run build`

## PHASES

### Phase 01 — SPEC / Red Gate
[CORE]
Create executable specs and red tests before implementation.

Tasks:
1. Use `specs/spec-data-source-boundary.md` as the behavioral source.
2. Add a failing test file before runtime changes, recommended path: `tests/data-source-boundary.spec.ts`.
3. Cover at minimum:
   - `USE_MOCK_DATA=true` resolves to mock-only mode.
   - `USE_MOCK_DATA=false` resolves to SQLite mode.
   - missing/invalid flag behavior is explicit and matches `.env.example`.
   - mock-mode public loaders do not call SQLite connection/init/migration/seed.
   - SQLite mode does not silently fallback to mock.
4. Red Gate command:
   - `pnpm run test -- tests/data-source-boundary.spec.ts`
5. Expected Red Gate result:
   - tests compile but fail because shared data-source helper and/or audited boundaries are not implemented yet.

Deliverables:
- `specs/spec-data-source-boundary.md`
- failing `tests/data-source-boundary.spec.ts`
- red gate output recorded in `.zflow/red-gate.md`

### Phase 02 — Data-Source Helper + Env Contract
[CORE]
Centralize `USE_MOCK_DATA` interpretation.

Tasks:
1. Create or reuse a server-only config module, preferred path: `lib/config/data-source.ts`.
2. Export explicit helpers such as `isMockDataMode()`, `isSqliteDataMode()`, and `getDataSourceMode()`.
3. Avoid stale module-level env constants that make tests order-dependent.
4. Update `.env.example` to document allowed values and the local-development recommendation.
5. Define missing/invalid behavior clearly and consistently.

Deliverables:
- shared data-source helper
- env contract docs in `.env.example`
- helper unit tests green

### Phase 03 — Public Loader Boundary Audit
[CORE]
Ensure public pages use mock loaders only in mock mode and SQLite loaders only in DB mode.

Tasks:
1. Audit public pages and loaders for jobs/news/about/home/contact data access.
2. Replace direct `process.env.USE_MOCK_DATA` checks with the shared helper.
3. Ensure mock mode does not import/call `getDb()`, `initializeDatabase()`, `runMigrations()`, or repository functions that open SQLite during normal render.
4. Ensure SQLite mode keeps TIP-020 imported-content behavior and does not fall back silently to mock.
5. Preserve all UI structure, copy, routing, and visual layout.

Deliverables:
- public routes obey strict mock-vs-SQLite boundary
- tests proving no SQLite calls in mock mode

### Phase 04 — API + CMS Boundary Audit
[CORE]
Apply the same boundary to API routes and admin/CMS paths.

Tasks:
1. Audit `app/api/**/route.ts` for jobs, news, about, contact, applications, settings, and dashboard data.
2. Audit CMS/admin loaders/actions if present.
3. Mock mode should use safe mock/no-op behavior where supported or explicit unsupported responses where that is the existing project convention.
4. SQLite mode should fail clearly on unavailable DB and must not mask failures with mock fallback.
5. Keep auth/session behavior unchanged.

Deliverables:
- API/CMS paths aligned with shared data-source helper
- no Supabase dependency reintroduced

### Phase 05 — VERIFY / Green Gate
[CORE]
Run verification with separate review.

Tasks:
1. Run targeted tests:
   - `pnpm run test -- tests/data-source-boundary.spec.ts`
2. Run regression checks:
   - `pnpm run test`
   - `pnpm run type-check`
   - `pnpm run build`
3. If public UI changed unexpectedly, start the dev server and smoke-check `/vi/jobs`, `/vi/news`, and `/vi/about`; otherwise record that TIP is non-visual and visual screenshot gate is not applicable.
4. Use a separate `code-reviewer` agent for verification before marking complete.

Deliverables:
- green test/build output
- separate verifier report under `.zflow/verify-report.md`

### Phase 06 — DESLOP / REGRESS / COMPLETE
[CORE]
Cleanup only, then rerun checks.

Tasks:
1. Remove temporary debug code or unused imports.
2. Do not change functional behavior during DESLOP.
3. Rerun targeted tests, full tests, type-check, and build.
4. Write `.zflow/final-report.md`.
5. Dispatch EVOLVE background agent and record `.zflow/evolve-report.md` when available.

Deliverables:
- clean implementation
- final report
- handoff state updated

## ACCEPTANCE COVERAGE MATRIX
| TIP AC | Phase | Evidence |
|---|---:|---|
| `USE_MOCK_DATA=true` renders public mock pages with no SQLite connection | 01, 03, 05 | behavioral test + verifier report |
| mock mode survives missing/locked/corrupt SQLite | 01, 03, 05 | test or documented smoke result |
| SQLite spy sees no `getDb()`/migration/seed in mock mode | 01, 03, 05 | targeted test output |
| `USE_MOCK_DATA=false` reads SQLite content | 03, 05 | targeted test or DB-mode smoke |
| SQLite mode fails explicitly when DB unavailable | 01, 04, 05 | behavioral test output |
| test/type-check/build pass | 05, 06 | command output in final report |

## RISKS AND MITIGATIONS
- Risk: module-level env constants make tests stale.
  - Mitigation: use functions or test-isolated module loading; document chosen pattern.
- Risk: static imports of SQLite repositories open DB before mode branching.
  - Mitigation: move DB imports behind SQLite-only functions or split loaders by source.
- Risk: mock mode accidentally initializes DB via shared app bootstrap.
  - Mitigation: spy on `getDb()`/init/migration in targeted tests.
- Risk: SQLite mode hides real DB errors with mock fallback.
  - Mitigation: tests must assert explicit failure in SQLite mode.

## NON-GOALS
- Do not redesign UI.
- Do not change crawled-data import parser.
- Do not alter database schema unless required to prevent accidental initialization.
- Do not change admin auth/session semantics.
- Do not delete `.data/` or public images.
