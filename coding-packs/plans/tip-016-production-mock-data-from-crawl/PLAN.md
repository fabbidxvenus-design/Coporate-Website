# PLAN: TIP-016 Production-Like Mock Data from Crawled Fabbi Content

## ZFLOW INTAKE

### Complexity Score
- Lexical signals:
  - `production`, `database/Supabase`, `mock data`, `media assets`: +15 risk/data signal
  - More than 3 file paths/directories: +10
  - Long TIP with explicit validation and acceptance criteria: +5
- Structural signals:
  - Estimated subtasks: 6 major subtasks x 5 = +25
  - Cross-file dependencies: crawl data, images, mock-data model, i18n, generated docs/tests = +15
  - Test/verify requirements: +5
  - Impact scope: module-wide content/data package = +10
  - Reversibility: moderate, new generated content + docs = +5
- Total: 90
- Tier: THOROUGH

### Scope Decision
This run should implement only the processed mock-data package and verification artifacts. It must not wire the package into UI components unless the user explicitly promotes that work.

## [SPEC] Target Outputs

### Files to create
- `coding-packs/crawlings/processed/site-content.vi.json`
- `coding-packs/crawlings/processed/site-content.ja.json`
- `coding-packs/crawlings/processed/news.vi.json`
- `coding-packs/crawlings/processed/news.ja.json`
- `coding-packs/crawlings/processed/portfolio.vi.json`
- `coding-packs/crawlings/processed/portfolio.ja.json`
- `coding-packs/crawlings/processed/media-manifest.json`
- `coding-packs/crawlings/processed/mock-seed.json`
- `coding-packs/crawlings/processed/CONTENT-SOURCE-MAP.md`
- `coding-packs/crawlings/processed/MOCK-DATA-GUIDE.md`
- `tests/e2e/production-mock-data.spec.ts` or `tests/audit/production-mock-data.spec.ts` for artifact validation.

### Files to read/use as source of truth
- `coding-packs/tips/TIP-016-production-mock-data-from-crawl.md`
- `coding-packs/crawlings/crawled_raw_data.json`
- `coding-packs/crawlings/crawled_all_pages.md`
- `coding-packs/crawlings/crawled_content.md`
- `coding-packs/crawlings/images/**`
- `lib/mock-data.ts`
- `types/database.ts`

## [RED] Test Plan

Create a Playwright/API-independent Node validation test that initially fails because processed files do not exist.

Test coverage:
1. AC-01: all required JSON files exist and parse.
2. AC-02: all referenced local images exist under `coding-packs/crawlings/images/`.
3. AC-03: all slugs are URL-safe and unique per collection.
4. AC-04: no forbidden placeholder terms or remote image URLs exist.
5. AC-05: `mock-seed.json` has required top-level collections and job/news field completeness.
6. AC-06: translated JA fallback content has `translationStatus: machine_draft_needs_review` when source evidence is VI-only.
7. AC-07: Markdown docs exist and include source traceability + mapping guidance.

Red Gate command:
```bash
pnpm playwright test tests/audit/production-mock-data.spec.ts --reporter=list
```
Expected RED result before implementation: required processed files missing.

## [GREEN] Implementation Plan

### Phase 1 — Source Inventory
1. Parse `crawled_raw_data.json` and list source pages by URL/title/language.
2. Read `crawled_all_pages.md` for summarized page classifications.
3. Inventory images under `coding-packs/crawlings/images/` and group by filename hints:
   - leadership/profile: names such as `Mr`, `Ms`, personal names, avatar-like images.
   - culture/news: event/news filenames, teambuilding, awards, seminar, Sao Khue.
   - portfolio/project: product or client names such as LMS, Zenpost, Bondbod, Glams, Tekko, Dcarbon.
   - technology: react, vuejs, nodejs, java, go, blockchain logos.

### Phase 2 — Data Model Draft
Define JSON shapes before filling data:
- `site-content.{locale}.json`: company, hero/about, vision, mission, values, services, leadership, offices, timeline, certifications, contact, social links.
- `news.{locale}.json`: article array with required fields from TIP.
- `portfolio.{locale}.json`: portfolio item array with problem/solution/technologies/images.
- `media-manifest.json`: full selected media mapping.
- `mock-seed.json`: seed-shaped aggregate matching future Supabase collections.

### Phase 3 — Content Normalization
1. Extract factual VI content from raw crawl first, summarized markdown second.
2. Extract JA source content where available.
3. For missing JA sections, write concise professional Japanese draft and attach `translationStatus`.
4. Avoid inventing factual claims; only invented content allowed is realistic recruitment job postings aligned to actual service domains, and these must be marked as synthetic recruitment mock data in source map.

### Phase 4 — Media Selection
1. Use only `coding-packs/crawlings/images/**` paths.
2. Select 20-40 high-value assets for manifest.
3. Attach accessible `alt.vi` and `alt.ja` for each selected asset.
4. Mark uncertain assets as `unknown`; do not use unknowns in primary news/portfolio/site seed.

### Phase 5 — Documentation
Create:
- `CONTENT-SOURCE-MAP.md`: facts mapped to crawl source URLs/sections, including conflicts and synthetic job disclosure.
- `MOCK-DATA-GUIDE.md`: how collections map to current app mock data and future Supabase seed/import.

### Phase 6 — Validation
Run:
```bash
pnpm playwright test tests/audit/production-mock-data.spec.ts --reporter=list
pnpm build
```
If build is unrelated to generated content, still run it to confirm no repo-level regression.

## [VERIFY] Separate Verification Requirements
Use a separate verifier agent after implementation to review:
- factual traceability
- JSON/schema completeness
- no placeholder/remote content
- image path validity
- alignment with TIP-016 constraints

## [DESLOP] Cleanup Rules
- Cleanup may only adjust formatting, naming consistency, and documentation clarity.
- Do not change extracted facts during DESLOP unless verifier found a factual traceability issue.
- Do not wire processed JSON into runtime UI in DESLOP.

## [REGRESS] Final Checks
- `pnpm playwright test tests/audit/production-mock-data.spec.ts --reporter=list`
- `pnpm build`
- Optional: full Playwright suite if runtime files were touched.

## Risks and Mitigations
- Risk: image filenames are ambiguous. Mitigation: mark uncertain assets as `unknown` and avoid primary usage.
- Risk: Japanese source coverage incomplete. Mitigation: explicit `translationStatus` on generated translations.
- Risk: factual hallucination. Mitigation: every non-synthetic claim must appear in source map.
- Risk: over-scoping into app wiring. Mitigation: this plan ends at processed package + docs + validation tests.

## Done Criteria
- All TIP-016 output files exist.
- Validation tests pass.
- Build passes.
- Separate verifier approves or only non-blocking findings remain.
- `coding-packs/plans/tip-016-production-mock-data-from-crawl/.zflow/final-report.md` is created after execution.
