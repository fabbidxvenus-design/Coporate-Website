# Audit Fix Workflow Round 3 — Plan

## Overview

Close the remaining 4 DET-TEST items and document DET-EDGE-002. The Playwright runner conflict between the shared config and `test.describe()` in test files needs a clean resolution so tests can actually execute.

## Prior Completions

- `audit-fix-workflow`: All AF-001 through AF-006 done. All security/data/type fixes done.
- Phase-07: Type HIGH/MEDIUM findings resolved.
- Phase-08: Visual screenshots captured (16 files at 1440px/1920px). Build passes.
- Build: `npm run build` passes — 23 routes, 0 errors.
- Security reviewer: PASS. TypeScript reviewer: PASS with findings resolved.
- `audit-fix-workflow-round2`: Image optimization, lazy loading, ISR caching, jobs/[slug] refactor — all done.

## Remaining Work

| ID | Description | Notes |
|---|---|---|
| DET-TEST-002 | Apply form validation tests | Tests exist in `requirements.spec.ts`, not run |
| DET-TEST-003 | CMS auth blocking tests (admin routes without session) | Tests exist in `requirements.spec.ts`, not run |
| DET-TEST-004 | CMS page coverage + visual | Keyboard test done; CMS structure to document |
| DET-TEST-005 | Safe implementation review | Browser-level XSS check in `requirements.spec.ts` |
| DET-EDGE-002 | Rate limiting documentation | Infra-level requirement — document, not implement |

## Complexity Score

**Tier: LIGHT-MEDIUM** (score estimate: 25)
- Playwright config fix is a single-file change
- Tests already written — just need working runner
- Screenshots are mechanical
- No business logic changes

---

## Phase 01 — Fix Playwright Runner Conflict

**File:** `playwright.config.ts`

**Problem:** `testDir: './tests'` in the shared config discovers all `.spec.ts` files. `audit-fix-auth.spec.ts` and `requirements.spec.ts` both use `test.describe()` at module level. When Playwright processes multiple files with top-level `test.describe()` in the same run under certain config/reporter combinations, it can throw `test.describe() called in configuration file`.

**Fix:** Create a standalone `playwright.audit.config.ts` that only targets the two audit test files. Keep the shared `playwright.config.ts` for future integration tests.

**Steps:**

1. **Create** `playwright.audit.config.ts`
   - Copy `projects` (Desktop 1440px, Desktop 1920px) and `webServer` from main config
   - Set `testDir: './tests'` with `testMatch: ['**/audit-fix-auth.spec.ts', '**/requirements.spec.ts']`
   - Set `reporter: 'list'` to avoid HTML reporter ordering issues

2. **Update** `playwright.config.ts`
   - Add `testMatch: '**/*.test.ts'` — main config only picks up unit/integration test files
   - `.spec.ts` files excluded from main config, handled by audit config

**Dependencies:** None
**Risk:** Low — config only

---

## Phase 02 — DET-TEST-002: Apply Form Validation Tests

**File:** `tests/requirements.spec.ts`

**Requirement:** `DET-TEST-002` — public form validation states (apply page).

**Existing test:** Already written in `requirements.spec.ts` lines 18-28. Clicks submit without filling fields, verifies required fields are present.

**Verification steps:**
1. Start dev server: `npm run dev`
2. Run: `npx playwright test tests/requirements.spec.ts --config=playwright.audit.config.ts --grep="DET-TEST-002"`
3. Verify test passes
4. If it fails, inspect apply page field names/selectors and update the test

**Optional improvement:** Add tests for invalid email format and wrong MIME type on file upload.

**Dependencies:** Phase 01 complete
**Risk:** Low

---

## Phase 03 — DET-TEST-003: CMS Auth Access Tests

**File:** `tests/requirements.spec.ts`

**Requirement:** `DET-TEST-003` — CMS auth access control (admin routes blocked without session).

**Existing tests:** Already written in `requirements.spec.ts` lines 30-49.
- Each of 5 admin routes redirects to `/login` when unauthenticated
- Failed login stays on `/login` with visible error text

**Verification steps:**
1. `npm run dev`
2. Run: `npx playwright test tests/requirements.spec.ts --config=playwright.audit.config.ts --grep="DET-TEST-003"`
3. Verify all 6 tests pass (5 route redirects + 1 failed login error)

