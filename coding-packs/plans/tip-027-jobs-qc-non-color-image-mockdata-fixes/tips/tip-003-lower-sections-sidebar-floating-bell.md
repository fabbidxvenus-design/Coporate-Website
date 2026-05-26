# TIP-003: Lower Sections, Sidebar, and Floating Bell

**Agent:** frontend implementer
**Model:** sonnet
**File ownership:** `app/(public)/jobs/page.tsx`, extracted public components if needed under `components/public/**/*`, dictionary keys only in `lib/i18n/*.json`
**Blocked by:** tip-001

## Acceptance criteria
- [ ] `Chuyên mục ảnh` section renders after the listing/sidebar block.
- [ ] `Tìm kiếm công việc theo Location` section renders after the photo/category section.
- [ ] Sidebar includes feed/widget-style blocks where feasible using existing visible content.
- [ ] Fixed bottom-right floating bell exists with accessible name and visible focus.
- [ ] Added visuals use existing/current assets only.
- [ ] Location labels/counts derive from existing jobs or local UI arrays without mock data record changes.

## Context
The QC report marks photo carousel, location cards, and floating bell as missing, and sidebar feed/widget content as simplified.

## Implementation Notes
Do not fetch new remote images or change image mappings. Do not introduce new mock records. New section data can be derived from current jobs or local constants in the page/component.
