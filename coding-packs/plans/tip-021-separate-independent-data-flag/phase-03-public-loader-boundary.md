# Phase 03 — Public Loader Boundary Audit

## Objective
Ensure public routes never touch SQLite in mock mode and preserve SQLite behavior in DB mode.

## Tasks
1. Inventory public data-loading files for jobs, news, about, home, contact, and locale routes.
2. Replace direct `process.env.USE_MOCK_DATA` checks with the shared helper.
3. Ensure mock-mode paths use only mock/crawled mock modules.
4. Ensure SQLite-mode paths use SQLite repositories and fail explicitly on DB problems.
5. Avoid static imports that open SQLite before the mode check.
6. Preserve all UI output and route structure.

## Files To Inspect
- `app/(public)/**/page.tsx`
- `app/[locale]/**/page.tsx`
- `lib/db/repositories/jobs.ts`
- `lib/db/repositories/news.ts`
- `lib/db/repositories/about.ts`
- `lib/mock-data.ts`
- `lib/corporate-mock-data.ts` or equivalent crawled mock modules

## Exit Criteria
- [ ] Public jobs/news/about loaders obey strict boundary.
- [ ] Mock mode does not call SQLite code.
- [ ] SQLite mode does not silently fallback to mock.
- [ ] Targeted tests pass for public loaders.
