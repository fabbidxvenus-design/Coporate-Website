---
phase: bilingual-localization-expansion
plan: bilingual-localization-expansion
source_tip: coding-packs/tips/TIP-013-bilingual-localization-expansion.md
type: execute
wave: 1
depends_on:
  - TIP-001
  - TIP-004
  - TIP-005
  - TIP-006
  - TIP-007
  - TIP-011
  - TIP-012
files_modified:
  - lib/i18n/vi.json
  - lib/i18n/ja.json
  - app/[locale]/layout.tsx
  - app/[locale]/page.tsx
  - app/[locale]/about/page.tsx
  - app/[locale]/jobs/page.tsx
  - app/[locale]/jobs/[slug]/page.tsx
  - app/[locale]/news/page.tsx
  - app/[locale]/news/[slug]/page.tsx
  - app/[locale]/apply/page.tsx
  - app/[locale]/apply/success/page.tsx
  - app/[locale]/contact/page.tsx
  - components/public/PublicHeader.tsx
  - components/public/PublicFooter.tsx
  - components/public/ApplyForm.tsx
  - components/public/ApplicationModal.tsx
  - components/public/ContactForm.tsx
  - components/public/JobsSearch.tsx
  - components/public/JobCard.tsx
  - components/public/NewsCard.tsx
autonomous: true
requirements:
  - REQ-I18N-01
  - REQ-I18N-02
  - REQ-I18N-03
  - REQ-I18N-04
  - REQ-I18N-05
  - REQ-I18N-06
  - REQ-I18N-07
  - REQ-I18N-08
---

# PLAN: Bilingual Localization Expansion

<objective>
Implement TIP-013 by expanding Vietnamese/Japanese localization from header-only behavior to all public UI chrome across localized routes, forms, footer, CTAs, labels, validation states, and empty/error/loading states while preserving existing design and route structure.
</objective>

<context>
- Source TIP: `coding-packs/tips/TIP-013-bilingual-localization-expansion.md`.
- Current issue: language switching currently affects the header/navigation, but many public page bodies and public components still contain hardcoded Vietnamese strings.
- Current i18n foundation:
  - `middleware.ts` supports `vi` and `ja`, default `vi`.
  - `lib/i18n/index.ts` exposes `getDictionary(locale)` over `lib/i18n/vi.json` and `lib/i18n/ja.json`.
  - `components/public/PublicHeader.tsx` already derives locale from pathname and uses dictionary nav labels.
  - `app/[locale]/contact/page.tsx` already passes `locale` and `dict` into `ContactForm`.
- Current message gap: `messages/vi.json` and `messages/ja.json` only contain a minimal `Contact.title`, and `lib/i18n/*.json` only contain nav/cta/contact subsets.
- Preserve TIP-012 footer visual parity and public shell behavior.
</context>

<applicable_standards>
- `coding-packs/standards/frontend/html-to-nextjs.md` — keep semantic Next.js component structure; replace static public strings with localized dictionary access.
- `coding-packs/standards/ui/design-tokens.md` — do not redesign while localizing; preserve current Tailwind/design-token choices.
- `coding-packs/standards/domain/recruitment-content.md` — preserve recruitment domain meaning across Vietnamese and Japanese strings.
</applicable_standards>

<threat_model>
- Threat: Mixed-language UI breaks candidate trust and makes the language switch misleading.
  - Severity: medium
  - Mitigation: add route-level Playwright assertions for VI and JA pages covering body, footer, forms, labels, CTAs, and empty/error states where deterministic.
- Threat: Missing translation keys cause runtime crashes or raw keys in production.
  - Severity: medium
  - Mitigation: keep `vi.json` and `ja.json` key structure aligned and add a dictionary parity test.
- Threat: Route switcher can lose user context by sending every switch to the homepage.
  - Severity: low
  - Mitigation: preserve the current pathname while replacing only the locale segment.
- Threat: Localizing dynamic CMS content could trigger schema churn.
  - Severity: low
  - Mitigation: localize surrounding UI chrome only unless localized CMS fields already exist; document dynamic-content gaps.
