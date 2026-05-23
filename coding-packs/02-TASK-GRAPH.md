# Coporate_Website — Task Graph

> Vibecode Kit v5.0 — BƯỚC 5 (TASK GRAPH)
> 11 TIPs across 3 weeks.

---

## DEPENDENCY GRAPH

```text
TIP-001 Project Foundation
   |
   +--> TIP-002 Supabase Schema/RLS/Storage
   |        |
   |        +--> TIP-003 Auth/Admin Guard
   |                 |
   |                 +--> TIP-005 Jobs Public + CMS
   |                 |        |
   |                 |        +--> TIP-006 Applications + CV + CMS
   |                 |
   |                 +--> TIP-007 News Public + Rich Text CMS
   |                 |
   |                 +--> TIP-008 Dashboard + Settings
   |
   +--> TIP-004 Public Home/About Conversion

TIP-002 + TIP-003 + TIP-004 + TIP-008
   |
   +--> TIP-011 Vietnamese/Japanese Localization + Contact

TIP-001 + TIP-004 + TIP-005 + TIP-006 + TIP-007 + TIP-011
   |
   +--> TIP-012 Public Footer Across All Pages

TIP-004 + TIP-005 + TIP-006 + TIP-007 + TIP-008 + TIP-011 + TIP-012
   |
   +--> TIP-009 QA/Tests/A11y/Responsive
           |
           +--> TIP-010 Deployment Readiness + Final Verification
```

## TIP SUMMARY TABLE

| TIP | Name | Depends On | Priority | Est. Hours | Week |
|-----|------|------------|----------|------------|------|
| TIP-001 | Project scaffold, tooling, Tailwind tokens, base layouts | None | P0 | 8 | 1 |
| TIP-002 | Supabase schema, RLS, storage, seed data | TIP-001 | P0 | 10 | 1 |
| TIP-003 | Supabase auth, middleware, admin guard, login | TIP-001, TIP-002 | P0 | 8 | 1 |
| TIP-004 | Public layout, homepage, about page from `.design` | TIP-001 | P0 | 12 | 2 |
| TIP-005 | Jobs public pages + jobs CMS workflow | TIP-001, TIP-002, TIP-003 | P0 | 16 | 2 |
| TIP-006 | Application form, CV upload, applications CMS | TIP-002, TIP-003, TIP-005 | P0 | 14 | 2 |
| TIP-007 | News public pages + rich text news CMS | TIP-001, TIP-002, TIP-003 | P0 | 14 | 3 |
| TIP-008 | CMS dashboard metrics + settings | TIP-002, TIP-003, TIP-005, TIP-006, TIP-007 | P1 | 10 | 3 |
| TIP-011 | Vietnamese/Japanese localization + contact page | TIP-001, TIP-002, TIP-003, TIP-004, TIP-008 | P1 | 10 | 3 |
| TIP-012 | Public footer across all public pages | TIP-001, TIP-004, TIP-005, TIP-006, TIP-007, TIP-011 | P0 | 6 | 3 |
| TIP-009 | QA, tests, accessibility, responsive verification | TIP-004, TIP-005, TIP-006, TIP-007, TIP-008, TIP-011, TIP-012 | P0/P1 | 12 | 3 |
| TIP-010 | Deployment readiness, env docs, final verification | TIP-009 | P0 | 8 | 3 |

## PARALLELIZATION OPPORTUNITIES

- After TIP-001, TIP-002 and TIP-004 can run in parallel.
- After TIP-003, TIP-005 and TIP-007 can run in parallel because jobs and news are separate domains.
- TIP-006 depends on TIP-005 because application flow references jobs.
- TIP-008 can start after TIP-005/TIP-006/TIP-007 expose enough data for dashboard metrics.
- TIP-011 can start after public layout/settings foundations exist because it adds public localization and connected contact metadata/submission flow.
- TIP-012 can start after public page implementations exist because it mounts one shared `.design` footer across all public routes.
- TIP-009 and TIP-010 should remain sequential because QA findings must be fixed before deployment verification.

## TEAM ALLOCATION

