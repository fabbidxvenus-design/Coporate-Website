# SPEC: Payload + PostgreSQL Seed and Import

## AC-01: Seed command creates published jobs in Payload
- Given: Payload and Postgres are running with no existing jobs
- When: `pnpm payload:seed` (or equivalent) runs
- Then: at least 3 jobs are created in the Payload `jobs` collection
- And: at least 1 job has status `published`
- And: at least 1 job has status `draft` or `review` (non-published)

## AC-02: Seed command creates published news articles in Payload
- Given: Payload and Postgres are running with no existing articles
- When: `pnpm payload:seed` runs
- Then: at least 3 news articles are created in the Payload `articles` collection
- And: at least 1 article has status `published`

## AC-03: Seed is idempotent
- Given: Payload and Postgres are running and at least 1 published job exists
- When: `pnpm payload:seed` runs a second time
- Then: the total job count does not increase
- And: no duplicate slug entries exist in the database

## AC-04: Seed skips gracefully when source data is unavailable
- Given: seed source files (mock data or crawled data) are missing
- When: `pnpm payload:seed` runs
- Then: it does not throw an unhandled error
- And: it prints a clear message indicating what source is missing
- And: it exits with zero code (or documents expected skip behavior)

## AC-05: Seed creates site settings and about content
- Given: Payload and Postgres are running with no settings/about records
- When: `pnpm payload:seed` runs
- Then: at least one site-settings document exists with `companyName`
- And: at least one about-pages document exists with `heroTitle`

## AC-06: Public jobs page renders seeded published content
- Given: `pnpm payload:seed` has completed with published jobs
- And: `pnpm dev:payload` is running with `USE_MOCK_DATA=false`
- When: `/vi/jobs` is opened in a browser
- Then: at least 1 seeded job title is visible
- And: the seeded job card links to a detail page

## AC-07: Public news page renders seeded published content
- Given: `pnpm payload:seed` has completed with published articles
- And: `pnpm dev:payload` is running with `USE_MOCK_DATA=false`
- When: `/vi/news` is opened in a browser
- Then: at least 1 seeded article title is visible

## AC-08: Draft/non-published content is not visible on public routes
- Given: `pnpm payload:seed` has created both published and draft jobs
- When: `/vi/jobs` is opened
- Then: no job with status `draft` or `review` appears in the listing