# Spec — Crawled Data Import to PostgreSQL

## Requirement Mapping

- TIP-022 Business Rules: 6
- TIP-022 Validation: 2
- TIP-022 Error Handling: 3, 4
- TIP-022 Acceptance: running import twice does not duplicate rows and reports idempotent upsert behavior.

## Given / When / Then

### Scenario 1: Parser behavior is preserved

Given crawled markdown and image mapping files exist  
When `parseCrawledPages`, `parseImageMapping`, and `buildImportPlan` run  
Then they produce the same page/image/news/about/settings plan shape already covered by `tests/import-crawled-data.spec.ts`.

### Scenario 2: PostgreSQL import is idempotent

Given an import plan with news, about content, settings, and assets  
When the PostgreSQL import command runs twice  
Then rows are upserted by stable keys such as slug, locale/id, or setting key  
And the second run does not duplicate records.

### Scenario 3: Browser image paths stay safe

Given imported content references local crawled images  
When image fields are persisted  
Then browser-facing values start with `/images/` or are `null`  
And absolute Windows paths are never stored in the database.

### Scenario 4: Asset copy is non-destructive

Given `public/images` already contains files  
When the import copies crawled assets  
Then existing public images are not deleted  
And missing crawl images are reported as skipped.

## Red Test Shape

Add tests that mock PostgreSQL query calls and assert `ON CONFLICT (...) DO UPDATE` upserts are issued with parameter arrays. Keep existing parser tests green throughout implementation.
