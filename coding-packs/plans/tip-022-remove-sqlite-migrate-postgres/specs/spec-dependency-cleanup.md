# Spec — SQLite Dependency Cleanup

## Requirement Mapping

- TIP-022 Business Rules: 1, 8
- TIP-022 Constraints: no SQLite runtime fallback; no `better-sqlite3`; no `.data` runtime assumption.
- TIP-022 Acceptance: no runtime imports or SQLite-only SQL remain outside historical docs/plans.

## Given / When / Then

### Scenario 1: SQLite native dependency is removed

Given package manifests have been updated  
When dependencies are inspected  
Then `better-sqlite3` and `@types/better-sqlite3` are absent from app dependencies and lockfiles  
And PostgreSQL client dependencies are present only if required by the chosen implementation.

### Scenario 2: Active runtime code has no SQLite imports

Given implementation is complete  
When active runtime source files are searched  
Then no imports from `better-sqlite3` remain  
And no active code references `.data/sqlite.db`.

### Scenario 3: SQLite-only SQL is removed from runtime

Given implementation is complete  
When active migration/seed/repository code is searched  
Then no SQLite pragmas, `INSERT OR IGNORE`, `INSERT OR REPLACE`, or SQLite-only `DATETIME` DDL remain.

## Red Test Shape

Add a static scan test or verification script for active source files that excludes historical plan/docs directories. It should fail while SQLite runtime is still present and pass after cleanup.
