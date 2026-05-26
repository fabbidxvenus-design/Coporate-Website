# Phase 05 — VERIFY / Green Gate

## Objective
Prove the implementation satisfies the behavioral specs and has no regressions.

## Commands
```bash
pnpm run test -- tests/data-source-boundary.spec.ts
pnpm run test
pnpm run type-check
pnpm run build
```

## Separate Verifier Requirement
Use a separate `code-reviewer` agent to review the final diff. The verifier must check:
- no SQLite open/init/migration/seed in mock mode;
- no silent mock fallback in SQLite mode;
- no Supabase runtime dependency reintroduced;
- tests actually cover the data-source boundary.

## Visual Gate
This TIP is non-visual. If implementation changes rendered UI unexpectedly, run browser smoke checks and save screenshots under `evidence/`; otherwise record visual gate as not applicable in `.zflow/verify-report.md`.

## Exit Criteria
- [ ] Targeted tests pass.
- [ ] Full tests pass or failures are documented as unrelated blockers.
- [ ] Type-check passes.
- [ ] Build passes.
- [ ] Separate verifier report exists.
