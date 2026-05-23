# Phase 01 — Baseline and Red Tests

## Goal

Create a requirement-backed failing-test baseline for the audit findings before fixing implementation.

## Inputs

- `.requirements/04-detail-definition.md`
- `.requirements/traceability-matrix.md`
- Current auth files:
  - `app/login/page.tsx`
  - `middleware.ts`
  - `lib/auth.ts`
  - `app/api/auth/signout/route.ts`
- Current CMS/admin files under `app/admin/**` and `components/admin/**`
- Current API files under `app/api/applications/**`

## Acceptance Criteria

- Tests or executable checks exist for the audit-fix behaviors before implementation changes.
- If a full unit test runner is not present, use Playwright/API checks or add the minimum project-local test tooling needed.
- Red tests fail for current known defects where practical:
  - mock admin bypass should not authorize CMS access in production-like config;
  - direct unauthenticated `/admin` is blocked;
  - failed login does not grant CMS access;
  - placeholder Supabase config with `USE_MOCK_DATA=false` is detected clearly;
  - CMS mock/no-live-data pages have design-equivalent data structures;
  - invalid application submission inputs fail visibly;
  - Supabase unavailable during submission does not show false success.

## Tasks

1. Identify available test commands from `package.json`.
2. Add or select test harness:
   - Prefer existing Playwright for route/auth/form behavior.
   - Add minimal unit tooling only if required for pure utility/config tests.
3. Write specs against requirement behavior, not implementation details.
4. Run tests once to confirm expected failures.
5. Record red-gate evidence in `.zflow/coverage-matrix.md`.

## Exit Criteria

- Red-gate status is documented.
- Known failing tests map to requirement IDs.
- No application source behavior has been changed in this phase except test/config files required for the red gate.
