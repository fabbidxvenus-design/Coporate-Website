# Phase 01 — Discovery and Schema Contract

## Objective
[CORE] Establish the exact PostgreSQL schema contract from current repository types, mock/crawled data shape, and TIP-023 acceptance criteria before writing migrations.

## Inputs
- `coding-packs/tips/TIP-023-postgres-schema-seed-from-mockdata.md`
- `package.json`
- `.env.example`
- `lib/config/data-source.ts`
- `lib/db/types.ts`
- `lib/db/repositories/*.ts`
- `lib/mock-data.ts` and/or `lib/mock-data/**`
- `coding-packs/crawlings/crawled_all_pages.md`
- `coding-packs/crawlings/content_image_mapping.json`

## Tasks
1. [CORE] Inventory current entity contracts: jobs, news_articles, applications, contact_submissions, site_settings, about_content, admin_users, admin_sessions, optional media_assets and cms_activities.
2. [DECISION] Confirm active PostgreSQL client approach from current code after TIP-022: direct `pg` pool or Supabase-compatible Postgres connection through `DATABASE_URL`.
3. [CORE] Define table-by-table schema contract with columns, constraints, indexes, JSONB fields, and seed conflict keys.
4. [CORE] Define seed source map from mock/crawled sources to target tables.
5. [SAFETY] Confirm `USE_MOCK_DATA=true` path can remain database-free and no page/API render should invoke migrations/seeds.

## Deliverables
- Schema contract section in `.zflow/schema-contract.md`.
- Seed source map section in `.zflow/schema-contract.md`.
- Updated decomposition TIP references if discovery finds table/entity mismatch.

## Acceptance Criteria
- Given current repository return types When schema contract is complete Then every required repository field maps to a PostgreSQL column or JSONB payload.
- Given current mock/crawled data When seed mapping is complete Then every seeded table has a source, conflict key, and deterministic ID/slug/key rule.
- Given `USE_MOCK_DATA=true` When discovery checks data-source boundaries Then no migration/seed step is part of normal rendering.

## Verification
- Run TypeScript-aware searches/read-throughs only; no functional code changes in this phase.
- Record any schema gaps in `.zflow/execution-gaps.md` before proceeding.
