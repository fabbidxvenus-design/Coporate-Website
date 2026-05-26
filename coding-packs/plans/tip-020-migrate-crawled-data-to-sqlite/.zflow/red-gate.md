# Red Gate — TIP-020

## Requirement

Before implementing the importer, create executable tests that describe the required crawl parsing, image mapping, import planning, SQLite idempotency, and mock/DB mode behavior.

## Required failing command

```bash
pnpm run test -- tests/import-crawled-data.spec.ts
```

## Expected initial failure

The first run must fail because the import helper module or required behavior does not exist yet. Acceptable Red Gate failures include:

- Cannot resolve `scripts/import-crawled-data-lib.mjs`.
- Exported helper function is missing.
- Parser/import-plan behavior assertions fail against stub implementation.

## Required test coverage

- Parse `#### ... TRANG ...: <url>` page sections from `crawled_all_pages.md`-style content.
- Parse `## Page: <url>` image mappings from `crawled_with_images.md`-style content.
- Build browser-safe image URLs using `/images/<filename>`.
- Skip missing images with reasons instead of failing the whole import.
- Upsert imported records idempotently against a temporary SQLite DB.
- Preserve `USE_MOCK_DATA=true` as mock-only behavior.

## Evidence to record

Paste the first failing test output into `final-report.md` under "Red Gate evidence".

## Pass condition before leaving Phase 01

- The spec file exists.
- The targeted test file exists.
- The targeted test command was run and failed for an expected Red Gate reason.
