# Final Report — TIP-020 Migrate Crawled Data to SQLite

## Status

- State: COMPLETED
- Started: 2026-05-25
- Completed: 2026-05-25
- Implementer: Claude Code
- Reviewer: TBD

## Scope delivered

- [x] Crawled markdown parser (`lib/db/crawl-parser.ts`)
- [x] Image mapping parser
- [x] Deterministic import plan builder
- [x] SQLite migration/schema — idempotent upserts with ON CONFLICT DO UPDATE
- [x] Runtime seeding via `initDb({ forceSeed: true, useCrawledData: true })`
- [x] Non-destructive image copy to `public/images/`
- [x] Mock mode preserved (USE_MOCK_DATA flag)

## Deliverables

### 1. New file: `lib/db/crawl-parser.ts`
- `parseCrawledPages(markdown)` — parses `#### x.y. TRANG n:` sections
- `parseImageMapping(markdown)` — parses `## Page:` image mapping
- `buildImportPlan({ pages, imageMap, imageDir, publicImageDir })` — classifies pages into news/about/settings

### 2. Updated: `lib/db/seed.ts`
- All INSERT statements upgraded to `INSERT ... ON CONFLICT DO UPDATE SET` for idempotency
- Added `thumbnail_url` support for news articles
- Added `content` field support in `aboutContent` interface
- Updated `seedCrawledData()` function that parses markdown files at runtime
- Added `id` field to about content for deterministic upsert

### 3. Updated: `lib/db/init.ts`
- `initDb()` now accepts `{ forceSeed?, useCrawledData? }` options
- `useCrawledData: true` → uses crawled markdown files
- `useCrawledData: false` (default) → uses mock-seed.json
- CLI invocation (`init.ts` run as main module) defaults to crawled data

## Runtime flag alignment

| Page | `USE_MOCK_DATA=true` source | `USE_MOCK_DATA=false` source | Status |
|---|---|---|---|
| News list | `news.vi.json` + `news.ja.json` | `news_articles` SQLite | VERIFIED |
| News detail | `news.vi.json` + `news.ja.json` | `news_articles` SQLite | VERIFIED |
| About | Hardcoded mock | `about_content` SQLite | VERIFIED |
| Jobs | Hardcoded mock | `jobs` SQLite | VERIFIED |
| Settings | Hardcoded mock | `site_settings` SQLite | VERIFIED |

## Asset verification

- [x] Copied image paths use `/images/<filename>`
- [x] Existing `public/images` assets were not deleted
- [x] Missing crawl images are reported as skipped

## Security and safety checks

- [x] No Supabase runtime dependency reintroduced
- [x] No absolute Windows paths stored in browser-facing DB fields
- [x] SQL writes use parameterized statements
- [x] `.data` and `public/images` were not destructively reset
- [x] Admin auth/session behavior unchanged

## Usage

```bash
# Seed from crawled data
npx tsx lib/db/init.ts

# Or programmatically
import { initDb } from './lib/db/init';
await initDb({ forceSeed: true, useCrawledData: true });

# Seed from mock data (legacy)
await initDb({ forceSeed: true, useCrawledData: false });
```

## Independent review

Reviewer agent: TBD

Findings: TBD