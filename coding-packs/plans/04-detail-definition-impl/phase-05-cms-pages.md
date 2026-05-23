# Phase 05: CMS Dashboard & Admin Pages

## ZFlow Context

**Phase purpose:** DET-UX-005, DET-API-003, DET-STATE-004, DET-ERR-003, DET-A11Y-003, DET-UX-006, DET-VAL-003, DET-NFR-001

## Overview

Implement all CMS/admin pages from `.design/cms_site` as login-gated operational screens. This phase focuses on layout, CMS navigation, table/card structures, missing data handling, and visual parity.

## Pages

| Design Folder | Target Route | Page Name |
|---|---|---|
| `bang_dieu_khien_cms_fabbi` | `/admin` | Dashboard |
| `quan_ly_ten_tuyen_dung_cms_fabbi` | `/admin/jobs` | Job Management |
| `quan_ly_tin_tuc_cms_fabbi` | `/admin/news` | News Management |
| `quan_ly_ung_tuyen_cms_fabbi` | `/admin/applications` | Application Management |
| `settings_cms_fabbi` | `/admin/settings` | Settings |

## Tasks

1. **CMS Layout & Navigation.**
   - Refine `CmsSidebar` and `CmsTopbar` to match CMS design.
   - Navigation shows current admin context/active section (DET-STATE-004).
   - Sidebar/header layout matches design intent.
   - Admin navigation keyboard reachable (DET-A11Y-003).

2. **Per-page implementation (one TIP per page).**
   - For each page: read `code.html`, compare against current implementation.
   - Fix layout, tables, cards, forms, typography, and colors to match design.
   - Display data structures equivalent to design references (DET-API-003).
   - If live data is absent, use design-equivalent seeded/mock data without breaking visual review (DET-API-003, DET-ERR-003).

3. **Missing data & Error states.**
   - CMS tables/lists retain design structure when data is empty (DET-ERR-003).
   - Visually controlled empty states that don't leak implementation errors.

4. **Visual verification (1440px + 1920px).**
   - Playwright screenshot at 1440px and 1920px for each CMS page.
   - Side-by-side comparison with `.design/cms_site/**/screen.png`.
   - Record deviations.
   - Map to DET-UX-005, DET-UX-006, DET-VAL-003, DET-NFR-001.

## Acceptance Criteria

- [ ] All 5 CMS design pages are reachable after login.
- [ ] Sidebar/header/table/card layouts match CMS designs.
- [ ] Navigation shows current active section.
- [ ] CMS tables retain structure when data is empty.
- [ ] Visual evidence at 1440px and 1920px captured.
- [ ] Admin navigation keyboard reachable.

## DET Traceability

DET-UX-005, DET-API-003, DET-STATE-004, DET-ERR-003, DET-A11Y-003, DET-UX-006, DET-VAL-003, DET-NFR-001
