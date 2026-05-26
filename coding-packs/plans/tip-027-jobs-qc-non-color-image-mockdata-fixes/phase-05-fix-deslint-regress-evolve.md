# Phase 05 — Fix, Deslop, Regress, Evolve

## Objective
Close verification gaps, clean only non-functional slop, rerun regressions, and preserve handoff/evolution artifacts.

## FIX Loop
Maximum 3 iterations.

For each failed verification finding:
1. Record the failure in `.zflow/verify-report.md`.
2. Inject prior attempt context into the next fix.
3. Fix only the failing non-excluded behavior.
4. Re-run the smallest relevant check.

Escalate if the same class of failure remains after 3 attempts.

## DESLOP
Allowed:
- Remove unused local variables introduced by the implementation.
- Simplify duplicated JSX created during the fix if behavior is unchanged.
- Normalize naming for new components/props.

Forbidden:
- Functional behavior changes.
- Pink color fixes.
- Image swaps.
- Mock data changes.
- Repository/database changes.

## REGRESS
Re-run:
1. `npm run type-check`
2. `npm run build` if feasible.
3. Jobs browser smoke at `/vi/jobs` and `/ja/jobs`.
4. QC/a11y rerun or documented manual equivalent.

## EVOLVE
Dispatch non-blocking background learning/evolve agent after verification. Output should be summarized in `.zflow/evolve-report.md`.

## Completion Criteria
- `.zflow/final-report.md` states PASS/WARN/FAIL for each acceptance criterion.
- Any remaining findings are explicitly marked excluded by TIP-027 scope or blocked with evidence.
- `.zflow/handoff.json` includes current phase, verification status, changed files, and next action.

## Quality Gate
- [ ] Fix loop did not exceed 3 iterations.
- [ ] DESLOP touched zero functional behavior.
- [ ] Regression checks rerun after cleanup.
- [ ] Evolve report created or background dispatch recorded.
- [ ] Final report generated.
