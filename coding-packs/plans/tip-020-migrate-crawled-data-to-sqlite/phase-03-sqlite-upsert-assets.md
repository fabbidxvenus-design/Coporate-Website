# Phase 03 — SQLite Upsert + Asset Copy

## Objective

Safely write the import plan to SQLite and copy local crawled images into `public/images/` without destructive behavior.

## Target files

- `scripts/import-crawled-data.mjs`
- `scripts/import-crawled-data-lib.mjs`
- `lib/db/migrate.ts`
- `tests/import-crawled-data.spec.ts`

## Tasks

1. Ensure migrations run before importing.
2. Inspect `lib/db/migrate.ts` and repair schema continuity if needed:
   - restore missing index migration if it was dropped
   - make the `cover_letter` → `message` migration safe for existing DB states or document reset requirement
3. Use transactions for all SQLite mutations.
4. Use deterministic keys:
   - news by slug
   - jobs by slug when valid jobs exist
   - site settings by key
   - about content by deterministic id/locale strategy
5. Use upsert/update semantics instead of duplicating rows on repeat runs.
6. Copy images non-destructively:
   - create destination directory if needed
   - do not delete existing images
   - skip missing source images with a recorded reason
   - store only `/images/<filename>` in content fields
7. Emit an import summary with counts:
   - inserted
   - updated
   - skipped
   - failed
   - copiedImages
   - skippedImages

## Verification

- Run targeted tests against a temporary SQLite path, not the project `.data` file.
- Run the import twice and confirm second-run counts do not create duplicate records.

## Exit criteria

- Import can mutate SQLite safely.
- Image copy is idempotent and non-destructive.
- Summary output is deterministic and useful for debugging.
