# Verify Report — TIP-027 Plan

## Status
PLANNED — implementation verification pending.

## Red Gate
- Specs file exists: `specs/spec-jobs-qc-parity.md`
- Test files: pending execution phase
- Expected RED failures before implementation:
  - Missing or non-checkbox filter controls.
  - Missing lower photo/location sections.
  - Missing floating bell.
  - Job-card structure and unnamed links fail QC/a11y.

## Green Gate Requirements
- Spec tests pass after implementation.
- `npm run type-check` passes or blocker documented.
- `npm run build` passes or blocker documented.
- `/vi/jobs` desktop and mobile screenshots captured.
- `/ja/jobs` smoke checked.
- Separate verifier reviews implementation.

## Excluded Findings
The following may remain if solely caused by user-excluded scope:
- COLOR PINK parity/contrast findings.
- IMAGE parity findings.
- MOCKDATA content parity findings.
