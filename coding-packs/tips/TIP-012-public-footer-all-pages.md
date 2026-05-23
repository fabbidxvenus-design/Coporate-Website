# TIP-012: Public Footer Across All Pages

## HEADER
- TIP-ID: TIP-012
- Project: Coporate_Website
- Module: Public Website Footer
- Priority: P0
- Depends on: TIP-001, TIP-004, TIP-005, TIP-006, TIP-007, TIP-011
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS with project-owned design tokens, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase.
- Key files to read first: `coding-packs/BUILDER-HANDOFF.md`, `coding-packs/02-TASK-GRAPH.md`, `coding-packs/01-REQUIREMENTS-MATRIX.md`, `coding-packs/tips/TIP-004-public-home-about.md`, `.design/recruitment_site/trang_chu_fabbi_final_precision/code.html`, and all existing public page/layout files under `app/` and `components/`.
- Footer source of truth: `.design/recruitment_site/trang_chu_fabbi_final_precision/code.html` lines 471-542 (`<!-- Footer -->`). Cross-check other recruitment `.design/**/code.html` files if footer markup differs.
- Patterns to follow: shared public layout component, HTML-to-Next.js conversion, design-token fidelity, route-aware links, no pasted full-page HTML.

## APPLICABLE STANDARDS
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — Convert static HTML exports into typed reusable Next.js components while preserving visual composition.
- [ui/design-tokens](../standards/ui/design-tokens.md) — Professional Tech Hub colors, typography, spacing, radius, and component appearance source of truth.

## TASK
Add the `.design` footer to every public-facing page because current pages do not have a footer. Implement it as a reusable Next.js component and mount it through the public layout or equivalent shared shell so all public pages receive the same footer without duplicating markup.

## SPECIFICATIONS
### Business Rules
1. Create or update a reusable public footer component, preferably `components/public/PublicFooter.tsx` if that directory/pattern exists.
2. Mount the footer once in the shared public layout/shell so it appears on all public recruitment pages: `/`, `/about`, `/jobs`, `/jobs/[slug]`, `/apply`, `/news`, `/news/[slug]`, `/contact` if TIP-011 exists, and any localized public variants introduced by TIP-011.
3. Preserve the `.design` footer structure and visual hierarchy:
   - Teal footer background (`#008B9C` or matching existing primary token).
   - White Fabbi logo/wordmark block with orange accent paths.
   - Company legal name: `CÔNG TY CỔ PHẦN NGHIÊN CỨU VÀ PHÁT TRIỂN FABBI`.
   - Contact rows for address, phone, and email with Material Symbols-style icons or equivalent project icon pattern.
   - Follow Us social icon row with circular translucent buttons.
   - Quick link column: Tuyển dụng, Về Fabbi, Tin tức, Ứng tuyển.
   - Bottom bar with copyright and Back to top action.
4. Use real Next.js links for internal quick links: `/jobs`, `/about`, `/news`, `/apply`.
5. Back to top must work without inline `onclick`; use a small client component only if required by the current app architecture.
6. Footer must remain responsive like the source HTML: stacked columns on mobile, split left/right columns on medium desktop, bottom bar stacked on mobile and horizontal on desktop.
7. Use existing design tokens/classes where they already preserve the source appearance; if token names differ, keep visual parity with the source design first.
8. If project already has site settings/contact metadata, read footer copy from that typed source only when it does not introduce loading failures or visual drift; otherwise use static design copy for this TIP.

### Validation
- Verify all public pages render the footer exactly once.
- Verify all internal footer links point to valid app routes and do not use `#` placeholders.
- Verify social links are safe placeholders only if real URLs are not configured; they must have accessible names.
- Verify color contrast remains readable on the teal background.
- Verify no horizontal overflow at 320px, 375px, 768px, 1024px, and 1440px widths.
- Verify the footer uses semantic `<footer>` markup and accessible link/button labels.

### Error Handling
- If configurable settings are used and a value is missing, render the `.design` fallback copy instead of hiding the row or crashing.
- If a social URL is missing, keep the icon visually present only when it can be rendered as a non-navigating accessible control or omit it consistently; do not leave broken links.
- If Back to top cannot use smooth scroll in an environment, it should still move focus/scroll to the page top without throwing.

## ACCEPTANCE CRITERIA
- Given the app is running When visiting `/` Then the public footer appears below the page content and matches the `.design` teal footer layout, colors, logo, contact rows, quick links, social buttons, and bottom bar.
- Given the app is running When visiting `/about`, `/jobs`, `/jobs/[slug]`, `/apply`, `/news`, and `/news/[slug]` Then each page renders the same footer exactly once.
- Given a mobile viewport When viewing any public page Then footer columns stack like the `.design` source and there is no horizontal overflow.
- Given a user activates a footer quick link When navigation completes Then the app opens the correct internal route without placeholder `#` navigation.
- Given a user activates Back to top When the page is scrolled down Then the viewport returns to the top without inline event handlers.
- Given code review When inspecting the implementation Then the footer is componentized and full static HTML pages were not pasted verbatim.

## CONSTRAINTS
- DO NOT: duplicate the footer markup separately in every page file.
- DO NOT: add the footer to protected CMS/admin pages unless a design explicitly requires it later.
- DO NOT: redesign footer layout, colors, item arrangement, typography hierarchy, or responsive stacking away from `.design`.
- DO NOT: keep inline `onclick`, CDN Tailwind, Font Awesome CDN-only dependencies, or inaccessible icon-only links.
- REUSE: existing public layout/shell, design tokens, logo component if present, icon pattern, and Next.js `Link` for internal routes.
- SKIP: changing CMS admin layout, implementing real social media destinations, and making footer content fully CMS-managed unless existing settings support it cleanly.

## QUALITY GATE: SELF-REVIEW
- Completeness: TIP includes header, context, applicable standards, task, specs, validation, error handling, acceptance criteria, and constraints.
- Cross-reference: Supports REQ-A01, REQ-A02, REQ-A03, REQ-B01 through REQ-B07, and TIP-004 public layout intent; aligned with visual parity priority from `frontend/html-to-nextjs` and `ui/design-tokens`.
- Gaps: Real social media URLs are not specified in source materials, so implementation should use safe accessible placeholders or omit navigation until URLs are provided.
- Builder quality gate: After implementation, run type/build checks plus browser verification of representative public pages and responsive widths before marking complete.
