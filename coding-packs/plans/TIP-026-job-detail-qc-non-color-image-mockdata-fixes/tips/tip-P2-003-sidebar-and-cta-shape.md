# tip-P2-003: Sidebar Structure and CTA Shape

**Agent:** frontend implementer
**Model:** sonnet
**File ownership:** `components/public/JobSidebar.tsx`, `app/(public)/jobs/[slug]/page.tsx`
**Blocked by:** phase-01 Red Gate

## Acceptance criteria
- [ ] Sidebar details are grouped in reference-like rows using available fields only.
- [ ] Absent deadline/quantity/phone/email values are not invented.
- [ ] Top apply CTA non-color radius/layout mismatch is fixed.
- [ ] CTA background/text colors remain unchanged by this TIP.

## Context
QC reports sidebar row content/ordering drift and apply CTA radius mismatch. User explicitly excluded COLOR, IMAGE, and MOCKDATA fixes.

## Implementation Notes
- Keep sticky sidebar behavior.
- Keep map/placeholder visual unchanged.
- Use `rounded-lg` or equivalent to align CTA radius if current style is `16px`.
- Avoid touching global tokens or mock data files.
