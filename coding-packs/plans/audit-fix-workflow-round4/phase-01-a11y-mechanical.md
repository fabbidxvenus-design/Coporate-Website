# Phase 01 — A11y Mechanical Fixes

## Scope

Top 10 mechanical accessibility fixes — pure `aria-hidden` additions on decorative icons. No design changes, no behavior changes.

## Source

`plans/comprehensive-audit/a11y-audit.md` findings A11Y-015, 016, 024, 028, 032, 051, 066, 073, 077, 102/103.

## Files

1. `components/public/JobCard.tsx`
   - A11Y-015: icon `work` → `aria-hidden="true"`
   - A11Y-016: dot separators → `aria-hidden="true"`

2. `components/public/NewsCard.tsx`
   - A11Y-024: decorative arrow icon → `aria-hidden="true"`

3. `components/public/JobsSearch.tsx`
   - A11Y-028, 032: decorative icons (job, calendar, clock, salary, map, search, tag) → `aria-hidden="true"`

4. `components/public/ApplyForm.tsx`
   - A11Y-051: upload SVG icon → `aria-hidden="true" focusable="false"`

5. `components/admin/ArticleForm.tsx`
   - A11Y-066: expand icons → `aria-hidden="true"`

6. `components/admin/SettingsForm.tsx`
   - A11Y-073: status icons (check_circle, error) → `aria-hidden="true"`

7. `components/admin/ApplicationDetail.tsx`
   - A11Y-077: document and download icons → `aria-hidden="true"`

8. `app/login/page.tsx`
   - A11Y-102: logo SVG → `aria-hidden="true" focusable="false"` + aria-label on link

## Verification

```bash
npm run build
npx playwright test --config=playwright.audit.config.ts
```