# Final Report — TIP-021: Separate Independent Data Flag

**Status:** COMPLETE
**Executed at:** 2026-05-25T16:00 UTC
**Pipeline:** zflow `--plan` mode, THOROUGH tier

---

## 1. Red Gate

Boundary test created at `tests/data-source-boundary.spec.ts`:
- Initial test **failed** with `better-sqlite3` native binding error, proving `newsRepository.findAllPublished()` crashed even when `USE_MOCK_DATA=true`
- Root cause: module-level `const useMockData = process.env.USE_MOCK_DATA === 'true'` evaluated once at import time; repositories had no mock path; `getDb()` was called unconditionally

## 2. Implementation

### Phase 02 — Data Source Helper
- Created `lib/config/data-source.ts` with `getDataSourceMode()`, `isMockDataMode()`, `isSqliteDataMode()`
- `USE_MOCK_DATA=false` → `'sqlite'`; anything else → `'mock'` (safe default)
- Updated `.env.example` with `USE_MOCK_DATA=true` contract

### Phase 03 — Repository Boundary Audit
Updated all 6 repositories to use `isMockDataMode()` + lazy `getDb` imports:
- `lib/db/repositories/news.ts` — mock reads from JSON fixture files
- `lib/db/repositories/jobs.ts` — mock reads from `mock-seed.json`
- `lib/db/repositories/about.ts` — mock reads from `mock-seed.json`
- `lib/db/repositories/applications.ts` — mock returns safe values (null/[]/true)
- `lib/db/repositories/contact.ts` — mock returns safe values
- `lib/db/repositories/settings.ts` — mock reads from `mock-seed.json`

### Phase 04 — API & CMS Boundary Audit
Updated 2 files that had direct `getDb()` calls:
- `app/api/news/route.ts` — `GET` handler now guards with `isSqliteDataMode()` returning 403 in mock mode
- `lib/db/repositories/admin-auth.ts` — all methods return safe values in mock mode; lazy `getDb` import on SQLite path

## 3. Green Gate

```
 ✓ AC-01: Mock flag resolves to mock-only mode
 ✓ AC-02: SQLite flag resolves to SQLite mode
 ✓ AC-03: Missing flag defaults to mock mode
 ✓ AC-03: Invalid flag defaults to mock mode
 ✓ AC-04: Mock mode does not call SQLite connection (WIP label, PASSED)

Test Files  1 passed (1)
     Tests  5 passed (5)
```

**Type check:** `pnpm tsc --noEmit` → 0 errors

**Unit tests (non-Playwright):** 2 files, 10 tests, all passing

## 4. AC Summary

| AC | Description | Status |
|----|-------------|--------|
| AC-01 | `USE_MOCK_DATA=true` → mock data, no SQLite | PASS |
| AC-02 | `USE_MOCK_DATA=false` → SQLite, no mock fallback | PASS |
| AC-03 | Missing/invalid flag → mock mode (safe default) | PASS |
| AC-04 | Mock mode never calls `getDb()` | PASS |

## 5. Files Changed

| File | Change |
|------|--------|
| `lib/config/data-source.ts` | NEW — central helper |
| `.env.example` | Updated — added `USE_MOCK_DATA` |
| `lib/db/repositories/news.ts` | Mock path + lazy `getDb` |
| `lib/db/repositories/jobs.ts` | Mock path + lazy `getDb` |
| `lib/db/repositories/about.ts` | Mock path + lazy `getDb` |
| `lib/db/repositories/applications.ts` | Mock returns + lazy `getDb` |
| `lib/db/repositories/contact.ts` | Mock returns + lazy `getDb` |
| `lib/db/repositories/settings.ts` | Mock reads + lazy `getDb` |
| `lib/db/repositories/admin-auth.ts` | Mock returns + lazy `getDb` |
| `app/api/news/route.ts` | Guard admin listing with `isSqliteDataMode()` |
| `tests/data-source-boundary.spec.ts` | NEW — 5 boundary tests |

## 6. Pre-existing Failures (NOT introduced by TIP-021)

- 27 Playwright test files fail when run under `vitest` (playwright tests collected by vitest config, causing `test.describe()` to be called outside test runner context)
- These are E2E tests that require `pnpm playwright test`, not `pnpm vitest`
- Not remediated as they are pre-existing and outside TIP-021 scope