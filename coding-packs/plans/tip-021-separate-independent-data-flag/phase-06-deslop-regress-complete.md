# Phase 06 — DESLOP / REGRESS / COMPLETE

## Objective
Perform cleanup-only work, rerun checks, and produce completion artifacts.

## Tasks
1. Remove unused imports, temporary test scaffolding, debug logs, and dead code created during implementation.
2. Do not change functional behavior during DESLOP.
3. Rerun:
   - `pnpm run test -- tests/data-source-boundary.spec.ts`
   - `pnpm run test`
   - `pnpm run type-check`
   - `pnpm run build`
4. Write `.zflow/final-report.md`.
5. Dispatch EVOLVE in background and write `.zflow/evolve-report.md` when available.
6. Update `.zflow/handoff.json` for resume safety.

## Exit Criteria
- [ ] DESLOP touched zero functional behavior.
- [ ] Regression commands rerun after cleanup.
- [ ] Final report exists.
- [ ] Handoff exists.
- [ ] EVOLVE dispatch recorded.
