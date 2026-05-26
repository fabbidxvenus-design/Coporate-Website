# tip-P2-001: Job Detail Accessibility and Semantics

**Agent:** frontend implementer
**Model:** sonnet
**File ownership:** `app/(public)/jobs/[slug]/page.tsx`, `components/public/RelatedJobs.tsx`, `tests/audit/job-detail-qc-non-excluded.spec.ts`
**Blocked by:** phase-01 Red Gate

## Acceptance criteria
- [ ] Share/icon controls have discernible accessible names.
- [ ] Related jobs no longer produce `aria-required-children` violations.
- [ ] Heading-order warning from job detail QC is addressed without visible content changes.

## Context
TIP-026 requires fixing accessibility hard failures from `.qc/ui/job-details` while excluding COLOR, IMAGE, and MOCKDATA changes.

## Implementation Notes
- Prefer native semantic HTML (`ul`/`li`) over manual ARIA roles.
- Add `aria-label` to icon-only controls.
- Do not change social icon imagery, color classes, or share behavior unless required for accessibility naming.
