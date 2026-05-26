# Schema Contract — TIP-023
## Overview
PostgreSQL migration contracts based on current repository types in `lib/db/types.ts` and active database connection in `lib/db/connection.ts` (using `postgres` JS driver).

## Schema Mapping

| Entity | Repository Table | Key Fields | JSONB Fields | Seed Conflict Key |
| :--- | :--- | :--- | :--- | :--- |
| Job | `jobs` | `id`, `slug`, `status` | `skills`, `tags` | `slug` |
| News | `news_articles` | `id`, `slug`, `status` | `tags` | `slug` |
| Application | `applications` | `id`, `job_id` | - | `id` |
| Contact | `contact_submissions` | `id`, `email` | - | `id` |
| Setting | `site_settings` | `id`, `key` | - | `key` |
| Admin | `admin_users` | `id`, `email` | - | `email` |
| Session | `admin_sessions` | `id`, `token` | - | `token` |
| About | `about_content` | `id`, `locale` | `values`, `team_members`, `stats` | `id`, `locale` |

## Data Boundary Integrity
- [CORE] Database connection is isolated in `lib/db/connection.ts`.
- [CORE] `USE_MOCK_DATA=true` (default) bypasses database initialization.
- [CORE] Repositories use `isMockDataMode()` to toggle between `mockData` fixtures and `sql` queries.

## Seed Source Map
- `jobs`: `coding-packs/crawlings/processed/mock-seed.json` -> `jobs` table
- `news`: `news.vi.json` + `news.ja.json` (merged with locale prefixes) -> `news_articles` table
- `about`: `coding-packs/crawlings/processed/about.json` -> `about_content` table
- `settings`: `siteSettings` from `mock-seed.json` -> `site_settings` table
