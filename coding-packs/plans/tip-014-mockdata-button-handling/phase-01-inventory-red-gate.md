# Phase 01: Inventory + Red Gate

## [CORE] Goal
Create a complete live-code button inventory and write failing tests before any implementation.

## [CORE] Inputs
- `coding-packs/tips/TIP-014-mockdata-button-handling.md`
- `app/(public)/**`
- `app/[locale]/**`
- `app/admin/**`
- `components/**`
- `app/api/**/route.ts`
- existing tests in `tests/**`

## [SPEC] Tasks
1. Inventory every visible button/link/action source:
   - Public header/footer/mobile menu/language switcher.
   - Public homepage/about/jobs/job-detail/apply/news/news-detail/contact buttons.
   - JobCard/NewsCard and any reusable button components.
   - Admin sidebar/dashboard/jobs/news/applications/settings buttons.
   - Route-handler-backed submit/mutation controls.
2. Write `BUTTON-INVENTORY.md` in this plan directory with columns:
   - Surface
   - File
   - Selector/text
   - Current target/handler
   - Expected mock behavior
   - Status: handled / missing / intentionally disabled
3. Write Given/When/Then specs in `specs/`:
   - `spec-public-buttons.md`
   - `spec-admin-buttons.md`
   - `spec-mock-mode.md`
   - `spec-no-dead-buttons.md`
4. Add failing tests:
   - `tests/e2e/mockdata-public-buttons.spec.ts`
   - `tests/e2e/mockdata-admin-buttons.spec.ts`
   - `tests/e2e/button-screen-map.spec.ts`
   - `tests/unit/mockdata-default.test.ts`
   - `tests/audit/no-dead-buttons.spec.ts`
5. Implement the Playwright screen-map test harness:
   - Target routes: `/vi`, `/vi/about`, `/vi/jobs`, `/vi/jobs/[mock-slug]`, `/vi/apply`, `/vi/news`, `/vi/news/[mock-slug]`, `/vi/contact`, `/ja`, `/ja/about`, `/ja/jobs`, `/ja/contact`, `/admin`, `/admin/jobs`, `/admin/news`, `/admin/applications`, `/admin/settings`.
   - For each route, collect visible actionable elements: `button`, `a[href]`, `[role="button"]`, `input[type="submit"]`, `input[type="button"]`, `summary`, and enabled controls with click handlers when discoverable.
   - Save a screen map artifact to `test-results/button-screen-map/{route-slug}.json` with text/name, role/tag, href, aria-label/title, bounding box, disabled state, and expected behavior classification.
   - Click every enabled action in isolation. Reset page to the original route between clicks unless the action is explicitly a sequential UI action such as opening a menu before clicking menu items.
   - Fail on page errors, console errors, 404/500 navigation, unchanged inert click without visible state change, locale loss from `/vi` or `/ja`, or inaccessible disabled controls.
   - Capture screenshot + trace on each failed click.
6. Run Red Gate:
   - Type/test files compile.
   - At least one assertion fails because implementation is not complete yet.

## [RED] Expected Failing Assertions
- Missing/default mock mode handling when Supabase env vars are absent.
- Existing `href="#"` or placeholder actions if present.
- Locale-less navigation from localized surfaces if present.
- Admin mutation buttons without visible mock feedback if present.
- Runtime screen-map audit fails for currently inert or unhandled buttons.
- Screen-map JSON artifacts expose any button missing accessible name, href, handler outcome, or disabled explanation.

## [CORE] Acceptance Criteria
- [ ] Button inventory exists and covers public + CMS surfaces.
- [ ] G/W/T specs exist under plan `specs/`.
- [ ] Red tests compile.
- [ ] Red tests fail for real missing behavior, not due to syntax/import errors.
- [ ] `tests/e2e/button-screen-map.spec.ts` exists and generates per-route screen-map JSON artifacts.
- [ ] Screen-map test clicks every visible enabled action on required public + CMS routes or documents why an action is intentionally skipped.
- [ ] No implementation files are modified in this phase except tests/spec artifacts.

## [QUALITY] Gate
Do not proceed to phase 02 until Red Gate is proven with command output recorded in `.zflow/red-gate.md`.
