# Phase 01 — Intake and Baseline

## zflow Phase Mapping
- INTAKE: run
- RRI/SDD/PROPOSAL: skipped because this is plan-supervised mode and TIP-028 is the approved design input.
- SPEC: prepare acceptance extraction for Phase 06.

## Complexity Score
[CORE] Score: 100 / THOROUGH

### Signals
- Architecture/migration keywords: +20
- Risk/security/database/auth/privacy keywords: +15
- Cross-file scope > 3 paths: +10
- Estimated subtasks: +25
- Cross-file dependencies: +15
- Test/verify requirements: +5
- System-wide impact: +20
- Difficult reversibility: +15
- Clamped to 100

## Objectives
1. Establish current data-source and admin/public route baseline before Strapi work.
2. Confirm mock-mode behavior and required production behavior from TIP-028.
3. Lock decisions that must not drift during implementation.
4. Record quality warnings for all later phases.

## Inputs
- `coding-packs/tips/TIP-028-strapi-cms-migration.md`
- `coding-packs/product/tech-stack.md`
- `coding-packs/standards/cms/admin-shell.md`
- `coding-packs/standards/database/supabase-saas.md`
- `coding-packs/standards/domain/recruitment-content.md`
- `coding-packs/standards/frontend/html-to-nextjs.md`
- `coding-packs/standards/ui/design-tokens.md`
- Existing source files listed in TIP-028 CONTEXT.

## Baseline Tasks
1. Inspect current package scripts and test framework.
2. Inspect data-source boundary files:
   - `lib/config/data-source.ts`
   - `lib/cms/data-source.ts`
   - `lib/cms/types.ts`
   - `lib/cms/mock-data.ts`
3. Inspect current production repositories:
   - `lib/db/repositories/jobs.ts`
   - `lib/db/repositories/news.ts`
   - `lib/db/repositories/applications.ts`
   - `lib/db/repositories/settings.ts`
   - `lib/db/repositories/about.ts`
4. Inspect API route response patterns and error envelopes.
5. Inspect public and admin routes for direct repository imports.
6. Capture current behavior notes for mock mode and production mode.

## Decisions
- [DECISION] Default Strapi API style: REST, unless an existing Strapi GraphQL plugin is already configured by the user.
- [DECISION] Strapi integration code is server-only and lives behind `lib/strapi/*` plus repository selection boundaries.
- [DECISION] `USE_MOCK_DATA=true` remains a hard no-network mode.
- [DECISION] Do not embed or scaffold a full Strapi application inside this repository unless user explicitly approves; default plan creates Strapi setup/content-type/permissions docs and Next.js integration.
- [DECISION] Supabase Auth and existing admin protection remain unless implementation proves incompatible.

## Quality Warnings
- [CORE] Visual parity has priority over cleanup: do not redesign public/admin pages during this migration.
- [CORE] Mock data isolation is a known user preference: call-time flag evaluation must prevent Strapi/database calls in mock mode.
- [SECURITY] Strapi token must never appear in client components, props sent to the browser, logs, screenshots, or API responses.
- [SECURITY] Candidate CV storage/access must remain private.
- [PIVOT] Production Strapi failure must fail loudly, not silently fall back to mock data.

## Exit Criteria
- Current file ownership and data-source imports are mapped.
- Open questions are recorded as implementation decisions, not blockers.
- `.zflow/intake.json`, `.zflow/pipeline.json`, and `.zflow/coverage-matrix.md` exist.
