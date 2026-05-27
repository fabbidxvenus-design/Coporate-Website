# Coporate_Website — Task Graph

> Vibecode Kit v5.0 — BƯỚC 5 (TASK GRAPH)
> 25 TIPs across 4 weeks.

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

TIP-001 + TIP-004 + TIP-005 + TIP-006 + TIP-007 + TIP-011 + TIP-012
   |
   +--> TIP-013 Bilingual Localization Expansion

TIP-004 + TIP-005 + TIP-006 + TIP-007 + TIP-008 + TIP-011 + TIP-012 + TIP-013
   |
   +--> TIP-014 Mock Data Button Handling

TIP-004 + TIP-011 + TIP-014
   |
   +--> TIP-015 About API + Mock Data Backup

TIP-004 + TIP-005 + TIP-006 + TIP-007 + TIP-008 + TIP-011 + TIP-012 + TIP-013 + TIP-014 + TIP-015
   |
   +--> TIP-009 QA/Tests/A11y/Responsive
           |
           +--> TIP-010 Deployment Readiness + Final Verification
                   |
                   +--> TIP-016 Production-Like Mock Data from Crawl
                           |
                           +--> TIP-018 Corporate Mock Data from Content/Image Mapping
                                  |
                                  +--> TIP-017 Color Token Alignment
                                         |
                                         +--> TIP-019 SQLite Migration
                                                |
                                                +--> TIP-020 Migrate Crawled Data to SQLite
                                                       |
                                                       +--> TIP-021 Separate Independent Data Flag Boundary
                                                              |
                                                              +--> TIP-022 Remove SQLite Runtime and Migrate to PostgreSQL
                                                                     |
                                                                     +--> TIP-023 PostgreSQL Schema Migration and Seed from Mock Data
                                                                            |
                                                                            +--> TIP-024 CMS Mock Data, Activity Feed, and Database Usage Map
                                                                                   |
                                                                                   +--> TIP-025 About QC Non-Color Layout Fixes
                                                                                   |
                                                                                   +--> TIP-026 Job Detail QC Non-Color/Image/Mockdata Fixes
                                                                                   |
                                                                                   +--> TIP-027 Jobs QC Non-Color/Image/Mockdata Fixes
                                                                                          |
                                                                                          +--> TIP-028 Strapi CMS Migration (SUPERSEDED)
                                                                                                 |
                                                                                                 +--> TIP-029 Remove Strapi and Adopt Payload CMS
                                                                                                        |
                                                                                                        +--> TIP-030 Payload Dev Runtime Cleanup
                                                                                                               |
                                                                                                               +--> TIP-031 Payload + PostgreSQL Bootstrap and Seed
                                                                                                                      |
                                                                                                                      +--> TIP-032 Smooth Page Transition Animation
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
| TIP-013 | Bilingual localization expansion across public pages | TIP-001, TIP-004, TIP-005, TIP-006, TIP-007, TIP-011, TIP-012 | P0 | 10 | 3 |
| TIP-014 | Mock data button handling across all screens | TIP-004, TIP-005, TIP-006, TIP-007, TIP-008, TIP-011, TIP-012, TIP-013 | P0 | 8 | 3 |
| TIP-015 | About API + mock data backup | TIP-004, TIP-011, TIP-014 | P0 | 6 | 3 |
| TIP-009 | QA, tests, accessibility, responsive verification | COMPLETED | P0/P1 | 12 | 3 |
| TIP-010 | Deployment readiness, env docs, final verification | COMPLETED | P0 | 8 | 3 |
| TIP-016 | Production-like mock data from crawled Fabbi content/images | TIP-010 | P0 | 8 | 3 |
| TIP-018 | Corporate mock data from content/image mapping | TIP-016 | P0 | 8 | 3 |
| TIP-017 | Color token alignment to official teal palette | TIP-018 | P0 | 6 | 3 |
| TIP-019 | SQLite migration for public site and CMS | TIP-002, TIP-003, TIP-005, TIP-006, TIP-007, TIP-008, TIP-011, TIP-015 | P0 | 18 | 4 |
| TIP-020 | Migrate crawled Fabbi content/images into SQLite | TIP-019 | P0 | 10 | 4 |
| TIP-021 | Separate independent mock-vs-SQLite data flag boundary | TIP-020 | P0 | 8 | 4 |
| TIP-022 | Remove SQLite runtime and migrate to PostgreSQL | TIP-020, TIP-021 | COMPLETED | 18 | 4 |
| TIP-023 | PostgreSQL schema migration and seed from mock data | TIP-021, TIP-022 | P0 | 12 | 4 |
| TIP-024 | CMS mock data, activity feed, and database usage map | TIP-016, TIP-018, TIP-021, TIP-022, TIP-023 | P1 | 8 | 4 |
| TIP-025 | About QC non-color layout fixes | TIP-004, TIP-011, TIP-015, TIP-024 | P0 | 6 | 4 |
| TIP-026 | Job Detail QC non-color/image/mockdata fixes | TIP-005, TIP-006, TIP-012, TIP-013, TIP-021, TIP-024 | P0 | 6 | 4 |
| TIP-027 | Jobs QC non-color/image/mockdata fixes | TIP-005, TIP-012, TIP-013, TIP-021, TIP-024 | P0 | 6 | 4 |
| TIP-028 | Strapi CMS migration (superseded by TIP-029) | TIP-023, TIP-024, TIP-025, TIP-026, TIP-027 | SUPERSEDED | 24 | 5 |
| TIP-029 | Remove Strapi and adopt Payload CMS | TIP-023, TIP-024, TIP-025, TIP-026, TIP-027, TIP-028 | P0 | 24 | 5 |
| TIP-030 | Payload dev runtime cleanup | TIP-029 | P0 | 18 | 5 |
| TIP-031 | Payload + PostgreSQL bootstrap and seed | TIP-030 | P0 | 12 | 5 |
| TIP-032 | Smooth page transition animation without item layout drift | TIP-031 | P0 | 6 | 5 |

