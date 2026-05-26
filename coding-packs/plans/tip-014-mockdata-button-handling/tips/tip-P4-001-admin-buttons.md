# TIP-P4-001: Admin Button Handling

**Agent:** fullstack implementer
**Model:** sonnet
**File ownership:** `app/admin/**`, `components/admin/**`, `components/cms/**`, admin-related `app/api/**/route.ts`
**Blocked by:** TIP-P1-001, TIP-P2-001
**Acceptance criteria:**
- [ ] Admin buttons/actions have deterministic mock behavior or accessible disabled explanation.
- [ ] Admin mutations show visible success/error feedback.
- [ ] Production auth is not weakened when mock mode is disabled.
- [ ] Admin E2E tests pass.

## Context
Read `phase-04-admin-button-handling.md` and `BUTTON-INVENTORY.md`.

## Implementation Notes
Keep `/admin/*` dynamic/auth protected in production mode. Never expose secrets/client service-role keys.
