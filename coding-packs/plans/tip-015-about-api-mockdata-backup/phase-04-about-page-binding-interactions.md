# Phase 04 — About Page Binding + Interactions

## [CORE] Goal
Bind the public About page to the typed loader and make visible controls deterministic while preserving visual composition.

## [CORE] Tasks
1. Modify `app/(public)/about/page.tsx` to call `getAboutContent(locale)`.
2. Replace hardcoded arrays/copy with fields from `AboutPageContent`.
3. Preserve the existing visual section order and Tailwind classes.
4. Make activity tab buttons deterministic:
   - Prefer a small client component if tab content should switch.
   - Otherwise render as non-interactive accessible static controls only if design requires no behavior.
5. Make highlight accordion buttons deterministic:
   - Expand/collapse with local state, or render static with accessible semantics.
6. Ensure CTA links to localized jobs page.

## [CONSTRAINTS]
- No redesign.
- No broad refactor beyond About content binding.
- No CMS edit UI.

## [DONE]
- `/vi/about` and `/ja/about` render complete typed content.
- Visible About controls satisfy TIP-014 deterministic button behavior.
- E2E page checks pass without console/page errors.
