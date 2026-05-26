# phase-03-verify-fix-loop — VERIFY/FIX [GREEN GATE]

## [CORE] Objective
Use a separate verifier agent to prove the implementation satisfies TIP-026 and does not change excluded scope.

## [VERIFY] Required Checks
1. Run the TIP-026 spec/audit tests.
2. Run `npm run type-check`.
3. Run relevant existing tests if practical:
   - `npm run test -- tests/audit/responsive.spec.ts`
   - `npm run test:e2e` or targeted Playwright audit command if project setup supports it.
4. Start or reuse the dev server and inspect `/vi/jobs/senior-frontend-engineer-react`.
5. Capture screenshots or browser evidence at 375, 768, 1024, 1440.
6. Run axe accessibility check and confirm no `button-name` or related-jobs `aria-required-children` violation remains.

## [BOUNDARY] Separate Verification
Verification must be done by a separate verifier agent (`code-reviewer`, `typescript-reviewer`, or `e2e-runner` depending on final changes). The implementer must not self-certify.

## [FIX] Retry Protocol
- Max fix iterations: 3.
- Every fix retry must include prior verifier findings and current failed checks.
- Do not use destructive git commands or bypass hooks/checks.

## [GATE] Green Gate Checklist
- [ ] Spec tests pass.
- [ ] Regression tests pass or failures are documented as unrelated/pre-existing.
- [ ] Type check passes.
- [ ] Browser route renders without runtime errors.
- [ ] Screenshots/browser evidence collected.
- [ ] Separate verifier report saved to `.zflow/verify-report.md`.
- [ ] Excluded residual mismatches are listed explicitly.