</threat_model>

<must_haves>
- `lib/i18n/vi.json` and `lib/i18n/ja.json` have matching nested key structure for all public UI chrome needed by localized routes.
- `/vi` and `/ja` home pages render localized page body copy, section headings, CTAs, and footer UI chrome.
- `/vi/about` and `/ja/about` render localized static page body copy and CTAs.
- `/vi/jobs` and `/ja/jobs` render localized filters/search UI, job list labels, card action labels, empty states, and modal/form labels.
- `/vi/news` and `/ja/news` render localized headings, card/list UI chrome, empty states, and CTA labels.
- `/vi/apply` and `/ja/apply` render localized form labels, placeholders, submit button, validation messages, success/error states.
- `/vi/contact` and `/ja/contact` render localized page copy and contact form labels/messages.
- `components/public/PublicFooter.tsx` becomes locale-aware without changing the TIP-012 design layout.
- The language switch preserves current public route path where possible, such as `/vi/jobs` -> `/ja/jobs`.
- No `href="#"`, fake localized route, external translation API, or third locale is introduced.
</must_haves>

<tasks>

<task id="1" type="spec">
<title>Create bilingual RED gate tests</title>
<read_first>
- `coding-packs/tips/TIP-013-bilingual-localization-expansion.md`
- `lib/i18n/index.ts`
- `lib/i18n/vi.json`
- `lib/i18n/ja.json`
- `components/public/PublicHeader.tsx`
- existing localized pages under `app/[locale]/`
</read_first>
<files>
- `tests/i18n/bilingual-localization.spec.ts`
</files>
<action>
Create Playwright tests that first fail on the current hardcoded public UI. Cover dictionary parity and route rendering for `/vi`, `/ja`, `/vi/about`, `/ja/about`, `/vi/jobs`, `/ja/jobs`, `/vi/news`, `/ja/news`, `/vi/apply`, `/ja/apply`, `/vi/contact`, and `/ja/contact`. Assert representative VI strings appear only on VI routes and representative JA strings appear on JA routes. Include route-preserving language switch assertion from at least one non-home route.
</action>
<verify>
Run `npx playwright test tests/i18n/bilingual-localization.spec.ts --reporter=line` and confirm at least one meaningful failure before implementation.
</verify>
<acceptance_criteria>
- RED gate tests exist and compile.
- Tests fail before implementation because non-header body/footer/form strings are not fully localized.
- Tests avoid brittle full-page text matching and assert stable user-visible strings.
</acceptance_criteria>
</task>

<task id="2" type="execute">
<title>Expand dictionaries with full public UI chrome</title>
<read_first>
- `lib/i18n/vi.json`
- `lib/i18n/ja.json`
- `messages/vi.json`
- `messages/ja.json`
- all localized public pages/components touched by this plan
</read_first>
<files>
- `lib/i18n/vi.json`
- `lib/i18n/ja.json`
- optionally `messages/vi.json`
- optionally `messages/ja.json`
</files>
<action>
Add matching nested dictionary keys for nav, footer, common CTAs, home, about, jobs, job detail, news, news detail, apply, apply success, contact, forms, validation, loading, error, and empty states. Prefer product-appropriate Japanese copy over literal machine-style wording. Keep brand names such as `Fabbi` unchanged.
</action>
<verify>
Add or run a dictionary parity check so `vi` and `ja` contain the same key paths. Confirm JSON parses successfully.
</verify>
<acceptance_criteria>
- `lib/i18n/vi.json` and `lib/i18n/ja.json` have identical key paths.
- No public page requires hardcoded Vietnamese/Japanese UI chrome outside dictionaries except brand/proper nouns and dynamic CMS data.
- Existing `Contact` message files remain valid if used by current tooling.
</acceptance_criteria>
</task>

