# SPEC: Strapi Removal

## AC-01: No active Strapi imports remain
- Given: the codebase contains active `lib/strapi/*` imports
- When: source code is scanned for production CMS routes
- Then: no imports from `lib/strapi/*` are found and no `STRAPI_*` runtime dependency exists

## AC-02: No active Strapi docs remain
- Given: Strapi docs exist in `coding-packs/strapi/*`
- When: TIP-029 is implemented
- Then: all active Strapi docs are either removed, rewritten as Payload docs, or clearly archived

## AC-03: No active Strapi env/infra remain
- Given: `infra/strapi/*`, `scripts/smoke-strapi.mjs`, `smoke:strapi` package script exist
- When: TIP-029 is implemented
- Then: none of these remain as active implementation paths

## AC-04: Payload CMS is the only CMS migration target
- Given: Payload CMS is being adopted as the replacement CMS backend
- When: the CMS backend integration is verified
- Then: jobs, news, applications, settings, and about content are served through Payload repositories