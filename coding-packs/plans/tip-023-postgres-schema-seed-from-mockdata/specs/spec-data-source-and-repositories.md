# SPEC: Data Source Boundary and Repository Integration

## AC-10: Mock mode never initializes PostgreSQL
- Given: `USE_MOCK_DATA=true` and no `DATABASE_URL`
- When: public pages `/vi`, `/vi/jobs`, `/vi/news`, and `/vi/about` render or their loaders run
- Then: mock data is used and PostgreSQL connection modules are not initialized

## AC-11: DB mode uses seeded PostgreSQL records
- Given: `USE_MOCK_DATA=false`, migrations have run, and seed data exists
- When: public home/jobs/news/about loaders run
- Then: returned data comes from PostgreSQL and preserves existing page/component contracts

## AC-12: Slug lookups parse JSON fields
- Given: seeded job/news records have slugs and JSONB arrays
- When: repository lookup by slug runs
- Then: returned objects include parsed `skills`/`tags` arrays and match TypeScript entity types

## AC-13: DB mode does not silently fallback
- Given: `USE_MOCK_DATA=false` but required PostgreSQL tables are missing
- When: a DB-backed repository method runs
- Then: an explicit database error is surfaced and mock fallback is not used
