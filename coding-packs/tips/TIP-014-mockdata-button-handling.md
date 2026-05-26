# TIP-014: Mock Data Button Handling Across All Screens

## HEADER
- TIP-ID: TIP-014
- Project: Coporate_Website
- Module: Mock data mode, public buttons, CMS buttons, form actions, CTA navigation
- Priority: P0
- Depends on: TIP-004, TIP-005, TIP-006, TIP-007, TIP-008, TIP-011, TIP-012, TIP-013
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: Authoritative target stack from `coding-packs/product/tech-stack.md`: Next.js App Router, TypeScript, Tailwind CSS with project-owned design tokens, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase deployment readiness.
- Key files to read first:
  - `package.json`
  - `.env.example`
  - `lib/mock-data.ts`
  - `lib/supabase/server.ts`
  - `lib/supabase/client.ts`
  - `app/(public)/page.tsx`
  - `app/(public)/about/page.tsx`
  - `app/(public)/jobs/page.tsx`
  - `app/(public)/jobs/[slug]/page.tsx`
  - `app/(public)/apply/page.tsx`
  - `app/(public)/apply/success/page.tsx`
  - `app/(public)/news/page.tsx`
  - `app/(public)/news/[slug]/page.tsx`
  - `app/[locale]/**/page.tsx`
  - `components/JobCard.tsx`
  - `components/NewsCard.tsx`
  - `components/public/PublicHeader.tsx`
  - `components/public/PublicFooter.tsx`
  - `components/public/ContactForm.tsx`
  - `app/admin/**/page.tsx`
  - `components/admin/**`
  - `components/cms/**`
  - `app/api/**/route.ts`
- Patterns to follow:
  - Existing `USE_MOCK_DATA` pattern in `lib/supabase/server.ts` and current mock content in `lib/mock-data.ts`.
  - Locale-aware public routing pattern: `/vi/...` and `/ja/...`, with no fallback to locale-less public links from locale pages.
  - Professional Tech Hub design fidelity from `.design/**/code.html` and `.design/**/screen.png`.

## APPLICABLE STANDARDS
Builder MUST conform to:
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — Convert static HTML exports into typed reusable Next.js components while preserving visual composition.
- [ui/design-tokens](../standards/ui/design-tokens.md) — Preserve Professional Tech Hub colors, typography, spacing, button/card/input shapes, and responsive layout rhythm.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — Jobs, applications, and news data model expectations; mock data must mirror the CMS-backed shape.
- [cms/admin-shell](../standards/cms/admin-shell.md) — CMS navigation and all mutations need visible success/error feedback, even in mock mode.
- [database/supabase-saas](../standards/database/supabase-saas.md) — Supabase remains production target; mock mode is local/default fallback and must not weaken production RLS/auth expectations.

## TASK
Implement a default mock-data mode and make every visible button, CTA, icon button, form submit, table/card action, pagination control, filter/search control, language switcher, and admin/public navigation action do something deterministic before real Supabase is required. The default local behavior must use mock data first, while keeping Supabase-backed behavior available when the mock flag is disabled.

This TIP is not a redesign task. It is an interaction-completeness task: every button must either navigate to a real implemented route, mutate mock state with visible feedback, submit against a mock-safe endpoint, open/close an implemented UI state, or be intentionally disabled with an accessible explanation.

## SPECIFICATIONS

### Business Rules
1. Mock mode is the default for local development and fresh checkout.
   - Set/document `USE_MOCK_DATA=true` as the default behavior for local development.
   - Ensure app code treats missing Supabase env vars as mock mode instead of crashing.
   - Keep Supabase production mode available when valid Supabase env vars are present and mock mode is explicitly disabled.
2. All public buttons must be handled:
   - Header logo, nav links, mobile menu toggle, language switcher.
   - Homepage CTAs, service buttons, job/news card links, footer links.
   - About page CTAs.
   - Jobs filters/search, pagination, job card detail buttons, save/bookmark icon buttons, apply CTA.
   - Job detail back/apply/share/save/related-job actions if present.
   - Apply form submit, file upload/remove, reset/back/success navigation.
   - News list/detail links, category/filter/search buttons if present.
   - Contact form submit/reset/back/social/contact actions.
3. All CMS/admin buttons must be handled:
   - Sidebar navigation and logout.
   - Dashboard card/action links.
   - Jobs list create/edit/delete/status/search/filter/pagination controls.
   - Job form save/publish/draft/cancel controls.
   - News list create/edit/delete/status/search/filter/pagination controls.
   - News form save/publish/draft/cancel controls.
   - Applications list/detail status controls, CV view/download mock action, search/filter/pagination.
   - Settings save/reset/upload/logo/social/contact metadata controls.
4. Mock data must mirror production data shape:
   - Jobs, news, applications, settings, profiles/admin user must use typed mock fixtures compatible with `types/database` where possible.
   - Mock records must include enough status variety to exercise button behavior: draft/review/published/closed/archived jobs, published/draft news, multiple application statuses.
5. Mock interactions must be visible and deterministic:
   - Use visible success/error feedback for actions that would normally mutate data.
   - For local-only mock mutations, keep state in component state, URL state, or a clearly named mock repository; do not pretend mock changes are permanently persisted unless they are intentionally stored in browser storage.
   - If a button is not in MVP scope, disable it and show a clear tooltip/aria-label/title such as “Mock mode: not available yet” rather than leaving it inert.
6. Locale must be preserved:
   - From `/vi/*`, buttons navigate within `/vi/*`.
   - From `/ja/*`, buttons navigate within `/ja/*`.
   - Language switcher must map to the equivalent route where possible.
