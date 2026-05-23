# Coporate_Website — Requirements Matrix (RRI Report)

> Vibecode Kit v5.0 — BƯỚC 2 (RRI) Output
> Date: 2026-05-22

---

## REQUIREMENTS MATRIX

### Domain A: Design Reuse & Frontend Foundation
| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|-------------|----------|---------|-----|
| REQ-A01 | Reuse all existing `.design` HTML exports as the visual source for the frontend implementation. | P0 | Product Owner | TBD |
| REQ-A02 | Convert HTML exports into typed reusable Next.js components instead of shipping copied static HTML pages. | P0 | Builder | TBD |
| REQ-A03 | Preserve Professional Tech Hub design tokens: teal palette, Manrope-first typography, rounded cards/buttons, 1200px desktop container, responsive mobile stacking. | P0 | Candidate / HR | TBD |
| REQ-A04 | Replace CDN Tailwind with project-owned Tailwind build configuration and design tokens. | P0 | Builder | TBD |
| REQ-A05 | Standardize typography on Manrope unless explicitly changed later. | P1 | Product Owner | TBD |

### Domain B: Public Recruitment Website
| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|-------------|----------|---------|-----|
| REQ-B01 | Build public home page matching the supplied Fabbi home design. | P0 | Candidate | TBD |
| REQ-B02 | Build about/company page matching the supplied design. | P0 | Candidate | TBD |
| REQ-B03 | Build jobs list/search page with filters and job cards from CMS-backed jobs. | P0 | Candidate | TBD |
| REQ-B04 | Build job detail page from CMS-backed job content, including description, requirements, benefits, tags, and apply CTA. | P0 | Candidate | TBD |
| REQ-B05 | Build full application page and quick application modal based on supplied designs. | P0 | Candidate | TBD |
| REQ-B06 | Public pages only show published jobs and published news. | P0 | Candidate / HR | TBD |
| REQ-B07 | Build news list and news detail pages from CMS-backed rich text news content. | P0 | Candidate | TBD |

### Domain C: Applications & CV Upload
| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|-------------|----------|---------|-----|
| REQ-C01 | Candidates can submit application form data for a selected job. | P0 | Candidate | TBD |
| REQ-C02 | Candidates can upload CV files during application submission. | P0 | Candidate | TBD |
| REQ-C03 | Store CV files in Supabase Storage with private access policies. | P0 | HR / Security | TBD |
| REQ-C04 | Store application metadata in Supabase, including candidate identity, contact, selected job, CV metadata, message, source, status, and timestamps. | P0 | HR | TBD |
| REQ-C05 | Validate application inputs and show user-friendly success/error states. | P0 | Candidate | TBD |
| REQ-C06 | Add basic anti-abuse protection for application submission. | P1 | HR / Security | TBD |

### Domain D: CMS Admin
| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|-------------|----------|---------|-----|
| REQ-D01 | Build protected CMS admin shell matching design: sidebar, topbar, dashboard, jobs, news, applications, settings, logout. | P0 | HR Admin | TBD |
| REQ-D02 | Use single admin role for MVP. | P0 | HR Admin | TBD |
| REQ-D03 | Admin can create, edit, view, and manage jobs. | P0 | HR Admin | TBD |
| REQ-D04 | Jobs support full workflow: draft, review, published, closed, archived, with public visibility restricted to published. | P0 | HR Admin | TBD |
| REQ-D05 | Admin can create, edit, view, and manage news articles. | P0 | HR Admin | TBD |
| REQ-D06 | News editor supports title, slug, excerpt, cover image, category/tags, rich text body, and publish status. | P0 | HR Admin | TBD |
| REQ-D07 | Admin can view and manage submitted applications, including CV access. | P0 | HR Admin | TBD |
| REQ-D08 | Dashboard metrics are derived from real Supabase data. | P1 | HR Admin | TBD |
| REQ-D09 | All CMS mutations show visible success/error feedback. | P0 | HR Admin | TBD |

### Domain E: Backend, Database, Auth, Deployment
| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|-------------|----------|---------|-----|
| REQ-E01 | Implement backend using Next.js Route Handlers and/or Server Actions. | P0 | Builder | TBD |
| REQ-E02 | Use Supabase Postgres for jobs, applications, news/articles, media/assets if needed, settings, and admin profile data. | P0 | Builder | TBD |
| REQ-E03 | Use Supabase Auth for CMS login and route protection. | P0 | HR Admin / Security | TBD |
| REQ-E04 | Enable RLS on all Supabase tables. | P0 | Security | TBD |
| REQ-E05 | Public read policies only expose published jobs/news; admin write policies require authenticated admin role. | P0 | Security | TBD |
| REQ-E06 | Document required environment variables in `.env.example`. | P0 | Builder | TBD |
| REQ-E07 | Deployment target is Vercel for Next.js plus Supabase for database/auth/storage. | P0 | Product Owner | TBD |
| REQ-E08 | MVP must be deploy-ready as a SaaS-style corporate recruitment product. | P0 | Product Owner | TBD |

### Domain F: Quality, Security, Testing
| REQ-ID | Requirement | Priority | Persona | TIP |
|--------|-------------|----------|---------|-----|
| REQ-F01 | Configure TypeScript, linting, formatting, and production build checks. | P0 | Builder | TBD |
| REQ-F02 | Add tests for critical data validation, application submission, auth protection, and public/CMS routes. | P1 | Builder / QA | TBD |
| REQ-F03 | Run accessibility and responsive checks against key public and CMS screens. | P1 | Candidate / HR | TBD |
| REQ-F04 | Avoid hardcoded secrets; use environment variables for Supabase and deployment config. | P0 | Security | TBD |
| REQ-F05 | Do not ship CDN Tailwind, placeholder generated images, or lorem content as final production content. | P0 | Product Owner | TBD |

