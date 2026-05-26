# Handoff — TIP-026 zflow Plan

## Current State
- Mode: plan-supervised zflow
- Tier: STANDARD
- Current phase: SPEC [RED]
- Focus lock: ON

## Source of Truth
- TIP: `coding-packs/tips/TIP-026-job-detail-qc-non-color-image-mockdata-fixes.md`
- Plan: `coding-packs/plans/TIP-026-job-detail-qc-non-color-image-mockdata-fixes`
- QC: `.qc/ui/job-details`

## Next Action
Run phase 01 and create failing tests before implementation:

```bash
/zflow --plan coding-packs/plans/TIP-026-job-detail-qc-non-color-image-mockdata-fixes --phase phase-01-spec-red-gate.md
```

## Must Preserve
- Do not fix COLOR mismatches.
- Do not fix IMAGE mismatches.
- Do not fix MOCKDATA/content-value mismatches.

## Verification Requirement
Use a separate verifier agent for Green Gate. Capture visual/browser evidence at 375, 768, 1024, 1440.
