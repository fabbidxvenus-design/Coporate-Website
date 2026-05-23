# Coporate_Website â€” Project Context (Scan Report)

> Vibecode Kit v5.0 â€” BÆ¯á»šC 1 (SCAN)
> Coding workspace: D:\WORKSPACE\CODE\Coporate_Website
> Scanned: 2026-05-22

---

## SCAN REPORT

### TECH_STACK

Current source state:
- Framework: None yet; workspace is a greenfield implementation seeded by static HTML design exports. [SoT: Code `.design/**/code.html`]
- Language: HTML design export only; no TypeScript/JavaScript app code yet. [SoT: Code no `package.json` found]
- Styling: Tailwind CSS via CDN in exported HTML, with inline `tailwind.config` tokens. [SoT: Code `.design/recruitment_site/trang_chu_fabbi_final_precision/code.html`; `.design/cms_site/bang_dieu_khien_cms_fabbi/code.html`]
- Fonts/icons: Manrope, Plus Jakarta Sans in some recruitment pages, Google Material Symbols, Font Awesome on job detail. [SoT: Code `.design/**/code.html`]
- Database/Auth/API/State: Not implemented yet. [SoT: Code no app source/config]
- Tests/Lint/Build pipeline: Not configured yet. [SoT: Code no `package.json`, no test config]

User-requested target stack:
- Frontend: Reuse HTML design in Next.js.
- Backend: Next.js backend/API routes.
- Database/platform: Supabase.
- Deployment/product shape: SaaS-style corporate product website with admin CMS.

Recommended target baseline for next planning step:
- Next.js App Router + TypeScript.
- Tailwind CSS converted from exported tokens into config/CSS variables.
- Supabase Postgres + Supabase Auth for CMS users.
- Server Actions or Route Handlers for application/job/news workflows.
- Vercel or Supabase-compatible deployment depending on auth/storage needs.

### EXISTING_MODULES

Design export modules:
- Recruitment public site: homepage, about page, job search/listing, job detail, application form, quick-apply modal, news list, news detail. [SoT: Code `.design/recruitment_site/**`]
- CMS/admin site: dashboard, jobs management, news management, applications management, settings. [SoT: Code `.design/cms_site/**`]
- Design system docs: two `DESIGN.md` files for recruitment and CMS sharing the same Professional Tech Hub direction. [SoT: Code `.design/recruitment_site/professional_tech_hub/DESIGN.md`; `.design/cms_site/professional_tech_hub/DESIGN.md`]
- Static screenshots: 13 `screen.png` files corresponding to 13 HTML screens. [SoT: Code `.design/**/screen.png`]

### ROUTES_OR_SCREENS

Public/candidate screens detected:
- `/` â€” Fabbi home (`Fabbi - Home`). [SoT: Code `.design/recruitment_site/trang_chu_fabbi_final_precision/code.html`]
- `/about` â€” company/about page (`Vá» Fabbi`). [SoT: Code `.design/recruitment_site/ve_fabbi_fabbi_final_precision/code.html`]
- `/jobs` â€” job search/listing (`Fabbi Careers - Tuyá»ƒn Dá»¥ng`). [SoT: Code `.design/recruitment_site/tim_kiem_cong_viec_fabbi_final_precision/code.html`]
- `/jobs/[slug]` â€” job detail (`Job Description - Fabbi`). [SoT: Code `.design/recruitment_site/chi_tiet_cong_viec_fabbi_final_precision/code.html`]
- `/apply` â€” full application form (`á»¨ng tuyá»ƒn Fabbi`). [SoT: Code `.design/recruitment_site/ung_tuyen_ngay_fabbi_final_precision/code.html`]
- quick application modal/component (`Quick Application Form Modal`). [SoT: Code `.design/recruitment_site/form_ung_tuyen_nhanh_fabbi_final_precision/code.html`]
- `/news` â€” news list (`Tin tá»©c má»›i nháº¥t vá» Fabbi`). [SoT: Code `.design/recruitment_site/tin_tuc_fabbi_final_precision/code.html`]
- `/news/[slug]` â€” news detail (`Tin tá»©c chi tiáº¿t`). [SoT: Code `.design/recruitment_site/tin_tuc_chi_tiet_fabbi_final_precision/code.html`]

