# TIP-P2-001: Mock Mode Foundation

**Agent:** typescript implementer
**Model:** sonnet
**File ownership:** `.env.example`, `lib/mock-data.ts`, `lib/supabase/**`, `lib/mock/**`, `lib/data/**`, relevant `app/api/**/route.ts`
**Blocked by:** TIP-P1-001
**Acceptance criteria:**
- [ ] Default local mode uses mock data without Supabase credentials.
- [ ] Supabase mode remains available when mock is disabled with valid env.
- [ ] Mock fixtures are typed and cover status variety.
- [ ] Unit tests pass.

## Context
Read `phase-02-mock-mode-foundation.md` and Red Gate failures.

## Implementation Notes
Do not import server-only helpers into client components. Keep production auth/RLS assumptions intact.
