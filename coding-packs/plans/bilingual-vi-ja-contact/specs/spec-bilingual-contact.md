# Spec: Bilingual Vietnamese/Japanese Contact

## Scope

Implement public Vietnamese/Japanese localization and a connected contact page from `TIP-011`. This spec intentionally excludes protected CMS localization, email automation, CRM workflows, and full multilingual CMS content editing.

## Behavioral Requirements

### Locale Routing

- Given the visitor opens `/contact` When the page loads Then Vietnamese content renders by default.
- Given the visitor opens the Japanese contact route When the page loads Then Japanese content renders.
- Given the visitor requests an unsupported locale When routing resolves Then the app redirects or not-founds consistently with the chosen framework pattern.
- Given the visitor switches language on a localized public page When an equivalent route exists Then the app navigates to the same page in the selected locale.
- Given no equivalent route exists When switching language Then the app navigates to the selected locale home page.

### Public UI Strings

- Given Vietnamese locale When rendering public header/footer/contact page Then nav labels, CTA labels, form labels, validation messages, and success/error messages are Vietnamese.
- Given Japanese locale When rendering public header/footer/contact page Then nav labels, CTA labels, form labels, validation messages, and success/error messages are Japanese.
- Given a shared public component When rendered in either locale Then it reads text from dictionaries/message modules, not component-local duplicated literals.

### Contact Page UI

- Given no dedicated `.design` contact export exists When implementing contact UI Then it reuses existing public components and Professional Tech Hub tokens.
- Given desktop viewport When opening contact page Then layout uses the existing 1200px container, teal CTAs, Manrope typography, rounded cards/inputs, and soft surfaces.
- Given mobile viewport When opening contact page Then content stacks without horizontal overflow and form controls remain usable.

### Contact Submission

- Given required fields are missing When submitting the form Then localized field-level errors appear and entered values remain visible.
- Given email is invalid When submitting the form Then a localized email error appears.
- Given message exceeds max length When submitting the form Then a localized length error appears.
- Given valid input When submitting the form Then the server validates input and persists a contact submission with locale metadata.
- Given persistence succeeds When the response returns Then localized success feedback appears and form reset occurs only after success.
- Given Supabase insert fails When the response returns Then a safe localized error appears without database details.
- Given anti-abuse field/timing fails When submitting Then the app rejects the request without persisting spam data.

## Data Contract

Minimum submission fields:

```ts
type ContactSubmission = {
  id: string
  name: string
  email: string
  phone?: string | null
  company?: string | null
  subject: string
  message: string
  locale: 'vi' | 'ja'
  status: 'new' | 'read' | 'archived'
  source: 'contact_page'
  created_at: string
}
```

If an existing schema naming convention differs, adapt the names while preserving the fields and behavior.

## Non-Functional Requirements

- No browser translation widgets or runtime third-party translation scripts.
- No console logs for submission data.
- No client-only persistence.
- Server-side validation is mandatory.
- Contact form errors must be accessible to screen readers.
- Existing public pages must not visually regress.

## Verification Evidence

- Unit/integration tests for locale helpers, dictionaries, validation, and submission persistence.
- Route tests for `/contact` and Japanese equivalent.
- Screenshots at 390px and 1440px for Vietnamese and Japanese contact pages.
- Manual language switcher check on desktop and mobile.
