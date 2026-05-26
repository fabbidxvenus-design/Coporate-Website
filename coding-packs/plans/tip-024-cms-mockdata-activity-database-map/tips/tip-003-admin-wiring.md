# TIP-003: Admin Data Source Wiring

**Agent:** claude
**Model:** sonnet
**File ownership:** `lib/cms/**`, `app/admin/**`
**Blocked by:** tip-002-cms-data-model

## Acceptance Criteria
- [ ] `/admin` metrics and recent activity come from shared CMS data helpers.
- [ ] Mock mode renders CMS pages without database config.
- [ ] Database mode has an explicit path through existing abstractions.
- [ ] Existing CMS shell, layout, topbar/sidebar, and visual hierarchy remain unchanged.

## Context
Read `../phase-03-data-source-boundary-and-admin-wiring.md` and current admin pages.

## Implementation Notes
- Evaluate mock/database mode at call time.
- Replace hardcoded counters only where the data helper covers them.
- If visual output changes, capture screenshot in `../evidence/` during verification.