## AUTO-ANSWERED (from Scan Report)

- Product must reuse existing `.design` HTML/screenshot visual direction.
- User explicitly reinforced: use `.design` HTML for frontend and Next.js for backend.
- Product domain is corporate recruitment/careers with CMS/admin management.
- Public site includes home, about, jobs, job detail, application, news, and news detail surfaces.
- CMS includes dashboard, jobs, news, applications, and settings surfaces.
- Target stack: HTML design reuse + Next.js backend + Supabase + SaaS deployment.
- Visual direction: Modern Corporate / Professional Tech Hub, teal-centric, high-legibility, rounded UI, Manrope-first typography.
- Static Tailwind CDN exports must be converted into a real Tailwind/Next.js implementation.

## APPLICABLE STANDARDS (from coding-packs/standards/)

- [cms/admin-shell](standards/cms/admin-shell.md) — Protected CMS shell, navigation, management UX, and mutation feedback.
- [database/supabase-saas](standards/database/supabase-saas.md) — Supabase schema, auth, RLS, storage, and environment baseline.
- [domain/recruitment-content](standards/domain/recruitment-content.md) — Jobs, applications, and news content model rules.
- [frontend/html-to-nextjs](standards/frontend/html-to-nextjs.md) — Convert static HTML exports into typed reusable Next.js components.
- [ui/design-tokens](standards/ui/design-tokens.md) — Professional Tech Hub colors, typography, spacing, and radius source of truth.

## DECISIONS LOG

| # | Decision | Options | Chosen | Rationale |
|---|----------|---------|--------|-----------|
| 1 | MVP scope | Full MVP / Frontend first / Public first / CMS first | Full MVP | User chose public site + CMS + Supabase auth/database + deploy-ready in phase one. |
| 2 | Design source | Reuse `.design` / redesign / partial reuse | Reuse `.design` HTML | User explicitly required using existing HTML design files and developing further from them. |
| 3 | Backend stack | Next.js backend / separate API / static only | Next.js backend | User requested Next.js backend; fits App Router Route Handlers/Server Actions. |
| 4 | Application flow | Form + CV / form only / email only / mock first | Form + CV | User chose form submission plus CV upload. |
| 5 | Admin permissions | Single admin / Admin+HR / multi-role / no auth | Single admin | User chose simplest secure admin model for MVP. |
| 6 | Job workflow | Draft/published / active-inactive / full workflow | Full workflow | User chose draft, review, published, closed, archived. |
| 7 | News editor | Rich text / markdown / static | Rich text | User chose rich text content management for MVP. |
| 8 | Deployment | Vercel+Supabase / Supabase only / Docker VPS / later | Vercel+Supabase | User chose Vercel for Next.js with Supabase services. |

## OPEN QUESTIONS

| # | Question | Impact | Suggested Resolution |
|---|----------|--------|---------------------|
| 1 | Which exact CV file types and max file size are allowed? | Affects storage validation and security policy. | Default to PDF/DOC/DOCX, max 5MB unless changed in blueprint. |
| 2 | What fields are mandatory in application forms? | Affects schema, validation, and UI states. | Derive from HTML form first, confirm during blueprint. |
| 3 | Does CMS need Vietnamese/Japanese/English localization in MVP? | Affects routing/content schema. | Defer unless required by product owner; preserve language switcher UI if in design. |
| 4 | Who receives application notifications? | Affects email/integration scope. | Defer to P1 unless required before deploy. |
| 5 | Should company/about/settings content be CMS-managed in MVP? | Affects settings schema and CMS scope. | Keep core company content static initially; settings can cover basic site/contact metadata. |

## SCOPE BOUNDARIES

### In Scope (MVP)

- Convert `.design` HTML exports into Next.js App Router pages and reusable components.
- Public recruitment site: home, about, jobs, job detail, apply, news, news detail.
- CMS admin: protected login, dashboard, jobs, news, applications, settings.
- Single admin role.
- Supabase Postgres schema for jobs, applications, news/articles, settings, admin profiles.
- Supabase Storage for private CV uploads.
- Supabase Auth and RLS policies.
- Full job publishing workflow.
- Rich text news editor.
- Vercel + Supabase deployment readiness.
- TypeScript/lint/build baseline and critical route/form/auth tests.

### Out of Scope (defer)

- Multi-tenant SaaS with multiple companies.
- Multi-role permission matrix beyond single admin.
- Advanced recruitment analytics/funnel reporting.
- Email automation and applicant workflow automation unless later promoted to P0.
- Third-party ATS integrations.
- Full localization unless explicitly required later.
- CMS management for every marketing/about content block beyond MVP basics.

---

## Quality Gate: Self-Review

- Completeness: 7/7 `/vibecode:rri` checks passed.
- Cross-reference: Consistent with `coding-packs/00-PROJECT-CONTEXT.md`, applicable standards, and user RRI answers.
- Gaps: Minor open questions remain for CV constraints, exact form fields, localization, notifications, and CMS-managed static content.
- Action needed: Resolve open questions during `/vibecode:vision` or `/vibecode:blueprint`; no blocker for vision step.