## PARALLELIZATION OPPORTUNITIES

- After TIP-001, TIP-002 and TIP-004 can run in parallel.
- After TIP-003, TIP-005 and TIP-007 can run in parallel because jobs and news are separate domains.
- TIP-006 depends on TIP-005 because application flow references jobs.
- TIP-008 can start after TIP-005/TIP-006/TIP-007 expose enough data for dashboard metrics.
- TIP-011 can start after public layout/settings foundations exist because it adds public localization and connected contact metadata/submission flow.
- TIP-012 can start after public page implementations exist because it mounts one shared `.design` footer across all public routes.
- TIP-014 should run after public/CMS surfaces exist because it audits and handles every visible button with default mock data behavior.
- TIP-018 should run after TIP-016 because it corrects runtime mock data/image wiring from the authoritative content-image mapping.
- TIP-017 should run after TIP-018 because color alignment should happen after visible content and local image wiring are stable.
- TIP-019 should run after current public/CMS Supabase-backed flows exist because it replaces persistence/auth internals without redesigning UI or routes.
- TIP-020 should run after TIP-019 because crawled content import targets the SQLite runtime created by TIP-019.
- TIP-021 should run after TIP-020 because it verifies and hardens the final mock-vs-SQLite data-source boundary after imported SQLite content exists.
- TIP-022 should run after TIP-020/TIP-021 because it removes the SQLite runtime after crawled-data behavior and data-source boundaries are understood, then restores PostgreSQL as the durable database target.
- TIP-023 should run after TIP-022 because PostgreSQL runtime must exist before designing/applying durable migrations and seed scripts from mock/crawled data.
- TIP-024 should run after TIP-023 because CMS activity/database usage mapping depends on knowing which PostgreSQL tables and seed entities exist.
- TIP-025 should run after TIP-024 because it is a targeted About QC follow-up that must avoid color, image, and mock-data changes after the current data/content mapping is stable.
- TIP-026 should run after TIP-024 because it is a targeted Job Detail QC follow-up that must avoid color, image, and mock-data changes while preserving current data/content boundaries.
- TIP-027 should run after TIP-024 because it is a targeted Jobs listing QC follow-up that must avoid pink color, image, and mock-data changes while preserving current data/content boundaries.
- TIP-028 is superseded by TIP-029 because Strapi is no longer the desired CMS direction.
- TIP-029 should run after TIP-023/TIP-024 and targeted QC TIPs because Payload must replace the stabilized PostgreSQL/CMS data-source boundary without mixing backend migration with visual fixes.
- TIP-030 should run after TIP-029 because it turns the Payload integration layer into the active dev CMS runtime, removes old custom CMS UI/API duplication, and disables mock-data-by-default behavior for PostgreSQL-backed Payload development.
- TIP-031 should run after TIP-030 because the old CMS UI/API is gone and the remaining blocker is a repeatable local operational path: PostgreSQL bootstrap, Payload schema initialization, seed/import, and public-route smoke tests.
- TIP-032 should run after TIP-031 because smooth public route transitions should be applied after public routes can be smoke-tested against stable seeded content, and it must not mix animation polish with data/runtime setup.
- TIP-009 and TIP-010 should remain sequential because QA findings must be fixed before deployment verification.

