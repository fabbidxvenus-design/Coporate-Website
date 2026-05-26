# TIP-028 Implementation Map

## Data-Source Guardrail
File: `lib/config/data-source.ts`

Current exports:
- `getDataSourceMode()`
- `isMockDataMode()`
- `isSqliteDataMode()`

Current env behavior:
- `USE_MOCK_DATA=false` currently means SQLite/production repository mode.
- `NEXT_PUBLIC_USE_MOCK_DATA` appears in CMS metrics helper and should be consolidated or kept read-only/client-safe.

## Current Repository Method Shapes
### `jobsRepository` — `lib/db/repositories/jobs.ts`
- `findAllPublished(locale?)`
- `findAll()`
- `findById(id)`
- `create(data)`
- `update(id, data)`
- `delete(id)`

### `newsRepository` — `lib/db/repositories/news.ts`
- `findAllPublished(locale?)`
- `findBySlug(slug, locale?)`
- `findById(id)`
- `create(data)`
- `update(id, data)`
- `delete(id)`
- `incrementViews(id)`

### `applicationsRepository` — `lib/db/repositories/applications.ts`
- `findById(id)`
- `findByJobId(jobId)`
- `findAll(filters?)`
- `create(data)`
- `updateStatus(id, status)`
- `countByJobId(jobId)`

## Direct Import Targets
- `app/api/jobs/route.ts` imports `jobsRepository`.
- `app/api/news/route.ts` imports `newsRepository` but GET has direct DB access that must be routed through a repository boundary.
- `app/api/applications/route.ts` imports `applicationsRepository` and `jobsRepository`.

## Mock-Mode Guardrails
- Jobs mock source: `lib/mock-data.ts` `jobs`.
- News mock source: `lib/mock-data.ts` `newsArticles`.
- Applications mock behavior currently returns empty/null in some paths.
- CMS auxiliary mock source: `lib/cms/mock-data.ts`.

## Required Migration Shape
- Introduce `lib/strapi/**` behind the repository/data-source boundary.
- Keep UI/routes consuming app domain types, not Strapi raw responses.
- Ensure `USE_MOCK_DATA=true` never imports/initializes/calls Strapi request paths.
- Ensure `USE_MOCK_DATA=false` fails loudly on missing Strapi config and never falls back to mock.

## Test Insertion Points
- Unit: `lib/strapi/config`, `lib/strapi/transformers`, `lib/cms/data-source`.
- Unit/integration: API route handlers for jobs/news/applications.
- Security: application validation/CV access route and revalidation endpoint.
