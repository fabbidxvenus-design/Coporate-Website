# TIP-025: About QC Non-Color Layout Fixes

## HEADER
- TIP-ID: TIP-025
- Project: Coporate_Website
- Module: Public About Page QC Fix
- Priority: P0
- Depends on: TIP-004, TIP-011, TIP-015, TIP-024
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS with project-owned design tokens, Next.js Route Handlers / Server Actions, Supabase/PostgreSQL-backed runtime where enabled, Vercel + Supabase deployment assumptions.
- QC source: `.qc/ui/about/qc-report.md`, `.qc/ui/about/computed-style-diff.json`, `.qc/ui/about/a11y-results.json`, `.qc/ui/about/screenshots/design-1440.png`, `.qc/ui/about/screenshots/web-1440.png`.
- Design source: `.design/recruitment_site/ve_fabbi_fabbi_final_precision/code.html` and `.design/recruitment_site/ve_fabbi_fabbi_final_precision/screen.png`.
- Key files to read first: `app/(public)/about/page.tsx`, `app/[locale]/about/page.tsx`, `components/about/ActivityTabs.tsx`, `components/about/WhyChooseAccordion.tsx`, `components/public/PublicHeader.tsx`, `components/public/PublicFooter.tsx`, `app/(public)/layout.tsx`, `app/[locale]/layout.tsx`, `app/globals.css`.
- Patterns to follow: preserve the `.design` HTML layout and QC target first; keep changes narrow to About route parity defects and shared header/footer behavior needed by the About screenshot.

## APPLICABLE STANDARDS
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — Convert static HTML exports into typed reusable Next.js components while preserving visual composition.
- [ui/design-tokens](../standards/ui/design-tokens.md) — Professional Tech Hub typography, spacing, radius, layout rhythm, and component appearance source of truth.

## TASK
Fix all About page QC mismatches reported under `.qc/ui/about` except COLOR, IMAGE, and MOCKDATA issues. The builder must make the implemented `/vi/about` desktop layout match the HTML design at 1440px for non-color visual structure, spacing, sizing, component shape/elevation, missing controls, and accessibility semantics.

## SPECIFICATIONS
### Business Rules
1. Do not change brand colors, active-state colors, footer colors, image assets, image sources, or mock/content data in this TIP.
2. Fix the About hero structure: desktop hero must be `600px` tall below the public header, must remove the centered visible `h1` overlay, and must show the centered circular play-button overlay from the HTML design.
3. Preserve accessible page naming after removing the visible hero `h1`; use an off-screen/visually-hidden `h1` if needed so the page still has a valid top-level heading without changing the visual screenshot.
4. Fix public header geometry for the About QC target: desktop header should behave like the design with fixed positioning, `80px` height, and subtle elevation; add matching `main` top offset/padding so content starts below the fixed header.
5. Fix stats card shape/elevation only: match `12px` radius and `0 4px 20px rgba(0,0,0,.05)` shadow while preserving the existing stat values and data source.
6. Fix activity layout width and missing controls: desktop activity row should match the design width (`1120px` at 1440px), and the content card must include pagination dots plus previous/next circular controls below the image.
7. Fix activity active-tab icon treatment where it is not color-only: active tab should include the square icon background/shape from the HTML reference while preserving existing labels and data.
8. Fix CTA border thickness/shape drift when it is not a color change: reduce the About CTA border from `border-2` to the design-equivalent single border.
9. Fix accordion shape/elevation drift while skipping color changes: active item should use the reference-level border thickness/radius/shadow instead of stronger pink-tinted elevation.
10. Fix the why-choose decorative layer by adding the missing low-opacity dashed circular SVG/background layer behind section content, without changing section copy or images.
11. Fix the accessibility heading-order issue: stat values must not create heading-order violations before the main content heading sequence.
12. Preserve bilingual route behavior: fixes must apply to `/vi/about` and `/ja/about` without breaking non-localized public route fallback if it still exists.

