# Phase 02 — Strapi Contract and Documentation Artifacts

## zflow Phase Mapping
- DECOMPOSE support phase before implementation.
- Produces Strapi source-of-truth artifacts consumed by later coding phases.

## Goal
[CORE] Define the Strapi content model, permissions, environment setup, and operational expectations before writing the Next.js integration.

## Files to Create
- `coding-packs/strapi/setup.md`
- `coding-packs/strapi/content-types.md`
- `coding-packs/strapi/permissions.md`

## Required Content
### `setup.md`
- Strapi version assumption and deployment model.
- Required environment variables in Next.js:
  - `STRAPI_URL`
  - `STRAPI_API_TOKEN`
  - optional `STRAPI_MEDIA_URL` if media uses a different origin.
  - optional `STRAPI_ADMIN_URL` for admin handoff links.
- REST endpoint conventions.
- Locale strategy: use Strapi i18n if available; otherwise explicit `locale` field.
- Local development checklist.
- Production checklist.

### `content-types.md`
Document these content types with field types, required fields, uniqueness, relations, and status/public visibility rules:
1. `job`
2. `article` or `newsArticle`
3. `application`
4. `siteSetting`
5. `aboutPage`

### `permissions.md`
- Public token/access policy for published reads only, if public reads are used.
- Server API token permissions for Next.js route handlers.
- Admin role expectations.
- Media/CV privacy rules.
- Prohibited permissions.

## Implementation Notes
- Do not claim a Strapi app exists in the repo unless it is actually added.
- Prefer documentation artifacts over generated Strapi source files for this repo unless approved otherwise.
- Keep content model names aligned with existing domain types and route behavior.

## Acceptance Criteria
- [ ] Strapi setup docs specify every required env var and local/prod setup step.
- [ ] Content-type docs cover all fields listed in TIP-028.
- [ ] Permission docs explicitly prevent public CV access and token exposure.
- [ ] Locale strategy is explicit and maps to `/vi` and `/ja` public routes.
