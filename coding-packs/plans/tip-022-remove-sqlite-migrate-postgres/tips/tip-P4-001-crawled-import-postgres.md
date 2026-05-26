# tip-P4-001 — Crawled Import to PostgreSQL

## Goal

Preserve TIP-020 parser/import behavior while changing persisted writes from SQLite to PostgreSQL.

## Instructions

1. Keep existing parser tests passing.
2. Convert seed/import writes to PostgreSQL parameterized upserts.
3. Use stable conflict targets for news, about content, and settings.
4. Copy images non-destructively and persist only `/images/<filename>` browser URLs.
5. Report inserted/updated/skipped row and asset counts.

## Acceptance

- Import can run twice without duplicate rows.
- Browser-facing image paths are safe.
- No crawled source files or existing `public/images` assets are deleted.
