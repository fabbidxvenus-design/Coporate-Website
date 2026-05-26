# TIP-P5-001: Verification and Regression

**Agent:** verifier/reviewer
**Model:** opus
**File ownership:** `.zflow/verify-report.md`, `.zflow/final-report.md`, no functional code ownership except review fix notes
**Blocked by:** tip-P4-001-repository-integration

## Acceptance criteria
- [ ] Migration, seed, repository, and data-source specs pass.
- [ ] Type-check and relevant existing tests pass.
- [ ] Separate code/database review reports no unresolved CRITICAL/HIGH findings.
- [ ] Final report maps TIP-023 acceptance criteria to evidence.

## Context
[VERIFY] zflow requires separate verification and regression after implementation.

## Implementation Notes
If no live PostgreSQL DB is available, document skipped integration commands clearly and verify transformer/boundary behavior locally.
