# Sub-TIP P3-001 — SQLite Upsert + Asset Copy

## Parent

- TIP-020: Migrate Crawled Data to SQLite
- Phase: `phase-03-sqlite-upsert-assets.md`

## Task

Implement SQLite mutation and asset copy behavior for the import plan.

## Files to create/modify

- Modify: `scripts/import-crawled-data-lib.mjs`
- Modify: `scripts/import-crawled-data.mjs`
- Modify if needed: `lib/db/migrate.ts`
- Modify: `tests/import-crawled-data.spec.ts`

## Required behavior

- Run migrations before import.
- Use transaction-scoped writes.
- Upsert deterministic records instead of duplicating them.
- Copy referenced images to `public/images/` without deleting existing files.
- Store only `/images/<filename>` in SQLite browser-facing fields.
- Emit inserted/updated/skipped/failed/copy counts.

## Acceptance criteria

- Given a temporary SQLite DB, when import runs once, then expected records are inserted.
- Given the same import runs twice, then row counts remain stable and records are updated rather than duplicated.
- Given a valid local image reference, when import runs, then the image is copied to `public/images/` and referenced by browser-safe URL.
- Given a missing image reference, when import runs, then summary includes a skipped image reason.

## Verification

```bash
pnpm run test -- tests/import-crawled-data.spec.ts
node scripts/import-crawled-data.mjs
node scripts/import-crawled-data.mjs
```
