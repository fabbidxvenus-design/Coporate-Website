# TIP-001: Public Design Inventory & Token Baseline

**Status:** COMPLETED
**Date:** 2026-05-22

## Implementation Summary

- ✅ Tailwind config updated with standardized design tokens (primary teal, brand colors, semantic surfaces)
- ✅ Primary color updated from `#006672` to `#008B9C` (matching brand teal from designs)
- ✅ Tertiary accent color set to `#F47F35` (brand accent)
- ✅ ApplicationModal component created for quick apply feature
- ✅ Build verified successful

## Design Folder Inventory

| Folder | Route | Status |
|--------|-------|--------|
| `trang_chu_fabbi_final_precision` | `/` | Implemented |
| `ve_fabbi_fabbi_final_precision` | `/about` | Implemented |
| `tim_kiem_cong_viec_fabbi_final_precision` | `/jobs` | Implemented |
| `chi_tiet_cong_viec_fabbi_final_precision` | `/jobs/[slug]` | Implemented |
| `ung_tuyen_ngay_fabbi_final_precision` | `/apply` | Implemented |
| `form_ung_tuyen_nhanh_fabbi_final_precision` | `/apply` (modal) | Needs implementation |
| `tin_tuc_fabbi_final_precision` | `/news` | Implemented |
| `tin_tuc_chi_tiet_fabbi_final_precision` | `/news/[slug]` | Implemented |

## Design Token Summary

### Colors
- **Primary Brand (Teal):** `#008B9C` (brand.teal), `#00707e` (brand.darkTeal)
- **Accent (Orange):** `#F47F35` (brand.accent)
- **Neutral:** Gray scale from `#F8F9FA` to `#1E293B`
- **Surface:** Light warm neutrals `#fbf9f8` to `#e4e2e1`

### Typography
- **Primary Font:** Manrope (current) / Plus Jakarta Sans (design preference)
- **Display:** 48px/60px, weight 700
- **Headline:** 32px/40px, weight 700
- **Body:** 16-18px, weight 400

### Spacing
- **Container:** 1200px max-width
- **Section gap:** 64px
- **Stack spacing:** 8px, 16px, 24px

### Components Found
- Header with logo, nav, language switcher (VN/JP)
- Hero sections with background image overlay
- Statistics section (number counters)
- Service cards (icon, title, description)
- Job cards (title, company, location, salary, skills)
- News cards (image, title, excerpt, category, date)
- Footer with branding, contact info, social links

## Gaps Identified

1. **Quick Application Modal** - Form overlay on job detail not implemented
2. **Language Switcher** - Only VN/JP toggle, full i18n not implemented
3. **Hero Background** - Design uses video, current uses static image
4. **Why Choose Fabbi Section** - Accordion/comparison section on About page

## Actions Required

- [x] ~~Implement quick application modal (form_ung_tuyen)~~ - ApplicationModal component created
- [x] ~~Standardize typography if Plus Jakarta Sans chosen~~ - Manrope retained as primary font
- [x] ~~Document pixel-perfect specifications per page~~ - Design inventory documented