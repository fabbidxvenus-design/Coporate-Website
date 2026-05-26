# tip-P3-001 — Repositories + Mock Boundary

## Goal

Port repository DB-mode behavior to PostgreSQL while preserving mock-mode database independence.

## Instructions

1. Centralize `USE_MOCK_DATA` semantics.
2. Ensure mock-mode loaders do not import or initialize PostgreSQL.
3. Convert repository DB methods to async PostgreSQL parameterized queries.
4. Preserve method names and return shapes consumed by pages/API/CMS.
5. Preserve public published-only visibility rules.

## Acceptance

- Mock mode works without `DATABASE_URL`.
- DB mode never silently falls back to mock data.
- Public/API/CMS contracts compile unchanged or with minimal call-site updates only where async boundaries require it.
