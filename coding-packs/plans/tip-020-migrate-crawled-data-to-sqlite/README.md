# TIP-020 Plan — Migrate Crawled Data to SQLite

## Purpose

This plan turns `coding-packs/tips/TIP-020-migrate-crawled-data-to-sqlite.md` into an executable, phase-based implementation package.

The goal is to import crawled Fabbi markdown and image assets into local SQLite `.data` while preserving the current rule:

- `USE_MOCK_DATA=true` → public site uses mock/hardcoded data only.
- `USE_MOCK_DATA=false` → supported public/CMS flows use SQLite-backed data.

## Source TIP

- `coding-packs/tips/TIP-020-migrate-crawled-data-to-sqlite.md`

## Required source inputs

- `coding-packs/crawlings/crawled_all_pages.md`
- `coding-packs/crawlings/crawled_with_images.md`
- `coding-packs/crawlings/images/`

## Artifact map

| Artifact | Purpose |
|---|---|
| `PLAN.md` | High-level zflow implementation plan and acceptance coverage |
| `specs/spec-import-crawled-data.md` | Given/When/Then behavior contract |
| `CRAWL-IMPORT-INVENTORY.md` | Crawl source inventory, target tables, and import handling notes |
| `phase-01-spec-red-gate.md` | Red Gate tests and executable specs |
| `phase-02-import-module-design.md` | Parser/import-plan module design |
| `phase-03-sqlite-upsert-assets.md` | SQLite upsert and image copy implementation |
| `phase-04-runtime-flag-alignment.md` | Mock-vs-DB runtime switching audit and updates |
| `phase-05-verification-deslop-regress.md` | Green Gate, review, cleanup, and regression verification |
| `.zflow/intake.json` | zflow intake metadata |
| `.zflow/pipeline.json` | zflow phase state and quality gates |
| `.zflow/red-gate.md` | Required failing-test evidence before implementation |
| `tips/*.md` | Executor-ready sub-TIPs for each phase |
| `final-report.md` | Completion report template to fill during implementation |

## Execution order

1. Phase 01 — create failing parser/import tests and capture Red Gate.
2. Phase 02 — implement pure parsing and import-plan helpers.
3. Phase 03 — write to SQLite and copy images idempotently.
4. Phase 04 — align runtime data-source switching for mock mode vs DB mode.
5. Phase 05 — run Green Gate, review, DESLOP, regress, and fill the final report.

## Non-goals

- Do not redesign public or CMS UI.
- Do not reintroduce Supabase dependencies or env requirements.
- Do not change admin auth/session behavior.
- Do not delete `.data` or existing `public/images/` files without explicit approval.
- Do not store absolute Windows paths in browser-facing DB fields.
