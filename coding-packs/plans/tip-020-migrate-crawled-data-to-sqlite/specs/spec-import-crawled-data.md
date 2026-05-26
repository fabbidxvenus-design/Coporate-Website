# SPEC: Import Crawled Fabbi Data to SQLite

## AC-01: Fresh import creates and populates SQLite
- Given: source files `crawled_all_pages.md`, `crawled_with_images.md`, and `crawlings/images/` exist
- When: the import command runs against the active SQLite path
- Then: migrations are applied and SQLite contains imported news/about/settings records plus jobs when valid job records exist

## AC-02: Import is idempotent
- Given: the import command has already completed once
- When: the same command runs again with the same inputs
- Then: deterministic imported row counts remain stable and existing rows are updated instead of duplicated

## AC-03: Images are copied and browser-safe URLs are stored
- Given: crawl image references point to files under `coding-packs/crawlings/images/`
- When: the import command runs
- Then: valid images exist under `public/images/` and SQLite content references use `/images/<filename>` rather than absolute filesystem paths

## AC-04: Mock mode remains independent from SQLite
- Given: `USE_MOCK_DATA=true`
- When: public pages load
- Then: pages continue using mock/hardcoded content and do not require imported SQLite data

## AC-05: DB mode renders imported content
- Given: `USE_MOCK_DATA=false` and the import has run successfully
- When: `/vi/jobs`, `/vi/news`, `/vi/about`, job detail, or news detail pages load
- Then: supported public pages read from `.data/sqlite.db` and show imported published content

## AC-06: Malformed crawl sections are skipped with reasons
- Given: a crawl section is missing required fields or references a missing/corrupt image
- When: the import command runs
- Then: the bad section is skipped or imported without the optional image, and the summary reports the reason

## AC-07: Build and type-check remain green
- Given: the import implementation is complete
- When: `pnpm run type-check` and `pnpm run build` are executed
- Then: both commands pass without Supabase runtime dependencies
