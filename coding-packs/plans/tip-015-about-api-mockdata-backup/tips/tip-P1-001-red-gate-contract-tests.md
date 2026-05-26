# TIP-P1-001: Red Gate Contract Tests

**Agent:** tdd-guide
**Model:** sonnet
**File ownership:** `tests/unit/about-content.test.ts`, `tests/e2e/about-api-mockdata.spec.ts`, `coding-packs/plans/tip-015-about-api-mockdata-backup/specs/**`
**Blocked by:** none

## Acceptance Criteria
- [ ] G/W/T specs exist for content model, API, and visual/page behavior.
- [ ] Unit tests assert locale fallback and mock schema completeness.
- [ ] E2E tests assert `/api/about`, `/vi/about`, and `/ja/about` behavior.
- [ ] Red Gate tests compile and fail for missing current implementation.

## Context
Read `phase-01-red-gate-contract-tests.md` and `TIP-015-about-api-mockdata-backup.md`.

## Implementation Notes
Do not modify production implementation files in this TIP. Only add specs/tests.
