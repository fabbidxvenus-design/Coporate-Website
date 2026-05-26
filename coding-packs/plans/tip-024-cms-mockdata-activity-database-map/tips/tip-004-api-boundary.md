# TIP-004: Optional API Boundary Validation

**Agent:** claude
**Model:** sonnet
**File ownership:** `app/api/**`, `lib/cms/**`
**Blocked by:** tip-003-admin-wiring

## Acceptance Criteria
- [ ] No new API route is added unless current CMS fetch patterns require it.
- [ ] If an activity API route exists, `limit`, `entityType`, and `entityId` handling matches AC-10.
- [ ] Errors use the existing API response envelope and do not leak internals.
- [ ] If skipped, the reason is recorded in `.zflow/verify-report.md`.

## Context
Read `../phase-04-api-validation-and-error-boundaries.md` and existing API routes.

## Implementation Notes
- Prefer server-side helpers over speculative endpoints.
- Do not validate internal static arrays.
