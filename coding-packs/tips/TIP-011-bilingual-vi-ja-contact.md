# TIP-011: Vietnamese/Japanese Localization and Contact Page

## HEADER
- TIP-ID: TIP-011
- Project: Coporate_Website
- Module: Localization / Contact
- Priority: P1
- Depends on: TIP-001, TIP-002, TIP-003, TIP-004, TIP-008
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase.
- Key files to read first: `coding-packs/BUILDER-HANDOFF.md`, `coding-packs/02-TASK-GRAPH.md`, `coding-packs/01-REQUIREMENTS-MATRIX.md`, `coding-packs/tips/TIP-004-public-home-about.md`, `coding-packs/tips/TIP-008-dashboard-settings.md`, `.design/recruitment_site/**/code.html`, `.design/recruitment_site/professional_tech_hub/DESIGN.md`.
- Patterns to follow: preserve `.design` visual direction, convert HTML into typed components, centralize translated strings, validate server inputs, use Supabase-backed persistence for connected contact submissions.
- Existing requirement note: RRI originally deferred full localization unless explicitly required later; this TIP promotes Vietnamese/Japanese bilingual support and contact page to implementation scope.

## APPLICABLE STANDARDS
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — Convert static HTML exports into typed reusable Next.js components while preserving visual composition.
- [ui/design-tokens](../standards/ui/design-tokens.md) — Professional Tech Hub colors, typography, spacing, and radius source of truth.
- [database/supabase-saas](../standards/database/supabase-saas.md) — Supabase schema, auth, RLS, storage, and environment baseline.
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — Public content should be CMS-backed where it affects recruitment/business workflows.

## TASK
Add bilingual Vietnamese/Japanese support for the public recruitment site and implement a production contact page if one does not already exist. The contact page must be reachable from public navigation and must persist submissions through the existing Next.js + Supabase backend pattern when Supabase is available.

## SPECIFICATIONS
### Business Rules
1. Support exactly two public locales for this TIP: Vietnamese (`vi`) and Japanese (`ja`).
2. Vietnamese is the default locale unless existing routing/config already establishes a different default.
3. Add a visible language switcher in the public header if not already functional; if a visual switcher exists in `.design`, reuse its placement, size, colors, and interaction style.
4. Localize public navigation labels, shared footer labels, core CTA labels, form labels, validation messages, success/error messages, and the new contact page content.
5. Do not attempt full CMS/admin localization in this TIP; admin may remain Vietnamese or existing language unless strings are shared with public components.
6. Implement `/contact` for the default Vietnamese route and a Japanese equivalent route according to the chosen locale routing pattern, such as `/ja/contact` if route-prefix localization is used.
7. Contact page must include at minimum: name, email, phone optional, company optional, subject, message, preferred locale, and consent/acknowledgement checkbox if the design or validation pattern requires it.
8. Contact submissions must be stored in Supabase in a `contact_submissions` table or equivalent existing table if already present.
9. Admin visibility for contact submissions is optional for this TIP unless an existing admin settings/messages surface already supports it; persistence and validation are required.
10. Contact metadata shown on the page, such as email, phone, address, and office hours, should reuse `site_settings` from TIP-008 when available; otherwise use isolated static content with a clear path to later CMS migration.
11. Preserve Professional Tech Hub visual direction: teal CTAs, Manrope typography, 1200px container, rounded cards/inputs, soft corporate surfaces, and responsive mobile stacking.
12. If no `.design` contact screen exists, compose the page from existing public header/footer, cards, form, contact info blocks, and CTA patterns from home/about/application pages without introducing a new visual style.

### Validation
- Validate locale as `vi` or `ja`; invalid locale routes should use the framework's not-found or redirect behavior consistently.
- Validate required contact fields server-side before inserting into Supabase.
- Email must be syntactically valid.
- Message must be non-empty and capped to a reasonable max length.
- Phone/company/subject must be length-limited.
- Include a lightweight anti-abuse boundary such as honeypot field, submission timestamp check, or rate-limit helper if one already exists from application submission work.

### Error Handling
- Invalid form input shows localized field-level errors and preserves entered values.
- Successful submission shows a localized success state and clears the form only after persistence succeeds.
- Supabase insertion failure shows a localized safe error message and does not expose database details.
- Missing site_settings contact metadata should render graceful localized fallback text, not a broken page.
- Language switching should preserve the current equivalent route where possible; if no equivalent exists, route to the localized home page.

## ACCEPTANCE CRITERIA
- Given a Vietnamese visitor When opening `/contact` Then the contact page renders in Vietnamese using the existing public layout and Professional Tech Hub visual styling.
- Given a Japanese visitor When switching language from Vietnamese to Japanese Then public navigation, footer labels, CTA labels, and contact page copy render in Japanese.
- Given a visitor enters valid contact details When submitting the contact form Then the data is validated server-side and persisted to Supabase with locale metadata.
- Given invalid required fields When submitting the contact form Then localized validation messages appear and the user input remains visible.
- Given Supabase insertion fails When submitting the contact form Then a localized safe error state appears without leaking implementation details.
- Given the site has public header navigation When viewing desktop and mobile layouts Then Contact is reachable and the language switcher remains usable.
- Given no dedicated contact design export exists When implementing `/contact` Then the page reuses existing public page sections/components and does not introduce a mismatched design language.

## CONSTRAINTS
- DO NOT: use browser-only translation widgets, machine translation APIs, or runtime third-party translation scripts.
- DO NOT: hardcode duplicated strings across pages; centralize locale dictionaries or message modules.
- DO NOT: localize the protected CMS/admin surface in this TIP unless required for shared components.
- DO NOT: keep contact submissions only in client state, email-only flows, or console logs.
- DO NOT: break visual parity for existing public pages while adding locale routing.
- REUSE: PublicHeader, PublicFooter, Button, Input, Card/Form primitives, site_settings access patterns, validation utilities, and Supabase server action/route handler patterns from earlier TIPs.
- REUSE: `.design/recruitment_site/**/code.html` layout, spacing, typography, colors, and responsive behavior as the visual source.
- SKIP: full CMS translation management, multi-locale rich text CMS fields for every job/news article, automated email notifications, and advanced CRM workflows.

## QUALITY GATE: SELF-REVIEW
- Completeness: all TIP fields included with explicit files/context, standards, business rules, validation, error handling, acceptance criteria, and constraints.
- Cross-reference: Promotes RRI open question #3 from deferred localization into scoped public Vietnamese/Japanese support; extends TIP-004 public layout and TIP-008 settings/contact metadata while conforming to frontend, UI, database, and domain standards.
- Gaps: Exact Japanese marketing copy is not supplied in existing `.design`; builder must provide production-quality Japanese strings or request owner-provided copy before final release if translation quality is business-critical.
