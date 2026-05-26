# Phase 06 — Review / DESLOP / Regress

## Objective

Complete independent verification, security review, minimal cleanup, regression checks, and final reporting.

## Required Agents

- `code-reviewer` for general code quality.
- `typescript-reviewer` for TypeScript/runtime contract review.
- `security-reviewer` for database queries, auth/session behavior, API routes, file-system import handling, and secret handling.
- `database-reviewer` for PostgreSQL DDL/query review.

## Tasks

1. Run separate verifier review against TIP-022 acceptance criteria.
2. Run security review for:
   - SQL injection prevention.
   - User input validation on APIs/forms.
   - Auth/session behavior.
   - Error message leakage.
   - File-system import path safety.
3. DESLOP only after Green Gate:
   - Remove dead SQLite-only runtime files if superseded.
   - Remove unused imports and stale code paths.
   - Do not change functional behavior during cleanup.
4. Re-run regression commands:

```text
pnpm exec vitest run tests/import-crawled-data.spec.ts
pnpm run type-check
pnpm run build
```

5. Update `final-report.md` with evidence, skipped checks, and open risks.

## Exit Gate

- No CRITICAL or HIGH review findings remain.
- Regression commands pass.
- Final report contains command evidence and explicit acceptance criteria status.
- EVOLVE/background learning artifact is dispatched or noted according to zflow workflow.

## Completion

TIP-022 can be reported complete only after this phase passes.
