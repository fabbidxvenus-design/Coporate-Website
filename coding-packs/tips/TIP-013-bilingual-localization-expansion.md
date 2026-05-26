# TIP-013: Bilingual Localization Expansion

## HEADER
- TIP-ID: TIP-013
- Project: Corporate Website / Fabbi Recruitment Site
- Module: Public i18n / Vietnamese-Japanese Localization
- Priority: P0
- Depends on: TIP-001, TIP-004, TIP-005, TIP-006, TIP-007, TIP-011, TIP-012
- Estimated: L

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: Next.js App Router, TypeScript, Tailwind CSS, next-intl-style locale routing, Supabase-backed CMS surfaces. Confirm with `coding-packs/product/tech-stack.md` before implementation.
- Key files to read first:
  - `i18n.config.json`
  - `middleware.ts`
  - `messages/vi.json`
  - `messages/ja.json`
  - `app/[locale]/layout.tsx`
  - `components/public/PublicHeader.tsx`
  - `components/public/PublicFooter.tsx`
  - `app/[locale]/page.tsx`
  - `app/[locale]/about/page.tsx`
  - `app/[locale]/jobs/page.tsx`
  - `app/[locale]/news/page.tsx`
  - `app/[locale]/apply/page.tsx`
  - `app/[locale]/contact/page.tsx`
  - `components/public/*`
- Patterns to follow:
  - Keep locale routing based on `vi` and `ja` from `middleware.ts`.
  - Reuse the existing header language switch behavior, but extend localization coverage beyond the header.
  - Keep public layout/footer visual parity from TIP-012 while making text locale-aware.

## APPLICABLE STANDARDS
Builder MUST conform to the repository standards index when present:
- `coding-packs/standards/frontend/html-to-nextjs.md` — preserve semantic Next.js component structure while replacing static HTML text with localized strings.
- `coding-packs/standards/ui/design-tokens.md` — keep existing Tailwind/design token choices; do not redesign while localizing.
- `coding-packs/standards/domain/recruitment-content.md` — preserve recruitment domain meaning across Vietnamese and Japanese strings.

## TASK
Fix bilingual localization so switching between Vietnamese and Japanese changes all public-facing content, not only the header. Expand the message dictionaries and wire page/components to read localized copy for home, about, jobs, news, apply/contact forms, footer, labels, empty states, CTA text, and validation/error messages that are visible to public users.

## SPECIFICATIONS
### Business Rules
1. Supported locales remain exactly `vi` and `ja`; default locale remains `vi`.
2. `/vi/...` pages must display Vietnamese public copy consistently across header, page body, footer, buttons, forms, labels, cards, filters, and empty states.
3. `/ja/...` pages must display Japanese public copy consistently across header, page body, footer, buttons, forms, labels, cards, filters, and empty states.
4. Language switch must preserve the current route path where possible (for example `/vi/jobs` -> `/ja/jobs`) and must not reset users to only the homepage unless the route has no localized equivalent.
5. Public footer text from TIP-012 must be localized without breaking the `.design` visual layout, teal color, logo, social buttons, quick links, or back-to-top behavior.
6. CMS-provided dynamic content should use localized fields if they exist. If the current schema only has one language field, keep rendering existing content and localize surrounding UI chrome; do not invent schema migrations in this TIP.
7. Form validation messages and success/error states visible to candidates must be localized.
8. Locale dictionaries must be complete enough that no public page renders raw translation keys, mixed VI/JA static chrome, or English fallback labels except brand names and intentional proper nouns.

### Validation
1. Validate both `messages/vi.json` and `messages/ja.json` are valid JSON and have matching top-level/key structure.
2. Validate all public localized routes render without runtime missing-message errors:
   - `/vi`
   - `/ja`
   - `/vi/about`, `/ja/about`
   - `/vi/jobs`, `/ja/jobs`
   - `/vi/news`, `/ja/news`
   - `/vi/apply`, `/ja/apply`
   - `/vi/contact`, `/ja/contact`
3. Validate route links generated inside localized pages keep the active locale prefix unless intentionally linking to a non-localized system route.
4. Validate no `href="#"` or fake localized links are introduced.

### Error Handling
1. If a translation key is missing during development, fail visibly through the existing i18n mechanism instead of silently falling back to the wrong language.
2. If dynamic CMS content is unavailable, show localized empty/loading/error UI chrome.
3. If form submission fails, show localized user-facing error messages while keeping developer/server logs unchanged.

## ACCEPTANCE CRITERIA
- Given a user is on `/vi` When they inspect the home page body, footer, CTAs, and section headings Then all public UI chrome is Vietnamese except brand/proper nouns.
- Given a user is on `/ja` When they inspect the home page body, footer, CTAs, and section headings Then all public UI chrome is Japanese except brand/proper nouns.
- Given a user opens `/vi/about` and `/ja/about` When comparing visible static text Then the page body, section labels, CTA text, and footer change language consistently.
- Given a user opens `/vi/jobs` and `/ja/jobs` When viewing filters, cards, empty states, and action buttons Then labels and UI messages change language consistently.
- Given a user opens `/vi/news` and `/ja/news` When viewing list/card/detail UI chrome Then headings, labels, empty states, and CTA text change language consistently.
- Given a user opens `/vi/apply` or `/vi/contact` When interacting with forms Then labels, placeholders, validation messages, submit text, success states, and error states are Vietnamese.
- Given a user opens `/ja/apply` or `/ja/contact` When interacting with forms Then labels, placeholders, validation messages, submit text, success states, and error states are Japanese.
- Given a user clicks the language switch from any localized public route When the destination route exists Then the route path is preserved and only the locale segment changes.
- Given the implementation is complete When running Playwright localization checks Then no page shows mixed Vietnamese/Japanese static UI chrome caused by hardcoded strings.

## CONSTRAINTS
- DO NOT: redesign pages, change `.design` visual parity, alter brand colors, or restructure public layouts beyond what localization requires.
- DO NOT: add a third locale or change locale codes.
- DO NOT: introduce external translation APIs, runtime machine translation, or network-dependent localization.
- DO NOT: modify protected CMS/admin localization unless required to support public localized rendering.
- DO NOT: create database migrations for bilingual CMS fields in this TIP; document any schema gap instead.
- REUSE: existing `messages/vi.json`, `messages/ja.json`, locale middleware, header language switch pattern, public layout, and existing public components.
- REUSE: Next.js server component data flow where pages already load data server-side; pass localized strings into client components as props where needed.
- SKIP: SEO hreflang/canonical overhaul unless already implemented and only needs copy wiring.

## QUALITY GATE SELF-REVIEW
- [x] TIP is self-contained and implementable without clarifying questions.
- [x] Files to inspect/modify are explicit.
- [x] Acceptance criteria are written as Given/When/Then scenarios.
- [x] Constraints forbid the key failure modes: redesign, fake translation, new locale scope creep, external translation services, and schema churn.
- [x] Cross-referenced current issue: only header changes language today; this TIP expands all public UI chrome.
- [x] Known gap declared: CMS dynamic content can only be localized if localized fields already exist; schema migration is out of scope.
