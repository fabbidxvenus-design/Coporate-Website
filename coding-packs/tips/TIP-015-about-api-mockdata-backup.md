# TIP-015: About Page API and Mock Data Backup

## HEADER
- TIP-ID: TIP-015
- Project: Coporate_Website
- Module: Public About / Về Fabbi Content API
- Priority: P0
- Depends on: TIP-004, TIP-011, TIP-014
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: Authoritative stack from `coding-packs/product/tech-stack.md`: Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres, Supabase Auth, Supabase Storage, Vercel + Supabase deployment.
- Key files to read first:
  - `app/(public)/about/page.tsx`
  - `app/[locale]/about/page.tsx`
  - `lib/mock-data.ts`
  - `lib/supabase/server.ts`
  - `lib/i18n/vi.json`
  - `lib/i18n/ja.json`
  - `types/database.ts`
  - `app/api/settings/route.ts`
  - `coding-packs/standards/frontend/html-to-nextjs.md`
  - `coding-packs/standards/ui/design-tokens.md`
  - `coding-packs/standards/database/supabase-saas.md`
- Patterns to follow:
  - Existing public data fallback pattern from jobs/news pages: call `createClient()`, use Supabase when available, otherwise use mock data.
  - Existing localized route pattern: `app/[locale]/about/page.tsx` passes `params` into `app/(public)/about/page.tsx`.
  - Existing API route envelope conventions in `/api/*`, keeping local mock mode deterministic.

## APPLICABLE STANDARDS
Builder MUST conform to:
- [database/supabase-saas](../standards/database/supabase-saas.md) — Supabase schema, auth, RLS, environment baseline, and local seed/mock exception.
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — preserve `.design` visual composition while converting static content into typed data-driven components.
- [ui/design-tokens](../standards/ui/design-tokens.md) — preserve Professional Tech Hub colors, spacing, radius, typography, and responsive rhythm.

## TASK
Implement a complete API + mock data backup layer for the public "Về Fabbi" / About page. The About page must render from a typed content model that can use Supabase-backed content when configured and automatically fall back to local mock content when mock mode is active or Supabase credentials are missing.

This TIP must not redesign the page. It should preserve the current About page visual structure while replacing hardcoded content arrays and copy with a reusable data source and API contract.

## SPECIFICATIONS

### Business Rules
1. About content must be represented by a typed data model covering, at minimum:
   - hero title and hero image
   - statistics cards
   - company intro heading, paragraphs, and image
   - activities tabs/list and selected activity content
   - highlight/benefit accordion items
   - CTA heading, description, label, and target href
2. About content must support Vietnamese and Japanese localized values.
3. The public page `/[locale]/about` must render localized about content for `vi` and `ja`.
4. Missing or invalid locale must safely fall back to Vietnamese behavior, consistent with the rest of the public site.
5. Local/fresh-checkout mode must work without Supabase credentials by using mock data from `lib/mock-data.ts` or a dedicated `lib/about/mock-data.ts` module.
6. Production/Supabase mode must remain available when `USE_MOCK_DATA=false` and valid Supabase credentials exist.
7. Public About reads must be safe for unauthenticated users and must not expose admin-only data.
8. If a Supabase-backed table/view is introduced, public reads must only expose published/active about content, and admin mutations must be deferred unless explicitly in scope.
9. Any visible About page buttons must retain deterministic behavior:
   - activity tabs update visible mock/API content
   - accordion/highlight controls expand/collapse or are explicitly rendered as static if non-interactive by design
   - CTA navigates to the localized jobs page

### Validation
1. Validate route/API query locale to only allow `vi` or `ja`; default to `vi` for unsupported values.
2. Validate API response shape with a typed schema or narrow runtime checks before rendering if data comes from Supabase.
3. Validate image URLs before rendering if they come from Supabase; use safe fallback images from mock data when absent.
4. Do not trust external/Supabase content blindly if it will be rendered as HTML. Prefer plain text fields; if rich text is added, sanitize with existing `lib/sanitize.ts`.

### Error Handling
1. If Supabase is unavailable or returns no active content, render mock About content instead of throwing or showing a 500.
2. If a specific optional content field is missing, use the typed mock fallback for that field.
3. If the API route fails unexpectedly, return a consistent error response and ensure the page still uses server-side fallback content when possible.
4. Public users must see a complete About page in local mode, mock mode, and fresh checkout.
5. Do not leak Supabase errors, credentials, table names, or stack traces to the browser.

