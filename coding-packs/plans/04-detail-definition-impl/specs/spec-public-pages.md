# SPEC: Public Pages Visual Parity

[SPEC] Source: `.requirements/04-detail-definition.md` DET-UX-001, DET-UX-002, DET-DATA-001, DET-DATA-002, DET-STATE-001, DET-A11Y-001, DET-NFR-001, DET-TEST-001

## AC-PUB-01: Homepage is public and design-faithful
- Given: an unauthenticated visitor opens `/`
- When: the homepage renders at 1440px and 1920px
- Then: visible sections, copy, typography, spacing, colors, hierarchy, navigation, and CTAs match `.design/recruitment_site/trang_chu_fabbi_final_precision`.

## AC-PUB-02: Content pages are public and mapped to design sources
- Given: an unauthenticated visitor opens about, jobs list, job detail, news list, or news detail routes
- When: each page renders at 1440px and 1920px
- Then: the page is reachable without login and matches its corresponding `.design/recruitment_site` source.

## AC-PUB-03: Public navigation state remains public and design-aligned
- Given: a visitor is on any public page
- When: they use public navigation or CTAs
- Then: navigation routes to the intended public page/form flow and active/current state follows the design where present.

## AC-PUB-04: Public pages retain accessibility basics
- Given: a keyboard user navigates public pages
- When: they tab through nav links, CTAs, and page actions
- Then: controls are keyboard reachable, landmarks/headings are usable, and focus states are visible or design-equivalent.

## Red Gate Tests
- [RED] Playwright public route reachability test for all `.design/recruitment_site` routes.
- [RED] Playwright screenshot capture checklist at 1440px and 1920px.
- [RED] Accessibility smoke test for public nav/focus reachability.
