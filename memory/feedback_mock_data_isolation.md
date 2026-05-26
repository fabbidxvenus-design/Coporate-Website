---
name: mock-data-isolation-pattern
description: Enforce strict boundary between mock and SQLite data sources using process.env.USE_MOCK_DATA
metadata:
  type: feedback
---

Repositories and API handlers must use call-time evaluation of the `USE_MOCK_DATA` flag to determine the data source.

**Why:** Module-level constants evaluated once at import are stale and unreliable. Native `better-sqlite3` bindings must not be loaded in mock mode to prevent crashes if bindings are missing.

**How to apply:**
1. Import `isMockDataMode()` from `@/lib/config/data-source`.
2. Guard `getDb()` calls behind `if (!isMockDataMode())`.
3. Use lazy dynamic imports `const { getDb } = await import('@/lib/db/connection')` within the SQLite branch.
4. Provide local mock returns (e.g. from JSON fixtures) when in mock mode. [[mock-seed-usage]]

Reference TIP-021 for implementation details. [[tip-021-data-isolation]]