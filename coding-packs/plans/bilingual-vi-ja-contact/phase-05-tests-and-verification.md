# Phase 05 — Tests and Verification

**Mode:** plan-supervised  
**Gate:** VERIFY  
**Depends on:** Phase 02, Phase 03, Phase 04

## Goal

Verify localization, contact persistence, accessibility, responsive behavior, and existing public route stability.

## Verification Steps

1. Run unit tests for locale helpers and dictionaries.
2. Run validation tests for contact schema.
3. Run integration tests for successful and failed contact submission paths.
4. Run route/render tests for `/contact` and Japanese equivalent route.
5. Run public header/footer tests for localized labels and language switcher links.
6. Run accessibility checks for form labels, error announcements, keyboard navigation, and color contrast.
7. Capture screenshots for contact page:
   - Vietnamese desktop: 1440px
   - Vietnamese mobile: 390px
   - Japanese desktop: 1440px
   - Japanese mobile: 390px
8. Smoke test existing public pages to ensure route localization did not break them.
9. Run project checks: type check, lint, tests, and production build.
10. Request separate code review and security review because user input + database insert are involved.

## Evidence to Save

Save verification notes under `audit/`:

```text
audit/contact-verification.md
audit/contact-a11y.md
audit/contact-screenshots/vi-contact-1440.png
audit/contact-screenshots/vi-contact-390.png
audit/contact-screenshots/ja-contact-1440.png
audit/contact-screenshots/ja-contact-390.png
```

Only create screenshot files if the project has an established screenshot/e2e capture workflow.

## PASS Criteria

- All relevant automated checks pass.
- `/contact` and Japanese equivalent route render correct localized UI.
- Contact form persists valid data with locale metadata.
- Invalid input and server failures show localized safe errors.
- Existing public routes still work.
- Mobile contact page has no horizontal overflow.
- No hardcoded secrets, raw database errors, or console logs are introduced.

## BLOCK Conditions

- Supabase persistence is missing or client-only.
- Server-side validation is missing.
- Locale routing breaks existing public routes.
- Contact form leaks raw errors or submission data.
- Contact UI significantly diverges from existing `.design` visual direction.
