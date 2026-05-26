# Phase 05 — Verify, Regress, and Evolve

## [CORE] Goal
Prove TIP-024 is implemented, reviewed by a separate agent, and regression-safe.

## [VERIFY] Required Checks
1. Run targeted TIP-024 tests.
2. Run project type-check.
3. Run lint if configured.
4. Run build if configured and feasible.
5. Run coverage if configured; STANDARD target is 70%, fail-open only if coverage is not measurable.
6. Launch app and screenshot `/admin` if rendered UI changed.
7. Run a separate `code-reviewer` or `typescript-reviewer` agent against the final diff.
8. Address CRITICAL/HIGH findings before completion.

## [DESLOP] Cleanup Rules
- Cleanup only; no functional behavior changes.
- Remove dead imports, debug logs, unused temporary helpers.
- Keep files cohesive and below project size limits.

## [REGRESS] Final Report
Write `.zflow/final-report.md` with:
1. Scope completed.
2. Files changed.
3. Acceptance criteria coverage.
4. Commands run and results.
5. Visual evidence path or explicit reason not needed.
6. Separate verifier summary.
7. Remaining gaps or follow-up items.

## [EVOLVE] Background Learning
Dispatch a non-blocking evolve/background review to capture reusable lessons after verification. Save output to `.zflow/evolve-report.md` if available.

## [COMPLETE] Exit Criteria
- Green Gate passes.
- Separate verifier passes or all blocking issues are fixed.
- Final report exists.
- Handoff updated for future resume.
