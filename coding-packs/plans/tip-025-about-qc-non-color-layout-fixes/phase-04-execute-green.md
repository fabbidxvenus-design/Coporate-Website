# Phase 04 — Execute Green

## [GREEN] Goal
Apply the smallest code changes needed to satisfy TIP-025 specs and make Red Gate checks pass, while preserving all COLOR, IMAGE, and MOCKDATA behavior.

## [CORE] Implementation Order
1. Read current files listed in TIP-025 and compare with `.qc/ui/about/qc-report.md`.
2. Implement `tip-001-about-hero-header-stats.md`.
3. Run targeted checks for hero/header/stats/a11y heading order.
4. Implement `tip-002-about-activity-why-a11y.md`.
5. Run targeted checks for activity/accordion/decoration/a11y.
6. Run project build/type/lint checks available in `package.json`.
7. Run browser/QC verification for `/vi/about` at 1440px.

## [CORE] Code Constraints
- Prefer edits to existing files over new components.
- Do not introduce abstractions beyond this QC fix.
- No content/data mutations.
- No image asset changes.
- No brand/color token changes.
- Keep decorative-only elements `aria-hidden`.
- Use semantic/accessibility-safe labels for carousel controls.

## [GREEN] Expected Code-Level Outcomes
- Hero block has design-equivalent 600px desktop height and play overlay.
- Visible hero heading is removed; accessible page name remains.
- Public header geometry/elevation matches non-color design requirements.
- Main content offset compensates for fixed header.
- Stats values use non-heading markup where needed.
- Activity section renders controls and width matching QC target.
- Why-choose section has decorative dashed/circle layer behind content.

## [PIVOT] Execution Gap Recording
Record any gap in `.zflow/execution-gaps.jsonl` if:
- QC tooling cannot be run locally.
- Existing test infra cannot support automated visual checks.
- A requested fix would require changing excluded COLOR, IMAGE, or MOCKDATA categories.
- Shared header changes create regressions outside `/about`.

Critical gaps block VERIFY until resolved or explicitly accepted.
