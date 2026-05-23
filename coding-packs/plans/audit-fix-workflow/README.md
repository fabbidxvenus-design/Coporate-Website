# Audit Fix Workflow Plan

## Goal

Fix current codebase gaps against `.requirements/04-detail-definition.md` without changing the approved public/CMS visual design except where required for visible error/auth states.

## ZFlow Intake

- Mode: plan-supervised workflow
- Tier: THOROUGH
- Complexity score: 70+
- Reason: fixes touch authentication, authorization, CMS data behavior, public submission API, environment validation, tests, and visual regression.

## Requirement Scope

Primary requirement IDs:

- `DET-UX-004`: login path gates CMS/admin through Supabase Auth.
- `DET-UX-005`: all CMS/admin pages reachable after login and visually design-faithful.
- `DET-API-001`: public forms submit through controlled Supabase-backed flow with visible outcomes.
- `DET-API-002`: CMS login uses Supabase Auth.
- `DET-API-003`: CMS pages display design-equivalent seeded/existing data if live data unavailable.
- `DET-DATA-004`: auth session prevents direct CMS bypass and removes access after logout/session expiry.
- `DET-VAL-002`: login validation goes through Supabase Auth and reports failure.
- `DET-ERR-001..003`: visible errors for form, login, and missing/unavailable data.
- `DET-SEC-001`: CMS access is protected by Supabase Auth-gated access.
- `DET-SEC-003`: candidate submission data is treated as personal data.
- `DET-EDGE-001..003`: direct CMS URL blocked, Supabase submission failure visible, expired session blocks CMS access.
- `DET-TEST-002..005`: form, CMS auth, CMS visual/page coverage, and safe implementation tests.

## Current Codebase Findings

### F1 — Unsafe mock admin bypass

Evidence:
- `app/login/page.tsx` defines `MOCK_ADMIN` with `admin@fabbi.vn` / `admin123`.
- `app/login/page.tsx` sets `document.cookie = 'mock_admin=true; path=/; max-age=86400'`.
- `middleware.ts` grants `/admin` access when `mock_admin=true`.

Requirement impact:
- Violates `DET-API-002`, `DET-SEC-001`, `DET-VAL-002` because CMS access can bypass Supabase Auth.

### F2 — Middleware and server admin guard disagree

Evidence:
- `middleware.ts` accepts `mock_admin`.
- `lib/auth.ts` `requireAdmin()` only accepts Supabase user/profile and silently returns null on auth errors.

Requirement impact:
- Fails reliable `DET-DATA-004`, `DET-STATE-003`, `DET-EDGE-001`, `DET-EDGE-003` behavior.

### F3 — CMS fallback data is insufficient

Evidence from current audit context:
- Admin dashboard/jobs/news/applications fallback paths return empty arrays or zero metrics when mock/no DB mode is active.
- `lib/mock-data.ts` has public jobs/news and one mock application, but admin pages do not consistently use design-equivalent seeded CMS data.

Requirement impact:
- Fails `DET-API-003`, `DET-ERR-003`, `DET-TEST-004` for CMS design-equivalent data structures.

### F4 — Placeholder Supabase credentials can be treated ambiguously

Evidence:
- `.env.local` currently has `USE_MOCK_DATA=false` with placeholder Supabase URL/key values from earlier context.
- Some server code can fall back or return null instead of failing clearly.

Requirement impact:
- Risks false confidence for `DET-API-001`, `DET-API-002`, `DET-ERR-001`, `DET-ERR-002`.

### F5 — Public submission needs anti-abuse and clearer failure posture

Evidence:
- `app/api/applications/route.ts` validates required fields, email, MIME type, and 5MB file size.
- No code-level rate limiting or equivalent anti-abuse layer is visible.

Requirement impact:
- Partial coverage for `DET-SEC-003`; `DET-EDGE-002` depends on clear failure behavior.

## Plan Files

- `phase-01-baseline-and-red-tests.md`
- `phase-02-auth-source-of-truth.md`
- `phase-03-cms-data-compliance.md`
- `phase-04-application-api-hardening.md`
- `phase-05-silent-failure-and-config.md`
- `phase-06-verification-and-visual-regression.md`
- `specs/spec-audit-fix.md`
- `.zflow/coverage-matrix.md`
- `.zflow/tasks.json`

## Execution Order

1. Add/prepare requirement-level tests and acceptance checks.
2. Fix auth source of truth and remove unsafe bypass behavior.
3. Make CMS mock/no-live-data states design-equivalent.
4. Harden public application API and failure paths.
5. Make config/auth failures explicit without leaking internals.
6. Verify type-check, build, tests, browser flows, visual evidence, and separate reviewer agents.

## Non-Goals

- No UI redesign.
- No visual cleanup outside requirement fixes.
- No broad architecture rewrite.
- No git commit or push unless explicitly requested.
