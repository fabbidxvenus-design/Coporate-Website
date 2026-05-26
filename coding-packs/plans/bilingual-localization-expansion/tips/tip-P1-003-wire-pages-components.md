# TIP-P1-003: Wire Localized Pages and Components

**Agent:** Implementer
**Model:** opus
**File ownership:**
- `app/[locale]/page.tsx`
- `app/[locale]/about/page.tsx`
- `app/[locale]/jobs/page.tsx`
- `app/[locale]/jobs/[slug]/page.tsx`
- `app/[locale]/news/page.tsx`
- `app/[locale]/news/[slug]/page.tsx`
- `app/[locale]/apply/page.tsx`
- `app/[locale]/apply/success/page.tsx`
- `app/[locale]/contact/page.tsx`
- `components/public/ApplyForm.tsx`
- `components/public/ApplicationModal.tsx`
- `components/public/ContactForm.tsx`
- `components/public/JobsSearch.tsx`
- `components/public/JobCard.tsx`
- `components/public/NewsCard.tsx`
**Blocked by:** TIP-P1-002
**Acceptance criteria:**
- [ ] Localized route pages read `getDictionary(locale)` and render dictionary strings for static UI chrome.
- [ ] Client components receive localized string props where needed.
- [ ] Forms show localized labels, placeholders, validation, submit, success, and error states.
- [ ] Dynamic CMS content remains unchanged unless localized fields already exist.
- [ ] `npm run type-check` passes.

## Context
Localized routes exist under `app/[locale]`, but many page/component strings are still hardcoded Vietnamese. This task wires dictionary content through those surfaces without redesigning the pages.

## Implementation Notes
- Preserve server components where possible.
- Avoid broad client conversion.
- Keep non-localized `(public)` route behavior stable unless a shared component needs optional localized props.
