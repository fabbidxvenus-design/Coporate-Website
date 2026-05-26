# tip-P5-001 — Cleanup + Verification

## Goal

Remove SQLite dependency residue and verify TIP-022 acceptance criteria.

## Instructions

1. Remove `better-sqlite3` and `@types/better-sqlite3` from dependency manifests.
2. Regenerate lockfiles.
3. Remove active runtime SQLite references.
4. Run static residue search for forbidden SQLite terms.
5. Run test/type-check/build verification.
6. Dispatch independent code/security/database review before final completion.

## Acceptance

- No active runtime SQLite dependency remains.
- Required verification commands pass.
- Separate verifier reports no CRITICAL or HIGH blockers.
- `final-report.md` is updated with evidence.
