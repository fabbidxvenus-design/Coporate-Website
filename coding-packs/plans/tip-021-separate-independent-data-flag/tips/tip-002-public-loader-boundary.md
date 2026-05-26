# TIP-002: Public Loader Boundary

**Agent:** Frontend/server data implementer
**Model:** sonnet
**File ownership:** `app/(public)/**`, `app/[locale]/**`, `lib/db/repositories/**`, mock data loaders
**Blocked by:** tip-001-data-source-helper
**Acceptance criteria:**
- [ ] Mock mode public jobs/news/about loaders do not call SQLite connection/init/migration/seed.
- [ ] SQLite mode public loaders use SQLite repositories and do not silently fallback to mock.
- [ ] Visual layout, copy, routing, and design tokens are unchanged.

## Context
Public routes are the highest-risk surface because they must render in fresh local/mock mode even when `.data/sqlite.db` is unavailable.

## Implementation Notes
Watch for static imports that open SQLite before runtime mode branching. Split loaders or use lazy imports if necessary.
