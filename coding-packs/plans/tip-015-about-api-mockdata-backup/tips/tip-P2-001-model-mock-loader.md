# TIP-P2-001: Typed Model and Mock Loader

**Agent:** typescript-reviewer or claude
**Model:** sonnet
**File ownership:** `lib/about/**`, optionally `lib/mock-data.ts`
**Blocked by:** TIP-P1-001

## Acceptance Criteria
- [ ] Typed About content model exists.
- [ ] Complete VI/JA mock content exists.
- [ ] Locale normalization falls back to `vi`.
- [ ] Unit tests for model/mock fallback pass.

## Context
Read `phase-02-typed-content-model-mock-backup.md`.

## Implementation Notes
Extract visible copy from current About page. Preserve content and image intent.
