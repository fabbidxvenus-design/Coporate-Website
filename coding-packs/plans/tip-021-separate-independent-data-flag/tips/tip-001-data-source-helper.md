# TIP-001: Data Source Helper

**Agent:** TypeScript implementer
**Model:** sonnet
**File ownership:** `lib/config/**`, `.env.example`, `tests/data-source-boundary.spec.ts`
**Blocked by:** none
**Acceptance criteria:**
- [ ] `USE_MOCK_DATA=true` resolves to mock-only mode.
- [ ] `USE_MOCK_DATA=false` resolves to SQLite mode.
- [ ] Missing/invalid flag behavior matches `.env.example`.
- [ ] Helper avoids stale module-level env constants.

## Context
TIP-021 requires one shared server-side boundary for all callers. Direct `process.env.USE_MOCK_DATA` checks should be replaced by helper calls.

## Implementation Notes
Prefer pure helper functions that can accept an env object for tests while defaulting to `process.env` in runtime code.
