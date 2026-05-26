# Crawl Import Inventory — TIP-020

## Source files

| Source | Role | Handling |
|---|---|---|
| `coding-packs/crawlings/crawled_all_pages.md` | Primary crawled page content | Parse sections by `#### ... TRANG ...: <url>` |
| `coding-packs/crawlings/crawled_with_images.md` | Page-to-image mapping | Parse groups by `## Page: <url>` |
| `coding-packs/crawlings/images/` | Local crawled media assets | Copy referenced existing files to `public/images/` non-destructively |

## Target storage

| Target | Imported content |
|---|---|
| `.data/sqlite.db` | SQLite runtime data |
| `news_articles` | News, events, awards, activity articles, and other article-like pages |
| `about_content` | Localized about/company/greeting/mission/vision/value/team content |
| `site_settings` | Contact/company metadata when extracted from crawl |
| `jobs` | Only valid job postings if required fields exist in crawl |
| `public/images/` | Browser-served copies of referenced local crawl images |

## Browser-facing URL rule

Database fields and rendered content must use:

```text
/images/<filename>
```

They must not use:

```text
D:\WORKSPACE\...
./coding-packs/crawlings/images/...
file://...
```

## Initial classification plan

| Crawl signal | Classification | Notes |
|---|---|---|
| URL contains `/tin-tuc/` | `news_articles` | Generate deterministic slug from URL/title |
| Page type includes hoạt động, giải thưởng, sự kiện, tin tức | `news_articles` | Preserve original body as sanitized/render-safe content path |
| Greeting/company/about/vision/mission/value/team pages | `about_content` or `site_settings` | Prefer locale-aware about content for public about page |
| Contact information bullets | `site_settings` | Store address, phone, email, social links as keyed settings |
| Career/job detail with required fields | `jobs` | Skip if title/location/description cannot be derived safely |
| `[Missing Image]` marker | skipped image | Record source URL and reason in import summary |

## Required import summary fields

- `pagesParsed`
- `newsInserted`
- `newsUpdated`
- `aboutInserted`
- `aboutUpdated`
- `settingsInserted`
- `settingsUpdated`
- `jobsInserted`
- `jobsUpdated`
- `recordsSkipped`
- `imagesCopied`
- `imagesSkipped`
- `errors`

## Open checks before implementation

- Confirm exact SQLite schema after migrations run.
- Confirm whether existing `about_content` uniqueness supports desired locale/id strategy.
- Confirm whether imported news detail pages already render `thumbnail_url` and `content` safely.
- Confirm whether homepage DB mode should show imported latest news/jobs or remain intentionally hardcoded.
