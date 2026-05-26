# TIP-027: Jobs QC Non-Color/Image/Mockdata Fixes

## HEADER
- TIP-ID: TIP-027
- Project: Coporate_Website
- Module: Public jobs listing UI parity
- Priority: P0
- Depends on: TIP-005, TIP-012, TIP-013, TIP-021, TIP-024
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: Authoritative stack from `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS with project-owned design tokens, Next.js Route Handlers/Server Actions, Supabase Postgres/Auth/Storage target, Vercel/Supabase deployment target.
- QC source of truth:
  - `.qc/ui/jobs/qc-report.md`
  - `.qc/ui/jobs/visual-mismatches.json`
  - `.qc/ui/jobs/computed-style-diff.json`
  - `.qc/ui/jobs/a11y-results.json`
  - `.qc/ui/jobs/screenshots/design-1440.png`
  - `.qc/ui/jobs/screenshots/app-1440.png`
- Design source of truth:
  - `.design/recruitment_site/tim_kiem_cong_viec_fabbi_final_precision/code.html`
  - `.design/recruitment_site/tim_kiem_cong_viec_fabbi_final_precision/screen.png` if present
- Key files to read first:
  - `app/[locale]/jobs/page.tsx`
  - `app/(public)/jobs/page.tsx`
  - `components/public/JobCard.tsx`
  - `components/public/JobsSearch.tsx`
  - `components/public/PublicHeader.tsx`
  - `components/public/PublicFooter.tsx`
  - `lib/i18n/vi.json`
  - `lib/i18n/ja.json`
  - `lib/mock-data.ts`
- Patterns to follow:
  - Preserve existing public route structure and localized route wrappers.
  - Match the HTML design layout and component structure before cleanup.
  - Reuse existing data loaders and mock/database boundary semantics; do not change mock data content or repository behavior.

## APPLICABLE STANDARDS
Builder MUST conform to:
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — convert static HTML into typed reusable Next.js components while preserving visual composition.
- [ui/design-tokens](../standards/ui/design-tokens.md) — preserve layout, spacing rhythm, radius, typography, and component appearance from design assets.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — public jobs render CMS/mock-backed recruitment content and expose only published jobs.

## TASK
Fix all non-excluded `/vi/jobs` QC mismatches reported under `.qc/ui/jobs`. The user explicitly excludes COLOR PINK, IMAGE, and MOCKDATA findings from this TIP, so preserve current pink color choices where they exist, preserve current image assets/URLs, and do not edit mock data content or data-source behavior.

The implementation should make the jobs listing page structurally and spatially match the HTML design: correct the QC target understanding, restore checkbox-style filters, rework listing cards to the reference card composition, add missing lower sections, add the floating bell control, and fix accessibility issues that are not solely caused by excluded pink color contrast.

## SPECIFICATIONS
### Business Rules
1. `/vi/jobs` and `/ja/jobs` must continue to render the public jobs listing route through the current localized route structure.
2. Do not implement or modify `app/[locale]/ung_tuyen/page.tsx`; the QC report only notes it was the wrong JSX target. Future QC should target `app/[locale]/jobs/page.tsx` or `app/(public)/jobs/page.tsx`.
3. Keep the current data source and filtering semantics intact: published jobs render publicly, and mock/database isolation from TIP-021 remains unchanged.
4. Preserve current pink color usage where present. Do not replace pink CTAs, pink nav states, pink accents, or pink pagination/link styling as part of this TIP.
5. Preserve current images. Do not replace the hero photo, job images/icons, carousel images, local media mappings, or remote/generated image references as part of this TIP.
6. Preserve mock data. Do not edit `lib/mock-data.ts` content except if an import/type-only adjustment is strictly required and does not change records.
7. Fix visible structure/layout mismatches that are independent of excluded colors/images/mock data:
   - Jobs section heading text should match the design: `Danh sách tuyển dụng` for Vietnamese, with a localized Japanese equivalent in `ja.json` if this text is dictionary-backed.
   - Filters should render as checkbox-style controls for `Freelancer`, `Internship`, `Full Time`, and `Part Time` with visible checked states matching the design, not as plain text links.
   - Remove the extra visible `Tất cả lĩnh vực` filter from the design-parity control row unless it exists in the design reference.
   - Job list cards should match the reference card structure: larger list-card height/rhythm, 12px card radius, icon/image tile area, metadata rows, tag links, and right-side detail/apply action area while preserving existing pink colors if currently used.
   - Add the lower `Chuyên mục ảnh` section after the listing/sidebar area. Use existing/current image assets only; if no suitable dynamic image source exists, use current already-imported or already-public assets without changing image mapping data.
   - Add the lower `Tìm kiếm công việc theo Location` card section after the photo section using existing location values derived from rendered jobs or static UI labels without changing mock data.
   - Add the fixed floating bell button at bottom-right with accessible name and keyboard focus styling.
   - Expand the sidebar to include feed/widget-style blocks if possible using existing visible content; do not introduce new mock records.
8. Fix non-color accessibility failures:
   - Every icon-only job-card link must have discernible text via visible text or `aria-label`.
   - The floating bell must be a real `button` or accessible link with an accessible name.
   - Checkbox-style filters must have associated accessible labels and usable keyboard focus.
9. Color-contrast failures caused by pink color choice are explicitly out of scope; document them as intentionally excluded after verification.

### Validation
1. Validate that `/vi/jobs` renders without runtime errors.
2. Validate that `/ja/jobs` renders without runtime errors and without hardcoded Vietnamese-only UI in newly added labels where dictionary patterns already exist.
3. Validate that filter controls still update the visible job list or URL state according to existing app behavior.
4. Validate that all added interactive controls are keyboard reachable and have accessible names.
5. Validate no horizontal overflow at 1440px and at least one mobile breakpoint (`375` or `390`).

### Error Handling
1. Do not add silent fallbacks that hide data-source errors.
2. If no jobs exist for a filter/location, reuse existing empty-state behavior or add a small localized empty message without changing repository contracts.
3. If photo carousel data is unavailable, render the section shell with existing safe assets/content rather than fetching new remote resources.
4. Keep existing application navigation behavior for job detail/apply links.

## ACCEPTANCE CRITERIA
- Given the app is running locally When the builder opens `http://localhost:3000/vi/jobs` at 1440px Then the page includes the design-equivalent jobs heading, checkbox-style filters, large reference-style job cards, sidebar widget area, `Chuyên mục ảnh`, `Tìm kiếm công việc theo Location`, footer, and floating bell.
- Given the user requested exclusions When reviewing the diff Then no changes are made solely to replace pink colors, swap image assets, or alter mock data records.
- Given a job card contains an icon-only or image-only clickable area When axe or manual accessibility inspection checks link names Then each clickable control has discernible text or an `aria-label`.
- Given the filter row is focused with keyboard navigation When the user tabs through filters Then each checkbox-style filter receives visible focus and can be toggled or activated according to existing filter behavior.
- Given `/vi/jobs` is loaded at 1440px and 375px When the page is inspected Then there is no horizontal overflow and lower sections remain reachable.
- Given `/ja/jobs` is loaded When newly added section headings and controls render Then they use Japanese dictionary text where the page already uses localization patterns, or a clearly isolated fallback that can be localized later.
- Given QC is rerun against `.design/recruitment_site/tim_kiem_cong_viec_fabbi_final_precision/code.html` and `app/(public)/jobs/page.tsx` When excluding COLOR PINK, IMAGE, and MOCKDATA findings Then no remaining FAIL findings exist for filters, job-card structure, missing photo/location sections, floating bell presence, or unnamed links.

