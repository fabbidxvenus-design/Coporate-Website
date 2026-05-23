# Phase 02 — Auth Source of Truth

## Goal

Make CMS access consistently Supabase Auth-gated and remove unsafe mock bypass behavior.

## Requirement IDs

- `DET-UX-004`
- `DET-API-002`
- `DET-DATA-004`
- `DET-VAL-002`
- `DET-STATE-003`
- `DET-ERR-002`
- `DET-SEC-001`
- `DET-EDGE-001`
- `DET-EDGE-003`
- `DET-TEST-003`

## Current Findings

- `app/login/page.tsx` contains hardcoded mock admin credentials.
- `app/login/page.tsx` sets a client-controlled `mock_admin=true` cookie.
- `middleware.ts` trusts `mock_admin=true` for `/admin` access.
- `lib/auth.ts` does not know about that cookie and only validates Supabase user/profile.
- `lib/auth.ts` catches auth errors and returns null without diagnostic context.

## Implementation Direction

Preferred option:
- Remove mock admin bypass from production auth path.
- Login attempts should use Supabase Auth only.
- Admin access should require Supabase user + `profiles.role === 'admin'`.
- Middleware and `requireAdmin()` should enforce the same model.

Allowed dev-only option if mock admin remains necessary:
- Gate mock auth behind explicit `USE_MOCK_DATA === true` and `NODE_ENV !== 'production'`.
- Do not set authorization cookies directly from client JavaScript.
- Use a server route to create a dev-only httpOnly cookie.
- Make `middleware.ts` and `lib/auth.ts` share that same dev-only check.
- Never show dev credentials in production-like UI.

## Tasks

1. Decide whether mock admin is removed or kept as dev-only.
2. Update login flow accordingly.
3. Update middleware to remove unauthenticated client-cookie bypass.
4. Update server-side admin guard so page-level checks match middleware behavior.
5. Ensure logout/session expiry removes CMS access.
6. Preserve login page visual layout and Vietnamese user-facing error copy style.

## Verification

- Failed login stays on login and shows visible error.
- Direct `/admin` unauthenticated redirects to login.
- Authenticated non-admin redirects with unauthorized error.
- Authenticated admin reaches CMS.
- Logout prevents continued CMS access.
- Mock/client-set cookie alone cannot authorize CMS access in production-like config.
