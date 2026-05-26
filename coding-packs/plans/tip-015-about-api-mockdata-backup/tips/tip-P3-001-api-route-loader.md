# TIP-P3-001: About API Route and Loader

**Agent:** claude
**Model:** sonnet
**File ownership:** `lib/about/get-about-content.ts`, `app/api/about/route.ts`
**Blocked by:** TIP-P2-001

## Acceptance Criteria
- [ ] `GET /api/about?locale=vi|ja` returns success envelope and full content.
- [ ] Invalid locale returns Vietnamese fallback.
- [ ] Missing Supabase credentials return mock content, not 503.
- [ ] API E2E tests pass.

## Context
Read `phase-03-api-route-loader.md`.

## Implementation Notes
Keep Supabase integration safe/minimal. Do not add admin CRUD.