CMS screens detected:
- `/admin` or `/admin/dashboard` â€” dashboard (`Dashboard - Fabbi CMS`). [SoT: Code `.design/cms_site/bang_dieu_khien_cms_fabbi/code.html`]
- `/admin/jobs` â€” jobs management (`Fabbi CMS - Jobs Management`). [SoT: Code `.design/cms_site/quan_ly_ten_tuyen_dung_cms_fabbi/code.html`]
- `/admin/news` â€” news management (`News Management - Fabbi CMS`). [SoT: Code `.design/cms_site/quan_ly_tin_tuc_cms_fabbi/code.html`]
- `/admin/applications` â€” applications management (`Applications Management - Fabbi CMS`). [SoT: Code `.design/cms_site/quan_ly_ung_tuyen_cms_fabbi/code.html`]
- `/admin/settings` â€” settings (`Fabbi CMS - Settings`). [SoT: Code `.design/cms_site/settings_cms_fabbi/code.html`]

### PATTERNS_DETECTED

- Design-token-first UI: shared teal corporate palette, semantic surface colors, Manrope typography scale, rounded components, 1200px container, 8px spacing base. [SoT: Design `.design/**/professional_tech_hub/DESIGN.md`]
- Tailwind utility layout: exported HTML relies on utility classes and inline `tailwind.config` extensions. [SoT: Code `.design/**/code.html`]
- Responsive layout pattern: desktop fixed grid / sidebars, mobile stacked layout with 16px margins. [SoT: Design `.design/**/professional_tech_hub/DESIGN.md`]
- Recruitment domain pattern: job cards, job detail sidebar, application forms, skill/category chips, language switcher, news content surfaces. [SoT: Design `.design/recruitment_site/professional_tech_hub/DESIGN.md`]
- CMS domain pattern: fixed sidebar navigation, top search/help/notification/profile actions, dashboard metrics, management tables/cards, settings forms. [SoT: Code `.design/cms_site/bang_dieu_khien_cms_fabbi/code.html`]
- Auth pattern: implied by CMS/admin pages and logout link, not implemented. [SoT: Code `.design/cms_site/bang_dieu_khien_cms_fabbi/code.html`]
- Data ownership pattern: implied entities are jobs, applications, news/articles, settings, CMS users; no schema exists yet.

### REUSABLE_COMPONENTS

Reusable candidates to extract from HTML into Next.js components:
- Public header/navigation â€” recruitment pages. [SoT: Code `.design/recruitment_site/*/code.html`]
- Public footer â€” recruitment pages. [SoT: Code `.design/recruitment_site/*/code.html`]
- JobCard â€” job listing/detail related jobs. [SoT: Design job card section in `.design/recruitment_site/professional_tech_hub/DESIGN.md`]
- ApplicationForm â€” full apply page and quick modal. [SoT: Code `.design/recruitment_site/ung_tuyen_ngay_fabbi_final_precision/code.html`; `.design/recruitment_site/form_ung_tuyen_nhanh_fabbi_final_precision/code.html`]
- NewsCard and ArticleLayout â€” news list/detail. [SoT: Code `.design/recruitment_site/tin_tuc_fabbi_final_precision/code.html`; `.design/recruitment_site/tin_tuc_chi_tiet_fabbi_final_precision/code.html`]
- CmsSidebar â€” admin navigation. [SoT: Code `.design/cms_site/bang_dieu_khien_cms_fabbi/code.html`]
- CmsTopbar â€” admin search/help/notification/profile top bar. [SoT: Code `.design/cms_site/bang_dieu_khien_cms_fabbi/code.html`]
- MetricCard / ChartCard â€” dashboard analytics. [SoT: Code `.design/cms_site/bang_dieu_khien_cms_fabbi/code.html`]
- DataTable / ManagementList â€” jobs, news, applications management surfaces. [SoT: Code `.design/cms_site/quan_ly_ten_tuyen_dung_cms_fabbi/code.html`; `.design/cms_site/quan_ly_tin_tuc_cms_fabbi/code.html`; `.design/cms_site/quan_ly_ung_tuyen_cms_fabbi/code.html`]
- Button, Input, Chip, Card primitives â€” common design system components. [SoT: Design `.design/**/professional_tech_hub/DESIGN.md`]

