# Phase-08 Plan: Visual Verification & Test Coverage

## Intake

**Task:** Complete remaining test coverage from `DET-TEST-*` requirements: visual verification evidence at 1440px/1920px, CMS page screenshots, and functional Playwright test runner configuration.

**Parent Workflow:** `audit-fix-workflow` (status: completed)
**Plan Dir:** `D:\WORKSPACE\CODE\Coporate_Website\plans\audit-fix-workflow\phase-08`

## Prior Workflow Completions

- AF-001 → AF-006: All security/data/type fixes done ✅
- Phase-07: Type HIGH fixes done ✅
- Build: `npm run build` passes ✅

## Remaining Work

### Visual Verification (DET-TEST-001, DET-TEST-004)

DET-NFR-001 / DET-TEST-001 / DET-TEST-004 require:
- 1440px visual review for all public and CMS pages
- 1920px visual review for all public and CMS pages
- Manual approval as pass/fail mechanism

**Prior state:** Phase-06 marked "completed" but no screenshot files exist in `evidence/`. All screenshots missing.

**Pages to capture:**

**Public (no auth required):**
- `/` (homepage)
- `/jobs` (job listing)
- `/jobs/[slug]` (job detail — use first mock job slug)
- `/apply` (application form)
- `/news` (news listing)
- `/news/[slug]` (news detail — use first mock news slug)
- `/about`

**CMS (requires auth):** Screenshots require dev server + manual login. Document expected layout structure instead:
- `/admin` (dashboard — 4 metric cards + recent applications table)
- `/admin/jobs` (jobs list table with stats)
- `/admin/news` (news list with article rows)
- `/admin/applications` (applications table with status counts)
- `/admin/settings` (settings form)
- `/login`

### Playwright Config Fix (DET-TEST-002, DET-TEST-003)

`tests/audit-fix-auth.spec.ts` uses `test.describe()` which conflicts with Playwright config's `reporter: 'html'`. The test file itself is correctly written — needs a standalone config or test separation.

## Complexity Score

Tier: **LIGHT**

Score estimate: **15**
- Screenshot capture is a mechanical process
- Playwright config fix is a single file edit
- No code logic changes

## Workflow

### Phase 1 — Visual Evidence

1. Start dev server in background
2. Wait for server ready
3. Capture screenshots at 1440px and 1920px for public pages using Playwright
4. Save to `evidence/` directory

### Phase 2 — Playwright Config Fix

Fix `playwright.config.ts` to separate audit tests from main test suite, or restructure test file.

### Phase 3 — Verification

- Check all screenshot files exist
- Verify build still passes

## Execution Order

1. Start dev server
2. Run screenshot script
3. Fix Playwright config
4. Verify build
5. Complete

## Acceptance Criteria

- [ ] Screenshots exist for all 7 public pages at 1440px and 1920px
- [ ] Playwright config no longer throws `test.describe() called in configuration file` error
- [ ] `npm run build` passes
- [ ] All prior fixes preserved