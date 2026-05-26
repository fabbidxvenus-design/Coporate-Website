# Phase 05 — Verification / DESLOP / Regress

## [CORE] Goal
Prove TIP-015 is complete with green tests, browser screenshots, separate verification, and minimal cleanup.

## [GREEN GATE]
Run:
1. `npm run type-check`
2. `npm run build`
3. `npx playwright test tests/e2e/about-api-mockdata.spec.ts --project=chromium`
4. Unit test command for `tests/unit/about-content.test.ts` using the repository's configured test runner.

## [VISUAL VERIFY]
- Open `/vi/about` and `/ja/about` in browser/Playwright.
- Capture screenshots to `test-results/about-api-mockdata/vi-about.png` and `test-results/about-api-mockdata/ja-about.png`.
- Check no console errors and no page errors.

## [DESLOP]
- Remove unused imports, dead code, duplicate content, and leftover debug output only.
- Do not change functional behavior in DESLOP.

## [SEPARATE VERIFIER]
Use `code-reviewer` or appropriate reviewer agent to review current diff after checks pass.

## [EVOLVE]
Dispatch a background evolve/learning note after verification. Non-blocking.

## [DONE]
- Final report documents checks, screenshots, known deferrals, and verifier result.
