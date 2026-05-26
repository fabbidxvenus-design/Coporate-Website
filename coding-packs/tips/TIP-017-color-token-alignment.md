# TIP-017: Color Token Alignment

## HEADER
- TIP-ID: TIP-017
- Project: Coporate_Website
- Module: UI design tokens / global color system
- Priority: P0
- Depends on: TIP-001, TIP-004, TIP-005, TIP-006, TIP-007, TIP-008, TIP-011, TIP-012, TIP-013, TIP-014, TIP-015, TIP-016
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: Authoritative stack is `coding-packs/product/tech-stack.md`: Next.js App Router, TypeScript, Tailwind CSS with project-owned design tokens, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase deployment target.
- Key files to read first:
  - `coding-packs/research/color-branch.md`
  - `coding-packs/standards/ui/design-tokens.md`
  - `tailwind.config.ts`
  - `app/globals.css`
  - `components/public/PublicHeader.tsx`
  - `components/public/PublicFooter.tsx`
  - `components/public/JobCard.tsx`
  - `components/public/NewsCard.tsx`
  - `components/public/ApplicationModal.tsx`
  - `components/public/ContactForm.tsx`
  - `components/cms/CmsSidebar.tsx`
  - `components/cms/CmsTopbar.tsx`
  - `components/admin/ArticleForm.tsx`
  - `components/admin/SettingsForm.tsx`
- Patterns to follow:
  - Centralize colors in Tailwind config and/or CSS variables; avoid scattered raw hex replacements.
  - Preserve HTML/screenshot visual parity first, then normalize values as named tokens.
  - Keep existing bilingual routing, public layouts, CMS shell, and mock-data behavior intact.

## APPLICABLE STANDARDS
Builder MUST conform to:
- [ui/design-tokens](../standards/ui/design-tokens.md) — Professional Tech Hub colors, typography, spacing, radius, and visual fidelity source of truth.
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — preserve exported HTML visual intent while converting/maintaining reusable typed Next.js components.

## TASK
Implement the color palette from `coding-packs/research/color-branch.md` across the existing source code so public and CMS UI consistently use the official teal system. The primary color must be `#006672`, the default hover/dark color must be `#005560`, accent orange must be `#F47F35`, and light teal surface usage must map to `#F0F9FA`.

This is a color-alignment pass only: update tokens and usages that affect colors, hover states, focus rings, borders, badges, buttons, links, nav active states, and form accents without redesigning layout, spacing, typography, content, data flow, routing, or component structure.

## SPECIFICATIONS

### Business Rules
1. The canonical color values are:
   - Primary/default teal: `#006672`
   - Primary hover/dark teal: `#005560`
   - Secondary teal shade: `#00707e`
   - Accent orange: `#F47F35`
   - Light teal surface: `#F0F9FA`
2. `tailwind.config.ts` must expose these values as named tokens so components can use semantic Tailwind classes instead of repeated arbitrary hex values.
3. Existing UI elements that represent primary brand actions must use `#006672` by default and `#005560` on hover/active states.
4. Text links and interactive navigation hover states should use the named teal text token equivalent to `#006672`.
5. Light teal backgrounds, chips, soft callouts, or selected states should use the named light teal token equivalent to `#F0F9FA`.
6. Accent highlights that are intentionally orange must use `#F47F35`; do not replace semantic error/warning/success colors with brand orange.
7. Preserve semantic status colors for errors, success states, validation, and workflow badges unless they are currently accidental brand-color drift.
8. Public and CMS surfaces must remain visually consistent after the token pass: header, footer, job cards, news cards, forms, buttons, CMS sidebar/topbar, tables/cards, and admin forms.
9. Existing bilingual Vietnamese/Japanese content and locale routing must not change.
10. Existing mock-data behavior, form submission behavior, API routes, Supabase integration, and tests must not be functionally changed.

### Validation
1. Search for raw color values and Tailwind arbitrary classes that duplicate brand teal/orange values, then replace them with named tokens where safe.
2. Confirm there are no remaining inconsistent primary teal values used for brand actions unless explicitly required by the source screenshot/design docs.
3. Verify hover classes for primary buttons use the dark teal token (`#005560`).
4. Verify link hover classes use the teal text/default token (`#006672`).
5. Verify `tailwind.config.ts` remains valid TypeScript and exposes the expected token names.

### Error Handling
1. If a color is tied to validation, error, success, warning, disabled, or workflow status meaning, leave it semantic and document it in the implementation summary instead of forcing the brand palette.
2. If a component uses a color that visually matches a screenshot but conflicts with the new token values, preserve screenshot parity and map the color to a named token only if it is part of the teal/orange system.
3. If automated checks fail because of unrelated pre-existing issues, report them separately and include the exact failing command/output summary.

## ACCEPTANCE CRITERIA
- Given the Tailwind configuration is inspected When the builder looks for brand tokens Then `primary.DEFAULT`, `primary.600`, `primary.700`, `primary.800`, `brand.teal`, `brand.darkTeal`, `brand.accent`, `teal.DEFAULT`, `teal.dark`, `teal.light`, and `teal.text` or equivalent semantic tokens resolve to the canonical values from `color-branch.md`.
- Given a primary CTA button is rendered When the user hovers it Then its default state uses `#006672` and hover state uses `#005560`.
- Given a public navigation or footer link is rendered When the user hovers it Then the hover text color uses the teal text/default token equivalent to `#006672`.
- Given public job/news cards, application/contact forms, and CMS sidebar/topbar are rendered When their brand accents are inspected Then they use named teal/orange tokens instead of ad hoc duplicate hex values.
- Given validation errors, success messages, and workflow status badges are rendered When their colors are inspected Then their semantic meaning remains intact and is not blindly converted to brand teal/orange.
- Given the implementation is complete When `npm run lint` and the available test/build command are run Then they pass or any unrelated pre-existing failures are explicitly reported.
- Given the app runs locally When public and CMS key screens are checked at desktop and mobile widths Then the color palette matches the new teal system without layout, spacing, typography, or content regressions.

## CONSTRAINTS
- DO NOT redesign layouts, component hierarchy, spacing, typography, routing, data fetching, translations, or CMS/application behavior.
- DO NOT replace semantic error/success/warning/status colors with brand colors.
- DO NOT introduce a second theme system, CSS-in-JS library, runtime theme provider, or broad refactor.
- DO NOT leave new repeated raw brand hex values in components when a token can be used.
- DO NOT change Supabase schema, migrations, RLS policies, API contracts, or mock-data fixtures for this TIP.
- REUSE `tailwind.config.ts`, `app/globals.css`, existing components, and existing design-token conventions.
- REUSE `coding-packs/research/color-branch.md` as the color-value source for this task.
- SKIP content updates, image updates, localization copy changes, and non-color visual polish.

## QUALITY GATE: SELF-REVIEW
- Completeness: Covers source research, token centralization, component-level usage, hover/link/form states, validation boundaries, and manual verification.
- Cross-reference: Aligns with REQ-A03 and REQ-A04 in `coding-packs/01-REQUIREMENTS-MATRIX.md`, `coding-packs/standards/ui/design-tokens.md`, and `coding-packs/research/color-branch.md`.
- Gaps: Exact current color drift must be discovered during implementation by scanning the live source because the codebase has evolved beyond the original scan.
- Action needed: Builder should run a color usage inventory, apply tokenized replacements, run lint/build/tests, and manually inspect public/CMS screens for color regressions.
