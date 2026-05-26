---
phase: public-footer-all-pages
plan: public-footer-all-pages
source_tip: coding-packs/tips/TIP-012-public-footer-all-pages.md
type: execute
wave: 1
depends_on:
  - TIP-001
  - TIP-004
  - TIP-005
  - TIP-006
  - TIP-007
  - TIP-011
files_modified:
  - components/public/PublicFooter.tsx
  - app/[locale]/layout.tsx
  - app/(public)/layout.tsx
  - components/public/index.ts
autonomous: true
requirements:
  - REQ-A01
  - REQ-A02
  - REQ-A03
  - REQ-B01
  - REQ-B02
  - REQ-B03
  - REQ-B04
  - REQ-B05
  - REQ-B07
---

# PLAN: Public Footer Across All Public Pages

<objective>
Implement TIP-012 by ensuring the `.design` recruitment footer is shared across every public route exactly once, preserves visual parity, uses real internal links, avoids inaccessible placeholder navigation, and passes type/build plus browser verification.
</objective>

<context>
- Source TIP: `coding-packs/tips/TIP-012-public-footer-all-pages.md`.
- Footer source of truth: `.design/recruitment_site/trang_chu_fabbi_final_precision/code.html` lines 471-542.
- Existing implementation state found during planning:
  - `components/public/PublicFooter.tsx` already exists and is mounted in `app/(public)/layout.tsx`.
  - `app/[locale]/layout.tsx` currently renders `PublicHeader` and `{children}` but does not render `PublicFooter`.
  - Existing footer social links use `href="#"` and Font Awesome class names (`fa-brands ...`) without a confirmed icon dependency.
  - Existing footer bottom copy is `© 2024 Fabbi. All rights reserved.` while the design source uses `© 2023 Fabbi. All rights reserved.`.
</context>

<applicable_standards>
- `coding-packs/standards/frontend/html-to-nextjs.md` — preserve layout, item placement, component structure, colors, spacing, and responsive stacking from `.design`.
- `coding-packs/standards/ui/design-tokens.md` — use Professional Tech Hub tokens and prioritize screenshot/HTML fidelity when tokens conflict.
</applicable_standards>

<threat_model>
- Threat: Inaccessible or misleading placeholder social links can create broken navigation and poor assistive-technology behavior.
  - Severity: low
  - Mitigation: replace `href="#"` social anchors with accessible non-navigating buttons or omit navigation until real URLs exist.
- Threat: Adding client-only behavior to a broad footer can accidentally expand client-side JavaScript across all public pages.
  - Severity: low
  - Mitigation: keep client scope limited to `PublicFooter` only if Back to top needs `window.scrollTo`; do not convert public layouts or pages to client components.
- Threat: Footer links could accidentally point outside expected internal routes.
  - Severity: low
  - Mitigation: use Next.js `Link` for `/jobs`, `/about`, `/news`, and `/apply`; no `#` placeholders for internal quick links.
</threat_model>

<must_haves>
- `app/(public)/layout.tsx` renders `PublicFooter` after `<main id="main-content" className="flex-1">` and before closing the outer wrapper.
- `app/[locale]/layout.tsx` renders `PublicFooter` after `{children}` so localized public pages also receive the footer.
- `components/public/PublicFooter.tsx` contains semantic `<footer>` markup with the design's teal background `bg-[#008B9C]`, Fabbi logo paths, company legal name, contact rows, Follow Us row, Quick link list, copyright, and Back to top action.
- Footer internal quick links use real route hrefs: `/jobs`, `/about`, `/news`, `/apply`.
- No footer social item uses `href="#"`.
- Footer renders exactly once on `/`, `/about`, `/jobs`, `/jobs/[slug]`, `/apply`, `/news`, `/news/[slug]`, and localized variants under `/[locale]/*`.
- Protected `app/admin/layout.tsx` remains unchanged and does not receive `PublicFooter`.
</must_haves>

<tasks>

