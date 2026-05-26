# TIP-029 Implementation Tips

## Global Context
TIP-029: Remove Strapi and adopt Payload CMS. All work on branch `feat/tip-029-payload-cms`. Run validation after each tip.

## tip-001: Remove Strapi source code
**Agent:** general-purpose | **Model:** sonnet
**Files:** `lib/strapi/*` (DELETE ENTIRE DIRECTORY), `tests/unit/lib/strapi/*` (already deleted)
**Blocked by:** none
**Acceptance criteria:**
- [ ] `lib/strapi/` directory is deleted
- [ ] no `lib/strapi` references in any `.ts` file in `lib/`

## tip-002: Remove Strapi docs and infra
**Agent:** general-purpose | **Model:** sonnet
**Files:** `coding-packs/strapi/*` (DELETE), `infra/strapi/*` (DELETE), `scripts/smoke-strapi.mjs` (DELETE)
**Blocked by:** tip-001
**Acceptance criteria:**
- [ ] `coding-packs/strapi/` is deleted or archived
- [ ] `infra/strapi/` is deleted
- [ ] `scripts/smoke-strapi.mjs` is deleted
- [ ] `smoke:strapi` is removed from `package.json` scripts

## tip-003: Remove STRAPI env references from .env.example
**Agent:** general-purpose | **Model:** sonnet
**Files:** `.env.example`
**Blocked by:** tip-002
**Acceptance criteria:**
- [ ] No `STRAPI_` variables remain in `.env.example`

## tip-004: Create lib/payload/config.ts and lib/config/data-source.ts update
**Agent:** general-purpose | **Model:** sonnet
**Files:** `lib/payload/config.ts`, `lib/payload/client.ts`, `lib/payload/types.ts`, `lib/config/data-source.ts`
**Blocked by:** tip-001
**Acceptance criteria:**
- [ ] `lib/payload/config.ts` exports `getPayloadConfig()` (throws if `PAYLOAD_SECRET` missing) and `isPayloadDataMode()` (returns `USE_MOCK_DATA !== 'true' && !!PAYLOAD_SECRET`)
- [ ] `lib/config/data-source.ts` exports `isPayloadDataMode` alongside existing `isMockDataMode`, `isSqliteDataMode`, `isPostgresDataMode`
- [ ] `lib/payload/client.ts` creates Payload instance
- [ ] `lib/payload/types.ts` has Payload-specific types (PayloadJob, PayloadArticle, PayloadApplication, etc.)

## tip-005: Create Payload repositories
**Agent:** general-purpose | **Model:** sonnet
**Files:** `lib/payload/repositories/jobs.ts`, `news.ts`, `applications.ts`, `settings.ts`, `about.ts`, `index.ts`
**Blocked by:** tip-004
**Acceptance criteria:**
- [ ] All 5 repository files exist under `lib/payload/repositories/`
- [ ] Each exports CRUD methods matching existing app domain types
- [ ] Mock-mode check in each method: `if (isMockDataMode()) return mock data`
- [ ] Application repository `create` has mock branch (return mock Application object)

## tip-006: Update lib/repositories/index.ts to use Payload
**Agent:** general-purpose | **Model:** sonnet
**Files:** `lib/repositories/index.ts`
**Blocked by:** tip-005
**Acceptance criteria:**
- [ ] Repository barrel imports from `lib/payload/repositories/*` instead of `lib/strapi/repositories/*`
- [ ] `strapiApplicationsRepo` replaced with `payloadApplicationsRepo`
- [ ] All other strapi repo references replaced with payload equivalents
- [ ] `create` and `updateStatus` in applicationsRepository have mock-mode branches

## tip-007: Add Payload docs to coding-packs/payload/
**Agent:** general-purpose | **Model:** sonnet
**Files:** `coding-packs/payload/setup.md`, `content-types.md`, `permissions.md`
**Blocked by:** tip-004
**Acceptance criteria:**
- [ ] `coding-packs/payload/setup.md` documents Payload setup (embedded in Next.js preferred)
- [ ] `coding-packs/payload/content-types.md` defines collections: jobs, articles, applications, media, siteSettings, aboutPages
- [ ] `coding-packs/payload/permissions.md` documents API token permissions

## tip-008: Add payload boundary tests
**Agent:** general-purpose | **Model:** sonnet
**Files:** `tests/unit/lib/payload/config.test.ts`, `tests/unit/lib/payload/transformers.test.ts`, `tests/unit/lib/repositories/payload-boundary.test.ts`
**Blocked by:** tip-005, tip-006
**Acceptance criteria:**
- [ ] Config test: `getPayloadConfig` throws without `PAYLOAD_SECRET`
- [ ] Boundary test: `isMockDataMode()` returns true → Payload not initialized
- [ ] Boundary test: no direct postgres/SQLite imports in Payload repo files
- [ ] Transformer test: Payload entities transform to app domain types

## tip-009: Final validation
**Agent:** general-purpose | **Model:** sonnet
**Files:** ALL
**Blocked by:** tip-001 through tip-008
**Acceptance criteria:**
- [ ] `pnpm type-check` passes
- [ ] `pnpm build` passes
- [ ] SPEC tests pass (all 19 should be green)
- [ ] No `STRAPI_*`, `lib/strapi`, `smoke:strapi` references remain