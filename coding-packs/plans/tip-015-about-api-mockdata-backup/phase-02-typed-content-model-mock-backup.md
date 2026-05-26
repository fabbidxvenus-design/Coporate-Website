# Phase 02 — Typed Content Model + Mock Backup

## [CORE] Goal
Create a complete typed About content model and Vietnamese/Japanese mock content backup.

## [CORE] Tasks
1. Create `lib/about/types.ts` with explicit exported types for About content.
2. Create `lib/about/mock-data.ts` containing complete `vi` and `ja` mock content extracted from the current About page.
3. Create locale helpers:
   - `normalizeAboutLocale(locale)` returns `vi` for invalid/missing input.
   - `getMockAboutContent(locale)` returns a complete content object.
4. Ensure image fields, CTA hrefs, activities, highlights, and stats are present for both locales.

## [CONSTRAINTS]
- Preserve visible copy/layout intent from current `app/(public)/about/page.tsx`.
- Do not introduce Supabase migrations here.
- Avoid `any`; make the data model explicit.

## [DONE]
- Unit tests for schema completeness and locale fallback pass.
