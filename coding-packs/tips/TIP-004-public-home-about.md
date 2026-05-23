# TIP-004: Public Layout, Homepage, About Page from Design

## HEADER
- TIP-ID: TIP-004
- Project: Coporate_Website
- Module: Public Website Foundation
- Priority: P0
- Depends on: TIP-001
- Estimated: L

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase.
- Key files to read first: `coding-packs/BUILDER-HANDOFF.md`, `coding-packs/02-TASK-GRAPH.md`, `coding-packs/01-REQUIREMENTS-MATRIX.md`, `.design/**/DESIGN.md`, relevant `.design/**/code.html`.
- Patterns to follow: preserve `.design` visual direction, convert HTML into typed components, validate server inputs, protect admin routes, keep Supabase RLS/storage policies in place.
- Key design files: .design/recruitment_site/trang_chu_fabbi_final_precision/code.html, .design/recruitment_site/trang_chu_fabbi_final_precision/screen.png, .design/recruitment_site/ve_fabbi_fabbi_final_precision/code.html, .design/recruitment_site/ve_fabbi_fabbi_final_precision/screen.png.

## APPLICABLE STANDARDS
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — Convert static HTML exports into typed reusable Next.js components.
- [ui/design-tokens](../standards/ui/design-tokens.md) — Professional Tech Hub colors, typography, spacing, and radius source of truth.

## TASK
Convert the public homepage and about page from .design into Next.js pages and reusable public layout components. Build PublicHeader, PublicFooter, hero/company/news/jobs preview sections with visual parity to supplied screenshots, prioritizing exact layout, item placement, component structure, colors, spacing, and responsive stacking over abstraction.

## SPECIFICATIONS
### Business Rules
1. Implement pp/(public)/layout.tsx, pp/(public)/page.tsx, and pp/(public)/about/page.tsx.
2. Extract reusable components under components/public only when extraction does not change the visible structure.
3. Use static seed-like placeholder data only for visual conversion in this TIP.
4. Preserve header navigation, CTA hierarchy, section layout, item placement, component shapes, spacing, colors, and responsive behavior from HTML/screenshots.
5. Do not redesign, normalize, or simplify layout composition while converting.
6. Prepare component APIs so later TIPs can swap static data for Supabase data.

### Validation
- Navigation links point to planned routes: /, /about, /jobs, /news, /apply.
- Images must use explicit dimensions or Next image handling.
- Responsive layouts must work at 320, 768, 1024, and 1440 widths.

### Error Handling
- Missing preview data should render empty states, not crash.
- Broken image placeholders must have safe fallback alt text.

## ACCEPTANCE CRITERIA
- Given the app is running When visiting / Then homepage preserves .design layout, item placement, component structure, colors, and branding.
- Given the app is running When visiting /about Then about page preserves .design layout, item placement, component structure, colors, and branding.
- Given mobile viewport When opening public pages Then layout stacks like the source design without horizontal overflow.
- Given code review When inspecting pages Then full HTML files were not pasted verbatim and componentization did not alter visible composition.

## CONSTRAINTS
- DO NOT: implement jobs/news/application backend in this TIP.
- DO NOT: keep Tailwind CDN or remote generated placeholder images as final assets.
- REUSE: UI primitives from TIP-001 and .design HTML/screenshot layout; if primitives cause visual drift, adapt primitives to match the source design rather than changing the page layout.
- SKIP: CMS/admin surfaces.

## QUALITY GATE: SELF-REVIEW
- Completeness: all TIP fields included.
- Cross-reference: Covers REQ-A01 to REQ-A04, REQ-B01, REQ-B02.
- Gaps: none.
