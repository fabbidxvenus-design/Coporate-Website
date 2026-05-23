# ZFlow Plan: bilingual-vi-ja-contact

## Overview

This plan-supervised workflow implements `coding-packs/tips/TIP-011-bilingual-vi-ja-contact.md`. It adds public Vietnamese/Japanese localization, a functional language switcher, a visually consistent contact page, Supabase-backed contact submission persistence, and verification coverage without changing the protected CMS localization scope.

## Intake

- **Source TIP:** `coding-packs/tips/TIP-011-bilingual-vi-ja-contact.md`
- **Working dir:** `D:\WORKSPACE\CODE\Coporate_Website`
- **Mode:** plan-supervised
- **Tier:** THOROUGH
- **Primary priority:** preserve visual parity while adding connected bilingual contact functionality.

## Requirements Restatement

- Add exactly two public locales: `vi` and `ja`.
- Keep Vietnamese as the default locale unless current app routing already says otherwise.
- Centralize translated public strings; do not duplicate hardcoded labels across pages.
- Add a public `/contact` page and Japanese equivalent route using the chosen locale routing pattern.
- Connect the contact form to server-side validation and Supabase persistence.
- Reuse existing public layout/components and Professional Tech Hub tokens.
- Do not localize protected CMS/admin UI in this plan except shared public components.

## Plan Phases

| Phase File | Purpose | Gate |
|---|---|---|
| `phase-01-intake-and-current-state.md` | Inspect app structure, current public routes, shared components, Supabase helpers, and existing settings/contact data | SPEC readiness |
| `phase-02-localization-foundation.md` | Define route strategy, dictionaries, locale helpers, and language switcher behavior | RED/GREEN |
| `phase-03-contact-data-contract.md` | Add contact submission schema/migration or server contract, validation, and persistence plan | RED/GREEN |
| `phase-04-contact-page-ui.md` | Build localized contact page from existing public visual patterns | RED/GREEN |
| `phase-05-tests-and-verification.md` | Add tests, a11y/responsive checks, and final review evidence | VERIFY |

## How to Execute

```bash
zflow: --plan coding-packs/plans/bilingual-vi-ja-contact --phase phase-01-intake-and-current-state.md
zflow: --plan coding-packs/plans/bilingual-vi-ja-contact --phase phase-02-localization-foundation.md
zflow: --plan coding-packs/plans/bilingual-vi-ja-contact --phase phase-03-contact-data-contract.md
zflow: --plan coding-packs/plans/bilingual-vi-ja-contact --phase phase-04-contact-page-ui.md
zflow: --plan coding-packs/plans/bilingual-vi-ja-contact --phase phase-05-tests-and-verification.md
```

## Mode Rules

- **SPEC phase (RED Gate):** behavioral specs/tests for locale routing, language switching, contact validation, and persistence must exist before implementation.
- **EXECUTE phase (GREEN Gate):** implement the minimum code needed to satisfy specs while preserving existing design parity.
- **VERIFY phase:** separate reviewer/verifier should inspect tests, routes, screenshots, accessibility, and Supabase failure handling.
- **No self-verification:** the implementer should not be the only validator of visual and behavioral outcomes.
- **No scope creep:** CMS translation management, email automation, CRM integration, and full multilingual CMS content are out of scope.

## Key Risks

| Risk | Severity | Mitigation |
|---|---:|---|
| Route localization changes break existing public routes | High | Inventory current routes first; add default-locale compatibility tests before changing routing |
| Japanese copy quality is not owner-reviewed | Medium | Centralize strings and flag copy for owner review; do not hide text inside components |
| Contact persistence bypasses RLS/server validation | High | Use server action/route handler with schema validation and Supabase server client |
| New contact UI drifts from `.design` visual direction | Medium | Compose from existing public components and capture 1440/390 screenshots |
| Language switcher loses current route context | Medium | Define explicit locale route mapping with fallback to localized home |

## Files Expected to Change

Exact paths depend on current implementation, but likely targets are:

```text
app/(public)/**                         # public localized routes/pages
components/public/PublicHeader.tsx      # language switcher + Contact nav
components/public/PublicFooter.tsx      # localized footer labels
components/public/ContactForm.tsx       # contact form UI if not existing
lib/i18n/** or lib/locales/**           # dictionaries and locale helpers
lib/validation/contact.ts               # contact schema
lib/supabase/**                         # server persistence helper if needed
supabase/migrations/**                  # contact_submissions table/policies if migrations exist
__tests__/** or tests/**                # locale/contact behavior tests
```

## Acceptance Gates

- `/contact` renders Vietnamese by default.
- Japanese equivalent route renders Japanese navigation, footer, CTA labels, validation messages, and contact copy.
- Language switcher is reachable and preserves equivalent route where possible.
- Valid contact submission persists with locale metadata.
- Invalid submission preserves input and shows localized field errors.
- Supabase failure shows safe localized error without leaking implementation details.
- Desktop and mobile contact page match existing Professional Tech Hub visual language.
