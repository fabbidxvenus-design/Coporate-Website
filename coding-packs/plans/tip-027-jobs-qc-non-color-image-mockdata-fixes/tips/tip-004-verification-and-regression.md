# TIP-004: Verification and Regression

**Agent:** verifier
**Model:** sonnet
**File ownership:** `.qc/ui/jobs/**/*`, plan `.zflow/**/*`, no implementation ownership except test artifacts if needed
**Blocked by:** tip-002, tip-003

## Acceptance criteria
- [ ] `npm run type-check` passes or blocker is documented.
- [ ] `npm run build` passes or blocker is documented.
- [ ] `/vi/jobs` is visually checked at 1440px and mobile width.
- [ ] `/ja/jobs` is smoke checked.
- [ ] QC rerun targets `app/(public)/jobs/page.tsx`.
- [ ] Non-color `link-name` issues are resolved.
- [ ] Remaining COLOR PINK, IMAGE, and MOCKDATA findings are documented as intentionally excluded.

## Context
zflow requires a separate verifier and browser evidence for visual output.

## Implementation Notes
Use `phase-04-visual-accessibility-verification.md` and `phase-05-fix-deslint-regress-evolve.md`. Do not self-verify final completion if you implemented the code.
