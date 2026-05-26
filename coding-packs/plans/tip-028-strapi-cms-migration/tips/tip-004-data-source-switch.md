# TIP-004: Data Source Switch

**Agent:** backend integration engineer
**Model:** sonnet
**File ownership:** `lib/config/data-source.ts`, `lib/cms/data-source.ts`, repository factory/barrel files, data-source tests
**Blocked by:** tip-003-strapi-repositories
**Acceptance criteria:**
- [ ] `USE_MOCK_DATA=true` uses mock repositories only and does not initialize Strapi.
- [ ] `USE_MOCK_DATA=false` uses Strapi repositories and never silently falls back to mock data.
- [ ] Missing Strapi env in production mode produces safe explicit setup errors.
- [ ] Existing callers can keep stable domain contracts where possible.

## Context
[SPEC] Implements AC-01, AC-02, AC-03, and AC-04.

## Implementation Notes
Preserve call-time flag evaluation. Avoid import-time side effects that break tests/fresh checkout.
