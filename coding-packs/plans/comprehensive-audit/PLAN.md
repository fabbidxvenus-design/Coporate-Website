# Comprehensive Audit & Feature Plan: Contact Page + I18n

## Phase 1: Intake & Baseline
- Map existing navigation to include Contact.
- Select I18n strategy (e.g., `next-intl` or manual route-based middleware).

## Phase 2: I18n Core
- Setup locale detection middleware.
- Configure `messages` folders for `ja` and `vi`.

## Phase 3: Contact Page Implementation
- Create `app/[locale]/contact/page.tsx`.
- Implement accessible form using existing UI components.

## Phase 4: Integration
- Update headers/footers to support locale switching.
- Verify locale-specific routing and SEO tags.

## Phase 5: Verification & Review
- Test form submission and I18n switching.
- Run accessibility audit on new pages.
