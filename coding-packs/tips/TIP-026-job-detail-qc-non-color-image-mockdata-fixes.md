# TIP-026: Job Detail QC Non-Color/Image/Mockdata Fixes

## HEADER
- TIP-ID: TIP-026
- Project: Coporate_Website
- Module: Public job detail page
- Priority: P0
- Depends on: TIP-005, TIP-006, TIP-012, TIP-013, TIP-021, TIP-024
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: authoritative stack from `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS with project-owned design tokens, Next.js Route Handlers/Server Actions, Supabase Postgres/Auth/Storage target, Vercel + Supabase deployment target.
- QC source of truth:
  - `.qc/ui/job-details/qc-report.md`
  - `.qc/ui/job-details/visual-mismatches.json`
  - `.qc/ui/job-details/computed-style-diff.json`
  - `.qc/ui/job-details/selector-map.json`
  - `.qc/ui/job-details/browser-qc.json`
- HTML design reference: `.design/recruitment_site/chi_tiet_cong_viec_fabbi_final_precision/code.html`
- Target route used by QC: `http://localhost:3000/vi/jobs/senior-frontend-engineer-react`
- Key files to read first:
  - `app/(public)/jobs/[slug]/page.tsx`
  - `app/[locale]/jobs/[slug]/page.tsx`
  - `components/public/JobDetailClient.tsx`
  - `components/public/JobSidebar.tsx`
  - `components/public/RelatedJobs.tsx`
  - `components/public/PublicHeader.tsx`
  - `components/public/PublicFooter.tsx`
  - `components/public/JobCard.tsx`
  - `lib/i18n/vi.json`
  - `lib/i18n/ja.json`
- Patterns to follow:
  - Preserve HTML design structure and layout before cleanup.
  - Follow existing public route wrapper pattern in `app/[locale]/jobs/[slug]/page.tsx`.
  - Reuse current job data loaders and existing related job data shape; do not alter data-source boundaries.

## APPLICABLE STANDARDS
Builder MUST conform to:
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — convert static HTML exports into typed reusable Next.js components without simplifying visible composition.
- [ui/design-tokens](../standards/ui/design-tokens.md) — use `.design/**` as source of truth for layout rhythm, spacing, radius, typography, and component appearance.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — public job detail content must render from job content models and published public routes.

## TASK
Fix all job-detail QC mismatches from `.qc/ui/job-details` except COLOR, IMAGE, and MOCKDATA findings. The implementation should improve structural/layout/semantic parity for the job detail page without changing palette choices, image/banner sourcing, or mock data/content values.

This TIP specifically targets non-excluded mismatches: accessible button names, invalid ARIA/list semantics, related-jobs card structure, sidebar row/label structure where possible without inventing mock data, CTA shape/radius/layout details that are not color-related, heading-order semantics, and responsive verification coverage beyond the original 1440-only QC run.

## SPECIFICATIONS

### Business Rules
1. Preserve the current public job detail route contract for `/[locale]/jobs/[slug]` and `/jobs/[slug]`.
2. Do not change job lookup, mock-vs-database switching, seed/mock data content, slugs, or published visibility behavior.
3. Do not fix or modify color mismatches from QC, including pink-vs-teal active nav, language switcher color, CTA color, text color, body background color, or global brand palette.
4. Do not fix or modify image mismatches from QC, including the hero gradient placeholder versus photographic banner, map placeholder, social icon image choices, or floating chat image.
5. Do not fix or modify mockdata/content-value mismatches, including missing deadline when the source job lacks `closed_at`, missing quantity when no quantity field exists, or department/position data values if that requires changing mock data/schema.
6. Preserve the existing job detail main content order: header/hero area, job metadata/title section, description, requirements, benefits, action/share area, sidebar, related jobs, footer.
7. Related jobs must visually match the reference card structure more closely while reusing available `relatedJobs` fields only.
8. Sidebar details must keep available job fields but improve structure and labels to match the reference where data already exists.
9. Accessibility hard failures from QC must be fixed unless the fix would require changing excluded COLOR, IMAGE, or MOCKDATA scope.
10. The final page must not introduce horizontal overflow at 375, 768, 1024, or 1440 widths.

### Validation
1. Verify the page renders successfully at `http://localhost:3000/vi/jobs/senior-frontend-engineer-react` in local dev mode.
2. Verify at least these breakpoints: 375, 768, 1024, 1440.
3. Run automated accessibility checks using existing Playwright/axe setup if available.
4. Run TypeScript validation with the project type-check command.
5. Run the existing relevant Playwright/audit tests if practical; at minimum run the job-detail route manually in browser and record remaining excluded issues.

### Error Handling
1. If a job has no related jobs, keep the existing empty-state behavior or hide the related section consistently; do not create fake related jobs.
2. If optional sidebar fields are absent, render only fields that are available unless the label can be shown without inventing content.
3. If a share control has no implemented share action, keep its existing behavior but provide a discernible accessible name.
4. If browser verification cannot run, document the blocker and still run static/type/accessibility checks that are available.

## IMPLEMENTATION NOTES

### Required Fixes
1. Add accessible names to icon-only share buttons reported by axe.
   - Likely location: `app/(public)/jobs/[slug]/page.tsx` around the share buttons noted in QC.
   - Use `aria-label` values localized by current locale if dictionaries already support them; otherwise use short Vietnamese/Japanese-safe labels without adding a broad i18n refactor.

2. Fix invalid ARIA/list semantics in related jobs.
   - QC reports `aria-required-children`, likely caused by `role="list"` wrapping children that are links instead of `role="listitem"` elements.
   - Prefer semantic HTML: `<ul>` with `<li>` children, or remove manual ARIA roles if native semantics already apply.

