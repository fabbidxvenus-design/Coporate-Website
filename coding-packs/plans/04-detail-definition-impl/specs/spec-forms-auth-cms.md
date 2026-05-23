# SPEC: Forms, Auth, CMS, and Safe Implementation

[SPEC] Source: `.requirements/04-detail-definition.md` DET-UX-003..006, DET-API-001..003, DET-DATA-003..004, DET-VAL-001..003, DET-STATE-002..004, DET-ERR-001..003, DET-SEC-001..003, DET-A11Y-002..003, DET-TEST-002..005

## AC-FORM-01: Public forms validate before successful submission
- Given: an unauthenticated visitor opens the apply or quick application form
- When: they submit empty required fields or invalid email/phone-like values
- Then: validation errors are visible, no success state is shown, and the layout remains design-faithful.

## AC-FORM-02: Public forms persist successful submissions
- Given: a visitor enters valid application data
- When: the form submission succeeds through Supabase-backed behavior
- Then: the user sees a success state and the submission record is not silently dropped.

## AC-FORM-03: Public forms show failure on Supabase/API failure
- Given: Supabase or the submission API is unavailable or returns an error
- When: a visitor submits valid form data
- Then: the user sees a failure state, can retry, and no sensitive implementation details are exposed.

## AC-AUTH-01: CMS routes are protected
- Given: an unauthenticated user opens any `/admin/*` route directly
- When: the route is requested
- Then: CMS content is not exposed and the user is redirected or blocked to login behavior.

## AC-AUTH-02: Login uses Supabase Auth and handles failures
- Given: a user submits empty, invalid, or incorrect login credentials
- When: Supabase Auth rejects the attempt
- Then: CMS access is not granted and a visible user-facing error is shown.

## AC-AUTH-03: Authenticated CMS session grants and loses access correctly
- Given: a valid CMS/admin user authenticates successfully
- When: they navigate CMS pages
- Then: admin pages are reachable during the active session; after logout/session expiry, access is removed.

## AC-CMS-01: CMS pages are design-faithful and data-safe
- Given: an authenticated CMS user opens dashboard, jobs, news, applications, or settings
- When: each page renders at 1440px and 1920px
- Then: sidebar/header/table/card/form layouts match `.design/cms_site`, navigation works, and missing data states remain visually controlled.

## AC-SAFE-01: Design conversion is safe
- Given: the codebase after implementation
- When: security/audit checks inspect runtime code
- Then: there is no unsafe wholesale design HTML injection, no production Tailwind CDN reliance, no hardcoded secrets, and user input is validated before success.

## Red Gate Tests
- [RED] Playwright test for public form validation, success, and failure states.
- [RED] Playwright test for direct unauthenticated `/admin` access.
- [RED] Playwright test for failed login and protected CMS access.
- [RED] Playwright screenshot checklist for CMS routes at 1440px and 1920px.
- [RED] Static audit grep for `dangerouslySetInnerHTML`, Tailwind CDN, and hardcoded secret patterns.
