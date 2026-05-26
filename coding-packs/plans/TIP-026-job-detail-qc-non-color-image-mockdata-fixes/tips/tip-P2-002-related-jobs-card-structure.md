# tip-P2-002: Related Jobs Card Structure

**Agent:** frontend implementer
**Model:** sonnet
**File ownership:** `components/public/RelatedJobs.tsx`, optional `components/public/JobCard.tsx`
**Blocked by:** phase-01 Red Gate

## Acceptance criteria
- [ ] Related jobs render as full cards instead of compact link rows.
- [ ] Each card includes title, available metadata rows, available tags/skills, and a visible detail link.
- [ ] No unavailable/mockdata-only values are invented.
- [ ] No color/image changes are introduced.

## Context
QC reports related jobs are simplified compared with the HTML reference. This TIP should improve structure/layout only, using existing data fields.

## Implementation Notes
- Reuse route generation and locale behavior already present in `RelatedJobs`.
- Use existing Tailwind utilities for spacing, card layout, and row structure.
- Do not assert or change teal/pink color parity.
