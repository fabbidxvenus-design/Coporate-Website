# PLAN: TIP-014 Mock Data Button Handling Across All Screens

## [CORE] Objective
Implement `coding-packs/tips/TIP-014-mockdata-button-handling.md`: make mock data the default local/fresh-checkout mode and ensure every visible public + CMS button/link/CTA/icon button/form action/filter/pagination control has a deterministic behavior.

## [DECISION] zflow Mode
- Mode: plan-supervised.
- Recommended command for execution: `/zflow --plan D:\WORKSPACE\CODE\Coporate_Website\coding-packs\plans\tip-014-mockdata-button-handling --quality=high --effort=high`
- Tier score: 75/100 → THOROUGH recommended.
  - Lexical/scope: “tất cả button”, public + CMS, mock mode, forms, APIs, tests.
  - Structural: cross-file/system-wide; likely touches `app/(public)`, `app/[locale]`, `app/admin`, `components`, `lib`, `app/api`, and `tests`.
  - Risk: interaction completeness, auth/admin, form submissions, Supabase fallback.

## [CORE] Source Artifacts
- TIP: `coding-packs/tips/TIP-014-mockdata-button-handling.md`
- Requirements matrix: `coding-packs/01-REQUIREMENTS-MATRIX.md`
- Task graph: `coding-packs/02-TASK-GRAPH.md`
- Standards:
  - `coding-packs/standards/frontend/html-to-nextjs.md`
  - `coding-packs/standards/ui/design-tokens.md`
  - `coding-packs/standards/domain/recruitment-content.md`
  - `coding-packs/standards/cms/admin-shell.md`
  - `coding-packs/standards/database/supabase-saas.md`

## [SPEC] Red Gate Strategy
Before implementation, create failing tests that prove missing button behavior and default mock behavior:
1. `tests/e2e/mockdata-public-buttons.spec.ts`
   - Fresh mock mode public routes render.
   - `/vi/*` and `/ja/*` preserve locale on button/link clicks.
   - Jobs search/filter/page controls update URL and produce visible results.
   - Contact/apply submit succeed in mock mode and invalid data shows errors.
2. `tests/e2e/mockdata-admin-buttons.spec.ts`
   - Admin pages in mock mode expose deterministic controls.
   - Create/edit/status/delete/settings buttons either mutate mock state with feedback or are intentionally disabled with explanation.
3. `tests/unit/mockdata-default.test.ts`
   - Missing Supabase env resolves to mock mode.
   - `USE_MOCK_DATA=true` uses mock fixtures.
   - `USE_MOCK_DATA=false` with valid env preserves Supabase path.
4. `tests/audit/no-dead-buttons.spec.ts`
   - Static audit for `href="#"`, empty handlers, placeholder console output, and dead buttons in relevant source files.
5. `tests/e2e/button-screen-map.spec.ts`
   - Playwright opens every target screen, builds a runtime screen map from visible `button`, `a[href]`, `[role="button"]`, submit controls, icon buttons, pagination controls, and form actions.
   - The test clicks each mapped actionable element in an isolated page/session or resets route state between clicks.
   - The test records per-screen artifacts: selector/text, before URL, after URL, click result, console errors, page errors, screenshot on failure.
   - This is the primary QC gate for TIP-014 and must cover both public and CMS screens.

Red Gate passes only when tests compile and fail for currently missing behaviors. The screen-map click audit must fail if any visible actionable element is inert, throws, routes to 404, loses locale, or lacks accessible disabled explanation.

## [CORE] Phase List
1. `phase-01-inventory-red-gate.md` — inventory all buttons and add failing tests. (DONE)
2. `phase-02-mock-mode-foundation.md` — default mock mode, typed fixtures, mock repositories/helpers.
3. `phase-03-public-button-handling.md` — public/localized routes and form/button behaviors.
4. `phase-04-admin-button-handling.md` — CMS buttons/actions with mock feedback.
5. `phase-05-verification-deslop-regress.md` — green gate, visual/manual verification, cleanup, final report.

## [CORE] Execution Order
Execute phases sequentially. Do not start implementation until phase 01 Red Gate is complete.

```text
phase-01 → phase-02 → phase-03 → phase-04 → phase-05
```

## [CORE] Phase 02: Mock Mode Foundation Implementation Details

### Goals
- Make mock data the default local/fresh-checkout behavior.
- Ensure API routes (`app/api/contact/route.ts`, `app/api/applications/route.ts`) support mock mode.
- Update fixtures in `lib/mock-data.ts`.

### Steps
1. **Supabase Client Refactor:**
   - Update `lib/supabase/server.ts` to be the central source of truth for mock mode resolution.
   - Support `USE_MOCK_DATA=true` explicitly and auto-fallback when credentials are placeholders.

2. **API Mocking:**
   - Modify `app/api/contact/route.ts` to handle mock submission when `USE_MOCK_DATA` is true or Supabase is absent.
   - Modify `app/api/applications/route.ts` to return mock success instead of 503 error in mock mode.

3. **Documentation:**
   - Update `.env.example` to document the default mock mode.

4. **Fixtures Update:**
   - Extend `lib/mock-data.ts` if needed for richer admin/user scenarios.

## [PIVOT] Known Risks
- The button inventory may reveal actions beyond TIP-014’s enumerated list. Treat visible buttons as in scope unless they belong to a deferred external integration.
- Admin auth may block E2E access. Use mock/admin bypass only if it does not weaken production auth behavior, or seed a test admin session via existing auth test helpers.
- Existing UI may mix Font Awesome, Material Symbols, and text icons. Preserve visual design; only fix dead interactions.
- `USE_MOCK_DATA` currently exists server-side; client-side components may need a safe public helper or API-level mock behavior instead of importing server-only code.

## [CORE] Definition of Done
- Default fresh checkout runs with mock data and no Supabase credentials.
- Every visible button/link/action in public and CMS surfaces has deterministic behavior.
- Locale-aware routes never fall back to locale-less navigation from `/vi/*` or `/ja/*`.
- Mock contact/application/admin mutations show visible success/error feedback.
- `npm run type-check` passes.
- `npm run build` passes.
- Playwright screen-map click audit passes across all required public and CMS screens.
- E2E/audit tests for mock button coverage pass.
- Visual checks/screenshots collected for public and admin representative pages, including screen-map failure screenshots when applicable.
- Separate code review/verifier approves.

## [COVERAGE] Requirement Mapping
- TIP-014 AC public button audit → `phase-01`, `phase-03`, `phase-05`
- TIP-014 AC admin button audit → `phase-01`, `phase-04`, `phase-05`
- TIP-014 default mock mode → `phase-02`, `phase-05`
- TIP-014 forms/API mock behavior → `phase-02`, `phase-03`, `phase-04`
- TIP-014 no dead buttons → `phase-01`, `phase-03`, `phase-04`, `phase-05`
- TIP-014 Playwright screen-map click QC → `phase-01`, `phase-03`, `phase-04`, `phase-05`
- TIP-014 build/typecheck → `phase-05`
