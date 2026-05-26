# Phase 02 — SPEC Red Gate

## [SPEC] Objective
Transform TIP-025 acceptance criteria into executable checks before implementation. This phase creates BDD specs in `specs/` and defines test/QC commands that must fail on the current mismatch state before code changes.

## [RED] Required Spec Coverage
- Hero non-color layout parity.
- Header/main non-color geometry parity.
- Stats card shape/elevation and heading-order semantics.
- Activity section width, controls, and active icon treatment.
- Why-choose decorative layer.
- Explicit exclusion audit for COLOR, IMAGE, MOCKDATA.

## [RED] Proposed Automated Checks
Use the existing project test framework if available; otherwise add minimal Playwright/accessibility checks consistent with current repo tooling.

Suggested file locations for implementation phase:
- `tests/e2e/about-qc-non-color.spec.ts` or nearest existing Playwright test folder.
- Optional component tests only if existing component-test infrastructure already exists.

Required checks:
1. Visit `/vi/about` at `1440x1200`.
2. Assert hero bounding box height is `600px` ± 2px.
3. Assert no visible hero `h1` is centered inside the hero; page still has one accessible `h1` or equivalent top-level heading off-screen.
4. Assert header is fixed, 80px high ± 2px, and main content starts below it.
5. Assert stats card border radius is 12px and box-shadow includes the reference low-elevation shape.
6. Assert stat value elements are not heading elements that precede the main content heading order.
7. Assert activity row desktop width is 1120px ± 2px and control row contains dots plus previous/next buttons with accessible labels.
8. Assert why-choose section contains a decorative dashed/circular layer marked `aria-hidden="true"` or otherwise hidden from assistive tech.
9. Assert no test requires color token changes, image source changes, or mock-data/content changes.

## [RED] Manual/Visual Checks
- Capture before screenshot from current `/vi/about` at 1440px.
- Compare after screenshot to `.qc/ui/about/screenshots/design-1440.png` for non-color differences.
- Document ignored differences: color, image, mock data.

## [RED] Red Gate Criteria
- `specs/spec-about-qc-non-color-layout.md` exists.
- Test/check plan targets all acceptance criteria.
- Before implementation, at least hero height, visible hero `h1`, activity controls, and heading-order checks should fail or be marked as known current failures from `.qc/ui/about/qc-report.md`.
- Tests/checks must compile if added to repo.

## [PIVOT] If Red Gate Cannot Be Automated
If the existing repo lacks Playwright/test infrastructure or adding tests would exceed TIP scope, create a scriptable verification checklist in `.zflow/verify-report.md` and require browser screenshots plus computed-style evidence during VERIFY. This is allowed because TIP-025 is a QC/visual patch driven by existing `.qc` artifacts.
