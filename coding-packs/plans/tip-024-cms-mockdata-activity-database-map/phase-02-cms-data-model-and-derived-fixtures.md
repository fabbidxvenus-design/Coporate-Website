# Phase 02 — CMS Data Model and Derived Fixtures

## [CORE] Goal
Create typed CMS activity/dashboard/database usage data structures and deterministic fixtures derived from existing corporate mock data.

## [CORE] Candidate Files
- `lib/mock-data.ts`
- `lib/cms/types.ts`
- `lib/cms/mock-data.ts`
- `lib/cms/dashboard.ts`
- `lib/cms/database-usage.ts`

## [CORE] Implementation Steps
1. Inspect current `lib/mock-data.ts` size and exports.
2. If the file is large, create a focused `lib/cms/*` module instead of appending more bulk.
3. Define or export:
   - `CmsActivity`
   - `CmsActivityType`
   - `CmsEntityType`
   - `CmsDashboardMetrics`
   - `CmsDatabaseUsageItem`
4. Build deterministic `cmsActivities` from existing jobs/news/settings/application-like data.
5. Use fixed ISO timestamps and stable IDs.
6. Add `getCmsDashboardMetrics()` or equivalent derived helper; metrics must be computed from records.
7. Add `cmsDatabaseUsageMap` or equivalent typed export.

## [GREEN] Phase Exit Criteria
- Red tests for data model and derived fixtures pass.
- No module-level randomness, `Date.now()`, or generated order exists.
- Activity records reference existing entity IDs where possible.
- Database usage map includes jobs, news/articles, applications, settings, CV metadata/download audit, and persisted admin activity/audit log.

## [CONSTRAINT] Do Not
- Do not create unrelated placeholder CMS data.
- Do not add a database client in this phase.
- Do not reintroduce SQLite assumptions.
