# zflow Plan: TIP-026 Job Detail QC Non-Color/Image/Mockdata Fixes

## Purpose
Plan-supervised zflow package for implementing `coding-packs/tips/TIP-026-job-detail-qc-non-color-image-mockdata-fixes.md`.

## Mode
- zflow mode: `--plan`
- Tier: STANDARD
- Scope: all state and artifacts are scoped to this plan directory.
- User exclusions: do not fix COLOR, IMAGE, or MOCKDATA mismatches.

## Primary Command
```bash
/zflow --plan coding-packs/plans/TIP-026-job-detail-qc-non-color-image-mockdata-fixes --phase phase-01-spec-red-gate.md
```

## Phase Order
1. `phase-01-spec-red-gate.md` — create/confirm failing tests and executable specs.
2. `phase-02-implementation-green.md` — implement TIP-026 non-excluded fixes.
3. `phase-03-verify-fix-loop.md` — separate-agent verification and max-3 fix loop.
4. `phase-04-deslop-regress-evolve.md` — cleanup, regression, evolve handoff.

## Artifact Map
- `tips/` — phase-scoped execution TIPs for builders.
- `specs/` — Given/When/Then behavioral specs and planned test mapping.
- `.zflow/` — intake, state, checkpoints, quality gates, handoff, verification templates.
