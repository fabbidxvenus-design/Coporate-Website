# Detail Definition 04: Corporate Website Pixel-Perfect Build

## Upstream

- Source artifact: `03-business-definition.md`
- Upstream business IDs: `BP-*`, `BR-*`, `UC-*`
- Gate 3 status: PASS

## Scope of this detail definition

This document converts the approved business definition into implementation-ready details for the corporate recruitment website and CMS/admin surface. Details are grouped by screen/UX, API/interface, data, validation, state, error handling, security/privacy, accessibility, non-functional quality, edge cases, and testing.

## Screen and UX details

### DET-UX-001: Public recruitment homepage

**Detail:** Implement the public homepage as a design-faithful page matching the corresponding `.design/recruitment_site` homepage source and screenshot reference.

**Expected behavior:**

- Page is reachable without login.
- Visible sections, copy, typography, spacing, colors, hierarchy, and CTAs match the supplied design.
- Primary navigation and CTA interactions route to corresponding public pages or form flows.
- Desktop visual approval covers 1440px and 1920px.

**Traceability:** BP-001, BP-004, BR-001, BR-002, BR-003, BR-009, BR-010, UC-001

### DET-UX-002: Public content pages

**Detail:** Implement all non-home public recruitment content pages from `.design/recruitment_site`, including company/about, job search, job detail, apply, quick application, news listing, and news detail pages.

**Expected behavior:**

- Each supplied public design page is reachable.
- Public pages do not require CMS login.
- Visible content density and layout match the design source.
- Navigation between related public pages follows visible design intent.

**Traceability:** BP-001, BP-004, BR-001, BR-002, BR-003, BR-009, BR-010, UC-002

### DET-UX-003: Public form UX

**Detail:** Implement public form screens so the form layout remains design-faithful while supporting real submission outcomes.

**Expected behavior:**

- Form fields, labels, helper text, buttons, and spacing match the design source.
- Submitting a form shows a visible in-progress, success, or failure outcome.
- Required submission feedback must not materially alter the approved design layout.

**Traceability:** BP-002, BR-004, BR-005, BR-006, UC-003

### DET-UX-004: Login screen and CMS entry UX

**Detail:** Implement a login path that gates CMS/admin access through Supabase Auth while preserving any supplied login design already present in the app/design set.

**Expected behavior:**

- Unauthenticated users attempting CMS access are directed to login.
- Authenticated CMS users can enter the CMS/admin surface.
- Login errors are visible and understandable.
- Public recruitment pages remain unaffected by CMS login.

**Traceability:** BP-003, BR-007, BR-008, UC-004

### DET-UX-005: CMS dashboard and admin pages

**Detail:** Implement all CMS/admin pages from `.design/cms_site` as login-gated operational screens.

**Expected behavior:**

- Dashboard, recruitment-name management, news management, application management, and settings pages are reachable after login.
- Sidebar/header/table/card/form layouts match the supplied CMS designs.
- CMS navigation allows movement between implemented CMS pages.
- CMS pages receive manual visual approval at 1440px and 1920px.

**Traceability:** BP-003, BP-004, BR-001, BR-002, BR-007, BR-008, BR-009, BR-010, UC-004, UC-006

### DET-UX-006: Visual approval workflow UX evidence

**Detail:** For each implemented page, capture or inspect browser output at required desktop widths and compare it with the design reference before marking the page complete.

**Expected behavior:**

- Evidence exists for 1440px review.
- Evidence exists for 1920px review.
- Manual approval determines final pass/fail.
- Deviations are either corrected or explicitly recorded.

**Traceability:** BP-004, BR-001, BR-002, BR-009, BR-010, UC-005

## API and interface details

### DET-API-001: Public form submission interface

**Detail:** Public forms shall submit to application-managed behavior backed by Supabase persistence.

**Expected behavior:**

- User-entered form data is sent through a controlled application submission flow.
- Successful Supabase persistence produces a visible success state.
- Failed submission produces a visible failure state without silent loss.
- The interface should not require CMS login for public candidate submissions.

**Traceability:** BP-002, BR-004, BR-005, BR-006, UC-003

### DET-API-002: Supabase Auth login interface

**Detail:** CMS login shall use Supabase Auth as the authentication mechanism for admin access.

**Expected behavior:**

- Login attempts authenticate against Supabase Auth.
- Authenticated state allows CMS/admin access.
- Unauthenticated state prevents direct CMS/admin access.
- Authentication failure shows a user-facing error.

**Traceability:** BP-003, BR-007, BR-008, UC-004, UC-006

### DET-API-003: CMS data interface level

**Detail:** CMS pages shall have enough data behavior to support the visual and operational flows represented in the CMS designs.

**Expected behavior:**