If multiple builders are available:
- Builder A: TIP-001, TIP-004, UI visual parity work.
- Builder B: TIP-002, TIP-003, Supabase/auth/security work.
- Builder C: TIP-005, TIP-006, TIP-007 domain modules after foundation/auth are ready.
- Builder A or C: TIP-011 after public layout and settings foundations are ready.
- Builder A: TIP-012 public footer visual parity after public pages exist.
- QA Builder: TIP-009 and TIP-010 final verification.

## MODULE BLUEPRINT SUMMARY

### TIP-001 — Foundation
- Create Next.js App Router + TypeScript project.
- Configure Tailwind with Professional Tech Hub tokens.
- Create app route groups, global layout, shared UI primitives, lint/build/test baseline.
- Acceptance: `npm run build` or equivalent passes; home placeholder uses tokenized styling.

### TIP-002 — Supabase foundation
- Create migrations for profiles, jobs, job_status_history, news_articles, applications, site_settings, media_assets.
- Enable RLS and storage policy for private `candidate-cvs`.
- Add seed data matching design screens.
- Acceptance: local Supabase schema can be applied and policies match public/admin visibility rules.

### TIP-003 — Auth/admin guard
- Implement Supabase clients, login page, middleware, admin guard helpers, logout.
- Protect `/admin/*` routes.
- Acceptance: unauthenticated users redirect to login; admin can access CMS shell.

### TIP-004 — Public home/about
- Convert `.design/recruitment_site/trang_chu_*` and `ve_fabbi_*` into components.
- Implement public header/footer and responsive shell.
- Highest priority: preserve original layout, item placement, component structure, colors, spacing, and responsive stacking from HTML/screenshots.
- Acceptance: visual parity at desktop/mobile key widths, with no intentional layout/color redesign.

### TIP-005 — Jobs domain
- Implement public jobs list/detail with URL filters.
- Implement admin jobs list/create/edit/status workflow.
- Acceptance: published jobs appear publicly; draft/review/closed/archived do not.

### TIP-006 — Applications domain
- Implement full apply page and quick apply modal.
- Validate form and upload private CV files.
- Implement admin applications list/detail/status and CV access.
- Acceptance: candidate can apply with CV; admin can view application and access CV securely.

### TIP-007 — News domain
- Implement public news list/detail.
- Implement admin news list/create/edit rich text workflow.
- Acceptance: published news appears publicly; admin can manage rich text articles.

### TIP-008 — Dashboard/settings
- Implement real-data dashboard metrics and basic settings form.
- Acceptance: metrics are derived from Supabase; settings persist.

### TIP-011 — Vietnamese/Japanese localization + contact
- Add public Vietnamese/Japanese locale routing, dictionaries, and language switcher behavior.
- Implement `/contact` with localized copy, validated form submission, and Supabase persistence.
- Acceptance: public navigation/contact content switches between Vietnamese and Japanese; valid contact submissions persist; invalid submissions show localized errors.

### TIP-009 — QA
- Add unit/integration/E2E tests for validation, auth protection, public visibility, application submission, localization, and contact submission.
- Run responsive and accessibility checks on public and CMS key screens.
- Acceptance: tests/build pass; critical visual/responsive issues fixed.

### TIP-010 — Deploy
- Create `.env.example`, deployment notes, production build verification.
- Verify Vercel + Supabase assumptions and final smoke path.
- Acceptance: project is deploy-ready with no hardcoded secrets.

## QUALITY GATE: SELF-REVIEW

- Completeness: 11/11 task graph requirements covered.
- Cross-reference: TIPs map to RRI P0/P1 requirements, Vision MVP scope, and the promoted public Vietnamese/Japanese localization + contact requirement.
- Gaps: Japanese marketing copy quality depends on owner-provided or reviewed translations. All 11 TIP files have been generated in `coding-packs/tips/`.
- Action needed: Start implementation with `coding-packs/tips/TIP-001-project-foundation.md` or schedule `coding-packs/tips/TIP-011-bilingual-vi-ja-contact.md` after its dependencies.
