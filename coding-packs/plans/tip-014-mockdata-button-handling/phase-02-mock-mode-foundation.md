# Phase 02: Mock Mode Foundation

## [CORE] Goal
Make mock data the default local/fresh-checkout behavior and create typed mock helpers that preserve Supabase production mode.

## [CORE] Files Likely Owned
- `.env.example`
- `lib/mock-data.ts`
- `lib/supabase/server.ts`
- `lib/supabase/client.ts`
- `lib/mock/**` or `lib/data/**` if new helpers are needed
- `app/api/**/route.ts` only where mock-safe API behavior is required
- `tests/unit/mockdata-default.test.ts`

## [CORE] Tasks
1. Define one source of truth for mock mode:
   - `USE_MOCK_DATA=true` explicitly enables mock mode.
   - Missing/placeholder Supabase env vars fall back to mock mode.
   - Valid Supabase env + `USE_MOCK_DATA=false` preserves Supabase behavior.
2. Document default local mock mode in `.env.example`.
3. Extend typed mock fixtures:
   - Jobs: published + draft/review/closed/archived status coverage.
   - News: published + draft status coverage.
   - Applications: multiple statuses and CV metadata.
   - Settings/site metadata.
   - Admin profile/session fixture if needed for admin E2E.
4. Add helper/repository functions if needed:
   - Public reads from mock fixtures.
   - Mock submit/mutation return payloads.
   - Deterministic mock error trigger for tests.
5. Ensure API routes used by forms support mock mode:
   - Contact submission.
   - Application submission.
   - Admin route handlers where UI calls APIs.

## [GREEN] Acceptance Criteria
- [ ] Unit tests for mock-mode resolution pass.
- [ ] Missing Supabase env never crashes public pages.
- [ ] Mock fixtures are typed and mirror production shape.
- [ ] Supabase path remains reachable when mock is disabled with valid env.
- [ ] No production auth/RLS/security behavior is weakened.

## [QUALITY] Notes
Avoid importing server-only helpers into client components. If client components need mock behavior, expose it through route handlers, local component state, or safe public constants that do not include secrets.
