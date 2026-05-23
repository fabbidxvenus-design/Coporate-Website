# Phase 04: Login & CMS Protection

## ZFlow Context

**Phase purpose:** DET-UX-004, DET-API-002, DET-DATA-004, DET-VAL-002, DET-STATE-003, DET-ERR-002, DET-SEC-001, DET-EDGE-001, DET-EDGE-003

## Overview

Gate CMS/admin access with Supabase Auth. Unauthenticated users cannot access CMS pages. Authentication failure shows clear errors. Login UI matches any supplied design or defaults to clean layout if none provided.

## Routes

| Route | Access |
|---|---|
| `/login` | Public |
| `/admin/*` | Protected (authenticated only) |
| `/(public)/*` | Public (no login required) |

## Tasks

1. **Login form UI & Validation.**
   - Implement `/login` page.
   - Email and password inputs.
   - Empty input validation prevents submission (DET-VAL-002).
   - Clear failure feedback on incorrect credentials (DET-ERR-002).
   - Keyboard operable login form (DET-A11Y-003).

2. **Supabase Auth Integration.**
   - Submit credentials to Supabase Auth (`signInWithPassword`).
   - Failed Supabase response → user-facing error message.
   - Successful login → redirect to `/admin` (DET-API-002).

3. **CMS Access Protection (Middleware).**
   - Implement Next.js middleware for route protection.
   - Check Supabase session data for `/admin/*` routes (DET-DATA-004).
   - Direct CMS URL while unauthenticated → redirect to `/login` (DET-EDGE-001, DET-SEC-001).
   - Session expiry during CMS use → redirect to `/login` (DET-EDGE-003, DET-STATE-003).
   - Public pages remain accessible without auth.

4. **Logout Flow.**
   - Implement logout action.
   - Session ending removes CMS access.
   - Redirect to `/login` or `/` after logout.

## Acceptance Criteria

- [ ] `/login` form has empty input validation.
- [ ] Incorrect credentials show clear failure message.
- [ ] Successful login redirects to `/admin`.
- [ ] Next.js middleware protects all `/admin/*` routes.
- [ ] Unauthenticated direct access to `/admin/*` redirects to `/login`.
- [ ] Session expiry removes CMS access.
- [ ] Public routes `/(public)/*` remain accessible without login.
- [ ] Login form is keyboard operable.

## DET Traceability

DET-UX-004, DET-API-002, DET-DATA-004, DET-VAL-002, DET-STATE-003, DET-ERR-002, DET-SEC-001, DET-A11Y-003, DET-EDGE-001, DET-EDGE-003