## TEAM ALLOCATION

If multiple builders are available:
- Builder A: TIP-001, TIP-004, UI visual parity work.
- Builder B: TIP-002, TIP-003, Supabase/auth/security work.
- Builder C: TIP-005, TIP-006, TIP-007 domain modules after foundation/auth are ready.
- Builder A or C: TIP-011 after public layout and settings foundations are ready.
- Builder A: TIP-012 public footer visual parity after public pages exist.
- Builder A or C: TIP-014 mock-data button handling after public/CMS surfaces and localization exist.
- Builder B or C: TIP-019 SQLite migration after Supabase-backed public/CMS flows are stable.
- Builder B or C: TIP-020 crawled-data import and TIP-021 data-source boundary hardening after SQLite runtime is stable.
- Builder B or C: TIP-022 PostgreSQL migration after the SQLite binding blocker makes PostgreSQL the preferred runtime target.
- Builder B or C: TIP-023 PostgreSQL schema/seed work after PostgreSQL runtime is restored, then TIP-024 CMS data mapping after seed entities are defined.
- Builder A: TIP-025 About QC non-color layout fixes after data/content mapping is stable.
- Builder A: TIP-026 Job Detail QC non-color/image/mockdata fixes after data/content mapping is stable.
- Builder A: TIP-027 Jobs QC non-color/image/mockdata fixes after data/content mapping is stable.
- Builder B or C: TIP-029 Payload CMS migration after PostgreSQL/CMS data boundaries and targeted visual QC fixes are stable; TIP-028 Strapi direction is superseded.
- Builder B or C: TIP-030 Payload dev runtime cleanup after Payload integration exists, to make Payload + PostgreSQL 5432 the active dev CMS and remove old CMS UI/API duplication.
- Builder B or C: TIP-031 Payload + PostgreSQL bootstrap and seed after TIP-030, to make public site + Payload CMS + Postgres testable from a fresh local environment.
- Builder A: TIP-032 smooth public transition animation after TIP-031, to polish route/modal motion without changing item CSS, layout, or visual design.
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

### TIP-012 — Public footer
- Convert the `.design` recruitment footer into a reusable public footer component.
- Mount it once through the shared public layout/shell so all public pages render it exactly once.
- Acceptance: footer matches the `.design` layout/colors/content, internal links navigate to real routes, and responsive widths have no overflow.

### TIP-013 — Bilingual localization expansion
- Expand Vietnamese/Japanese localization beyond the header across all public page body, footer, forms, CTAs, labels, validation, and empty states.
- Preserve route-aware language switching and document any CMS schema gaps instead of adding migrations.
- Acceptance: `/vi` and `/ja` public routes switch all static UI chrome consistently without mixed-language hardcoded content.

### TIP-014 — Mock data button handling
- Make mock data the default local/fresh-checkout behavior before Supabase is required.
- Audit and handle every visible public and CMS button/link/CTA/icon button/form action/filter/pagination control.
- Acceptance: every button either navigates, filters, opens/closes UI, submits mock data, mutates mock state with visible feedback, or is intentionally disabled with an accessible explanation.

### TIP-015 — About API + mock data backup
- Add a typed About page content API and complete Vietnamese/Japanese mock data fallback for `Về Fabbi`.
- Preserve the existing About visual composition while replacing hardcoded page content with a reusable Supabase-or-mock loader.
- Acceptance: `/vi/about`, `/ja/about`, and `/api/about?locale=vi|ja` render complete content in fresh checkout/mock mode without requiring Supabase.

### TIP-018 — Corporate mock data image mapping
- Rebuild app-visible mock data from `content_image_mapping.json` and `crawled_raw_data.json`.
- Wire local crawled media into runtime mock loaders and public pages using `/images/<local_filename>` paths.
- Acceptance: `/vi/news`, `/vi/news/[slug]`, and `/vi/about` render crawled local images without 400/404 image requests.

