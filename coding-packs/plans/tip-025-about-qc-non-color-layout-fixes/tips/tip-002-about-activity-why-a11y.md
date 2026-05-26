# TIP-002: About Activity, Why-Choose Decoration, and A11y Verification

**Agent:** frontend implementer
**Model:** sonnet
**File ownership:** `components/about/ActivityTabs.tsx`, `components/about/WhyChooseAccordion.tsx`, `app/(public)/about/page.tsx`, `app/[locale]/about/page.tsx`, `tests/**/*about*` if tests are added
**Blocked by:** `tip-001-about-hero-header-stats`

## Acceptance criteria
- [ ] Activity row is approximately 1120px wide at 1440px.
- [ ] Activity card includes pagination dots and previous/next circular controls.
- [ ] Activity controls have accessible labels and do not require data/model changes.
- [ ] Active activity icon uses reference-like square shape without altering color tokens.
- [ ] About CTA border thickness matches single-border reference treatment.
- [ ] Accordion active item uses reference-level border/radius/shadow without color changes.
- [ ] Why-choose section includes the dashed circular decorative layer behind content.
- [ ] Decorative layer is hidden from assistive technologies.
- [ ] Verification artifacts document any remaining COLOR/IMAGE/MOCKDATA findings as out of scope.

## Context
This task handles the lower-page non-color visual mismatches and final a11y verification from TIP-025.

## Implementation notes
- Prefer inline SVG/CSS for the decorative layer; do not add external assets.
- Controls may be presentational or disabled if no carousel behavior exists, but must be accessible.
- Avoid changes to activity labels, descriptions, localized content, image URLs, or mock data.
- Re-run `/vi/about` 1440px visual checks after implementation.
