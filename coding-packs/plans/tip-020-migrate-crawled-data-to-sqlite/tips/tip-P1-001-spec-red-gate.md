# Sub-TIP P1-001 — SPEC / Red Gate

## Parent

- TIP-020: Migrate Crawled Data to SQLite
- Phase: `phase-01-spec-red-gate.md`

## Task

Create executable tests before implementation for parsing crawled markdown, parsing image mappings, building browser-safe image references, and proving import idempotency design.

## Files to create/modify

- Create: `tests/import-crawled-data.spec.ts`
- Read: `specs/spec-import-crawled-data.md`
- Read: `.zflow/red-gate.md`

## Acceptance criteria

- Given no importer implementation exists, when the targeted test command runs, then it fails for an expected Red Gate reason.
- Given inline crawl markdown fixtures, when tests are written, then they cover page section parsing and image mapping parsing.
- Given a missing image fixture, when import planning is tested, then the record is skipped with a reason instead of throwing globally.

## Verification

```bash
pnpm run test -- tests/import-crawled-data.spec.ts
```

Expected result in this sub-TIP: fail first, then proceed to implementation sub-TIPs.