- CMS pages display data structures equivalent to the design references.
- If live data is not available for a CMS list/table, display design-equivalent seeded or existing data without breaking visual approval.
- CMS data behavior must remain behind authenticated access.

**Traceability:** BP-003, BR-007, BR-008, UC-006

## Data details

### DET-DATA-001: Design-visible static content

**Detail:** Preserve visible text, labels, headings, navigation labels, button labels, table headings, status labels, and placeholder values from the design source unless replaced with equivalent live data.

**Expected behavior:**

- Design-visible copy is not omitted.
- Replacement data preserves visual density and meaning.
- Any content mismatch that affects visual approval is treated as a defect.

**Traceability:** BP-001, BP-004, BR-001, BR-010, UC-001, UC-002, UC-006

### DET-DATA-002: Design token data

**Detail:** Preserve design token values for color, typography, radius, spacing, and container sizing from the supplied HTML/CSS design.

**Expected behavior:**

- Token values are carried into the app styling system where practical.
- Hardcoded style values are acceptable only when needed to match a specific design detail.
- Token changes are judged by visual output, with design source taking precedence.

**Traceability:** BP-004, BR-001, BR-010, UC-005

### DET-DATA-003: Form submission data

**Detail:** Capture the data necessary for each designed form submission and persist it through Supabase-backed behavior.

**Expected behavior:**

- Required user-entered values are included in submission.
- Submission records are not silently dropped on success.
- Invalid or failed submissions do not appear as successful to the user.

**Traceability:** BP-002, BR-004, BR-005, BR-006, UC-003

### DET-DATA-004: Auth session data

**Detail:** Maintain enough authenticated session state to determine whether CMS/admin access should be allowed.

**Expected behavior:**

- Authenticated CMS users can continue to CMS pages during the active session.
- Unauthenticated users cannot bypass login by directly opening CMS routes.
- Logout/session expiry behavior prevents continued CMS access when unauthenticated.

**Traceability:** BP-003, BR-007, BR-008, UC-004, UC-006

## Validation details

### DET-VAL-001: Public form validation

**Detail:** Validate public form inputs before treating a submission as successful.

**Expected behavior:**

- Required fields must be present before successful submission.
- Invalid email/phone-like fields should not be accepted as successful when the form implies those constraints.
- Validation messages are visible and do not silently fail.
- Validation UI must preserve the design as much as possible.

**Traceability:** BP-002, BR-004, BR-006, UC-003

### DET-VAL-002: Login validation

**Detail:** Validate CMS login attempts through Supabase Auth and report failed authentication clearly.

**Expected behavior:**

- Empty or invalid login inputs do not grant CMS access.
- Failed Supabase Auth responses are shown as login failure.
- Successful login permits CMS/admin access.

**Traceability:** BP-003, BR-007, BR-008, UC-004

### DET-VAL-003: Visual QA validation

**Detail:** Validate visual fidelity at the business-approved desktop widths using screenshot/browser review and manual approval.

**Expected behavior:**

- 1440px view is checked.
- 1920px view is checked.
- Manual approval is recorded as the final decision.
- Known deviations are not hidden.

**Traceability:** BP-004, BR-001, BR-002, BR-009, BR-010, UC-005

## State details

### DET-STATE-001: Public navigation state

**Detail:** Public navigation should support the current page context without requiring login state.

**Expected behavior:**

- Active/current page indication follows the design where present.
- Public routes remain accessible regardless of CMS auth state.
- Navigation state does not alter visual design unexpectedly.

**Traceability:** BP-001, BR-003, UC-001, UC-002

### DET-STATE-002: Form submission states

**Detail:** Forms shall represent idle, submitting, success, validation failure, and submission failure states.

**Expected behavior:**

- Submitting state prevents ambiguous duplicate action where practical.
- Success state confirms completion.
- Failure state allows the user to understand the submission did not complete.

**Traceability:** BP-002, BR-004, BR-006, UC-003

### DET-STATE-003: CMS authentication state

**Detail:** CMS/admin pages shall respond to authenticated and unauthenticated states.

**Expected behavior:**

- Authenticated state permits CMS page access.
- Unauthenticated state blocks CMS page access and directs to login behavior.
- Session ending or logout removes CMS access.

**Traceability:** BP-003, BR-007, BR-008, UC-004, UC-006

### DET-STATE-004: CMS navigation state

**Detail:** CMS navigation shall show and preserve the current admin context according to design intent.

**Expected behavior:**

- CMS navigation is available on CMS/admin pages.
- Current section indication follows the design where present.
- Navigation state does not expose CMS pages to unauthenticated users.

**Traceability:** BP-003, BR-007, BR-008, UC-006

## Error handling details

