# TIP-002: Filters and Job Cards

**Agent:** frontend implementer
**Model:** sonnet
**File ownership:** `app/(public)/jobs/page.tsx`, `components/public/JobCard.tsx`, `components/public/JobsSearch.tsx`, dictionary keys only in `lib/i18n/*.json`
**Blocked by:** tip-001

## Acceptance criteria
- [ ] Jobs filters render as checkbox-style controls for Freelancer, Internship, Full Time, and Part Time.
- [ ] Filter controls remain keyboard accessible and preserve existing filter behavior.
- [ ] Extra visible `Tất cả lĩnh vực` is removed from the design-parity filter row unless present in source HTML.
- [ ] Job cards use the larger reference-style list-card structure.
- [ ] Card links/icons have discernible accessible names.
- [ ] No pink color replacement, image replacement, or mock data edit occurs.

## Context
The QC report marks filters and job cards as FAIL: filters are currently text links, and job cards are compact 146px flex cards rather than reference list cards.

## Implementation Notes
If `JobCard` is reused outside `/jobs`, add a variant prop and apply the new reference layout only where TIP-027 requires it. Preserve current pink colors if they are already used by actions.
