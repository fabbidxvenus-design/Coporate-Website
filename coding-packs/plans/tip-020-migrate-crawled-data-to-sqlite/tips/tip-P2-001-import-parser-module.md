# Sub-TIP P2-001 — Import Parser Module

## Parent

- TIP-020: Migrate Crawled Data to SQLite
- Phase: `phase-02-import-module-design.md`

## Task

Implement pure parser and import-plan helpers for crawled Fabbi markdown and image mappings.

## Files to create/modify

- Create: `scripts/import-crawled-data-lib.mjs`
- Create: `scripts/import-crawled-data.mjs`
- Modify: `tests/import-crawled-data.spec.ts`

## Required behavior

- Parse `crawled_all_pages.md` sections by `#### ... TRANG ...: <url>`.
- Extract source URL, page type, title, body/detail text, contact fields, and candidate image refs.
- Parse `crawled_with_images.md` groups by `## Page: <url>`.
- Convert `./images/<filename>` references into `/images/<filename>` browser URLs.
- Record `[Missing Image]` references as skipped image items with reasons.
- Keep helpers deterministic and testable without writing to project `.data`.

## Acceptance criteria

- Given representative markdown fixtures, when `parseCrawledPages` runs, then it returns stable structured page records.
- Given representative image mapping fixtures, when `parseImageMapping` runs, then it returns page-keyed image records.
- Given parsed pages and image mappings, when `buildImportPlan` runs, then output contains target records and skip reasons.

## Verification

```bash
pnpm run test -- tests/import-crawled-data.spec.ts
```

Expected result: parser/import-plan tests pass; DB mutation tests may still fail until Phase 03.