### GAPS_DETECTED

- No Next.js project scaffold exists yet.
- No package manager or dependency manifest exists.
- No Supabase project configuration, migrations, schema, RLS policies, or `.env.example` exist.
- No authentication/authorization implementation exists for CMS.
- No backend API contracts exist for jobs, applications, news, settings, or dashboard metrics.
- No deployment configuration exists.
- No tests, linting, type checking, formatting, or CI exist.
- Exported HTML uses CDN Tailwind and remote images; production app should localize/configure assets and Tailwind build pipeline.
- Typography is inconsistent across exports: design docs standardize Manrope, but several recruitment pages import Plus Jakarta Sans.
- Some exported content contains placeholder/lorem copy in news detail and remote generated image URLs; real content model/assets are needed.

### CODE_HEALTH

- TypeScript Strict: Not applicable yet; no TypeScript config.
- ESLint: Not configured.
- Tests: None found.
- Console.logs: 0 matches in design exports.
- TODO/FIXME: 0 matches in design exports.
- Security posture: Static design only; admin/auth/data security not implemented yet.
- Accessibility: HTML exports include semantic fragments but need full audit after componentization.
- Performance: CDN Tailwind and Google fonts in every static export are not production-ready for Next.js.

### ESTIMATED_SIZE

- Files: 30 source/design files excluding newly created `coding-packs`.
- HTML exports: 13.
- Markdown design docs: 2.
- Screenshots: 13.
- Text LoC: ~4,921 across HTML and markdown design docs.
- Components to extract: ~15-25 reusable UI/domain components.
- API routes/server actions to design: jobs, applications, news, settings, dashboard metrics, auth/profile.

---

## Auto-Answered Requirements (for RRI)

- Product should reuse existing `.design` HTML/screenshot visual direction.
- Product domain is corporate recruitment/careers with CMS/admin management.
- Public site must include home, about, jobs, job detail, application, news, and news detail surfaces.
- CMS must include dashboard, jobs, news, applications, and settings surfaces.
- Target stack from user: HTML design reuse + Next.js backend + Supabase + SaaS deployment.
- Visual direction: Modern Corporate / Professional Tech Hub, teal-centric, high-legibility, rounded UI, Manrope-first typography.

## Constraints

- Preserve design tokens from `.design/**/professional_tech_hub/DESIGN.md` as the source of truth for palette, spacing, radius, and typography.
- Convert static Tailwind CDN exports into a real Tailwind build pipeline; do not keep CDN Tailwind in production.
- Admin CMS requires auth, authorization, and protected routes before deployment.
- Supabase tables should be planned with RLS from the start for SaaS/admin safety.
- Forms need boundary validation, spam/abuse mitigation, file-upload rules if CV upload is required, and user-friendly error states.
- Public content should be CMS-backed rather than duplicated in static page code.

## Risks / Tech Debt

- Greenfield implementation risk: current workspace has design assets but no executable app, so architecture choices remain open.
- Scope risk: public site + admin CMS + Supabase + deployment is a multi-phase SaaS build, not a simple static conversion.
- Design drift risk: HTML exports use both Manrope and Plus Jakarta Sans; standardize before implementation.
- Security risk: CMS/admin routes, file uploads, and application data may contain personal data; auth, RLS, storage policies, and privacy handling must be explicit.
- Data modeling risk: jobs/news/applications/settings schema is implied but not yet confirmed by requirements.
- Content risk: placeholder article text and generated image URLs need replacement with real content/assets.

