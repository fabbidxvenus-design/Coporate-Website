# Phase 02: Public Pages — Pixel-Perfect Build

## ZFlow Context

**Phase purpose:** DET-UX-001, DET-UX-002, DET-DATA-001, DET-DATA-002, DET-STATE-001, DET-A11Y-001, DET-NFR-001, DET-NFR-002, DET-NFR-003

## Overview

Implement or refine all public recruitment pages to match `.design/recruitment_site` design source exactly. This phase focuses on structure, typography, spacing, color tokens, static content, navigation, and semantic HTML.

## Pages

| Design Folder | Target Route | Page Name |
|---|---|---|
| `trang_chu_fabbi_final_precision` | `/(public)/page.tsx` | Homepage |
| `ve_fabbi_fabbi_final_precision` | `/(public)/about/page.tsx` | About/Company |
| `tim_kiem_cong_viec_fabbi_final_precision` | `/(public)/jobs/page.tsx` | Job Search |
| `chi_tiet_cong_viec_fabbi_final_precision` | `/(public)/jobs/[slug]/page.tsx` | Job Detail |
| `tin_tuc_fabbi_final_precision` | `/(public)/news/page.tsx` | News Listing |
| `tin_tuc_chi_tiet_fabbi_final_precision` | `/(public)/news/[slug]/page.tsx` | News Detail |
| `ung_tuyen_ngay_fabbi_final_precision` | `/(public)/apply/page.tsx` | Apply Form |
| `form_ung_tuyen_nhanh_fabbi_final_precision` | `/(public)/apply/page.tsx` (quick mode) | Quick Application |

## Tasks

1. **Design token extraction.**
   - Extract colors, typography, spacing, border radius from each design `code.html`.
   - Consolidate into Tailwind config extensions and CSS custom properties.
   - Verify no Tailwind CDN dependency remains.
   - Map to DET-DATA-002.

2. **Shared layout and navigation.**
   - Refine `PublicHeader` and `PublicFooter` to match homepage design header/footer.
   - Active page indication in navigation (DET-STATE-001).
   - Semantic HTML landmarks: `<header>`, `<nav>`, `<main>`, `<footer>` (DET-A11Y-001).

3. **Per-page implementation (one TIP per page).**
   - For each page: read `code.html`, compare against current implementation.
   - Fix layout, typography, spacing, color, copy, imagery, and CTA to match design.
   - Preserve design-visible text verbatim (DET-DATA-001).
   - Verify keyboard reachability of links and buttons (DET-A11Y-001).
   - No `dangerouslySetInnerHTML` for design reproduction (DET-SEC-002).

4. **Visual verification (1440px + 1920px).**
   - Playwright screenshot at 1440px and 1920px for each page.
   - Side-by-side comparison with `.design/**/screen.png`.
   - Record deviations.
   - Map to DET-UX-006, DET-VAL-003, DET-NFR-001.

## Acceptance Criteria

- [ ] All 8 public design pages are reachable without login.
- [ ] Typography, spacing, colors, hierarchy, copy match design source.
- [ ] No Tailwind CDN usage; tokens in project config.
- [ ] Semantic HTML used (header, nav, main, footer).
- [ ] Links and buttons keyboard reachable.
- [ ] Visual evidence at 1440px and 1920px captured.
- [ ] No `dangerouslySetInnerHTML` from design HTML.

## DET Traceability

DET-UX-001, DET-UX-002, DET-DATA-001, DET-DATA-002, DET-STATE-001, DET-A11Y-001, DET-SEC-002, DET-NFR-001, DET-NFR-002, DET-NFR-003, DET-UX-006, DET-VAL-003
