# TIP-002: CMS Activity Data Model and Fixtures

**Agent:** claude
**Model:** sonnet
**File ownership:** `lib/cms/**`, `lib/mock-data.ts` only if needed
**Blocked by:** tip-001-red-specs

## Acceptance Criteria
- [ ] Define `CmsActivity`, `CmsActivityType`, `CmsEntityType`, `CmsDashboardMetrics`, and `CmsDatabaseUsageItem`.
- [ ] Activity fixtures derive from existing mock jobs/news/settings/application-like records.
- [ ] IDs, timestamps, and ordering are deterministic.
- [ ] Dashboard metrics are computed from records.
- [ ] Database usage map covers all TIP-024 database-required surfaces.

## Context
Read `../phase-02-cms-data-model-and-derived-fixtures.md` and TIP-024.

## Implementation Notes
- Create focused `lib/cms/*` files if `lib/mock-data.ts` is already too large.
- Use string literal unions for activity/entity types.
- Do not add a new database client.