3. Expand `components/public/RelatedJobs.tsx` to match the HTML card structure more closely, excluding colors/images/mockdata.
   - Required visible structure:
     - Card surface per related job.
     - Leading icon tile or equivalent existing icon treatment.
     - Title.
     - Metadata rows using available fields, such as location, salary, employment type, department/category.
     - Tags/skills if available in the related job data shape.
     - A visible detail CTA/link using existing route behavior.
     - Optional bookmark/action button only if it can be implemented as a named inert/placeholder control without changing behavior.
   - Do not invent unavailable values.
   - Do not change card colors to match QC; color fixes are out of scope.

4. Improve `components/public/JobSidebar.tsx` structure to match the reference where existing fields support it.
   - Keep sticky sidebar/card behavior.
   - Organize detail rows in the reference order as far as existing data allows: deadline, salary, position/department, location, phone/email/contact if already present, skills/tags, employment type.
   - If `closed_at`, quantity, phone, or email are absent from the current job data shape, do not add fake data or schema changes.
   - Keep the current map/visual placeholder unchanged because image/map visual fixes are out of scope.

5. Fix non-color CTA shape/layout mismatch if localized to job detail top apply button.
   - QC notes top apply CTA radius is `16px` while design uses `8px`.
   - Change only shape/layout classes such as `rounded-lg`, padding, alignment, or min-width if needed.
   - Do not change CTA color/text color/background color.

6. Address heading-order warning without changing copy/content.
   - Inspect browser/axe output in `.qc/ui/job-details/browser-qc.json` to identify the heading-order issue.
   - Use semantic heading levels that preserve visual styling.
   - Do not change visible text content unless it is an accessibility-only hidden label.

7. Re-run QC-style verification and document intentionally excluded residual mismatches.
   - Expected remaining mismatches may include hero image, CTA/header colors, font if treated as color/token scope, body background, and mockdata-dependent sidebar content.

### Files to Modify
- `app/(public)/jobs/[slug]/page.tsx`
- `components/public/RelatedJobs.tsx`
- `components/public/JobSidebar.tsx`
- Optional only if needed for localized labels: `lib/i18n/vi.json`, `lib/i18n/ja.json`
- Do not modify data seed/mock files unless required for type safety only; content-value fixes are out of scope.

### Files to Avoid Unless Necessary
- `lib/mock-data.ts` — MOCKDATA is explicitly out of scope.
- `app/globals.css` and `tailwind.config.ts` — COLOR/global token fixes are out of scope.
- Image/media files under `public/` or `.design/` — IMAGE fixes are out of scope.

## ACCEPTANCE CRITERIA
- Given the user opens `/vi/jobs/senior-frontend-engineer-react` at 1440px, When the job detail page renders, Then the page still has the same main section order and no horizontal overflow.
- Given axe checks the rendered job detail page, When share/icon controls are inspected, Then every interactive button/link has a discernible accessible name.
- Given axe checks the related jobs section, When list semantics are inspected, Then no `aria-required-children` violation is reported for related jobs.
- Given related jobs are present, When the related jobs section renders, Then each related job appears as a full card with title, metadata rows, available tags/skills, and a visible detail link instead of a compact single-row link.
- Given a job has available sidebar fields, When the sidebar renders, Then details are grouped in reference-like rows and order without inventing unavailable fields.
- Given the top apply CTA renders, When computed styles are inspected, Then non-color shape/layout mismatches such as the `16px` radius are corrected toward the reference `8px` radius while color remains unchanged by this TIP.
- Given the page is checked at 375, 768, 1024, and 1440 widths, When layout is inspected, Then there is no horizontal overflow and related job cards/sidebar stack appropriately.
- Given QC is rerun after the fix, When the report lists remaining mismatches, Then COLOR, IMAGE, and MOCKDATA items are explicitly documented as intentionally out of scope rather than silently changed.

## CONSTRAINTS
- DO NOT: change colors, brand palette, CTA background/text colors, active nav colors, body background color, or Tailwind color tokens.
- DO NOT: replace the hero gradient with an image, add new image assets, change map/social/floating-chat imagery, or edit `.design` image files.
- DO NOT: edit mock data values, add fake job fields, change job slugs, change seed content, or alter mock-vs-database runtime boundaries.
- DO NOT: redesign the page or simplify the HTML reference structure further.
- DO NOT: add dependencies without explicit user approval.
- REUSE: existing Next.js route structure, current job loader/data shape, `JobSidebar`, `RelatedJobs`, `JobCard` patterns where compatible, existing Tailwind utilities, and existing i18n dictionaries if labels are needed.
- SKIP: color parity fixes, image/banner parity fixes, mockdata/content corrections, CMS/database schema changes, and unrelated header/footer redesign.

## QUALITY GATE: SELF-REVIEW
- Completeness: Covers every non-excluded `.qc/ui/job-details` issue that can be fixed in code without COLOR, IMAGE, or MOCKDATA changes: accessibility button names, ARIA/list semantics, related-jobs structure, sidebar row structure, CTA radius/shape, heading-order, and responsive verification.
- Cross-reference: Aligned with REQ-A01/A02/A03, REQ-B04, REQ-F03; follows `frontend/html-to-nextjs`, `ui/design-tokens`, and `domain/recruitment-content` standards while honoring the user's explicit exclusions.
- Gaps: The original QC report path internally says `.qc/ui/jobs` in some artifact bullets while the user-provided folder is `.qc/ui/job-details`; builder should use the actual folder requested by the user. Remaining color/image/mockdata failures are expected and must not be fixed under this TIP.
- Action needed: Implement TIP-026, then rerun job-detail QC at 375/768/1024/1440 and compare only non-excluded mismatches.
