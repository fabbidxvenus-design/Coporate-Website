# TIP-001: Baseline and Test Harness

**Agent:** frontend QA implementer
**Model:** sonnet
**File ownership:** `tests/**/*`, `coding-packs/plans/tip-027-jobs-qc-non-color-image-mockdata-fixes/.zflow/**/*`, read-only app/source files
**Blocked by:** none

## Acceptance criteria
- [ ] Current `/vi/jobs` baseline is understood from `.qc/ui/jobs` artifacts.
- [ ] Actual implementation target is confirmed as `app/(public)/jobs/page.tsx` via localized wrapper.
- [ ] Red Gate tests/spec strategy maps AC-01 through AC-07.
- [ ] No implementation files are changed before SPEC artifacts exist.

## Context
TIP-027 fixes all non-excluded jobs QC mismatches. Exclusions: COLOR PINK, IMAGE, MOCKDATA.

## Implementation Notes
Read `phase-01-intake-and-baseline.md` and `phase-02-spec-red-gate.md`. If adding tests, prefer existing Playwright conventions and make tests fail before UI implementation.
