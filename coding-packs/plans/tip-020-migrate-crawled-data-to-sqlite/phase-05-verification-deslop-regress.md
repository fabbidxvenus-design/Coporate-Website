# Phase 05 — Verification / DESLOP / REGRESS

## Objective

Prove TIP-020 is complete through Green Gate checks, independent review, non-functional cleanup, and final reporting.

## Green Gate commands

```bash
pnpm run test -- tests/import-crawled-data.spec.ts
pnpm run type-check
pnpm run build
```

## Import verification

Run the import twice against the intended local SQLite path:

```bash
node scripts/import-crawled-data.mjs
node scripts/import-crawled-data.mjs
```

Record both summaries in `final-report.md` and confirm repeat runs do not duplicate deterministic records.

## Visual/manual verification

If runtime page loading changed, start the dev server and verify at minimum:

- `/vi/jobs`
- `/vi/news`
- `/vi/about`
- one imported news detail route if available

For visual changes, capture screenshots or explicitly document why visual verification was not applicable.

## Independent review

Use a separate `code-reviewer` agent after implementation. The review must check:

- SQL injection safety and parameterized statements
- idempotent upsert behavior
- no destructive file operations
- no absolute Windows paths in browser-facing fields
- no Supabase runtime dependency reintroduced
- test and build evidence

## DESLOP rules

- Remove temporary debug code only.
- Do not change functional behavior during cleanup.
- Do not delete source crawl files, `.data`, or existing `public/images` without explicit approval.

## Exit criteria

- Targeted tests pass.
- Type-check passes.
- Build passes.
- Import is idempotent.
- Separate review has no blocking findings.
- `final-report.md` is filled with real evidence.
