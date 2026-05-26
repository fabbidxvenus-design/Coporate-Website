# Phase 06 — Regress, Evolve, Complete

## [CORE] Regression Checks
After verifier approval and any DESLOP cleanup:
1. Re-run build/type/lint/test commands available in the repo.
2. Re-run `/vi/about` browser smoke at 1440px.
3. Re-run accessibility check or confirm updated axe output.
4. Confirm no functional changes were made during DESLOP.
5. Write `.zflow/final-report.md` with the final audit trail.

## [CORE] DESLOP Rules
- Cleanup only: formatting, removing accidental debug code, dead imports.
- No logic/layout changes in DESLOP.
- If a functional issue is found, return to FIX, not DESLOP.

## [CORE] EVOLVE
Dispatch EVOLVE as a background/non-blocking learning step and write `.zflow/evolve-report.md`.

Learning topics:
- How to scope UI QC fixes by excluded categories.
- Which About page layout checks were most useful.
- Whether header fixed positioning caused cross-page risk.
- How to verify visual parity without changing image/color/content.

## [CORE] Completion Criteria
- `verify-report.md` says PASS for non-excluded TIP-025 requirements.
- `final-report.md` exists and maps every acceptance criterion to evidence.
- `handoff.json` and `handoff.md` are current.
- Pipeline state is `complete` and focus lock is disabled.

## [PIVOT] If Regression Fails
- If regression failure is caused by TIP-025 changes, return to FIX with the failure context.
- If regression failure is pre-existing and unrelated, document it in `final-report.md` and ask the user before expanding scope.
