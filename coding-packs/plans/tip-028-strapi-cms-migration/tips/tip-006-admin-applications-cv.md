# TIP-006: Admin, Applications, and CV Privacy

**Agent:** security-minded fullstack engineer
**Model:** opus
**File ownership:** `app/admin/**`, `components/admin/**`, `app/api/applications/**`, `.env.example`, admin/application tests
**Blocked by:** tip-004-data-source-switch, tip-005-api-public-routes
**Acceptance criteria:**
- [ ] Admin shell remains protected and visually stable.
- [ ] Admin content workflow is explicit: in-app Strapi CRUD or Strapi Admin handoff.
- [ ] Application submission creates the intended production record.
- [ ] CV access remains private and server-mediated.
- [ ] `.env.example` includes Strapi variables with placeholders only.
- [ ] Security review finds no token exposure or public CV leak.

## Context
[SECURITY] Implements AC-10 through AC-15.

## Implementation Notes
If choosing Strapi Admin handoff, remove/disable misleading in-app create/edit flows and replace with accessible links plus clear copy.
