# TIP-003: Strapi Repositories

**Agent:** backend engineer
**Model:** sonnet
**File ownership:** `lib/strapi/repositories/**`, repository tests under `lib/strapi/**`
**Blocked by:** tip-002-strapi-core-client
**Acceptance criteria:**
- [ ] Jobs repository supports localized published list/detail and admin create/update strategy.
- [ ] News repository supports localized published list/detail and admin create/update strategy.
- [ ] Applications repository supports create/list/detail/status update without public CV leakage.
- [ ] Settings/about repositories return existing app domain shapes.
- [ ] Repository tests use mocked Strapi responses and cover error behavior.

## Context
[CORE] Repositories are the only production code allowed to know Strapi API shape beyond the client/transformers.

## Implementation Notes
Match current PostgreSQL repository method names where practical to minimize UI churn.