**Dependencies:** Phase 01 complete
**Risk:** Low

---

## Phase 04 — DET-TEST-004: CMS Page Screenshots + Coverage

**Requirement:** `DET-TEST-004` — CMS page visual access boundary.

**Already done:**
- Login page keyboard operability test: `requirements.spec.ts` lines 52-62 ✅
- Public pages at 1440/1920px: 16 screenshots from phase-08 ✅

**Remaining:** Document CMS expected layout (authenticated pages require session).

**Steps:**

1. **Run** login keyboard test: `npx playwright test tests/requirements.spec.ts --config=playwright.audit.config.ts --grep="DET-TEST-004"`

2. **Document** CMS expected layout in `plans/audit-fix-workflow-round3/CMS-STRUCTURE.md`:
   - `/admin` — 4 metric cards, recent applications table
   - `/admin/jobs` — jobs table with title, employment type, status, posted date
   - `/admin/news` — news table with title, status, author, date
   - `/admin/applications` — applications table with name, email, job, status, date

**Why:** Middleware and auth gating were verified in round 1. Code review of admin page components provides sufficient visual evidence given the authenticated-only nature of CMS pages.

**Dependencies:** Phase 01 complete
**Risk:** Low — documentation and test execution

---

## Phase 05 — DET-TEST-005 + DET-EDGE-002

### 5a — DET-TEST-005: Safe Implementation Review

**File:** `tests/requirements.spec.ts`

**Requirement:** `DET-TEST-005` — news detail pages do not expose script tags (XSS check).

**Existing test:** `requirements.spec.ts` lines 65-78. Navigates to `/news`, clicks first detail link, checks for dangerous `<script>` content.

**Verification steps:**
1. Run: `npx playwright test tests/requirements.spec.ts --config=playwright.audit.config.ts --grep="DET-TEST-005"`
2. If no news links exist in mock data, the test skips — correct behavior

### 5b — DET-EDGE-002: Rate Limiting Documentation

**File:** `plans/audit-fix-workflow-round3/DET-EDGE-002-rate-limiting.md`

**Requirement:** `DET-EDGE-002` — rate limiting is an infrastructure-level requirement.

**Content:**
- Current state: API routes have client + server validation and error handling, but no rate limiting layer.
- Recommended implementation at infrastructure level:
  - `POST /api/apply` — 10 requests/minute per IP (anti-spam)
  - `POST /api/auth/signin` — 5 attempts/minute per IP (anti-brute-force)
- Implementation options:
  1. Vercel Edge Middleware with in-memory store
  2. Upstash Redis (distributed, per-IP tracking)
  3. Cloudflare Rate Limiting rules (edge-level, no code changes)

**Dependencies:** None
**Risk:** None — documentation only

---

## Phase 06 — Final Verification

**Steps:**

1. **Start dev server:** `npm run dev` (background)

2. **Run all audit tests:**
   ```bash
   npx playwright test tests/audit-fix-auth.spec.ts --config=playwright.audit.config.ts
   npx playwright test tests/requirements.spec.ts --config=playwright.audit.config.ts
   ```

3. **Type check:** `npx tsc --noEmit`

4. **Build:** `npm run build`

5. **Verify screenshots:** 16 files in `plans/audit-fix-workflow/phase-08/evidence/` still present

6. **Write completion report:** `plans/audit-fix-workflow-round3/COMPLETION-REPORT.md`

**Dependencies:** All prior phases complete
**Risk:** Low — verification only

---

## Acceptance Criteria

- [ ] `playwright.audit.config.ts` created; `playwright.config.ts` updated with `testMatch`
- [ ] Audit tests execute without `test.describe()` conflict
- [ ] `DET-TEST-002`: apply form validation test passes
- [ ] `DET-TEST-003`: all 5 admin route blocking tests pass
- [ ] `DET-TEST-004`: login keyboard test passes; CMS structure documented
- [ ] `DET-TEST-005`: XSS check test passes (or skips correctly)
- [ ] `DET-EDGE-002`: rate limiting recommendation documented
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run build` passes
- [ ] Completion report written

---

## Out of Scope

- Implementing rate limiting code (infra-level, documented only)
- Modifying authentication logic (already fixed in round 1)
- Modifying CMS page UI
- Adding new test files beyond `audit-fix-auth.spec.ts` and `requirements.spec.ts`