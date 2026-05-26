# SPEC: Color Token Alignment

[SPEC] Source TIP: `coding-packs/tips/TIP-017-color-token-alignment.md`

## AC-01: Canonical Tailwind brand tokens
- Given: `tailwind.config.ts` is loaded by the app
- When: the builder inspects the extended color tokens
- Then: primary/default teal resolves to `#006672`, primary hover/dark teal resolves to `#005560`, secondary teal shade resolves to `#00707e`, accent orange resolves to `#F47F35`, and light teal surface resolves to `#F0F9FA` through named tokens.

## AC-02: Primary CTAs use official hover pair
- Given: primary buttons and CTAs render on public and CMS screens
- When: a user hovers or focuses those controls
- Then: default brand state uses `#006672`, hover/active brand state uses `#005560`, and focus rings remain visible.

## AC-03: Links and navigation hover states use teal text token
- Given: public header/footer links and CMS navigation are visible
- When: a user hovers links or activates nav items
- Then: brand text color uses the named teal/default token equivalent to `#006672` rather than ad hoc raw hex values.

## AC-04: Brand accents are tokenized across key components
- Given: job cards, news cards, application/contact forms, CMS sidebar/topbar, and admin forms render
- When: their brand accents, borders, soft backgrounds, and chips are inspected
- Then: teal/orange brand colors use named Tailwind tokens and light teal surfaces use `#F0F9FA`.

## AC-05: Semantic colors are preserved
- Given: validation errors, success messages, warnings, disabled states, and workflow/status badges render
- When: the color alignment pass is applied
- Then: semantic colors remain meaningfully distinct and are not blindly replaced with teal/orange.

## AC-06: No functional or layout regression
- Given: the implementation is complete
- When: lint, type-check, tests/build, and browser screenshots are run
- Then: checks pass or unrelated pre-existing failures are documented, and desktop/mobile screenshots show no layout, spacing, typography, content, routing, or behavior regression.

## Red Gate Test Strategy
- [RED] Add tests before implementation that assert exported Tailwind token values and scan critical component source for forbidden raw brand hex duplication where stable.
- [RED] Prefer targeted unit/static tests over brittle DOM color tests for token values.
- [RED] Add/extend Playwright visual smoke checks only if existing screenshot infrastructure supports stable assertions; otherwise capture manual evidence during VERIFY.
