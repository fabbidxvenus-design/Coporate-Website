# TIP-P1-001: Button Inventory and Red Gate Tests

**Agent:** tdd-guide
**Model:** sonnet
**File ownership:** `coding-packs/plans/tip-014-mockdata-button-handling/**`, `tests/e2e/mockdata-*.spec.ts`, `tests/e2e/button-screen-map.spec.ts`, `tests/unit/mockdata-default.test.ts`, `tests/audit/no-dead-buttons.spec.ts`
**Blocked by:** none
**Acceptance criteria:**
- [ ] Button inventory covers public + CMS surfaces.
- [ ] G/W/T specs exist.
- [ ] `button-screen-map.spec.ts` uses Playwright to inspect each screen, build screen-map artifacts, and click every visible enabled action.
- [ ] Red Gate tests compile and fail for real missing behavior.

## Context
Read `phase-01-inventory-red-gate.md` and TIP-014.

## Implementation Notes
Do not modify implementation files in this TIP. Only add inventory/spec/test artifacts.