<task id="1" type="execute">
<title>Audit footer parity and route mounting</title>
<read_first>
- `coding-packs/tips/TIP-012-public-footer-all-pages.md`
- `.design/recruitment_site/trang_chu_fabbi_final_precision/code.html`
- `components/public/PublicFooter.tsx`
- `app/(public)/layout.tsx`
- `app/[locale]/layout.tsx`
- `app/admin/layout.tsx`
- `components/public/index.ts`
</read_first>
<files>
- `components/public/PublicFooter.tsx`
- `app/(public)/layout.tsx`
- `app/[locale]/layout.tsx`
</files>
<action>
Compare the existing footer implementation against the source footer block in `.design/recruitment_site/trang_chu_fabbi_final_precision/code.html` lines 471-542. Confirm these exact footer content values remain present in `components/public/PublicFooter.tsx`: `CÔNG TY CỔ PHẦN NGHIÊN CỨU VÀ PHÁT TRIỂN FABBI`, `Địa chỉ: 107 Nguyễn Phong Sắc - Hai Bà Trưng - Hà Nội`, `Điện thoại: 0123 456 789`, `Email: Hr@fabbi.com.vn`, `Follow Us`, `Quick link`, `Tuyển dụng`, `Về Fabbi`, `Tin tức`, `Ứng tuyển`, and `Back to top`. Do not modify `app/admin/layout.tsx`.
</action>
<verify>
Use file reads/searches to confirm footer source values and current mounts before editing.
</verify>
<acceptance_criteria>
- `components/public/PublicFooter.tsx` contains `bg-[#008B9C]`.
- `components/public/PublicFooter.tsx` contains `CÔNG TY CỔ PHẦN NGHIÊN CỨU VÀ PHÁT TRIỂN FABBI`.
- `components/public/PublicFooter.tsx` contains `Địa chỉ: 107 Nguyễn Phong Sắc - Hai Bà Trưng - Hà Nội`.
- `components/public/PublicFooter.tsx` contains `Điện thoại: 0123 456 789`.
- `components/public/PublicFooter.tsx` contains `Email: Hr@fabbi.com.vn`.
- `app/admin/layout.tsx` does not import `PublicFooter`.
</acceptance_criteria>
</task>

<task id="2" type="execute">
<title>Fix PublicFooter links, social controls, and design parity</title>
<read_first>
- `components/public/PublicFooter.tsx`
- `.design/recruitment_site/trang_chu_fabbi_final_precision/code.html`
- `components/public/PublicHeader.tsx`
</read_first>
<files>
- `components/public/PublicFooter.tsx`
</files>
<action>
Update `components/public/PublicFooter.tsx` while preserving its source-design layout. Keep `quickLinks` as `[{ href: '/jobs', label: 'Tuyển dụng' }, { href: '/about', label: 'Về Fabbi' }, { href: '/news', label: 'Tin tức' }, { href: '/apply', label: 'Ứng tuyển' }]`. Replace social `href: '#'/<a>` placeholder navigation with non-navigating accessible buttons because real social URLs are not specified. Use `type="button"`, `aria-label="Facebook"`, `aria-label="Twitter"`, `aria-label="Instagram"`, `aria-label="TikTok"`, and `aria-label="YouTube"`. Preserve the visual class string `w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors` on the social controls and keep the `Follow Us` row. If Font Awesome is not globally loaded in the project, replace `<i className="fa-brands ...">` usage with text initials or existing icon pattern that remains visible without CDN dependencies. Keep the footer client component only if the Back to top button still calls `window.scrollTo({ top: 0, behavior: 'smooth' })`. Set bottom copyright to the source design text `© 2023 Fabbi. All rights reserved.` unless existing product copy elsewhere explicitly standardizes 2024.
</action>
<verify>
Run static searches after editing: no `href="#"` remains in `components/public/PublicFooter.tsx`; all four quick link hrefs remain present; social controls have `type="button"` and `aria-label` values.
</verify>
<acceptance_criteria>
- `components/public/PublicFooter.tsx` contains `href="/jobs"` or `href: '/jobs'`.
- `components/public/PublicFooter.tsx` contains `href="/about"` or `href: '/about'`.
- `components/public/PublicFooter.tsx` contains `href="/news"` or `href: '/news'`.
- `components/public/PublicFooter.tsx` contains `href="/apply"` or `href: '/apply'`.
- `components/public/PublicFooter.tsx` does not contain `href: '#'`.
- `components/public/PublicFooter.tsx` does not contain `href="#"`.
- `components/public/PublicFooter.tsx` contains `type="button"` for social controls.
- `components/public/PublicFooter.tsx` contains `aria-label={social.label}` or explicit `aria-label="Facebook"` style labels.
- `components/public/PublicFooter.tsx` contains `window.scrollTo({ top: 0, behavior: 'smooth' })` or an equivalent non-throwing Back to top implementation.
</acceptance_criteria>
</task>

