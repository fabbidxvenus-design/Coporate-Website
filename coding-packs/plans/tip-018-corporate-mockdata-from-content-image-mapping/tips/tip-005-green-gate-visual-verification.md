# TIP-005: Green gate and visual verification

## HEADER
- TIP-ID: TIP-005
- Project: Coporate_Website
- Module: Green gate and visual verification
- Priority: P0
- Depends on: TIP-004
- Estimated: S

## CONTEXT
- Audit test: `tests/audit/corporate-mockdata-images.spec.ts`

## APPLICABLE STANDARDS
- web/testing
- web/design-quality

## TASK
1. Re-run audit tests (should be GREEN).
2. Take screenshots of `/vi/news`, `/vi/news/[slug]`, and `/vi/about`.
3. Verify visual correctness.

## ACCEPTANCE CRITERIA
- Audit tests pass.
- Screenshots confirm correct image rendering.
