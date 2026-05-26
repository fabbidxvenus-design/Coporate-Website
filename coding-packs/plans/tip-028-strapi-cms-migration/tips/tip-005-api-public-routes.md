# TIP-005: API and Public Route Migration

**Agent:** fullstack engineer
**Model:** sonnet
**File ownership:** `app/api/jobs/**`, `app/api/news/**`, `app/api/settings/**`, `app/[locale]/jobs/**`, `app/[locale]/news/**`, `app/[locale]/about/**`, route tests
**Blocked by:** tip-004-data-source-switch
**Acceptance criteria:**
- [ ] Jobs and news API routes keep existing response envelope.
- [ ] Public jobs/news/about pages render mock mode without Strapi env.
- [ ] Public jobs/news/about pages render published localized Strapi data in production mode.
- [ ] Missing/unpublished detail content returns existing notFound behavior.
- [ ] No visual redesign is introduced.

## Context
[SPEC] Implements AC-05 through AC-09 plus API error behavior from AC-04.

## Implementation Notes
If public pages already consume repository functions directly, preserve that pattern and keep Strapi hidden behind repositories.
