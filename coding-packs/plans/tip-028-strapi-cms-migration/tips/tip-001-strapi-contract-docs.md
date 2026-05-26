# TIP-001: Strapi Contract Docs

**Agent:** technical-writer / backend architect
**Model:** opus
**File ownership:** `coding-packs/strapi/**`
**Blocked by:** none
**Acceptance criteria:**
- [ ] `coding-packs/strapi/setup.md` documents local/prod setup, env vars, REST conventions, locale strategy, and admin URL strategy.
- [ ] `coding-packs/strapi/content-types.md` documents job, article/newsArticle, application, siteSetting, and aboutPage fields.
- [ ] `coding-packs/strapi/permissions.md` documents server token permissions, public published-read expectations, and private CV/media rules.
- [ ] No real secrets appear in docs.

## Context
[CORE] TIP-028 does not require a checked-in Strapi app by default. If the repository does not host Strapi source, documentation artifacts are the source of truth for external Strapi setup.

## Implementation Notes
Prefer Strapi REST and i18n plugin if available. If not, document explicit `locale` fields and filters.
