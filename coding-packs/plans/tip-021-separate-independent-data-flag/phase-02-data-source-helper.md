# Phase 02 — Data-Source Helper + Env Contract

## Objective
Centralize `USE_MOCK_DATA` interpretation so all runtime callers share one contract.

## Tasks
1. Create or reuse a server-only helper, preferred path `lib/config/data-source.ts`.
2. Export `getDataSourceMode()`, `isMockDataMode()`, and `isSqliteDataMode()` or equivalent explicit APIs.
3. Avoid stale module-level env constants; helpers should be test-isolatable.
4. Update `.env.example` with allowed `USE_MOCK_DATA` values and recommended local behavior.
5. Make missing/invalid flag behavior explicit and consistent.

## Implementation Notes
- Prefer simple pure functions that read from an injected env object or `process.env` at call time.
- If invalid values fail fast, tests must assert the error message.
- If invalid values normalize to default, `.env.example` must document that default.

## Exit Criteria
- [ ] Helper exists or existing helper is consolidated.
- [ ] Env contract documented.
- [ ] Helper tests pass.
