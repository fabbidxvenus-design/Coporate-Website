# Phase 01 — Red Gate + Contract Tests

## [CORE] Goal
Create failing tests and specs that prove TIP-015 is not implemented yet: no typed About content loader, no `/api/about` route, and About page still depends on hardcoded content.

## [CORE] Scope
- Test/spec artifacts only.
- No functional implementation changes.

## [CORE] Tasks
1. Create `specs/spec-about-content-model.md` with G/W/T scenarios for locale normalization, content completeness, and mock fallback.
2. Create `specs/spec-about-api.md` with G/W/T scenarios for `GET /api/about?locale=vi|ja|invalid`.
3. Create `specs/spec-about-page-visual.md` with G/W/T scenarios for `/vi/about`, `/ja/about`, deterministic controls, and screenshots.
4. Add `tests/unit/about-content.test.ts` expecting exports from `lib/about/get-about-content` and `lib/about/mock-data`.
5. Add `tests/e2e/about-api-mockdata.spec.ts` expecting `/api/about` and `/vi/about`/`/ja/about` to work in mock/fresh mode.

## [RED GATE]
- `npm run type-check` should compile or fail only because implementation exports/routes do not exist.
- Unit/E2E specs should fail against current code until phases 02-04 are implemented.

## [DONE]
- Red Gate tests exist and are intentionally failing for missing implementation.
- Specs are written in Given/When/Then form.
