# ZFlow Plan: TIP-027 Jobs QC Non-Color/Image/Mockdata Fixes

## Plan Metadata
- Source TIP: `coding-packs/tips/TIP-027-jobs-qc-non-color-image-mockdata-fixes.md`
- Plan dir: `coding-packs/plans/tip-027-jobs-qc-non-color-image-mockdata-fixes`
- Mode: zflow plan-supervised
- Tier: STANDARD
- Scope: public jobs listing visual parity implementation plan only

## Complexity Intake
- Score: 55/100
- Tier: STANDARD
- Signals:
  - Cross-file scope: public jobs page, job card, search/filter component, dictionaries, QC artifacts.
  - Visual output: browser screenshots and QC rerun required.
  - Testing/verification: type-check, build when feasible, accessibility, responsive checks.
  - Moderate reversibility: UI-only changes, no database or mock data mutation.

## Pipeline Shape
Plan-supervised mode skips RRI, SDD, and PROPOSAL because `TIP-027` is the approved design document.

Phases:
1. `phase-01-intake-and-baseline.md`
2. `phase-02-spec-red-gate.md`
3. `phase-03-jobs-layout-implementation.md`
4. `phase-04-visual-accessibility-verification.md`
5. `phase-05-fix-deslint-regress-evolve.md`

## Artifact Index
- Specs: `specs/spec-jobs-qc-parity.md`
- Decomposed implementation TIPs:
  - `tips/tip-001-baseline-and-test-harness.md`
  - `tips/tip-002-filters-and-job-cards.md`
  - `tips/tip-003-lower-sections-sidebar-floating-bell.md`
  - `tips/tip-004-verification-and-regression.md`
- zflow state:
  - `.zflow/intake.json`
  - `.zflow/pipeline.json`
  - `.zflow/coverage-matrix.md`
  - `.zflow/tasks.json`
  - `.zflow/handoff.json`
  - `.zflow/verify-report.md`
  - `.zflow/final-report.md`

## Constraints
- Do not fix COLOR PINK findings.
- Do not replace images or alter image mappings.
- Do not edit mock data records, seed data records, repository contracts, or data-source semantics.
- Do not implement `app/[locale]/ung_tuyen/page.tsx`; it is only noted as the wrong QC target.
- Do not add dependencies.

## Execution Entry Point
Use:

```text
zflow --plan coding-packs/plans/tip-027-jobs-qc-non-color-image-mockdata-fixes --phase phase-01-intake-and-baseline.md
```

Then proceed phase-by-phase through the listed files.