---

## Quality Gate: Self-Review

- Completeness: 13/14 `/vibecode:scan` checks passed.
- Cross-reference: Consistent with actual workspace and design docs. [SoT: Code `.design/**`; Design `.design/**/DESIGN.md`]
- Gaps:
  - Versions cannot be listed because no `package.json`/framework app exists yet.
  - Database schema cannot be described beyond inferred entities because no schema/migrations exist yet.
  - Preparation/context docs beyond `.design/**/DESIGN.md` were not found.
  - Standards subflow completed with 5 standards; product-docs subflow completed with mission, roadmap, and tech-stack docs.
- Action needed: Continue with standards/product prompts or run `/vibecode:rri` to confirm MVP requirements and data model.

---

## VISION

### PROJECT TYPE: Pattern B — SaaS Application / Dashboard with Auth

Build a SaaS-style corporate recruitment platform with two connected surfaces: a public careers website for candidates and a protected CMS dashboard for HR/admin. The implementation must reuse the supplied `.design` HTML exports as the visual source while converting them into a production Next.js + Supabase application.

### ARCHITECTURE VISION

```text
Candidate Browser
      |
      v
Next.js App Router Public Pages
(home / about / jobs / jobs/[slug] / apply / news / news/[slug])
      |
      | public published reads + application submissions
      v
Next.js Server Actions / Route Handlers
      |
      +----------------------+----------------------+
      |                      |                      |
      v                      v                      v
Supabase Postgres      Supabase Storage       Validation / Anti-abuse
jobs, news,            private CV bucket      form schemas, rate limits
applications,
settings

HR Admin Browser
      |
      v
Protected Next.js Admin Routes
(/admin/dashboard / jobs / news / applications / settings)
      |
      v
Supabase Auth + Middleware
single admin role, protected sessions
      |
      v
Admin Server Actions / Route Handlers
CRUD jobs/news/applications/settings, dashboard metrics
      |
      v
Supabase Postgres + RLS Policies
```

### UI VISION

- Theme: Modern Corporate / Professional Tech Hub, optimized for trust, clarity, and hiring conversion.
- Source of truth: `.design/recruitment_site/professional_tech_hub/DESIGN.md` and `.design/cms_site/professional_tech_hub/DESIGN.md`.
- Typography: Manrope for headings, labels, and body; do not keep Plus Jakarta Sans unless later approved as a deliberate secondary font.
- Color system:
  - Primary teal: `#006672` / `#008190` for CTAs, active nav, and brand anchors.
  - Background/surface: `#fbf9f8`, `#ffffff`, `#f6f3f2`, `#f0eded` for soft corporate layering.
  - Text: `#1b1c1c` primary, `#3e494b` secondary.
  - Error: `#ba1a1a`; semantic statuses must become named tokens.
- Layout:
  - Public site: 1200px centered container, 24px desktop gutter, 16px mobile margin, stacked mobile sections.
  - CMS: fixed desktop sidebar + sticky topbar + management content area; collapsible nav on mobile.
  - Components: Button, Input, Card, Chip, JobCard, NewsCard, ApplicationForm, CmsSidebar, CmsTopbar, DataTable, MetricCard.
- Visual quality target: match supplied screenshots first, then improve production details only where HTML exports contain placeholder content, CDN dependencies, or generated images.

### API DESIGN

- API style: Prefer Next.js Server Actions for form submissions and CMS mutations; use Route Handlers where browser/client or file upload flows need endpoint semantics.
- Suggested route prefix for Route Handlers: `/api/*`.
- Auth:
  - Public reads: unauthenticated, but restricted to published jobs/news.
  - Admin writes: authenticated Supabase session with single admin role.
  - CV access: private storage access through authenticated admin-controlled signed URLs or server-mediated download.
