# Phase 05: Verification, DESLOP, Regress

## [CORE] Goal
Prove TIP-014 is complete with green tests, separate review, visual verification, cleanup, and final report.

## [CORE] Tasks
1. Green Gate:
   - Run all TIP-014 tests.
   - Run existing regression tests.
   - Run `npm run type-check`.
   - Run `npm run build` from a clean `.next` state.
2. Separate verification:
   - Use `code-reviewer` or `typescript-reviewer` for code quality.
   - Use `security-reviewer` for auth/API/form/CV-related changes.
   - Use E2E/browser verification for critical public + admin flows.
3. Visual verification:
   - Start dev server.
   - Open routes and capture screenshots for required public/admin screens.
   - Verify no obvious layout drift from existing design direction.
4. DESLOP:
   - Remove dead code introduced during implementation.
   - Remove placeholder comments/TODOs.
   - Keep functional behavior unchanged.
5. REGRESS:
   - Re-run all checks after cleanup.
   - Write `.zflow/final-report.md` with results.

## [GREEN] Required Commands
Record outputs in `.zflow/final-report.md`:
- `npm run type-check`
- `npm run build`
- Playwright tests for mock data public buttons.
- Playwright tests for mock data admin buttons.
- Playwright screen-map click audit: `tests/e2e/button-screen-map.spec.ts`.
- Static no-dead-buttons audit.

## [QC] Required Playwright Screen Map Audit
`tests/e2e/button-screen-map.spec.ts` is the highest-priority QC gate for this TIP.

It must:
- Open every required public + CMS screen in mock mode.
- Generate `test-results/button-screen-map/*.json` artifacts listing all visible actionable elements.
- Click every enabled action in isolation and assert one of: route changes to valid page, URL/query changes, visible UI state changes, form validation/success appears, modal/menu opens/closes, mock mutation feedback appears.
- Fail on 404/500, console/page errors, inert clicks, locale loss, missing accessible names, or disabled controls without explanation.
- Capture screenshot/trace for failed clicks.

## [VISUAL] Required Screenshots
Store under `.zflow/screenshots/` or `test-results/`:
- `/vi`
- `/vi/jobs`
- `/vi/jobs/[mock-slug]`
- `/vi/apply`
- `/vi/contact`
- `/ja`
- `/ja/jobs`
- `/admin`
- `/admin/jobs`
- `/admin/news`
- `/admin/applications`
- `/admin/settings`

## [CORE] Acceptance Criteria
- [ ] All TIP-014 acceptance criteria are covered in final report.
- [ ] All Red Gate tests are now Green.
- [ ] Playwright screen-map click audit passes and artifacts exist for all required routes.
- [ ] Existing regressions remain Green.
- [ ] Separate verifier has no CRITICAL/HIGH findings.
- [ ] Security reviewer has no CRITICAL findings.
- [ ] Screenshots confirm no unintended visual redesign.
- [ ] No `href="#"`, dead handlers, placeholder console output, or unhandled visible buttons remain.
- [ ] `.zflow/final-report.md` exists.

## [EVOLVE] Background Learning
After verification, run EVOLVE non-blocking and capture:
- Which button patterns were missing.
- Which mock-data abstractions were useful.
- Any reusable test selectors or audit helpers.