<task id="3" type="execute">
<title>Wire localized routes and components to dictionaries</title>
<read_first>
- `app/[locale]/layout.tsx`
- `app/[locale]/page.tsx`
- `app/[locale]/about/page.tsx`
- `app/[locale]/jobs/page.tsx`
- `app/[locale]/jobs/[slug]/page.tsx`
- `app/[locale]/news/page.tsx`
- `app/[locale]/news/[slug]/page.tsx`
- `app/[locale]/apply/page.tsx`
- `app/[locale]/apply/success/page.tsx`
- `app/[locale]/contact/page.tsx`
- `components/public/*.tsx`
</read_first>
<files>
- localized route files under `app/[locale]/`
- affected `components/public/*.tsx`
</files>
<action>
Replace hardcoded public UI strings on localized routes with values from `getDictionary(locale)`. Pass localized string subsets into client components as props rather than making broad route pages client components. Keep non-localized `(public)` routes unchanged unless they share a component that needs optional localized props. Use existing `Locale` typing from `lib/i18n`.
</action>
<verify>
Run type-check after wiring because dictionary shape changes can produce prop/type errors.
</verify>
<acceptance_criteria>
- Localized pages and shared public components render localized strings for both `vi` and `ja`.
- Server components stay server components unless existing client behavior requires otherwise.
- No route imports the wrong dictionary or manually branches on locale for large blocks when dictionary access is sufficient.
</acceptance_criteria>
</task>

<task id="4" type="execute">
<title>Localize footer and route-aware language switch behavior</title>
<read_first>
- `components/public/PublicHeader.tsx`
- `components/public/PublicFooter.tsx`
- `app/[locale]/layout.tsx`
- `coding-packs/plans/public-footer-all-pages/final-report.md`
</read_first>
<files>
- `components/public/PublicHeader.tsx`
- `components/public/PublicFooter.tsx`
- `app/[locale]/layout.tsx`
</files>
<action>
Make `PublicFooter` locale-aware using the same locale derivation/passing approach as the header. Localize quick links, legal/contact labels, Follow Us, Quick link, copyright/back-to-top label, and any visible footer UI text while preserving the exact layout and teal visual design from TIP-012. Confirm the header language switch preserves the route by replacing only the locale segment.
</action>
<verify>
Use Playwright to verify `/vi/jobs` -> language switch -> `/ja/jobs`, and footer strings switch language on `/vi` and `/ja`.
</verify>
<acceptance_criteria>
- `PublicFooter` renders localized text on `/vi/*` and `/ja/*`.
- Footer quick links keep active locale prefix on localized routes.
- TIP-012 footer acceptance criteria remain green.
</acceptance_criteria>
</task>

<task id="5" type="verify">
<title>Run green gate and visual verification</title>
<files>
- `tests/i18n/bilingual-localization.spec.ts`
- existing footer/i18n Playwright tests
</files>
<action>
Run type-check, build, existing i18n/footer tests, and the new bilingual localization spec. Start the dev server and capture screenshots for representative VI/JA routes: `/vi`, `/ja`, `/vi/jobs`, `/ja/jobs`, `/vi/apply`, `/ja/apply`.
</action>
<verify>
Use a separate verifier agent for final review. The verifier must check that static UI chrome is not mixed-language and that route switching preserves path context.
</verify>
<acceptance_criteria>
- `npm run type-check` passes.
- `npm run build` passes.
- `npx playwright test tests/i18n/bilingual-localization.spec.ts tests/footer-red-gate.spec.ts --reporter=line` passes.
- Separate verifier agent reports no CRITICAL/HIGH issues.
- Visual screenshots show language changes beyond the header.
</acceptance_criteria>
</task>

</tasks>

<execution_order>
1. Write RED gate Playwright coverage.
2. Expand dictionary structure.
3. Wire localized pages/components.
4. Localize footer and validate language switch route preservation.
5. Run green gate, regression, visual screenshots, and separate verifier review.
</execution_order>

<quality_gates>
- Red Gate: bilingual localization tests fail before implementation for body/footer/form copy.
- Green Gate: all new i18n tests pass after implementation.
- Regression: TIP-012 footer tests remain green.
- Visual: screenshots captured for both locales on at least home, jobs, and apply pages.
- Review: separate code-reviewer verifies final implementation.
</quality_gates>
