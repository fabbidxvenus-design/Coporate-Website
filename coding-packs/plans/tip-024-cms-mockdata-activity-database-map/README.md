# zflow Plan — TIP-024 CMS Mock Data, Activity Feed, and Database Usage Map

## [CORE] Objective
Implement `coding-packs/tips/TIP-024-cms-mockdata-activity-database-map.md` through a plan-supervised zflow run with scoped artifacts under this folder.

## [DECISION] Tier
- Complexity score: 60
- Tier: STANDARD
- Rationale: database/data-source boundary + multiple CMS/API surfaces + test requirements, but no real migration/RLS implementation in scope.

## [CORE] Source of Truth
- TIP: `../../tips/TIP-024-cms-mockdata-activity-database-map.md`
- Standards:
  - `../../standards/cms/admin-shell.md`
  - `../../standards/database/supabase-saas.md`
  - `../../standards/domain/recruitment-content.md`
- Current code entry points:
  - `../../../lib/mock-data.ts`
  - `../../../app/admin/page.tsx`
  - `../../../app/admin/jobs/page.tsx`
  - `../../../app/admin/news/page.tsx`
  - `../../../app/admin/applications/page.tsx`
  - `../../../app/admin/settings/page.tsx`
  - `../../../app/api/applications/route.ts`
  - `../../../app/api/news/route.ts`
  - `../../../app/api/settings/route.ts`

## [CORE] Plan Phases
1. `phase-01-intake-and-red-specs.md` — inspect current data patterns and add failing behavioral specs/tests.
2. `phase-02-cms-data-model-and-derived-fixtures.md` — add CMS activity/dashboard/database usage types and deterministic mock fixtures.
3. `phase-03-data-source-boundary-and-admin-wiring.md` — wire admin dashboard/pages through shared helpers without visual redesign.
4. `phase-04-api-validation-and-error-boundaries.md` — add or adjust API boundary behavior if CMS activity is exposed through routes.
5. `phase-05-verify-regress-and-evolve.md` — run checks, separate review, deslop-only cleanup, final report.

## [CORE] Artifact Map
- `specs/spec-cms-mockdata-activity.md` — Given/When/Then acceptance criteria.
- `specs/spec-database-usage-map.md` — database-required surface expectations.
- `tips/tip-001-red-specs.md` — red gate task.
- `tips/tip-002-cms-data-model.md` — model/fixture task.
- `tips/tip-003-admin-wiring.md` — admin page wiring task.
- `tips/tip-004-api-boundary.md` — optional API validation task.
- `.zflow/intake.json` — complexity and tier state.
- `.zflow/tasks.json` — execution task graph.
- `.zflow/coverage-matrix.md` — TIP acceptance coverage.
- `.zflow/pipeline.json` — plan-mode zflow state.
- `.zflow/handoff.json` / `.zflow/handoff.md` — resume instructions.

## [CORE] Quality Gates
- Red Gate: behavioral specs and test files exist, compile, and fail before implementation.
- Green Gate: TIP-024 spec tests pass, existing test/build/type checks pass, and separate verifier reviews diff.
- Coverage Gate: STANDARD target 70%; fail-open only if the project does not expose measurable coverage.
- Visual Gate: if admin UI changes visible rendering, capture `/admin` screenshot before completion.
- Regression Gate: final checks re-run after cleanup; final report generated.