### TIP-017 — Color token alignment
- Align Tailwind/global/component color usage to the official teal palette from `coding-packs/research/color-branch.md`.
- Centralize primary teal, dark hover teal, accent orange, and light teal surface values as named tokens.
- Acceptance: public and CMS brand actions, links, hover states, forms, cards, and navigation use the official tokenized palette without layout/content regressions.

### TIP-019 — SQLite migration
- Replace Supabase-backed runtime persistence/auth with SQLite-backed repositories for public pages, CMS pages, applications, contact, settings, and admin sessions.
- Preserve existing route structure, bilingual public pages, CMS shell, and visual composition while changing data access internals.
- Acceptance: migrations/seeds run, public published-only visibility works, admin auth and CMS mutations persist to SQLite, and build/type-check pass without Supabase runtime configuration.

### TIP-020 — Crawled data SQLite import
- Build a repeatable import path from crawled Fabbi markdown/images into `.data/sqlite.db`.
- Copy local crawled images into public browser-safe `/images/<filename>` paths.
- Acceptance: import is idempotent, SQLite mode renders imported jobs/news/about content, and mock mode remains independent.

### TIP-021 — Data-source boundary isolation
- Centralize `USE_MOCK_DATA` semantics and audit public/API/CMS loaders so mock mode never opens SQLite.
- Preserve SQLite-backed behavior when `USE_MOCK_DATA=false` without silent fallback to mock data.
- Acceptance: `USE_MOCK_DATA=true` renders mock public pages without `getDb()`/migration/seed calls even when `.data/sqlite.db` is unavailable.

### TIP-022 — PostgreSQL migration
- Remove SQLite/`better-sqlite3` runtime dependencies and migrate persistence to PostgreSQL via `DATABASE_URL`.
- Preserve repository contracts, mock-only mode, crawled-data parser/import behavior, and public/CMS visual routes.
- Acceptance: PostgreSQL migrations/imports run idempotently, `USE_MOCK_DATA=true` stays database-independent, and no SQLite native build dependency remains.

### TIP-023 — PostgreSQL schema/seed
- Add durable PostgreSQL migrations and seed/import support from mock/crawled data.
- Preserve public published-only reads, admin CMS persistence, and mock-only database isolation.
- Acceptance: PostgreSQL schema and seed data apply idempotently and support current public/CMS flows.

### TIP-024 — CMS data mapping
- Align CMS mock data, activity feed, and database usage map with PostgreSQL-backed entities.
- Document which CMS surfaces use mock-only, database-backed, or hybrid data.
- Acceptance: CMS data usage is explicit and visible activity/mock content is stable before final UI QC passes.

### TIP-025 — About QC non-color layout fixes
- Fix About page QC mismatches from `.qc/ui/about` except color, image, and mock-data issues.
- Target hero height/overlay, fixed header/main offset, stats card shape/elevation, activity controls/width, accordion elevation, why-choose decoration, and heading-order semantics.
- Acceptance: `/vi/about` passes the non-excluded 1440px QC checks with COLOR, IMAGE, and MOCKDATA findings documented as intentionally out of scope.

### TIP-026 — Job Detail QC non-color/image/mockdata fixes
- Fix Job Detail QC mismatches from `.qc/ui/job-details` except color, image, and mock-data issues.
- Target share button accessible names, related-jobs ARIA/list semantics, related job card structure, sidebar row structure, apply CTA shape/radius, heading order, and responsive verification coverage.
- Acceptance: `/vi/jobs/senior-frontend-engineer-react` passes non-excluded QC checks at 375/768/1024/1440 with COLOR, IMAGE, and MOCKDATA findings documented as intentionally out of scope.

### TIP-027 — Jobs QC non-color/image/mockdata fixes
- Fix Jobs listing QC mismatches from `.qc/ui/jobs` except COLOR PINK, IMAGE, and MOCKDATA issues.
- Target actual jobs route QC mapping, checkbox-style filters, reference-sized job cards, missing photo/location sections, floating bell, sidebar widget blocks, responsive no-overflow, and unnamed-link accessibility.
- Acceptance: `/vi/jobs` passes non-excluded jobs QC checks at 1440 and a mobile breakpoint with COLOR PINK, IMAGE, and MOCKDATA findings documented as intentionally out of scope.

