# Phase 03 — Repository Migration + Mock Boundary

## Objective

Port repositories from SQLite APIs to PostgreSQL queries while preserving public/API/CMS contracts and enforcing mock-vs-DB isolation.

## Inputs

- Phase 02 PostgreSQL runtime.
- `lib/db/repositories/jobs.ts`
- `lib/db/repositories/news.ts`
- `lib/db/repositories/about.ts`
- `lib/db/repositories/applications.ts`
- `lib/db/repositories/contact.ts`
- `lib/db/repositories/settings.ts`
- `lib/db/repositories/admin-auth.ts`
- Public/CMS pages and API handlers that consume repositories.

## Tasks

1. Centralize `USE_MOCK_DATA` semantics in one data-source boundary helper.
2. Ensure mock-mode repository paths return mock data without importing or initializing PostgreSQL.
3. Convert DB-mode repository methods to async parameterized PostgreSQL queries.
4. Preserve repository method names and return shapes.
5. Preserve public visibility rules:
   - Published jobs only on public jobs pages.
   - Published news only on public news pages.
6. Preserve admin session/auth behavior using current admin tables unless a later explicit decision changes auth provider.
7. Preserve API route error conventions without leaking stack traces, local paths, or secrets.
8. Run targeted repository and mock-boundary tests.

## Exit Gate

- Mock mode does not initialize PostgreSQL.
- DB mode does not silently return mock data on PostgreSQL failure.
- Public/CMS/API consumers compile against unchanged repository contracts.
- SQL values use parameters, never interpolation.

## Handoff

Proceed to Phase 04 once repositories can operate in PostgreSQL DB mode and mock mode remains isolated.
