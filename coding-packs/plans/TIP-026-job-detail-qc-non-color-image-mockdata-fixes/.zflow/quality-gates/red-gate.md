# Red Gate Evidence — TIP-026

## Status
PASS (Red Gate enforced)

## Evidence
Tests in `tests/audit/job-detail-qc-non-excluded.spec.ts` ran and failed as expected.

### Failures
- AC-02 (semantics): related-jobs list violation (1 violation).
- AC-03 (affordance): `related-job-card` data-purpose attribute missing (fails `toBeVisible`).
- AC-05 (radius): CTA lookup timed out (likely selector match issue), verifying current radius parity requires fixing selector first.

## Red Gate Check
- [x] Spec files exist (`specs/job-detail-non-excluded-qc.md`)
- [x] Test file compiles.
- [x] At least one TIP-026 test assertion fails before code changes.
