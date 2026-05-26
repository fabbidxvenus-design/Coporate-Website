# Sub-TIP P5-001 — Verification / DESLOP / REGRESS

## Parent

- TIP-020: Migrate Crawled Data to SQLite
- Phase: `phase-05-verification-deslop-regress.md`

## Task

Complete Green Gate verification, separate code review, cleanup, regression checks, and final report evidence.

## Required commands

```bash
pnpm run test -- tests/import-crawled-data.spec.ts
pnpm run type-check
pnpm run build
```

Run import twice:

```bash
node scripts/import-crawled-data.mjs
node scripts/import-crawled-data.mjs
```

## Review requirement

Use a separate `code-reviewer` agent before marking the implementation complete.

## Acceptance criteria

- Given implementation is complete, when targeted tests run, then they pass.
- Given implementation is complete, when type-check and build run, then both pass.
- Given import is run twice, then second run does not create duplicate deterministic records.
- Given code review runs, then there are no CRITICAL or HIGH findings left unresolved.
- Given cleanup is complete, then no temporary debug code remains.

## Final report

Fill `final-report.md` with:

- Red Gate output
- Green Gate output
- first and second import summaries
- runtime flag audit table
- security/safety checklist
- independent reviewer findings
- final notes