### Files to Create or Modify
- Modify: `app/(public)/about/page.tsx`
  - Replace hardcoded arrays/copy with typed About content from a loader.
  - Preserve existing layout/classes unless required to wire data.
- Modify: `app/[locale]/about/page.tsx`
  - Keep locale route compatibility; only adjust if needed for typed params.
- Modify/Create: `lib/mock-data.ts` or `lib/about/mock-data.ts`
  - Add complete VI/JA mock About content.
- Create: `lib/about/types.ts`
  - Define `AboutPageContent`, statistic, activity, highlight, CTA, and localized text types.
- Create: `lib/about/get-about-content.ts`
  - Central loader that uses `createClient()` and falls back to mock data when `null`, missing data, or mock mode.
- Create or Modify: `app/api/about/route.ts`
  - Add `GET /api/about?locale=vi|ja` returning the About content envelope.
- Modify if needed: `types/database.ts`
  - Add/adjust types only if a Supabase table/view for About content already exists or is introduced.
- Modify if needed: `.env.example`
  - Only if new environment behavior is introduced; otherwise reuse existing mock mode docs.
- Add tests:
  - `tests/unit/about-content.test.ts` for fallback/locale selection.
  - `tests/e2e/about-api-mockdata.spec.ts` for `/vi/about`, `/ja/about`, and `/api/about?locale=vi` in mock mode.

## ACCEPTANCE CRITERIA
- Given a fresh checkout with no real Supabase credentials, When `/vi/about` is opened, Then the page renders complete Vietnamese About content from mock data without throwing.
- Given a fresh checkout with no real Supabase credentials, When `/ja/about` is opened, Then the page renders complete Japanese About content from mock data without mixed Vietnamese-only static sections except approved brand terms.
- Given mock mode, When `GET /api/about?locale=vi` is requested, Then the API returns a success response containing the full About content model.
- Given mock mode, When `GET /api/about?locale=ja` is requested, Then the API returns Japanese content with the same schema as Vietnamese.
- Given an unsupported locale such as `/en/about` or `/api/about?locale=en`, When content is resolved, Then Vietnamese fallback is used or the route follows existing locale policy without a runtime crash.
- Given Supabase credentials are missing or placeholder values, When the About loader runs, Then it does not return a 503 for public rendering and instead falls back to mock content.
- Given valid Supabase config and `USE_MOCK_DATA=false`, When active About content exists, Then the loader/API can return Supabase content while preserving the same typed schema.
- Given About activity/highlight controls are visible, When they are clicked in Playwright, Then they either update visible content deterministically or have explicit non-interactive semantics.
- Given `npm run type-check` and `npm run build`, When run after implementation, Then both pass.
- Given Playwright opens `/vi/about` and `/ja/about`, When it checks for page errors and console errors, Then there are no runtime crashes.

## CONSTRAINTS
- DO NOT redesign the About page layout, colors, spacing, section order, or visual hierarchy beyond what is required to bind data.
- DO NOT remove bilingual route support or hardcode only Vietnamese content.
- DO NOT make Supabase required for local development.
- DO NOT expose service-role keys or admin-only content to public pages/API responses.
- DO NOT add admin editing UI for About content unless explicitly requested; this TIP is public API + mock backup only.
- DO NOT introduce a migration unless the current codebase has no existing suitable content/settings storage and the implementation plan explicitly requires it.
- REUSE `createClient()` from `lib/supabase/server.ts` for mock fallback behavior.
- REUSE existing design tokens/classes from the current About page and Professional Tech Hub standards.
- REUSE existing localized route conventions and dictionary fallback patterns where appropriate.
- SKIP full CMS CRUD for About content; defer to a future TIP if needed.

## QUALITY GATE: SELF-REVIEW
- Completeness: Covers API route, typed content model, mock fallback, Supabase path, localized public rendering, validation, error handling, and tests.
- Cross-reference:
  - REQ-B02: About/company page remains the public target.
  - REQ-E01/E02/E06: Next.js API + Supabase/mock environment behavior is specified.
  - REQ-F01/F02/F04: type/build/test/security requirements included.
  - Standards mapped: Supabase SaaS, HTML-to-Next.js, design tokens.
- Ambiguity check: Builder has concrete files, schemas, fallback rules, acceptance criteria, and out-of-scope boundaries.
- Gaps: Exact Supabase storage shape for About content is not defined in the current product docs; implementation should prefer an existing settings/content table if available, otherwise use a minimal typed loader and mock-first API without adding unnecessary schema.
- Verdict: PASS — TIP is implementation-ready.
