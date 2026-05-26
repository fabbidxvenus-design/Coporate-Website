# Phase 04 — Repository DB Mode Integration

## Objective
[CORE] Ensure repositories and public/CMS pages can read seeded PostgreSQL data in `USE_MOCK_DATA=false` while preserving mock-only behavior in `USE_MOCK_DATA=true`.

## Inputs
- Phase 02 migrations.
- Phase 03 seed command.
- `lib/config/data-source.ts`.
- `lib/db/repositories/*.ts`.
- Public pages using jobs/news/about/settings data.
- API routes using repository data.

## Tasks
1. [CORE] Audit repository methods for PostgreSQL compatibility and JSON parsing consistency.
2. [CORE] Ensure jobs/news/about/settings/application/contact/admin-auth repositories use seeded PostgreSQL tables in DB mode.
3. [SAFETY] Ensure `USE_MOCK_DATA=true` branches do not import or initialize PostgreSQL connection modules during normal rendering.
4. [CORE] Confirm public pages render seeded featured jobs/latest news/about/settings-backed UI without layout changes.
5. [CORE] Confirm slug lookup for seeded jobs/news returns parsed JSON fields matching TypeScript contracts.
6. [SAFETY] Ensure DB mode missing migration/table failures are explicit and not silently replaced by mock data.

## Deliverables
- Repository integration adjustments, if needed.
- DB mode tests for repository lookup/JSON parsing where feasible.
- Boundary regression tests for mock mode database isolation.

## Acceptance Criteria
- Given `USE_MOCK_DATA=true` and no `DATABASE_URL` When public routes load Then no PostgreSQL connection is attempted.
- Given seeded PostgreSQL data and `USE_MOCK_DATA=false` When public home/jobs/news/about pages load Then data comes from PostgreSQL and existing UI composition remains unchanged.
- Given seeded job/news slugs When repository lookup by slug runs Then returned rows include parsed skills/tags and valid published visibility.
- Given DB mode is active but a required table is missing When a repository method runs Then it fails clearly instead of falling back to mock data.

## Verification
- Red/green tests for data-source boundary and repository lookup.
- Type-check and targeted tests after integration.