<task id="3" type="execute">
<title>Mount footer in localized public layout exactly once</title>
<read_first>
- `app/(public)/layout.tsx`
- `app/[locale]/layout.tsx`
- `components/public/PublicFooter.tsx`
- `components/public/index.ts`
</read_first>
<files>
- `app/[locale]/layout.tsx`
- `app/(public)/layout.tsx`
</files>
<action>
Import `PublicFooter` in `app/[locale]/layout.tsx` from `@/components/public/PublicFooter` or `@/components/public` matching the existing import style. Change the returned markup from `<div lang={locale}> <PublicHeader /> {children} </div>` to a public shell that includes `className="min-h-screen flex flex-col bg-background"`, renders `<PublicHeader />`, wraps `{children}` in `<main id="main-content" className="flex-1">{children}</main>` if this does not create duplicate `main` elements in localized pages, and renders `<PublicFooter />` after the main content. Keep `app/(public)/layout.tsx` rendering exactly one `PublicFooter`; only edit it if needed to keep structure consistent. Do not add `PublicFooter` to individual page files.
</action>
<verify>
Search all public layouts and page files to confirm footer mounting is layout-based, not duplicated per page.
</verify>
<acceptance_criteria>
- `app/[locale]/layout.tsx` imports `PublicFooter`.
- `app/[locale]/layout.tsx` contains `<PublicFooter />` exactly once.
- `app/(public)/layout.tsx` contains `<PublicFooter />` exactly once.
- No file matching `app/(public)/**/page.tsx` contains `<PublicFooter />`.
- No file matching `app/[locale]/**/page.tsx` contains `<PublicFooter />`.
- `app/admin/layout.tsx` does not contain `PublicFooter`.
</acceptance_criteria>
</task>

<task id="4" type="execute">
<title>Run static, type, and production build verification</title>
<read_first>
- `package.json`
- `components/public/PublicFooter.tsx`
- `app/(public)/layout.tsx`
- `app/[locale]/layout.tsx`
</read_first>
<files>
- `components/public/PublicFooter.tsx`
- `app/[locale]/layout.tsx`
- `app/(public)/layout.tsx`
</files>
<action>
Run project verification commands from `package.json`: `npm run type-check` and `npm run build`. If `npm run lint` is supported by the installed Next.js/ESLint setup, run `npm run lint`; if it fails because `next lint` is unavailable in the installed Next.js version, record that exact tooling failure and rely on type-check/build plus code review. Fix implementation errors surfaced by these commands without changing TIP-012 scope.
</action>
<verify>
Commands exit successfully except for a documented unavailable lint command. No production code `console.log` is introduced.
</verify>
<acceptance_criteria>
- `npm run type-check` exits 0.
- `npm run build` exits 0.
- If `npm run lint` is run and fails, the failure message is specifically due to lint tooling availability, not footer code errors.
- `components/public/PublicFooter.tsx` contains no `console.log`.
- `app/[locale]/layout.tsx` contains no `console.log`.
</acceptance_criteria>
</task>

