# TIP-003: API and CMS Boundary

**Agent:** Backend/API implementer
**Model:** sonnet
**File ownership:** `app/api/**`, admin/CMS loaders/actions, related data modules
**Blocked by:** tip-001-data-source-helper
**Acceptance criteria:**
- [ ] API routes use shared data-source helper.
- [ ] CMS/admin data paths use shared data-source helper where applicable.
- [ ] Mock mode uses supported mock/no-op behavior instead of SQLite.
- [ ] SQLite mode fails explicitly when DB is unavailable.
- [ ] Auth/session behavior remains unchanged.

## Context
TIP-021 must cover API and CMS data access, not only public pages. This work should preserve existing route contracts and error envelopes.

## Implementation Notes
Do not introduce Supabase runtime imports. Do not redesign admin auth/session handling.