- Response envelope for route handlers:

```ts
type ApiResponse<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: { code: string; message: string } }
```

- Validation: schema-validate all external inputs at server boundaries: applications, CV upload metadata, job/news/admin forms, settings.
- Data visibility: Supabase RLS is mandatory on all tables; public policies expose only published content.

### MVP SCOPE

#### IN
| Domain | Screens | Priority |
|--------|---------|----------|
| Frontend foundation | Next.js scaffold, Tailwind config, design tokens, shared layouts/components | P0 |
| Public site | `/`, `/about`, `/jobs`, `/jobs/[slug]`, `/apply`, quick-apply modal, `/news`, `/news/[slug]` | P0 |
| Candidate applications | Form submission, CV upload, validation, success/error states | P0 |
| CMS auth/admin shell | Login/session protection, `/admin/*` shell, sidebar, topbar, logout | P0 |
| Jobs CMS | Jobs list/create/edit/detail workflow: draft, review, published, closed, archived | P0 |
| News CMS | Rich text article management with title, slug, excerpt, cover, tags/category, publish status | P0 |
| Applications CMS | Application list/detail/status management and private CV access | P0 |
| Dashboard/settings | Real-data dashboard metrics and basic settings/contact metadata | P1 |
| Database/storage | Supabase schema, RLS, private CV bucket, seed data | P0 |
| Deployment readiness | `.env.example`, build scripts, Vercel + Supabase assumptions | P0 |
| Quality | TypeScript, lint/build baseline, critical route/form/auth tests, responsive/accessibility checks | P0/P1 |

#### OUT (Post-MVP)
| Domain | Phase |
|--------|-------|
| Multi-tenant SaaS organizations | Post-MVP |
| Multi-role permissions beyond single admin | Post-MVP |
| Advanced analytics/funnel reporting | Post-MVP |
| Applicant workflow automation and email sequences | Post-MVP |
| Third-party ATS integrations | Post-MVP |
| Full localization workflow | Post-MVP unless promoted |
| CMS editing for every marketing/about content block | Post-MVP unless promoted |

### KEY DECISIONS

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | Classify as Pattern B SaaS Application / Dashboard with Auth | RRI requires public candidate site plus protected CMS, Supabase auth, database-backed workflows, and SaaS-ready deployment. |
| 2 | Use Next.js App Router + TypeScript + Tailwind | Matches requested Next.js backend/frontend target and supports public pages, protected admin routes, server actions, and production Tailwind. |
| 3 | Use Supabase for Postgres, Auth, and Storage | RRI requires Supabase, single admin auth, RLS, public published reads, and private CV upload storage. |
| 4 | Convert `.design` HTML into components instead of pasting full pages | Required by RRI and standards to preserve design while avoiding duplicated static HTML and CDN Tailwind. |
| 5 | Standardize on Manrope | Design docs standardize Manrope; scan found Plus Jakarta Sans drift in some exports, so Manrope reduces visual inconsistency. |
| 6 | Protect all `/admin/*` routes | CMS contains applicant/CV data and mutations; auth cannot be deferred for SaaS-ready MVP. |
| 7 | Public pages read CMS-backed published content | RRI requires jobs/news to be editable in CMS and public visibility limited to published content. |
| 8 | Default CV policy: private files, PDF/DOC/DOCX, max 5MB until changed | Resolves an RRI open question with a safe default for blueprint; can be adjusted before implementation. |

### Quality Gate: Self-Review

- Completeness: 6/6 `/vibecode:vision` checks passed.
- Cross-reference: Consistent with scan tech stack gaps, RRI P0 requirements, and standards for UI, frontend conversion, CMS shell, recruitment content, and Supabase SaaS baseline.
- Gaps: Exact application form fields, notification recipients, and localization behavior remain open for blueprint-level detail.
- Action needed: User approval of this Vision before running `/vibecode:blueprint`.
