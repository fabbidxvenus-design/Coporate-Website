# TIP-P1-005: Green Gate, Visual Verification, and Review

**Agent:** Verifier
**Model:** opus
**File ownership:**
- `tests/i18n/bilingual-localization.spec.ts`
- `coding-packs/plans/bilingual-localization-expansion/final-report.md`
**Blocked by:** TIP-P1-003, TIP-P1-004
**Acceptance criteria:**
- [ ] `npm run type-check` passes.
- [ ] `npm run build` passes.
- [ ] `npx playwright test tests/i18n/bilingual-localization.spec.ts tests/footer-red-gate.spec.ts --reporter=line` passes.
- [ ] Browser screenshots or equivalent visual evidence are captured for `/vi`, `/ja`, `/vi/jobs`, `/ja/jobs`, `/vi/apply`, `/ja/apply`.
- [ ] Separate reviewer reports no CRITICAL/HIGH issues.
- [ ] `final-report.md` records Red Gate, Green Gate, regression, visual verification, and known CMS localization gaps.

## Context
zflow requires proactive verification and separate review before completion. This task closes the implementation with evidence rather than self-verification.

## Implementation Notes
- Do not mark COMPLETE until the verifier has reviewed the final diff.
- If visual tooling cannot run, record the exact blocker and do not claim visual completion.
