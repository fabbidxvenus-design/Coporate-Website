# TIP-005: Verify, Regress, and Evolve

**Agent:** code-reviewer
**Model:** sonnet
**File ownership:** verification artifacts only under `.zflow/` and `evidence/`
**Blocked by:** tip-004-api-boundary

## Acceptance Criteria
- [ ] Targeted TIP-024 tests pass.
- [ ] Type-check/lint/build checks pass where configured.
- [ ] Separate verifier agent reviews the implementation diff.
- [ ] Final report is written to `.zflow/final-report.md`.
- [ ] Evolve/background learning is dispatched or documented.

## Context
Read `../phase-05-verify-regress-and-evolve.md`.

## Implementation Notes
- Fix CRITICAL/HIGH review findings before completion.
- DESLOP cleanup must not change behavior.