<task id="5" type="execute">
<title>Verify footer behavior in browser across representative public routes</title>
<read_first>
- `package.json`
- `playwright.config.ts`
- `components/public/PublicFooter.tsx`
- `app/(public)/layout.tsx`
- `app/[locale]/layout.tsx`
</read_first>
<files>
- `components/public/PublicFooter.tsx`
- `app/[locale]/layout.tsx`
</files>
<action>
Start the app with `npm run dev` and verify representative pages in a browser: `/`, `/about`, `/jobs`, `/apply`, `/news`, `/vi`, `/vi/about`, `/vi/jobs`, `/vi/apply`, and `/vi/news` if those localized routes are enabled by current middleware/routing. At 1440px and 375px widths, confirm each route renders exactly one `<footer>`, shows `Fabbi`, `Follow Us`, `Quick link`, and `Back to top`, and has no horizontal overflow. Click `/jobs`, `/about`, `/news`, and `/apply` footer quick links from a representative non-localized page and confirm navigation reaches those routes. Scroll down, activate Back to top, and confirm scroll position returns to top.
</action>
<verify>
Use Playwright/manual browser verification. Capture notes for any route that cannot load because of unrelated data/env requirements, but at minimum verify `/`, `/about`, `/jobs`, `/apply`, `/news`, and one localized route that loads.
</verify>
<acceptance_criteria>
- Browser check confirms `/` has exactly one `footer` element.
- Browser check confirms `/about` has exactly one `footer` element.
- Browser check confirms `/jobs` has exactly one `footer` element.
- Browser check confirms `/apply` has exactly one `footer` element.
- Browser check confirms `/news` has exactly one `footer` element.
- Browser check confirms at least one `/vi/*` or other localized public route has exactly one `footer` element.
- Browser check at 375px confirms no horizontal overflow on a representative public page.
- Back to top returns the page to top from a scrolled position.
</acceptance_criteria>
</task>

<task id="6" type="execute">
<title>Run mandatory code review agents and address blockers</title>
<read_first>
- `components/public/PublicFooter.tsx`
- `app/[locale]/layout.tsx`
- `app/(public)/layout.tsx`
- `coding-packs/tips/TIP-012-public-footer-all-pages.md`
</read_first>
<files>
- `components/public/PublicFooter.tsx`
- `app/[locale]/layout.tsx`
- `app/(public)/layout.tsx`
</files>
<action>
After code changes and verification, run a TypeScript/JavaScript-focused review and a general code review. Address all CRITICAL and HIGH findings. For any MEDIUM findings that are not fixed, document why they are out of scope for TIP-012. Do not commit unless the user explicitly asks.
</action>
<verify>
Review results contain no unresolved CRITICAL or HIGH issues.
</verify>
<acceptance_criteria>
- A code review has been run after modifications.
- A TypeScript/JavaScript review has been run after modifications.
- No unresolved CRITICAL findings remain.
- No unresolved HIGH findings remain.
- Any unresolved MEDIUM finding has an explicit out-of-scope rationale.
</acceptance_criteria>
</task>

</tasks>

<verification>
1. Static verification:
   - `components/public/PublicFooter.tsx` contains source footer text values and no `href="#"` / `href: '#'` social placeholders.
   - `app/(public)/layout.tsx` contains exactly one `<PublicFooter />`.
   - `app/[locale]/layout.tsx` contains exactly one `<PublicFooter />`.
   - `app/admin/layout.tsx` does not contain `PublicFooter`.
2. Automated commands:
   - `npm run type-check`
   - `npm run build`
   - `npm run lint` if the installed tooling supports it.
3. Browser verification:
   - Public routes `/`, `/about`, `/jobs`, `/apply`, `/news`, and at least one localized route render exactly one footer.
   - 375px viewport has no horizontal overflow.
   - Footer quick links navigate to `/jobs`, `/about`, `/news`, and `/apply`.
   - Back to top scrolls to the page top.
4. Review verification:
   - Code review and TypeScript review complete with no unresolved CRITICAL/HIGH findings.
</verification>

<success_criteria>
- All public and localized public layouts include the shared footer exactly once.
- CMS/admin layouts do not include the public footer.
- Footer matches `.design` teal footer content and visual hierarchy.
- Footer internal quick links are real Next.js route links, not placeholders.
- Social controls do not create broken `#` navigation and remain accessible.
- Back to top works without inline HTML event handlers.
- Type-check and production build pass.
- Browser verification confirms footer presence, responsive behavior, and navigation on representative public routes.
</success_criteria>

<out_of_scope>
- Real social media destination URLs.
- CMS-managed footer content.
- CMS/admin footer design.
- Reworking public header/navigation beyond what is required to avoid layout duplication.
- Broad visual redesign of public pages.
</out_of_scope>
