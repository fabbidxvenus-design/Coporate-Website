# TIP-P4-001: Repository DB Mode Integration

**Agent:** TypeScript repository implementer
**Model:** sonnet
**File ownership:** `lib/db/repositories/**`, `lib/config/**`, targeted tests
**Blocked by:** tip-P3-001-seed-transformers-command

## Acceptance criteria
- [ ] `USE_MOCK_DATA=true` remains database-independent.
- [ ] `USE_MOCK_DATA=false` uses PostgreSQL records for jobs/news/about/settings and existing repository contracts.
- [ ] Slug lookups parse JSON arrays and preserve public visibility rules.
- [ ] Missing DB tables/config in DB mode fail clearly without mock fallback.

## Context
[CORE] Wire seeded PostgreSQL data to existing repository contracts while preserving public/CMS layouts and route structure.

## Implementation Notes
Use call-time data-source evaluation. Avoid module-level database connection initialization in files imported by mock mode.
