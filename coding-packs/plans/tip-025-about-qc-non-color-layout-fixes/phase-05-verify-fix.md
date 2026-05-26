# Phase 05 — Verify and Fix Loop

## [CORE] Separate Verifier Requirement
Verification must be performed by a separate reviewer agent, not by the implementer. Use `code-reviewer` plus UI/a11y evidence review.

## [GREEN] Green Gate Checks
1. Spec checks pass.
2. Existing test/build checks pass.
3. `/vi/about` renders without browser console errors.
4. No horizontal overflow at 1440px.
5. Non-excluded QC findings are fixed:
   - Hero height/content overlay.
   - Header fixed geometry and main offset.
   - Stats radius/shadow.
   - Activity width and controls.
   - Why decorative layer.
   - Heading-order violation.
6. COLOR/IMAGE/MOCKDATA differences are unchanged or documented as out of scope.

## [CORE] Visual Evidence
Capture/update evidence under `.zflow/evidence/`:
- `about-before-1440.png` if available before implementation.
- `about-after-1440.png` after implementation.
- `about-qc-summary.md` summarizing design-vs-web non-color parity.
- Link/copy relevant `.qc/ui/about` rerun artifacts if the QC harness regenerates them.

## [CORE] Fix Loop
Maximum 3 iterations.

For every verifier finding:
1. Add finding and prior attempt context to `.zflow/fix-log.jsonl`.
2. Re-enter EXECUTE only for the failed area.
3. Re-run targeted checks and verifier.
4. Stop after 3 failed fix iterations and ask the user how to proceed.

## [PIVOT] Expected Remaining Warnings
- Color-contrast issues may remain if caused only by excluded COLOR mismatches.
- Image visual differences may remain if caused only by excluded IMAGE assets/sources.
- Text/content differences may remain if caused only by excluded MOCKDATA/content.

These must be listed in `verify-report.md` as intentional exclusions, not hidden.
