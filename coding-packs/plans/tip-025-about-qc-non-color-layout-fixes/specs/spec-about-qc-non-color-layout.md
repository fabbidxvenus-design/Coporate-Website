# SPEC: About QC Non-Color Layout

## [SPEC] AC-01: Hero desktop layout parity
- Given: `/vi/about` is opened at a 1440px desktop viewport.
- When: the first About hero section is inspected.
- Then: the hero section is 600px tall, starts below the fixed 80px header, has no visible centered `h1`, and includes a centered circular play overlay.

## [SPEC] AC-02: Accessible page title without visual drift
- Given: the visible hero `h1` is removed to match the HTML design.
- When: heading semantics are inspected by accessibility tooling.
- Then: the page still exposes a valid top-level heading or accessible page name without changing the visible screenshot.

## [SPEC] AC-03: Header and main offset geometry
- Given: `/vi/about` is opened at 1440px.
- When: computed styles for the public header and main wrapper are inspected.
- Then: the header is fixed, approximately 80px tall, has subtle non-color elevation, and main content is offset so it does not overlap the header.

## [SPEC] AC-04: Stats card shape and semantics
- Given: the About stats block is visible.
- When: the stats card and stat value elements are inspected.
- Then: the card has 12px radius and `0 4px 20px rgba(0,0,0,.05)`-equivalent shadow, while stat values do not create a heading-order violation.

## [SPEC] AC-05: Activity section controls and width
- Given: the Activity section is visible at 1440px.
- When: the activity row and content card are inspected.
- Then: the desktop row is approximately 1120px wide and the content card includes pagination dots plus previous/next circular controls with accessible labels.

## [SPEC] AC-06: Non-color shape details
- Given: CTA, activity tab, and accordion elements are visible.
- When: non-color shape/elevation details are inspected.
- Then: About CTA border thickness, active tab icon shape, and accordion border/shadow/radius match the reference-level treatment without changing color tokens.

## [SPEC] AC-07: Why-choose decorative layer
- Given: the why-choose section is visible.
- When: the section background layers are inspected.
- Then: the low-opacity dashed circular decorative layer is present behind content and hidden from assistive technologies.

## [SPEC] AC-08: Explicit excluded categories
- Given: QC still reports COLOR, IMAGE, or MOCKDATA differences.
- When: TIP-025 verification is reviewed.
- Then: those differences are documented as intentionally out of scope and no source changes were made to brand colors, image assets/sources, or mock/content data.
