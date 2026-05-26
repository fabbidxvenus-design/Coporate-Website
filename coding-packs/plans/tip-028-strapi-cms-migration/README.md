# TIP-028 Strapi CMS Migration Plan

[CORE] Plan-supervised zflow workspace for implementing `coding-packs/tips/TIP-028-strapi-cms-migration.md`.

## Source TIP
- `coding-packs/tips/TIP-028-strapi-cms-migration.md`

## zflow Mode
- Mode: `--plan`
- Tier: THOROUGH
- Reason: system-wide CMS/data-source migration touching public routes, admin routes, API routes, environment config, privacy-sensitive application/CV handling, tests, and Strapi integration artifacts.

## Artifact Map
- `phase-01-intake-and-baseline.md` — inventory, decisions, and safety baseline.
- `phase-02-strapi-contract-and-docs.md` — Strapi content model/setup/permissions artifacts.
- `phase-03-schema-mapping-and-data-parity.md` — schema map, data parity contract, incremental route cutover.
- `phase-04-strapi-client-and-transformers.md` — server-only Strapi config, client, types, transformers.
- `phase-05-repository-and-route-migration.md` — data-source switch and API/public route migration.
- `phase-06-admin-applications-and-cv-privacy.md` — admin strategy, application submission, CV privacy.
- `phase-07-tests-verification-regression.md` — Red/Green Gate, visual smoke, verifier, regress, evolve.
- `specs/` — Given/When/Then behavioral specs.
- `tips/` — decomposed implementation TIPs with file ownership.
- `.zflow/` — machine-readable state, task graph, coverage matrix, reports, handoff.

## Execution Order
1. Phase 01
2. Phase 02
3. Phase 03
4. Phase 04
5. Phase 05
6. Phase 06
7. Phase 07

## Quality Gates
- Red Gate: specs + failing tests before implementation.
- Green Gate: spec tests pass + regression + separate verifier.
- Coverage: target 80% for changed Strapi/data-source modules where measurable.
- Visual: smoke screenshots for `/vi/jobs`, `/ja/news/[slug]`, `/vi/about`, `/admin` because public/admin pages are affected.
- Data parity: 100% parity for record counts and critical route fields unless exclusions are documented.
- Security: server-only Strapi secrets, restricted Strapi Admin/CORS, schema-based application/CV validation, private CV access, safe rich-text rendering.
- Cache/performance: authenticated Strapi revalidation path and LCP target < 2.5s where Lighthouse verification is available.
