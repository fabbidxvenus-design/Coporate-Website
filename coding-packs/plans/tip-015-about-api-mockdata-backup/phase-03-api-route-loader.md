# Phase 03 — API Route + Loader

## [CORE] Goal
Implement central About content loading and public API route with mock fallback.

## [CORE] Tasks
1. Create `lib/about/get-about-content.ts`.
2. Use `createClient()` from `lib/supabase/server.ts`.
3. If Supabase client is `null`, return mock content.
4. If Supabase read is not available or returns invalid data, return mock content.
5. Create `app/api/about/route.ts` with `GET /api/about?locale=vi|ja`.
6. Use a consistent API envelope:
   - success: `{ success: true, data, error: null }`
   - error: `{ success: false, data: null, error: { code, message } }`

## [CONSTRAINTS]
- Public API must not leak Supabase errors or admin-only content.
- Do not require Supabase for local/fresh checkout.
- Keep Supabase table integration minimal/deferred if no suitable table exists.

## [DONE]
- API E2E tests for `vi`, `ja`, and invalid locale pass.
