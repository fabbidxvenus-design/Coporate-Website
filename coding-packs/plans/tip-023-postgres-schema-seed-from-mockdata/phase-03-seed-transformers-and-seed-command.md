# Phase 03 — Seed Transformers and Seed Command

## Objective
[CORE] Build deterministic mock/crawled-data transformers and an idempotent PostgreSQL seed command.

## Inputs
- Phase 01 schema/seed source map.
- Phase 02 migration runner and DDL.
- `lib/mock-data.ts` / `lib/mock-data/**`.
- `coding-packs/crawlings/crawled_all_pages.md`.
- `coding-packs/crawlings/content_image_mapping.json`.
- Existing crawl parser/import helpers if present.

## Tasks
1. [CORE] Create seed transformer functions for jobs, news_articles, about_content, site_settings, admin_users, and optional media/activity records.
2. [CORE] Validate seed records before database writes: required IDs/slugs/titles, status unions, JSON arrays, safe image paths, deterministic dates.
3. [SAFETY] Ensure admin seed password handling uses existing hash pattern or stronger approved hash; never store plaintext passwords.
4. [CORE] Implement `pnpm db:seed` with parameterized upserts and entity-level inserted/updated/skipped summary counts.
5. [SAFETY] Default seed must upsert only known seed IDs/keys and must not destructively reset user-created production data.
6. [OPTIONAL] Add dry-run summary if practical.

## Deliverables
- Seed transformer module(s).
- Seed command script/module.
- `package.json` script update for `db:seed`.
- Unit tests for seed transformers.

## Acceptance Criteria
- Given mock/crawled data exists When seed transformers run Then they emit repository-compatible rows with deterministic IDs/slugs/keys.
- Given seed image fields are produced When validated Then each path is `/images/<filename>`, null, or an allowed HTTPS URL.
- Given `pnpm db:seed` runs twice after migrations Then the second run does not duplicate rows and reports idempotent upsert behavior.
- Given a malformed seed record exists When validation runs Then the failing entity type and ID/slug/key are reported.

## Verification
- Red gate: seed transformer tests fail before implementation.
- Green gate: seed transformer tests pass and seed command reports counts against a configured PostgreSQL database or documented local test DB.
