# Phase 02 — Import Module Design

## Objective

Create a testable import module that parses crawled markdown and builds a deterministic import plan without mutating the real database by default.

## Target files

- `scripts/import-crawled-data.mjs`
- `scripts/import-crawled-data-lib.mjs`
- `tests/import-crawled-data.spec.ts`

## Required exports

`import-crawled-data-lib.mjs` should expose pure helpers where possible:

- `parseCrawledPages(markdown)`
- `parseImageMapping(markdown)`
- `buildImportPlan({ pages, imageMap, imageDir, publicImageDir })`
- `copyImages(plan)`
- `upsertImportPlan(db, plan)`
- `runImport(options)`

## Parser rules

1. Split content pages by `#### ... TRANG ...: <url>`.
2. Extract at minimum:
   - source URL
   - page number/section label when present
   - page type from `Phân loại trang`
   - title from `Tiêu đề`
   - body/detail markdown from `Mô tả chi tiết`
   - contact fields when present
   - linked image filenames when present
3. Split image mapping by `## Page: <url>`.
4. Resolve local image references from `./images/<filename>` to:
   - source path: `coding-packs/crawlings/images/<filename>`
   - browser URL: `/images/<filename>`
5. Preserve `[Missing Image]` entries as skipped image records with reasons.

## Classification rules

- News/article records: pages with news-like URLs, article-like page types, award/event/activity content, or explicit news page labels.
- About/settings records: greeting, company, vision, mission, values, team, culture, contact, and corporate information pages.
- Jobs records: only import if required job fields are present; do not invent jobs from generic careers prose.

## Exit criteria

- Pure parser tests pass.
- Import plan is deterministic for the same input.
- No absolute Windows paths appear in browser-facing output fields.
