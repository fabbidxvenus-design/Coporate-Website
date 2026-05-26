# Handoff — TIP-024 zflow Plan

## Resume
Run:

```text
zflow: --plan coding-packs/plans/tip-024-cms-mockdata-activity-database-map --phase phase-01-intake-and-red-specs.md
```

## Current State
Plan artifacts are generated only. No implementation code has been changed by this plan.

## Next Step
Start Phase 01: detect test framework and add failing tests for specs in `specs/`.

## Pending Gates
- Red Gate: pending.
- Green Gate: pending.
- Separate verifier: pending.
- Visual evidence: conditional on `/admin` rendered UI changes.

## Important Constraints
- Preserve mock/database isolation at call time.
- Do not add speculative API routes.
- Do not redesign CMS pages.
- Do not reintroduce SQLite assumptions.