### Validation
- Re-run the About QC flow at 1440px against `/vi/about` and compare against `.qc/ui/about/screenshots/design-1440.png`.
- Verify there is no horizontal overflow at 1440px.
- Verify browser console has no errors on `/vi/about`.
- Run automated accessibility checks and confirm the prior `heading-order` violation is resolved.
- If color-contrast violations remain due only to excluded COLOR issues, document them as intentionally out of scope for this TIP.

### Error Handling
- If a decorative layer or control icon cannot load from an asset, render it with inline SVG/CSS rather than external network resources.
- If carousel controls are non-functional in the original static reference, render them as accessible buttons with clear labels; they may be inert only if disabled/announced and no carousel behavior exists.
- Do not silently remove existing localized content, API loaders, or mock fallback behavior while changing layout.

## ACCEPTANCE CRITERIA
- Given `/vi/about` is opened at 1440px When the page loads Then the hero section is 600px tall, starts below the fixed 80px header, has no visible centered `h1`, and includes the centered circular play overlay.
- Given `/vi/about` is opened at 1440px When inspecting the header and main layout Then the header is fixed with subtle shadow and the main content has the correct top offset without overlapping.
- Given `/vi/about` is opened at 1440px When inspecting the stats block Then its card radius and shadow match the design values while stat values remain unchanged.
- Given `/vi/about` is opened at 1440px When inspecting the activity section Then the desktop row is 1120px wide and the content card includes pagination dots plus previous/next controls.
- Given `/vi/about` is opened at 1440px When inspecting the why-choose section Then the dashed circular decorative background layer is present behind content.
- Given automated accessibility checks run When heading structure is evaluated Then stat values no longer trigger a heading-order violation.
- Given QC reports color, image, or mock-data drift When this TIP is reviewed Then those findings are explicitly left unchanged and not counted as failures for this TIP.

## CONSTRAINTS
- DO NOT: fix or alter COLOR mismatches in this TIP, including primary teal values, pink/teal active-state colors, footer background color, hover colors, or contrast issues caused only by excluded colors.
- DO NOT: replace, add, recolor, crop, or remap IMAGE assets for hero/activity/footer/mock content in this TIP.
- DO NOT: change MOCKDATA, crawled content, localized copy, API data contracts, repositories, seeds, or database migrations.
- DO NOT: redesign the About page beyond the specific QC mismatches listed here.
- REUSE: existing About page components, `ActivityTabs`, `WhyChooseAccordion`, `PublicHeader`, `PublicFooter`, public layout wrappers, Tailwind/CSS tokens already present in the project.
- REUSE: `.qc/ui/about/qc-report.md` as the authoritative mismatch list, filtered by the user's out-of-scope categories: COLOR, IMAGE, MOCKDATA.
- SKIP: responsive fixes for breakpoints not covered by this QC run unless a change would obviously break existing responsiveness.
- SKIP: unrelated public pages, CMS pages, database/runtime behavior, and production deployment changes.

## QUALITY GATE: SELF-REVIEW
- Completeness: TIP includes header, context, applicable standards, task, specs, validation, error handling, acceptance criteria, and constraints.
- Cross-reference: Maps directly to `.qc/ui/about/qc-report.md` non-excluded findings: hero height/content, fixed header/main offset, stats radius/shadow, activity width/controls/icon treatment, CTA border width, accordion elevation, why-choose decoration, and heading-order accessibility.
- Explicit exclusions: COLOR, IMAGE, and MOCKDATA fixes are out of scope by user instruction, including QC items for brand teal, active pink/teal states, footer color/icon style, font/color-token changes, image replacement, and data/content changes.
- Gaps: QC was desktop-only at 1440px, so acceptance is limited to that breakpoint except for preserving existing responsive behavior.
- Action needed: Builder should implement TIP-025, then rerun About QC at 1440px and attach updated `.qc/ui/about` artifacts.
