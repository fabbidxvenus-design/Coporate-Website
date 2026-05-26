# Phase 03 — Jobs Layout Implementation

## Objective
Implement the non-excluded visual/structural fixes from TIP-027 while preserving data behavior, pink colors, images, and mock data records.

## Workstream A — Route and Component Ownership
1. Treat `app/(public)/jobs/page.tsx` as the main rendered implementation.
2. Keep `app/[locale]/jobs/page.tsx` as the localized wrapper if it delegates to the public page.
3. Do not modify `app/[locale]/ung_tuyen/page.tsx`.

## Workstream B — Filters
1. Replace plain link-style filter row with checkbox-style controls for:
   - `Freelancer`
   - `Internship`
   - `Full Time`
   - `Part Time`
2. Preserve existing filter behavior and URL/search param semantics where already present.
3. Remove extra visible `Tất cả lĩnh vực` from the design-parity filter row unless the source HTML includes it.
4. Ensure labels are accessible and keyboard toggle/focus works.

## Workstream C — Job Cards
1. Rework listing card composition to match reference structure:
   - 12px radius.
   - Larger vertical rhythm approximating reference card height.
   - Icon/image tile area.
   - Metadata rows.
   - Tag links.
   - Right-side detail/apply area.
2. Preserve current pink colors where the app already uses pink.
3. If `JobCard` is used elsewhere, add a variant prop and use the reference variant for `/jobs` only.
4. Every clickable icon/image-only area must have visible text or `aria-label`.

## Workstream D — Lower Sections and Sidebar
1. Add `Chuyên mục ảnh` section after the listing/sidebar block.
2. Use only existing/current image assets or references; do not alter mappings.
3. Add `Tìm kiếm công việc theo Location` section after photo section.
4. Derive location names/counts from existing rendered job data or local UI arrays without modifying mock data records.
5. Expand sidebar widget blocks using existing visible content where feasible.
6. Add fixed bottom-right floating bell with accessible name and visible focus.

## Workstream E — Localization
1. Add dictionary keys only for newly introduced labels/headings if the files already use dictionaries for jobs copy.
2. Do not leave newly added Japanese route labels hardcoded in Vietnamese.
3. Do not modify content records to solve localization gaps.

## Quality Gate
- [ ] Exclusion constraints preserved in diff.
- [ ] `/vi/jobs` structural sections match non-excluded QC requirements.
- [ ] `/ja/jobs` renders with localized/fallback-safe new labels.
- [ ] Job cards and filters remain data-driven.
- [ ] No mock data records changed.
