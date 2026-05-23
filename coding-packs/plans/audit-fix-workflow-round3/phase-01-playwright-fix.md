# Phase 01 — Fix Playwright Runner Conflict

## Task

Create standalone `playwright.audit.config.ts` and align `@playwright/test` version.

## Problem

Two `@playwright/test` versions installed:
- `1.51.1` (Next.js 15 peer dep)
- `1.60.0` (`package.json` pin)

`1.51.1` doesn't support module-level `test.describe()`. Dual versions caused errors.

## Steps

1. **Downgrade** `@playwright/test` to `1.51.1`
2. **Move** test files to `tests/audit/` directory
3. **Create** `playwright.audit.config.ts`
4. **Update** `playwright.config.ts` with `testMatch: '**/*.test.ts'`

## Files

- `playwright.audit.config.ts` — NEW
- `playwright.config.ts` — UPDATED
- `tests/audit/audit-fix-auth.spec.ts` — MOVED
- `tests/audit/requirements.spec.ts` — MOVED

## Verification

```bash
npx playwright test --config=playwright.audit.config.ts --list
```