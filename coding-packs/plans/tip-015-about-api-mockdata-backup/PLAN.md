# PLAN: TIP-015 About API + Mock Data Backup

## [CORE] Objective
Implement `coding-packs/tips/TIP-015-about-api-mockdata-backup.md`: move the public About page from hardcoded content to a typed API/loader-backed content model with complete Vietnamese/Japanese mock fallback, while preserving the existing visual composition.

## [DECISION] zflow Mode
- Mode: plan-supervised.
- Recommended command for execution: `/zflow --plan D:\WORKSPACE\CODE\Coporate_Website\coding-packs\plans\tip-015-about-api-mockdata-backup --quality=high --effort=high`
- Tier score: 58/100 → STANDARD recommended.
  - Lexical/scope: API + mockdata backup + public page data binding.
  - Structural: touches page, API route, loader, typed model, mock data, tests.
  - Risk: visual drift and fallback behavior; no admin CRUD/migration required.

## [CORE] Source Artifacts
- TIP: `coding-packs/tips/TIP-015-about-api-mockdata-backup.md`
- Requirements matrix: `coding-packs/01-REQUIREMENTS-MATRIX.md`
- Task graph: `coding-packs/02-TASK-GRAPH.md`
- Standards:
  - `coding-packs/standards/frontend/html-to-nextjs.md`
  - `coding-packs/standards/ui/design-tokens.md`
  - `coding-packs/standards/database/supabase-saas.md`

## [SPEC] Red Gate Strategy
Before implementation, create failing tests proving the current missing behavior:
1. `tests/unit/about-content.test.ts`
   - `normalizeAboutLocale` or loader fallback returns Vietnamese for invalid locale.
   - mock About content exposes complete VI/JA schema.
   - missing Supabase client falls back to mock content.
2. `tests/e2e/about-api-mockdata.spec.ts`
   - `/api/about?locale=vi` returns success + full content in mock/fresh mode.
   - `/api/about?locale=ja` returns success + same schema in Japanese.
   - `/api/about?locale=en` returns Vietnamese fallback or existing locale-safe behavior.
   - `/vi/about` and `/ja/about` render without console/page errors.
3. Visual baseline artifact:
   - Playwright screenshot of `/vi/about` and `/ja/about` after Green Gate.

Red Gate passes only when tests compile and fail against the current hardcoded/no-API state.

## [CORE] Phase List
1. `phase-01-red-gate-contract-tests.md` — add G/W/T specs and failing tests for API, mock fallback, and route rendering.
2. `phase-02-typed-content-model-mock-backup.md` — add typed About content model and complete VI/JA mock content.
3. `phase-03-api-route-loader.md` — implement central loader and `GET /api/about?locale=vi|ja`.
4. `phase-04-about-page-binding-interactions.md` — bind About page to loader and make visible controls deterministic without visual redesign.
5. `phase-05-verification-deslop-regress.md` — green gate, visual screenshots, review, cleanup, final report.

## [CORE] Execution Order
Execute phases sequentially. Do not bind production UI until Red Gate exists and fails for the missing API/loader behavior.

```text
phase-01 → phase-02 → phase-03 → phase-04 → phase-05
```

## [CORE] Architecture Blueprint

### Data model files
- Create `lib/about/types.ts`:
  - `AboutLocale = 'vi' | 'ja'`
  - `AboutStat`
  - `AboutActivity`
  - `AboutHighlight`
  - `AboutCta`
  - `AboutPageContent`
- Create `lib/about/mock-data.ts`:
  - `mockAboutContent: Record<AboutLocale, AboutPageContent>`
  - Content extracted from current `app/(public)/about/page.tsx` for VI/JA.
- Create `lib/about/get-about-content.ts`:
  - `normalizeAboutLocale(locale: string | null | undefined): AboutLocale`
  - `getMockAboutContent(locale): AboutPageContent`
  - `getAboutContent(locale): Promise<AboutPageContent>`

### API route
- Create `app/api/about/route.ts`.
- Response shape:

```ts
{
  success: true,
  data: AboutPageContent,
  error: null
}
```

- On unexpected error:

```ts
{
  success: false,
  data: null,
  error: { code: 'ABOUT_CONTENT_ERROR', message: 'Unable to load about content' }
}
```

### Supabase strategy
- Do not add a migration in this TIP unless current implementation already has a suitable content/settings table.
- `getAboutContent` must call `createClient()`.
- If `createClient()` returns `null`, return mock content.
- If Supabase path is not implemented yet, keep explicit mock fallback and avoid throwing; document deferred Supabase table integration in final report.
- If using `site_settings`, only read public-safe content keys and validate/narrow shape before returning.

### Page binding
- Modify `app/(public)/about/page.tsx` to call `getAboutContent(locale)`.
- Preserve current section order/classes:
  - Hero
  - Stats cards
  - About/company section
  - Activities
  - Why choose Fabbi highlights
  - CTA
- Replace inline arrays/copy with `content.*` fields.
- Convert visible activity/highlight buttons into deterministic client interactions only if currently expected by TIP-014 button handling; otherwise use accessible static presentation.

## [PIVOT] Known Risks
- The current About page has many inline hardcoded localized strings. Moving them to mock content can accidentally change text or layout; preserve exact visible content unless correcting obvious typos.
- Adding full Supabase schema may exceed this TIP. Prefer loader + API + mock fallback, with Supabase read hook if existing storage supports it.
- Activity/highlight buttons currently look interactive; TIP-014 requires deterministic behavior. Implement minimal local state if needed, but do not redesign the component.
- Browser screenshots are required because this is a visual page.

## [CORE] Definition of Done
- `tests/unit/about-content.test.ts` exists and passes.
- `tests/e2e/about-api-mockdata.spec.ts` exists and passes for `/api/about`, `/vi/about`, `/ja/about`.
- `GET /api/about?locale=vi` returns complete VI About content in mock mode.
- `GET /api/about?locale=ja` returns complete JA About content in mock mode.
- `/vi/about` and `/ja/about` render complete content without Supabase credentials.
- Existing About visual composition is preserved.
- Visible About controls have deterministic behavior.
- `npm run type-check` passes.
- `npm run build` passes; if stale `.next` causes `/_document` cache errors, clear `.next` and rerun once, documenting it.
- Playwright screenshots captured for `/vi/about` and `/ja/about`.
- Separate code review/verifier approves.
- EVOLVE is dispatched in background/non-blocking.

## [COVERAGE] Requirement Mapping
- TIP-015 AC API + mock fallback → `phase-01`, `phase-02`, `phase-03`, `phase-05`
- TIP-015 AC localized `/vi/about` + `/ja/about` → `phase-02`, `phase-04`, `phase-05`
- TIP-015 AC Supabase unavailable fallback → `phase-02`, `phase-03`, `phase-05`
- TIP-015 AC visual preservation → `phase-04`, `phase-05`
- TIP-015 AC deterministic buttons → `phase-04`, `phase-05`
- Build/typecheck/test gates → `phase-01`, `phase-05`
