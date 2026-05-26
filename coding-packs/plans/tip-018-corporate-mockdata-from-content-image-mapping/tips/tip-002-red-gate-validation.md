# TIP-002: Red gate validation

## HEADER
- TIP-ID: TIP-002
- Project: Coporate_Website
- Module: Red gate validation
- Priority: P0
- Depends on: TIP-001
- Estimated: S

## CONTEXT
- Test file: `tests/audit/corporate-mockdata-images.spec.ts`

## APPLICABLE STANDARDS
- web/testing

## TASK
1. Run `npx playwright test tests/audit/corporate-mockdata-images.spec.ts`.
2. Confirm at least one failure due to missing assets or incorrect URL normalization.

## ACCEPTANCE CRITERIA
- Red gate failure captured.
