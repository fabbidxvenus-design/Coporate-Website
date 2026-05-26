# phase-04-deslop-regress-evolve — DESLOP/REGRESS/EVOLVE

## [CORE] Objective
Clean only non-functional slop, rerun regression checks, and dispatch background evolve learning.

## [DESLOP] Allowed Cleanup
- Remove unused imports introduced during TIP-026.
- Simplify duplicated class strings only if behavior and visual output remain unchanged.
- Normalize formatting via project formatter/linter if configured.

## [DESLOP] Forbidden Cleanup
- No functional behavior changes.
- No color/image/mockdata changes.
- No broad component refactors outside touched job-detail components.

## [REGRESS] Final Checks
- [ ] TIP-026 spec/audit tests pass.
- [ ] Type check passes.
- [ ] Route screenshot/browser evidence still exists for 375/768/1024/1440.
- [ ] No horizontal overflow at target breakpoints.
- [ ] `.zflow/final-report.md` generated with full audit trail.

## [EVOLVE] Background Learning
Dispatch a background evolve/code-review learning agent after final verification. Save non-blocking output to `.zflow/evolve-report.md`.

## [COMPLETE] Done Criteria
- All active STANDARD tier zflow gates pass.
- Focus lock can be disabled.
- Handoff files are up to date.
