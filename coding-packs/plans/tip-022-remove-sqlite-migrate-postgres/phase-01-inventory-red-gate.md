# Phase 01 — Inventory + Red Gate

## Objective

Create a complete SQLite/PostgreSQL migration inventory and write failing specs/tests before implementation.

## Inputs

- `coding-packs/tips/TIP-022-remove-sqlite-migrate-postgres.md`
- `POSTGRES-MIGRATION-INVENTORY.md`
- `specs/*.md`
- Current runtime files under `lib/db/`, `scripts/`, `app/api/`, public/CMS pages, and dependency manifests.

## Tasks

1. Search active code for SQLite runtime references:
   - `better-sqlite3`
   - `.data/sqlite.db`
   - `journal_mode`
   - `foreign_keys = ON`
   - `INSERT OR IGNORE`
   - `INSERT OR REPLACE`
   - SQLite-only `DATETIME` DDL
2. Update `POSTGRES-MIGRATION-INVENTORY.md` with exact files and status.
3. Write Red Gate tests/specs for:
   - PostgreSQL runtime validation.
   - Mock mode no-DB initialization.
   - DB mode no silent fallback.
   - Crawled import idempotent PostgreSQL upserts.
   - Dependency/static runtime cleanup.
4. Run the targeted tests to prove they fail for the current SQLite runtime.
5. Record failing evidence in `.zflow/red-gate.md`.

## Exit Gate

- Red Gate specs exist and compile.
- Targeted tests fail for current implementation for expected reasons.
- Inventory names every runtime file that needs migration.
- No runtime code has been changed except tests/spec files required for Red Gate.

## Handoff

Proceed to Phase 02 only after Red Gate evidence is recorded.
