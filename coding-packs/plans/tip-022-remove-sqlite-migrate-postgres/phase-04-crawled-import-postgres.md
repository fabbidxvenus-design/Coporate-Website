# Phase 04 — Crawled Data Import to PostgreSQL

## Objective

Migrate TIP-020 crawled-data import behavior from SQLite writes to PostgreSQL idempotent upserts while preserving parser behavior and image path safety.

## Inputs

- `lib/db/crawl-parser.ts`
- `lib/db/seed.ts`
- `lib/db/init.ts`
- `scripts/import-crawled-data.mjs`
- `scripts/import-crawled-data-lib.mjs`
- `tests/import-crawled-data.spec.ts`
- `coding-packs/crawlings/crawled_all_pages.md`
- `coding-packs/crawlings/crawled_with_images.md`
- `coding-packs/crawlings/images/`

## Tasks

1. Preserve parser tests for `parseCrawledPages`, `parseImageMapping`, and `buildImportPlan`.
2. Convert seed/import writes to PostgreSQL parameterized upserts.
3. Use stable conflict targets:
   - News: slug or slug/locale if locale exists.
   - About: id/locale or equivalent stable key.
   - Settings: key.
4. Ensure imported image URLs are `/images/<filename>` or `null` only.
5. Copy assets non-destructively; do not delete existing public images.
6. Report parsed, inserted/updated/skipped rows and copied/skipped assets.
7. Run import idempotency tests using mocked PostgreSQL calls or a gated test DB.

## Exit Gate

- Existing parser tests pass.
- Import can be run twice without duplicate records by design/test evidence.
- No absolute filesystem paths are persisted in browser-facing fields.
- Import failures are explicit and do not partially hide database errors.

## Handoff

Proceed to Phase 05 after crawled import behavior is PostgreSQL-backed and idempotent.
