# TIP-001: Token source of truth

**Agent:** lead TypeScript/frontend implementer
**Model:** sonnet
**File ownership:** `tailwind.config.ts`, `app/globals.css`, token-related tests
**Blocked by:** none
**Acceptance criteria:**
- [ ] Canonical teal/orange/light teal values from `coding-packs/research/color-branch.md` are exposed as named Tailwind tokens.
- [ ] Existing semantic error/success/status colors remain unchanged unless they were accidental brand drift.
- [ ] Token tests or static assertions fail before implementation and pass after implementation.

## Context
Primary/default teal: `#006672`; hover/dark teal: `#005560`; secondary teal: `#00707e`; accent orange: `#F47F35`; light teal: `#F0F9FA`.

## Implementation Notes
Start by inventorying existing token values. `tailwind.config.ts` already contains most expected values, so avoid unnecessary churn; only adjust missing aliases, inconsistent casing, globals, or raw CSS variables that prevent components from using tokens.
