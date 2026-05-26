# Phase 01 — SPEC / Red Gate

## Objective
Create executable behavioral specs and failing tests before implementation.

## Tasks
1. Read `PLAN.md` and `specs/spec-data-source-boundary.md`.
2. Create `tests/data-source-boundary.spec.ts` using the existing test framework and conventions.
3. Tests must compile and fail before implementation.
4. Record command output in `.zflow/red-gate.md`.

## Required Test Coverage
- Data-source helper semantics for true/false/missing/invalid flag values.
- Mock mode does not call SQLite connection/init/migration/seed.
- SQLite mode uses DB path and does not silently fall back to mock.
- API/CMS route boundary coverage where feasible without brittle implementation details.

## Red Gate Command
```bash
pnpm run test -- tests/data-source-boundary.spec.ts
```

## Exit Criteria
- [ ] Spec file exists.
- [ ] Test file exists.
- [ ] Test file compiles.
- [ ] At least one test fails for the intended missing implementation.
- [ ] `.zflow/red-gate.md` records result.
