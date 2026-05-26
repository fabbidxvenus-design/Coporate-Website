# zflow Plan: TIP-025 About QC Non-Color Layout Fixes

## [CORE] Purpose
Plan-supervised zflow package for implementing `coding-packs/tips/TIP-025-about-qc-non-color-layout-fixes.md`.

## [DECISION] Mode and Tier
- Mode: `plan-supervised`
- Tier: `STANDARD`
- Reason: cross-file visual UI fix affecting About page, public header/layout, activity tabs, accordion, and accessibility semantics.
- RRI/SDD/PROPOSAL: skipped by plan mode; this plan and TIP-025 are the approved design inputs.

## [CORE] Artifact Map
- `phase-01-intake-and-scope.md` — complexity score, scope, gates.
- `phase-02-spec-red-gate.md` — BDD specs and Red Gate strategy.
- `phase-03-decompose.md` — implementation task graph and file ownership.
- `phase-04-execute-green.md` — green-phase implementation steps.
- `phase-05-verify-fix.md` — separate verification and fix loop.
- `phase-06-regress-evolve-complete.md` — final regression, evolve, handoff.
- `specs/spec-about-qc-non-color-layout.md` — Given/When/Then acceptance specs.
- `tips/tip-001-about-hero-header-stats.md` — first builder task.
- `tips/tip-002-about-activity-why-a11y.md` — second builder task.
- `.zflow/*` — scoped pipeline state, coverage matrix, tasks, handoff, reports.

## [CORE] Execution Command
```text
zflow: --plan D:\WORKSPACE\CODE\Coporate_Website\coding-packs\plans\tip-025-about-qc-non-color-layout-fixes --phase phase-01-intake-and-scope.md
```

## [CORE] Completion Definition
COMPLETE only when non-excluded About QC checks pass at 1440px, a separate verifier approves, and COLOR/IMAGE/MOCKDATA findings are documented as intentionally out of scope.
