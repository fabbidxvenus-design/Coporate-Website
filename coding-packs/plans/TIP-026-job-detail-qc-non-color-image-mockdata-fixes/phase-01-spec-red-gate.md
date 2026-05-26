# phase-01-spec-red-gate — SPEC [RED]

## [CORE] Objective
Create executable behavioral specs and failing tests for TIP-026 before touching production code.

## [DECISION] zflow Behavior
- Plan-supervised mode: RRI, SDD, and PROPOSAL are skipped because `TIP-026` is the approved design input.
- Red Gate is mandatory before implementation.
- Test files should be added to the project test suite in the existing Playwright/Vitest style.

## [SPEC] Required Outputs
1. `specs/job-detail-non-excluded-qc.md` with Given/When/Then acceptance criteria.
2. A Playwright/audit spec that initially fails on current code, preferably one of:
   - `tests/audit/job-detail-qc-non-excluded.spec.ts`
   - or another existing audit-test convention if the repo already has a better matching file.
3. Red Gate evidence saved to `.zflow/quality-gates/red-gate.md`.

## [RED] Test Coverage Targets
The red tests must cover:
- Accessible names for share/icon buttons.
- No invalid ARIA/list semantics in related jobs.
- Related jobs render as full cards, not compact link rows.
- Sidebar available fields render in reference-like grouped rows.
- Apply CTA radius/shape is corrected without asserting color changes.
- No horizontal overflow at 375, 768, 1024, 1440.
- Remaining COLOR, IMAGE, MOCKDATA findings are documented as intentionally out of scope.

## [CONSTRAINT] Scope Exclusions
Do not assert or require:
- Teal/pink color parity.
- Hero image/banner replacement.
- Mock data value additions such as quantity, deadline, phone, or email when absent.

## [GATE] Red Gate Checklist
- [ ] Spec markdown exists in `specs/`.
- [ ] Test file compiles.
- [ ] At least one test assertion fails against current code before implementation.
- [ ] Failing assertions map to TIP-026 non-excluded acceptance criteria.
- [ ] Red Gate evidence saved in `.zflow/quality-gates/red-gate.md`.