### DET-ERR-001: Form submission errors

**Detail:** Supabase or validation failures during form submission shall produce visible, user-understandable errors.

**Expected behavior:**

- Failed submission is not shown as success.
- User can correct validation errors and retry.
- System-level failure messaging avoids exposing sensitive internals.

**Traceability:** BP-002, BR-004, BR-006, UC-003

### DET-ERR-002: Login errors

**Detail:** Failed CMS login attempts shall keep the user out of CMS/admin pages and show clear error feedback.

**Expected behavior:**

- Incorrect credentials do not grant access.
- Supabase Auth errors are represented in user-friendly language.
- Reattempt is possible without breaking layout.

**Traceability:** BP-003, BR-007, BR-008, UC-004

### DET-ERR-003: Missing or unavailable data

**Detail:** Missing public/CMS data should not break page rendering or visual review.

**Expected behavior:**

- Public pages retain design-visible content where live data is absent.
- CMS tables/lists retain design-equivalent structure where live data is absent.
- Missing data states are visually controlled and do not leak implementation errors.

**Traceability:** BP-001, BP-003, BR-001, BR-007, UC-002, UC-006

## Security, privacy, and access details

### DET-SEC-001: CMS access protection

**Detail:** CMS/admin pages must be protected by Supabase Auth-gated access.

**Expected behavior:**

- Unauthenticated users cannot directly use CMS/admin pages.
- Authenticated CMS users can access CMS pages.
- Public pages remain outside the CMS protection boundary.

**Traceability:** BP-003, BR-007, BR-008, UC-004, UC-006

### DET-SEC-002: Safe design implementation

**Detail:** Design HTML must be used as a reference and converted safely rather than injected wholesale as unsafe HTML.

**Expected behavior:**

- No unsafe HTML injection is used for design reproduction.
- External design references do not become unreviewed runtime script dependencies.
- Form inputs are treated as untrusted user input.

**Traceability:** BP-004, BR-001, BR-010, UC-005

### DET-SEC-003: Candidate submission privacy

**Detail:** Candidate form submission data must be handled as user-provided personal data.

**Expected behavior:**

- Submission data is sent only through the intended Supabase-backed flow.
- Error messages do not expose sensitive system details.
- CMS access to submission-related surfaces remains login-gated.

**Traceability:** BP-002, BP-003, BR-005, BR-006, BR-007, BR-008, UC-003, UC-006

## Accessibility details

### DET-A11Y-001: Public page accessibility basics

**Detail:** Public pages should preserve semantic structure and accessible navigation while maintaining visual fidelity.

**Expected behavior:**

- Main page landmarks and heading hierarchy are usable where practical.
- Links and buttons are keyboard reachable.
- Focus states are visible or design-equivalent.

**Traceability:** BP-001, BR-003, UC-001, UC-002

### DET-A11Y-002: Form accessibility basics

**Detail:** Designed forms should remain usable with labels, focus, validation feedback, and keyboard interaction.

**Expected behavior:**

- Inputs have accessible labels or equivalent accessible names.
- Validation errors are visible and associated with the relevant field where practical.
- Submit controls are keyboard operable.

**Traceability:** BP-002, BR-004, BR-006, UC-003

### DET-A11Y-003: CMS accessibility basics

**Detail:** CMS/admin pages should support keyboard navigation and readable operational controls while preserving visual fidelity.

**Expected behavior:**

- Login form is keyboard operable.
- Admin navigation is keyboard reachable.
- Tables, controls, and statuses have accessible text equivalents where practical.

**Traceability:** BP-003, BR-007, BR-008, UC-004, UC-006

## Non-functional detail requirements

### DET-NFR-001: Desktop-first visual fidelity

**Detail:** Desktop visual fidelity at 1440px and 1920px is mandatory for completion.

**Expected behavior:**

- Each page is reviewed at both widths.
- Manual approval is the pass/fail mechanism.
- Mobile/tablet parity is not required for this phase but must not be intentionally broken.

**Traceability:** BP-004, BR-002, BR-009, UC-005

### DET-NFR-002: Current stack continuity

**Detail:** Implementation must preserve the existing Next.js, React, TypeScript, and Tailwind stack.

**Expected behavior:**

- No re-platforming occurs.
- Styling foundation remains Tailwind/project CSS based, not runtime Tailwind CDN.
- Dependencies are added only when requirement-driven.

**Traceability:** BR-012

### DET-NFR-003: Maintainability without redesign

**Detail:** Maintainability improvements are allowed only when they do not change approved visual output.

**Expected behavior:**

- Shared tokens/components may be used when they preserve design fidelity.
- Generic UI defaults must not override design-specific appearance.
- Refactors must not create visual drift.

