# SPEC: Jobs QC Non-Excluded Visual Parity

## AC-01: Jobs route renders non-excluded reference sections
- Given: the app is running and published/mock jobs are available
- When: a user opens `/vi/jobs` at 1440px
- Then: the page contains the jobs heading, checkbox-style filters, jobs listing cards, sidebar widget area, `Chuyên mục ảnh`, `Tìm kiếm công việc theo Location`, footer, and fixed floating bell.

## AC-02: Pink color, image, and mock data exclusions are preserved
- Given: the implementation diff is reviewed
- When: changes are compared against TIP-027 constraints
- Then: there are no changes made solely to replace pink colors, swap image assets, alter image mappings, or change mock/seed data records.

## AC-03: Filters are checkbox-style and accessible
- Given: a keyboard or screen-reader user reaches the jobs filters
- When: the user tabs through `Freelancer`, `Internship`, `Full Time`, and `Part Time`
- Then: each control has an accessible label, visible focus, and can be toggled or activated according to existing filter behavior.

## AC-04: Job cards match reference structure without unnamed links
- Given: the jobs list renders one or more job cards
- When: the card is inspected visually and with axe/manual accessibility checks
- Then: cards use the larger reference-style layout with image/icon tile, metadata rows, tags, and right-side action area, and every clickable icon/image-only area has discernible text or `aria-label`.

## AC-05: Lower sections remain responsive and reachable
- Given: `/vi/jobs` is opened at 1440px and 375px or 390px
- When: the user scrolls through the page
- Then: no horizontal overflow occurs, the photo/category section and location section are reachable, and content is not clipped.

## AC-06: Japanese route smoke renders new labels safely
- Given: the app is running
- When: a user opens `/ja/jobs`
- Then: newly added section headings and controls use Japanese dictionary text where available or an isolated fallback that does not break rendering.

## AC-07: QC rerun has no non-excluded FAIL findings
- Given: QC is rerun against `.design/recruitment_site/tim_kiem_cong_viec_fabbi_final_precision/code.html` and `app/(public)/jobs/page.tsx`
- When: COLOR PINK, IMAGE, and MOCKDATA findings are classified as out of scope
- Then: no remaining FAIL findings exist for filters, job card structure, missing photo/location sections, floating bell presence, or unnamed links.

## Suggested Test Mapping
| AC | Suggested test type | Notes |
|---|---|---|
| AC-01 | Playwright E2E | Check headings/regions/controls exist on `/vi/jobs`. |
| AC-02 | Git diff/manual guard | Verify excluded files/properties were not changed for forbidden reasons. |
| AC-03 | Playwright E2E + keyboard | Tab/focus and accessible role/name checks. |
| AC-04 | Playwright locators + axe | Check card landmarks and link names. |
| AC-05 | Playwright viewport | Assert `scrollWidth <= clientWidth`. |
| AC-06 | Playwright smoke | Visit `/ja/jobs` and assert no runtime error. |
| AC-07 | QC skill/manual report | Compare generated QC artifacts after implementation. |
