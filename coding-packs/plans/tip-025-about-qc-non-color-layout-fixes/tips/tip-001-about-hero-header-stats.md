# TIP-001: About Hero, Header, Main Offset, and Stats

**Agent:** frontend implementer
**Model:** sonnet
**File ownership:** `app/(public)/about/page.tsx`, `app/[locale]/about/page.tsx`, `components/public/PublicHeader.tsx`, `app/(public)/layout.tsx`, `app/[locale]/layout.tsx`
**Blocked by:** none

## Acceptance criteria
- [ ] Hero is 600px tall at 1440px.
- [ ] Hero has no visible centered `h1` but retains an accessible page title.
- [ ] Hero includes centered circular play overlay without changing image assets.
- [ ] Public header is fixed, 80px high, and has subtle non-color elevation.
- [ ] Main content is offset below fixed header without overlap.
- [ ] Stats card radius is 12px and shadow matches low-elevation reference.
- [ ] Stat values no longer create heading-order violations.
- [ ] No COLOR, IMAGE, or MOCKDATA changes are introduced.

## Context
TIP-025 filters `.qc/ui/about` findings by excluding COLOR, IMAGE, and MOCKDATA. This task addresses the top-of-page layout and semantic mismatches only.

## Implementation notes
- Preserve current localized route behavior for `/vi/about` and `/ja/about`.
- If the current About page implementation is shared between localized and non-localized routes, update the shared source or mirror the minimal patch consistently.
- Use CSS/Tailwind classes for layout, not new data or image assets.
- If adding an off-screen `h1`, use the project's existing screen-reader-only convention if present.
