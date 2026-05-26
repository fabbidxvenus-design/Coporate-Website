# SPEC: Data Source Boundary

## AC-01: Mock flag resolves to mock-only mode
- Given: `USE_MOCK_DATA=true`
- When: the data-source helper reads the runtime flag
- Then: it reports mock-only mode and SQLite mode is false

## AC-02: SQLite flag resolves to SQLite mode
- Given: `USE_MOCK_DATA=false`
- When: the data-source helper reads the runtime flag
- Then: it reports SQLite mode and mock-only mode is false

## AC-03: Missing or invalid flag behavior is explicit
- Given: `USE_MOCK_DATA` is missing or invalid
- When: the data-source helper reads the runtime flag
- Then: behavior matches the documented `.env.example` contract and is consistent across all callers

## AC-04: Mock public pages do not open SQLite
- Given: `USE_MOCK_DATA=true`
- When: public jobs, news, and about data loaders run
- Then: mock/crawled mock data is returned and `getDb()`, migrations, seed, and init functions are not called

## AC-05: Mock mode does not depend on `.data/sqlite.db`
- Given: `USE_MOCK_DATA=true` and `.data/sqlite.db` is missing, locked, or corrupt
- When: public jobs, news, and about pages render
- Then: the pages render mock data without DB recovery, DB migration, or DB initialization attempts

## AC-06: SQLite mode uses SQLite and does not fallback silently
- Given: `USE_MOCK_DATA=false`
- When: public jobs, news, and about data loaders run
- Then: SQLite-backed repositories are used and failures are explicit rather than masked by mock fallback

## AC-07: API/CMS routes obey the same boundary
- Given: API or CMS routes read/write jobs, news, about, contact, applications, settings, or dashboard data
- When: `USE_MOCK_DATA` is true or false
- Then: each route follows the shared data-source helper and does not implement conflicting flag semantics

## AC-08: Regression checks pass
- Given: data-source boundary implementation is complete
- When: targeted tests, full tests, type-check, and build run
- Then: all checks pass without Supabase runtime dependencies
