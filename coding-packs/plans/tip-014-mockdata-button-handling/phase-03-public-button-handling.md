# Phase 03: Public Button Handling

## [CORE] Goal
Handle every public-facing button/link/action in mock mode while preserving `/vi` and `/ja` locale routing and design fidelity.

## [CORE] Files Likely Owned
- `app/(public)/page.tsx`
- `app/(public)/about/page.tsx`
- `app/(public)/jobs/page.tsx`
- `app/(public)/jobs/[slug]/page.tsx`
- `app/(public)/apply/page.tsx`
- `app/(public)/apply/success/page.tsx`
- `app/(public)/news/page.tsx`
- `app/(public)/news/[slug]/page.tsx`
- `app/[locale]/**/page.tsx`
- `components/JobCard.tsx`
- `components/NewsCard.tsx`
- `components/public/PublicHeader.tsx`
- `components/public/PublicFooter.tsx`
- `components/public/ContactForm.tsx`
- `app/api/contact/route.ts`
- `app/api/applications/route.ts`
- `tests/e2e/mockdata-public-buttons.spec.ts`

## [CORE] Tasks
1. Header/footer/navigation:
   - Logo and nav links preserve current locale.
   - Mobile menu opens/closes and all links work.
   - Language switcher maps equivalent route when possible.
   - Footer links route to real pages or are intentionally disabled with accessible explanation.
2. Homepage/about:
   - All CTAs route to implemented locale-aware pages or meaningful anchors.
   - Service/learn-more buttons have deterministic behavior.
3. Jobs list/detail:
   - Search/filter/page controls update query params and filter mock jobs.
   - Job card/detail/apply/back/share/save controls are handled.
   - Save/bookmark/share may use local UI state or accessible disabled explanation if out of MVP.
4. Apply flow:
   - Valid mock application submit shows success and navigates to success page.
   - Invalid submit shows validation errors.
   - File upload/remove enforces mock validation.
5. News list/detail:
   - News card/detail/back/category/filter controls are handled.
6. Contact:
   - Valid mock submit shows localized success.
   - Invalid submit shows localized validation.
   - Contact/social/map buttons either navigate to safe real targets or are intentionally disabled.
7. Remove dead action patterns:
   - No public `href="#"` unless a real same-page anchor exists.
   - No empty handlers.
   - No placeholder console output.

## [GREEN] Acceptance Criteria
- [ ] Public E2E tests pass for `/vi/*` critical routes.
- [ ] Public E2E tests pass for `/ja/*` critical route locale preservation.
- [ ] Contact and apply mock submissions pass success + invalid tests.
- [ ] Button inventory public rows marked handled or intentionally disabled.
- [ ] Visual layout remains faithful; only interaction states change.

## [VISUAL] Required Verification
Capture Playwright screenshots after implementation for:
- `/vi`
- `/vi/jobs`
- `/vi/jobs/[mock-slug]`
- `/vi/apply`
- `/vi/contact`
- `/ja`
- `/ja/jobs`
