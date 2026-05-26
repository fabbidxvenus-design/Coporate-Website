# TIP-002: Strapi Core Client

**Agent:** backend engineer
**Model:** sonnet
**File ownership:** `lib/strapi/config.ts`, `lib/strapi/client.ts`, `lib/strapi/types.ts`, `lib/strapi/transformers.ts`, `lib/strapi/__tests__/**`
**Blocked by:** tip-001-strapi-contract-docs
**Acceptance criteria:**
- [ ] Server-only Strapi config validates env only on production Strapi paths.
- [ ] Client attaches token server-side and maps Strapi failures to safe typed errors.
- [ ] Types model Strapi collection/entity responses used by the app.
- [ ] Transformers return existing domain types and filter/normalize statuses/locales.
- [ ] Tests cover config, token secrecy, transformer success, and non-public filtering.

## Context
[SPEC] Implements AC-02, AC-03, AC-04, AC-05, AC-07, AC-09 foundations.

## Implementation Notes
Do not import `lib/strapi/*` from client components. Avoid module-level env validation that breaks mock-mode imports.
