# TIP-004: Supabase Auth Login and Admin Protection

**Agent:** security-focused fullstack implementer
**Model:** opus
**File ownership:** `app/login/**`, `middleware.ts`, `app/api/auth/**`, `lib/auth.ts`, `lib/supabase/**`, `app/admin/layout.tsx`
**Blocked by:** none

## Acceptance Criteria

- [ ] Login attempts authenticate through Supabase Auth.
- [ ] Empty/invalid login input does not grant CMS access.
- [ ] Failed auth response displays clear user-facing error.
- [ ] Authenticated CMS users can access `/admin/*` during active session.
- [ ] Unauthenticated direct CMS URL access is blocked or redirected to login.
- [ ] Logout/session expiry removes CMS access.
- [ ] Public recruitment routes remain unaffected by CMS auth.
- [ ] Login form is keyboard operable.

## Context

Covers DET-UX-004, DET-API-002, DET-DATA-004, DET-VAL-002, DET-STATE-003, DET-ERR-002, DET-SEC-001, DET-EDGE-001, DET-EDGE-003, DET-TEST-003.
