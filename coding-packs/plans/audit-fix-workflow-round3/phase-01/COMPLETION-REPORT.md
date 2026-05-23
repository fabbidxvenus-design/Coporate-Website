# Phase 01 — Playwright Runner Fix — Completion

## Task

Fix Playwright test runner conflict so audit tests can execute.

## Problem

Two versions of `@playwright/test` were installed:
- `1.51.1` (requested by Next.js 15.5.18)
- `1.60.0` (pinned in `package.json` as `^1.48.0`)

The older version (`1.51.1`) does not support module-level `test.describe()`, while the newer (`1.60.0`) does. The dual-version install caused `test.describe() called in configuration file` errors when running tests.

## Solution

1. **Downgraded** `@playwright/test` to `1.51.1` to match Next.js 15's peer dependency
2. **Created** `playwright.audit.config.ts` with:
   - `testDir: './tests/audit'` (moved test files to dedicated directory)
   - `testMatch` for specific audit test files
   - `reporter: 'list'`
   - `reuseExistingServer: true` (uses existing dev server on port 3000)
3. **Updated** `playwright.config.ts` to use `testMatch: '**/*.test.ts'` (excludes `.spec.ts` files)

## Files Changed

- `playwright.audit.config.ts` — NEW
- `playwright.config.ts` — Updated `testMatch`
- `tests/audit-fix-auth.spec.ts` — Moved to `tests/audit/`
- `tests/requirements.spec.ts` — Moved to `tests/audit/`

## Verification

```bash
npx playwright test --config=playwright.audit.config.ts --list
# Shows 29 matches across 2 projects × 2 config files
```