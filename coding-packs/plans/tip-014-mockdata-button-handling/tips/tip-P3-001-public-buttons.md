# TIP-P3-001: Public Button Handling

**Agent:** frontend implementer
**Model:** sonnet
**File ownership:** `app/(public)/**`, `app/[locale]/**`, `components/JobCard.tsx`, `components/NewsCard.tsx`, `components/public/**`, public API usage tests
**Blocked by:** TIP-P1-001, TIP-P2-001
**Acceptance criteria:**
- [ ] All public buttons/links/actions are handled or intentionally disabled with accessible explanation.
- [ ] `/vi` and `/ja` navigation preserves locale.
- [ ] Contact/apply mock submit flows work.
- [ ] Public E2E tests pass.

## Context
Read `phase-03-public-button-handling.md` and `BUTTON-INVENTORY.md`.

## Implementation Notes
Preserve visual design. No dead `href="#"`, empty handlers, or placeholder console output.