### TIP-028 — Strapi CMS migration (superseded)
- Superseded by TIP-029 because the project no longer wants Strapi as the CMS backend.
- Do not implement TIP-028 unless the product direction changes back to Strapi.

### TIP-029 — Remove Strapi and adopt Payload CMS
- Remove/avoid active Strapi code, env docs, scripts, and setup guidance.
- Adopt Payload CMS as the production CMS backend for jobs, news, applications, settings, about content, and CMS media while preserving existing Next.js routes and visual composition.
- Acceptance: mock mode never initializes Payload, non-mock mode uses Payload without silent fallback, public pages show only published localized content, private CV handling remains protected, no active Strapi imports/env dependencies remain, and build/type checks pass.

### TIP-030 — Payload dev runtime cleanup
- Make Payload CMS admin UI/API the active dev CMS backed by local PostgreSQL on port 5432.
- Remove old custom CMS UI/API duplication while preserving current public site UI and routing public content through repository boundaries.
- Acceptance: dev mode no longer defaults to mock data, Payload admin owns CMS management, public routes render published Payload content, stale CMS references are removed, and type/build/tests pass.

### TIP-031 — Payload + PostgreSQL bootstrap and seed
- Provide a repeatable local setup path for PostgreSQL 5432, Payload initialization, environment variables, and seed/import data.
- Connect public site reads, Payload CMS writes, and Postgres storage through existing repository boundaries without restoring custom CMS UI.
- Acceptance: fresh local setup can start Payload admin at `/admin`, seed published jobs/news/settings/about content idempotently, public routes render seeded published content, and mock mode remains DB-independent.

### TIP-032 — Smooth page transition animation
- Add smooth public page and modal transition polish using wrapper-level opacity/transform animation.
- Preserve existing item CSS/layout exactly: job cards, news cards, chips, buttons, spacing, dimensions, colors, and responsive stacking must not change.
- Acceptance: localized public route navigation and modal open/close feel smooth, reduced-motion is respected, desktop/mobile screenshots show no item layout drift, and type/tests/browser smoke checks pass.

### TIP-009 — QA
- Add unit/integration/E2E tests for validation, auth protection, public visibility, application submission, localization, contact submission, and shared public footer presence.
- Run responsive and accessibility checks on public and CMS key screens.
- Acceptance: tests/build pass; critical visual/responsive issues fixed.

### TIP-010 — Deploy
- Create `.env.example`, deployment notes, production build verification.
- Verify Vercel + Supabase assumptions and final smoke path.
- Acceptance: project is deploy-ready with no hardcoded secrets.

## QUALITY GATE: SELF-REVIEW

- Completeness: 31/31 task graph requirements covered.
- Cross-reference: TIPs map to RRI P0/P1 requirements, Vision MVP scope, the promoted public Vietnamese/Japanese localization + contact requirement, the added public footer visual-parity requirement, the prior mock-data all-button handling requirement, the official teal palette alignment requirement from `coding-packs/research/color-branch.md`, the About QC non-color layout fix requirement from `.qc/ui/about`, the Job Detail QC non-color/image/mockdata fix requirement, the Jobs QC non-color/image/mockdata fix requirement from `.qc/ui/jobs`, the Payload CMS migration requirement that supersedes the prior Strapi direction, the Payload dev runtime requirement to use Payload + PostgreSQL 5432 without mock-data-by-default, the local bootstrap/seed requirement to make public site + Payload CMS + Postgres testable from a fresh environment, and the new smooth transition animation requirement that must not change item CSS/layout.
- Gaps: Japanese marketing copy quality depends on owner-provided or reviewed translations. Real social media footer URLs are not specified yet. TIP-014 requires a live button inventory during implementation because button coverage depends on current code state. TIP-017 requires a live color inventory during implementation because color drift depends on current source state. TIP-025 intentionally excludes COLOR, IMAGE, and MOCKDATA mismatches by user request. TIP-027 intentionally excludes COLOR PINK, IMAGE, and MOCKDATA mismatches by user request. TIP-031 requires implementation-time verification of exact Payload v3 PostgreSQL adapter package/API and local Postgres availability. TIP-032 requires implementation-time browser verification to prove smooth animation does not cause item layout drift. All 32 TIP files have been generated in `coding-packs/tips/`.
- Action needed: Implement `coding-packs/tips/TIP-032-smooth-page-transition-animation.md`, then run type checks, unit tests, browser smoke navigation, responsive checks, and reduced-motion checks.
