# Phase 05 — Verification, Regression, and Handoff

## Objective
[CORE] Prove TIP-023 acceptance criteria are met, run independent review, and produce final zflow reports.

## Inputs
- Implemented migration runner, DDL, seed transformers, seed command, repository integration.
- Specs and tests from this plan.
- TIP-023 acceptance criteria.

## Tasks
1. [GREEN] Run targeted spec tests for migration validation, seed transformation, idempotent upsert behavior, image path safety, and mock-mode database isolation.
2. [GREEN] Run `pnpm run type-check` or the project equivalent.
3. [GREEN] Run relevant existing tests: data-source boundary and crawled import/seed tests.
4. [VERIFY] Use separate `code-reviewer` and `database-reviewer` agents for implementation review.
5. [REGRESS] Search runtime DB scripts for prohibited SQLite syntax and native SQLite dependency references.
6. [SAFETY] Document any checks skipped because a live PostgreSQL test database is unavailable.
7. [COMPLETE] Write `.zflow/final-report.md`, `.zflow/verify-report.md`, `.zflow/handoff.json`, and `.zflow/evolve-report.md`.

## Acceptance Criteria
- Given implementation is complete When verification runs Then all plan specs and targeted tests pass.
- Given code review runs When findings are reported Then no CRITICAL/HIGH issues remain unresolved.
- Given runtime DB files are searched When forbidden SQLite patterns are checked Then none are present outside historical docs/plans.
- Given no live PostgreSQL database is configured When verification completes Then skipped integration checks are explicitly documented with commands to run.

## Verification
- Separate verifier required; self-verification alone is not sufficient.
- No functional cleanup in DESLOP beyond formatting/dead-code removal.
- Final report must map TIP-023 ACs to evidence.
