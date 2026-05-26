# Phase 01 — Intake and Scope

## [CORE] Input
- Source TIP: `D:\WORKSPACE\CODE\Coporate_Website\coding-packs\tips\TIP-025-about-qc-non-color-layout-fixes.md`
- QC artifacts: `.qc/ui/about/qc-report.md`, `.qc/ui/about/computed-style-diff.json`, `.qc/ui/about/a11y-results.json`, `.qc/ui/about/screenshots/design-1440.png`, `.qc/ui/about/screenshots/web-1440.png`
- Route under test: `/vi/about` at 1440px

## [DECISION] Complexity Score
- Lexical signals: fix/QC/layout/page (+10 debugging/regression), many file paths (+10), long task (+5)
- Structural signals: estimated 8 subtasks capped at +25, cross-file dependencies (+15), test/verify requirements (+5), module impact (+10), moderate reversibility (+5)
- Score: 70
- Tier: `STANDARD`, not `THOROUGH`, because scope is visual/layout-only and explicitly excludes color, image, mock data, backend, migrations, and deployment.

## [DECISION] zflow Mode
- Mode: plan-supervised.
- Skip RRI, SDD, PROPOSAL because TIP-025 and this plan define approved requirements/design.
- State path: `coding-packs/plans/tip-025-about-qc-non-color-layout-fixes/.zflow/`.
- TIP decomposition path: `coding-packs/plans/tip-025-about-qc-non-color-layout-fixes/tips/`.

## [CORE] In Scope
1. Hero height/content overlay: 600px hero, no visible centered `h1`, centered circular play overlay.
2. Header/main geometry: fixed desktop header, 80px height, subtle shadow, main offset.
3. Stats card radius/shadow and heading-order-safe stat values.
4. Activity section width, active icon shape, dots and previous/next controls.
5. About CTA border thickness only.
6. Accordion shape/elevation only.
7. Why-choose dashed decorative layer.
8. Verification artifacts for `/vi/about` at 1440px and accessibility heading order.

## [CORE] Out of Scope
- COLOR changes: primary teal, active pink/teal states, footer background, hover colors, color-contrast issues caused only by excluded colors.
- IMAGE changes: image sources, replacement, cropping, remapping, generated/mock media.
- MOCKDATA/content changes: crawled content, localized copy, API contracts, repositories, seeds, migrations.
- Non-About pages unless shared header/layout changes are necessary and non-color.

## [CORE] Quality Gates
- Red Gate: specs exist and planned tests/checks are capable of failing against current QC mismatch.
- Green Gate: implementation passes spec checks, build/type checks, and separate verifier review.
- Visual Gate: after implementation, browser evidence at 1440px must be captured and compared to design screenshot for non-excluded items.
- Accessibility Gate: heading-order issue resolved; color-contrast remnants documented as excluded if color-only.

## [PIVOT] Escalation Conditions
- If fixing header globally causes regressions on other public pages, stop and scope the fixed behavior to public layout without color changes.
- If play overlay requires changing hero image content/source, use CSS/inline icon only and do not alter images.
- If QC tooling is unavailable, use browser screenshot + computed-style assertions as fallback evidence and document the gap.
