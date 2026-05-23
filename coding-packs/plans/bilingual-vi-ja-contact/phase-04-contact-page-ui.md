# Phase 04 — Contact Page UI

**Mode:** plan-supervised  
**Gate:** RED → GREEN  
**Depends on:** Phase 02, Phase 03

## Goal

Build the localized public contact page using existing public layout/components and Professional Tech Hub design language.

## RED Gate

Create failing specs/tests for:

1. `/contact` renders Vietnamese contact copy and form labels.
2. Japanese contact route renders Japanese contact copy and form labels.
3. Public header includes Contact navigation in both locales.
4. Form validation errors render localized messages and preserve submitted values.
5. Success state appears only after persistence succeeds.
6. Failure state appears safely when persistence fails.

## Execute Steps

1. Add the default Vietnamese contact route.
2. Add the Japanese equivalent contact route according to Phase 02 route strategy.
3. Compose the page from existing public shell/header/footer and shared UI primitives.
4. Add contact info block using `site_settings` when available; otherwise use isolated static fallback values.
5. Add contact form component wired to the server action/route handler from Phase 03.
6. Add accessible form labels, error text, `aria-live` feedback, focus-visible states, and keyboard-friendly controls.
7. Add loading/submitting state that does not hide form context.
8. Verify desktop and mobile layout preserve Professional Tech Hub tokens and spacing.

## GREEN Gate

- Contact routes render in both locales.
- Contact nav and language switcher are usable on desktop and mobile.
- Form states work for empty, invalid, valid, success, and server-failure cases.
- No horizontal overflow at mobile widths.
- Contact UI does not introduce a different visual system from existing public pages.

## Visual Requirements

- Use existing 1200px public container pattern.
- Use teal CTA treatment from existing public buttons.
- Use Manrope typography.
- Use rounded cards/inputs consistent with existing pages.
- Use soft surface colors from the Professional Tech Hub design tokens.
- If no contact design export exists, derive composition from home/about/apply sections rather than designing a new template.
