# Phase 07 — Tests, Verification, Regression, and Evolve

## zflow Phase Mapping
- SPEC: Red Gate, failing tests before code.
- VERIFY: Green Gate with separate verifier agent.
- DESLOP: cleanup only after verification.
- REGRESS: final audit report.
- EVOLVE: background learning report.

## Goal
[CORE] Prove TIP-028 works in mock mode and Strapi mode, does not leak secrets, preserves UI routes, and remains buildable.

## Red Gate Requirements
Before implementation:
1. G/W/T specs exist in `specs/`.
2. Test files exist in the project test convention.
3. Tests compile.
4. At least one assertion fails for each behavioral group before implementation.

## Green Gate Requirements
After implementation:
1. All TIP-028 spec tests pass.
2. Existing regression tests pass.
3. Build/type checks pass.
4. Separate verifier agent reviews code changes.
5. Security reviewer checks token/privacy-sensitive changes.
6. Visual smoke evidence captured for affected public/admin pages.

## Required Automated Checks
Use actual project scripts detected from `package.json`. Expected commands are likely:
- `npm run lint` or equivalent
- `npm run typecheck` or equivalent
- `npm run test` or equivalent
- `npm run build` or equivalent

If a script is missing, record it in `.zflow/verify-report.md` and use the closest available check.

## Required Test Areas
1. Strapi config and secret handling.
2. Strapi transformers and status/locale filtering.
3. Data-source boundary: mock mode never initializes Strapi; Strapi mode never falls back to mock on failure.
4. Jobs/news public route behavior.
5. API envelope mapping for Strapi success/failure.
6. Application/CV privacy behavior.

## Visual Smoke Evidence
Because public/admin pages are affected, run the app and capture at minimum:
- `/vi/jobs` desktop 1440 and mobile 375.
- `/ja/news/[slug]` desktop 1440 using available fixture/content.
- `/vi/about` desktop 1440.
- `/admin` desktop 1440 after auth/mocked auth flow as project supports.

Record paths/screenshots in `.zflow/verify-report.md`. If browser verification cannot run, state the blocker explicitly.

## DESLOP Rules
- Formatting/import cleanup only.
- Dead Strapi test fixtures cleanup only if unused.
- No behavior changes after Green Gate unless returning to FIX.

## Final Artifacts
- `.zflow/verify-report.md`
- `.zflow/final-report.md`
- `.zflow/evolve-report.md`
- `.zflow/handoff.json`
- `.zflow/handoff.md`

## Acceptance Criteria
- [ ] Red Gate documented.
- [ ] Green Gate documented.
- [ ] Separate verifier report exists.
- [ ] Security review is complete for token/CV handling.
- [ ] Final report maps every TIP-028 acceptance criterion to evidence.
- [ ] EVOLVE background task is dispatched or represented by `.zflow/evolve-report.md` in plan artifacts.
