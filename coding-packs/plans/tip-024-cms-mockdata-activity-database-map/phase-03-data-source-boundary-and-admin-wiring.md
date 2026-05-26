# Phase 03 — Data Source Boundary and Admin Wiring

## [CORE] Goal
Wire CMS pages through shared mock/database-aware helpers while preserving existing CMS visual layout.

## [CORE] Candidate Files
- `lib/config/*`
- `lib/cms/data-source.ts`
- `app/admin/page.tsx`
- `app/admin/jobs/page.tsx`
- `app/admin/news/page.tsx`
- `app/admin/applications/page.tsx`
- `app/admin/settings/page.tsx`

## [CORE] Implementation Steps
1. Identify current mock-vs-database flag behavior from TIP-021/TIP-022 implementation.
2. Add call-time helper(s) such as `getCmsActivities()`, `getCmsDashboardData()`, or project-consistent equivalents.
3. Ensure mock mode reads deterministic CMS mock data without opening database connections.
4. Ensure database mode routes through existing database/API abstractions and does not import mock arrays directly in CMS loaders.
5. Replace dashboard hardcoded counters/recent activity with derived data.
6. Replace duplicated CMS placeholder data where it overlaps with shared mock fixtures.
7. Preserve class names, layout structure, sidebar/topbar behavior, and status badge visual language.

## [GREEN] Phase Exit Criteria
- Admin dashboard metrics and recent activity are data-derived.
- Existing CMS pages still render in mock mode without Supabase/Postgres config.
- Database mode has an explicit path through existing abstractions.
- No public page layout changes are introduced.

## [VISUAL] Evidence
If rendered HTML changes on `/admin`, capture screenshot evidence in `evidence/admin-dashboard-after.png` during verification.

## [CONSTRAINT] Do Not
- Do not redesign CMS pages.
- Do not persist activity in browser storage.
- Do not silently fall back from database mode to mock mode.