**Traceability:** BP-004, BR-001, BR-010, UC-005

## Edge cases

### DET-EDGE-001: Direct CMS URL while unauthenticated

**Detail:** A user opening a CMS/admin URL directly while unauthenticated must not gain CMS access.

**Expected behavior:**

- User is blocked from CMS content.
- User is directed to login behavior.

**Traceability:** BP-003, BR-007, BR-008, UC-004

### DET-EDGE-002: Supabase unavailable during form submission

**Detail:** If Supabase submission fails or is unavailable, the user sees failure feedback and the app does not show false success.

**Expected behavior:**

- Submission failure state is visible.
- User can retry or correct input when appropriate.

**Traceability:** BP-002, BR-005, BR-006, UC-003

### DET-EDGE-003: Auth session expires during CMS use

**Detail:** If CMS auth session expires, CMS access should no longer be granted.

**Expected behavior:**

- User cannot continue accessing protected CMS pages as authenticated.
- User is returned to login behavior or blocked appropriately.

**Traceability:** BP-003, BR-007, BR-008, UC-006

### DET-EDGE-004: Visual mismatch discovered during QA

**Detail:** If visual QA finds a material mismatch, the page must not be treated as approved unless the deviation is explicitly accepted.

**Expected behavior:**

- Mismatch is fixed or documented.
- Manual approval remains final pass/fail.

**Traceability:** BP-004, BR-001, BR-002, BR-010, UC-005

### DET-EDGE-005: Design-order dependency exception

**Detail:** If implementation order must deviate from `.design` file order due to shared dependencies, the exception must be documented.

**Expected behavior:**

- Deviation is temporary and reasoned.
- Page traceability to the design source is preserved.

**Traceability:** BP-005, BR-011

## Test details

### DET-TEST-001: Public page route and visual tests

**Detail:** Verify all public pages are reachable and visually reviewed at required desktop widths.

**Checks:**

- Route/page coverage for `.design/recruitment_site`.
- 1440px visual review.
- 1920px visual review.
- Public access without login.

**Traceability:** BP-001, BP-004, BR-001, BR-002, BR-003, BR-009, UC-001, UC-002, UC-005

### DET-TEST-002: Public form submission tests

**Detail:** Verify public forms validate and submit through Supabase-backed behavior with visible outcomes.

**Checks:**

- Required validation failure path.
- Successful submission path.
- Supabase failure path.
- Visual layout remains acceptable after state changes.

**Traceability:** BP-002, BR-004, BR-005, BR-006, UC-003

### DET-TEST-003: CMS login and access tests

**Detail:** Verify CMS/admin access is Supabase Auth-gated.

**Checks:**

- Direct unauthenticated CMS access is blocked.
- Failed login does not grant access.
- Successful login grants CMS access.
- Session expiry/logout removes CMS access.

**Traceability:** BP-003, BR-007, BR-008, UC-004, UC-006

### DET-TEST-004: CMS page coverage and visual tests

**Detail:** Verify all CMS pages are reachable after login and visually reviewed at required desktop widths.

**Checks:**

- Route/page coverage for `.design/cms_site`.
- CMS navigation between admin pages.
- 1440px visual review.
- 1920px visual review.

**Traceability:** BP-003, BP-004, BR-001, BR-002, BR-007, BR-008, BR-009, UC-004, UC-005, UC-006

### DET-TEST-005: Safe implementation review

**Detail:** Verify the design is implemented safely and without unsafe HTML injection or runtime design CDN dependencies.

**Checks:**

- No unsafe wholesale HTML injection from design files.
- No production reliance on Tailwind CDN from design HTML.
- User input is validated before successful submission.

**Traceability:** BP-002, BP-004, BR-001, BR-004, BR-010, UC-003, UC-005

## N/A sections

- API-only behavior: N/A — this project is not API-only; it includes public and CMS web surfaces.
- Document-only delivery: N/A — implementation requires interactive web pages, login, and form submission behavior.
- Native mobile details: N/A — this requirement targets a web application with desktop-first visual acceptance.

## Gate 4 validation

Status: PASS

- Upstream business definition loaded: PASS
- Business processes converted to implementation-ready details: PASS
- Business rules preserved without contradiction: PASS
- Use cases converted into screen, state, validation, and test details: PASS
- Screen/UX details included: PASS
- API/interface details included: PASS
- Data details included: PASS
- Validation details included: PASS
- State and error details included: PASS
- Security/privacy/access details included: PASS
- Accessibility details included: PASS
- Non-functional, edge case, and test details included: PASS
- Every detail item traces to BP-*, BR-*, or UC-*: PASS
- Irrelevant sections marked N/A with reason: PASS

## Open questions

None for Gate 4 detail definition.
