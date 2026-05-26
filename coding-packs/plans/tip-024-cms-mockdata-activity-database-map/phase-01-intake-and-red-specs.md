# Phase 01 — Intake and Red Specs

## [CORE] Goal
Establish the zflow STANDARD run, inspect current app data-source/test conventions, and create failing tests before implementation.

## [CORE] Inputs
- `../../tips/TIP-024-cms-mockdata-activity-database-map.md`
- `../../../lib/mock-data.ts`
- `../../../lib/config/*`
- `../../../lib/db/*`
- Existing test config and test files.

## [SPEC] Required Work
1. Detect current test framework and naming convention.
2. Create behavioral specs from `specs/*.md` if not already present in the repo test suite.
3. Add failing tests for:
   - deterministic CMS activities derived from existing jobs/news/settings/application fixtures;
   - dashboard metrics computed from data records;
   - database usage map marks persisted surfaces as database-required;
   - mock mode does not require database access;
   - database mode does not import mock arrays directly inside CMS page loaders.
4. Run the minimal test command for the new tests and confirm Red Gate failure.
5. Record exact commands and results in `.zflow/verify-report.md` or `.zflow/pipeline.json` during execution.

## [RED] Red Gate Criteria
- Spec markdown files exist under this plan and are mirrored by actual test files in the project.
- Tests compile/type-check.
- At least one assertion fails because implementation is not complete yet.

## [PIVOT] If No Test Infrastructure Exists
Create the smallest project-consistent Vitest/Jest setup only if the repository has no usable test runner. Do not add a second test framework if one exists.

## [CONSTRAINT] Do Not
- Do not implement CMS data helpers in this phase.
- Do not modify visual layout.
- Do not loosen tests so they pass against existing hardcoded placeholders.