## CONSTRAINTS
- DO NOT: fix pink color findings in this TIP.
- DO NOT: replace hero/photo/card images or alter image mapping in this TIP.
- DO NOT: edit mock data records, seed data records, repository contracts, or data-source selection semantics.
- DO NOT: implement the legacy `app/[locale]/ung_tuyen/page.tsx` redirect target; it is not the jobs page.
- DO NOT: redesign the page beyond matching the HTML/QC structure.
- DO NOT: add new dependencies.
- DO NOT: weaken existing auth/data boundary behavior.
- REUSE: existing public jobs route files, `JobCard`, `JobsSearch`, public layout/header/footer, dictionaries, job repository/data loader, and existing Tailwind token system.
- REUSE: existing assets already in `public/` or currently referenced by the jobs page for any added photo section visuals.
- SKIP: color parity for pink findings, image parity, mock-data content parity, Supabase/PostgreSQL schema changes, and unrelated pages.

## IMPLEMENTATION NOTES
1. Start from the actual jobs route implementation, not the erroneous QC JSX path:
   - `app/[locale]/jobs/page.tsx`
   - `app/(public)/jobs/page.tsx`
2. Compare against `.qc/ui/jobs/qc-report.md` lines describing non-excluded mismatches:
   - filters: links → checkbox controls
   - cards: compact flex card → reference list card
   - missing sections: photo carousel, location cards, floating bell
   - sidebar feed/widget simplification
   - a11y unnamed links
3. If `JobCard` is reused on other pages where compact styling is desired, add a variant prop rather than breaking other routes. Keep the jobs listing variant as the default only if current usage confirms that is safe.
4. If a newly added section needs repeated visual content, derive it from existing rendered jobs or existing static UI arrays in the page component; do not change mock data source files.
5. After implementation, run at minimum:
   - `npm run type-check`
   - `npm run build` if feasible in the local environment
   - browser check of `/vi/jobs` at 1440px and mobile width
   - axe or existing QC a11y check if available

## QUALITY GATE: SELF-REVIEW
- Completeness: PASS — TIP covers all non-excluded `.qc/ui/jobs` FAIL/WARN findings that require implementation: target route understanding, filters, cards, lower sections, sidebar widget area, floating bell, responsive/no-overflow, and non-color a11y link names.
- Cross-reference: PASS — aligns with `coding-packs/02-TASK-GRAPH.md` TIP-005 jobs domain, TIP-012 footer/public layout, TIP-013 localization, TIP-021 data-source boundary isolation, TIP-024 stable CMS/mock-data mapping, `.qc/ui/jobs/qc-report.md`, and applicable frontend/UI/domain standards.
- Gaps: COLOR PINK, IMAGE, and MOCKDATA findings are intentionally excluded by user request. Color-contrast issues caused only by pink contrast may remain documented after verification. QC was originally run with the wrong JSX path, so this TIP instructs future verification to target the actual jobs implementation.
- Action needed: Implement TIP-027, rerun jobs QC at 1440px and a mobile breakpoint, and document any remaining excluded pink/image/mockdata findings separately.