7. URL state must drive shareable public filters:
   - Jobs search/filter/page controls update query params and render filtered mock data.
   - News filters/search, if present in UI, update query params and render filtered mock data.
8. APIs must support mock mode where UI calls route handlers:
   - Contact submission returns a success response in mock mode with realistic payload.
   - Application submission returns a success response in mock mode, including mock CV metadata if upload is involved.
   - Admin mutations return deterministic success/error responses in mock mode or are handled server/client-side consistently.
9. No button may be left as `href="#"`, empty `onClick`, placeholder console output, or dead UI.
10. Keep visual design unchanged except for necessary disabled/focus/loading/success/error states.

### Validation
1. Validate every form boundary in mock and Supabase mode with existing schemas or new Zod schemas:
   - Contact form.
   - Application form.
   - Admin jobs form.
   - Admin news form.
   - Settings form.
2. Validate URL query params for search/filter/page controls:
   - Unknown filters should fail gracefully and reset to default/all.
   - Page values below 1 or above total pages should clamp safely.
3. Validate mock file upload behavior:
   - Enforce the same file type/size constraints planned for production.
   - Show a user-friendly mock success or validation error.
4. Type all mock action payloads; avoid `any` for new mock repositories/helpers.

### Error Handling
1. Missing Supabase configuration in local development must show/use mock mode, not crash.
2. Failed mock submit/mutation paths must be testable through a deterministic trigger, such as a known invalid field value or helper option, and must show visible error feedback.
3. Real Supabase failures must show user-friendly messages and preserve form input where appropriate.
4. Disabled/out-of-scope controls must be keyboard-focusable only when semantically appropriate; otherwise use proper disabled semantics and explanatory text.
5. Do not silently swallow errors from form submissions or admin mutations. Log server-side diagnostic context without exposing secrets or sensitive candidate data.

## ACCEPTANCE CRITERIA
- Given a fresh checkout without Supabase credentials When the developer runs the app Then public pages render using mock jobs/news/settings without runtime errors.
- Given the app is in default mock mode When a user clicks every visible public CTA/button/link on `/vi`, `/vi/about`, `/vi/jobs`, `/vi/jobs/[slug]`, `/vi/apply`, `/vi/news`, `/vi/news/[slug]`, and `/vi/contact` Then each action navigates, filters, opens/closes UI, submits mock data, or shows an intentional disabled explanation.
- Given the app is in default mock mode When the same button audit is repeated under `/ja/*` Then all route transitions preserve `/ja` and no locale-less public route is used from locale pages.
- Given mock mode is enabled When a candidate submits valid contact data Then the UI shows localized success feedback and no Supabase credentials are required.
- Given mock mode is enabled When a candidate submits a valid application with a mock CV Then the UI shows localized success feedback and navigates to the success state.
- Given mock mode is enabled When a candidate submits invalid contact/application data Then validation errors appear and the form values remain editable.
- Given mock mode is enabled When an admin uses create/edit/delete/status buttons for jobs/news/applications/settings Then each button either performs a deterministic mock mutation with visible feedback or is explicitly disabled with an explanation.
- Given mock mode is disabled and valid Supabase env vars exist When public pages load Then they use Supabase-backed data and preserve the same button behavior.
- Given mock mode is disabled and Supabase fails When a button-triggered submit/mutation errors Then the UI shows a user-friendly error message and does not crash.
- Given the implementation is complete When `npm run type-check` and `npm run build` run Then both pass without new dynamic-rendering, module-resolution, or sanitizer runtime errors.
- Given Playwright or equivalent E2E tests run When the button audit suite executes Then it covers all critical public and admin button paths in mock mode.

## CONSTRAINTS
- DO NOT: Leave any button/link/action with `href="#"`, empty handlers, placeholder `console.log`, or no user-visible outcome.
- DO NOT: Remove Supabase-backed behavior; mock mode is the default local path, not a replacement for production data mode.
- DO NOT: Change `.design` visual layout, colors, spacing, or component hierarchy except for required interaction states.
- DO NOT: Hardcode secrets or require Supabase credentials for default local button testing.
- DO NOT: Add database migrations for mock-only behavior unless a production schema gap is explicitly discovered and documented for a separate TIP.
- DO NOT: Use broad `any` types for newly introduced mock data/actions.
- REUSE: Existing `USE_MOCK_DATA` pattern, `lib/mock-data.ts`, Zod validation schemas, route handlers, locale dictionaries, existing card/form/header/footer components, and existing Tailwind/design tokens.
- REUSE: URL search params for public filter/search state.
- SKIP: Advanced analytics, email notifications, third-party ATS integrations, real payment/external service integrations, and permanent mock persistence beyond local UI state or explicit browser storage.

## QUALITY GATE: SELF-REVIEW
- Completeness: Covers all visible public and CMS button categories, mock-data default behavior, Supabase fallback, validation, error states, and locale preservation.
- Cross-reference: Maps to REQ-B03, REQ-B04, REQ-B05, REQ-B07, REQ-C01, REQ-C05, REQ-D01, REQ-D03, REQ-D05, REQ-D07, REQ-D09, REQ-E01, REQ-E02, REQ-E06, REQ-F01, REQ-F02, and REQ-F04.
- Standards compliance: References frontend conversion, UI tokens, recruitment content, CMS admin shell, and Supabase SaaS baseline standards.
- Ambiguity check: “Tất cả button” is made explicit as every visible button/link/CTA/icon button/form action/filter/pagination/admin action in public and CMS surfaces.
- Gaps: Exact current button inventory must be produced by the builder from the live codebase before implementation; this TIP intentionally requires that audit as part of execution.
- Action needed: Implement with a RED button-audit/E2E test first, then wire mock repositories/actions until all buttons have deterministic outcomes.
