# Business Definition 03: Corporate Website Pixel-Perfect Build

## Upstream

- Source artifact: `02-requirement-definition.md`
- Upstream requirement set: `REQ-FUNC-*`, `REQ-NFR-*`, `REQ-DATA-*`, `REQ-INT-*`, `REQ-CON-*`
- Resolved business blockers:
  - Form submissions use Supabase persistence.
  - CMS login uses Supabase Auth.
  - Visual QA pass/fail uses manual approval, with screenshot comparison as supporting evidence.

## Business objectives

### BO-001: Launch a design-faithful corporate recruitment website

**Objective:** Deliver the corporate recruitment website so that stakeholders can use the supplied design as the production-facing experience without visual reinterpretation.

**Business value:** Preserves brand intent, reduces design-to-build rework, and enables the site to represent FABBI recruitment consistently.

**Success measures:**

- All supplied public recruitment pages are implemented.
- Manual visual approval is achieved for desktop 1440px and 1920px.
- Stakeholders do not identify material deviations from the provided design.

**Traceability:** REQ-FUNC-001, REQ-NFR-001, REQ-NFR-002, REQ-NFR-003, REQ-CON-002, REQ-CON-004

### BO-002: Provide a login-gated CMS surface for recruitment operations

**Objective:** Deliver the CMS/admin surface from the design so authorized users can access recruitment administration pages through login.

**Business value:** Establishes a controlled operational surface for managing recruitment-related content and submissions.

**Success measures:**

- All supplied CMS/admin pages are implemented.
- CMS access requires login.
- Login-to-admin journey is accepted in QA.

**Traceability:** REQ-FUNC-002, REQ-FUNC-003, REQ-INT-002

### BO-003: Capture candidate and site form submissions reliably

**Objective:** Ensure designed forms support real submission behavior backed by Supabase.

**Business value:** Turns the website from a static brochure into a usable recruitment channel.

**Success measures:**

- Designed forms submit successfully to Supabase-backed behavior.
- Failed submissions show an understandable outcome.
- Submission behavior does not degrade visual parity.

**Traceability:** REQ-FUNC-004, REQ-INT-001, REQ-DATA-001

### BO-004: Preserve implementation continuity with the current stack

**Objective:** Deliver the website using the existing Next.js, React, TypeScript, and Tailwind foundation.

**Business value:** Reduces delivery risk and avoids re-platforming work unrelated to business goals.

**Success measures:**

- Existing stack remains in place.
- The implementation remains compatible with the project setup.
- New technology choices are limited to requirement-driven needs.

**Traceability:** REQ-CON-001, REQ-NFR-005

## KPIs

| KPI ID | KPI | Target | Evidence | Traceability |
|---|---|---:|---|---|
| KPI-001 | Public design page coverage | 100% of supplied public pages | Route/page inventory matched to `.design/recruitment_site` | REQ-FUNC-001 |
| KPI-002 | CMS design page coverage | 100% of supplied CMS pages | Route/page inventory matched to `.design/cms_site` | REQ-FUNC-002 |
| KPI-003 | Desktop visual approval | Approved at 1440px and 1920px | Manual QA record supported by screenshots | REQ-NFR-001, REQ-NFR-002, REQ-NFR-003 |
| KPI-004 | Form submission usability | 100% of designed forms have accepted submit behavior | QA confirms Supabase-backed submit success/failure behavior | REQ-FUNC-004, REQ-INT-001 |
| KPI-005 | CMS access control journey | 100% of CMS/admin surfaces require login | QA confirms unauthenticated users do not directly enter CMS | REQ-FUNC-003, REQ-INT-002 |
| KPI-006 | Design source fidelity | No unapproved material deviations | Stakeholder/manual approval | REQ-NFR-001, REQ-CON-002 |

## Stakeholders

| Stakeholder ID | Stakeholder | Interest | Decision rights | Traceability |
|---|---|---|---|---|
| STK-001 | Business owner | Site represents company and recruitment brand correctly | Final business acceptance | REQ-NFR-001, REQ-CON-002 |
| STK-002 | Recruitment team | Candidates can browse jobs and submit applications | Accepts recruitment user journeys | REQ-FUNC-001, REQ-FUNC-004, REQ-INT-001 |
| STK-003 | CMS/admin users | Can access and use admin pages after login | Accepts CMS operational flow | REQ-FUNC-002, REQ-FUNC-003, REQ-INT-002 |
| STK-004 | Design owner | Implementation matches supplied design | Visual approval authority | REQ-NFR-001, REQ-NFR-002, REQ-NFR-003 |
| STK-005 | Engineering owner | Site is maintainable and aligned to current stack | Technical delivery acceptance | REQ-CON-001, REQ-NFR-004, REQ-NFR-005 |

## Roles and permissions

| Role ID | Role | Permissions | Restrictions | Traceability |
|---|---|---|---|---|
| ROLE-001 | Public visitor | View public recruitment pages and submit public forms | Cannot access CMS/admin pages without login | REQ-FUNC-001, REQ-FUNC-003, REQ-FUNC-004 |
| ROLE-002 | Candidate | Browse recruitment content and submit application-related forms | Cannot access CMS/admin pages without authorized login | REQ-FUNC-001, REQ-FUNC-004, REQ-INT-001 |
| ROLE-003 | CMS user | Access CMS/admin pages after Supabase Auth login | Access is limited to authenticated admin surface | REQ-FUNC-002, REQ-FUNC-003, REQ-INT-002 |
| ROLE-004 | Visual approver | Review screenshots/browser output and approve or reject visual fidelity | Does not define implementation internals | REQ-NFR-001, REQ-NFR-002, REQ-NFR-003 |

## Business processes

### BP-001: Public recruitment browsing process

**Description:** A public visitor browses recruitment pages, reads company/job/news content, and follows design-provided navigation or CTAs.

**Trigger:** Visitor lands on a public recruitment page.

**Outcome:** Visitor can reach relevant public pages and understand available recruitment content.

**Business rules:** BR-001, BR-002, BR-003

**Traceability:** REQ-FUNC-001, REQ-FUNC-005, REQ-DATA-001

### BP-002: Candidate form submission process

**Description:** A candidate fills out a designed form and submits it through Supabase-backed behavior.

**Trigger:** Candidate submits a public recruitment form.

**Outcome:** Submission succeeds or fails with a visible user outcome.

**Business rules:** BR-004, BR-005, BR-006

**Traceability:** REQ-FUNC-004, REQ-INT-001, REQ-DATA-001

### BP-003: CMS access process

**Description:** A CMS user logs in with Supabase Auth before accessing CMS/admin pages.

**Trigger:** User attempts to access CMS/admin functionality.

**Outcome:** Authenticated CMS users can access admin pages; unauthenticated users cannot directly enter the CMS surface.

**Business rules:** BR-007, BR-008

**Traceability:** REQ-FUNC-002, REQ-FUNC-003, REQ-INT-002

### BP-004: Visual approval process

**Description:** Implemented pages are reviewed against the supplied design at desktop widths and approved manually.

**Trigger:** A page or surface is ready for QA.

**Outcome:** Page is either approved or returned for correction with visual deviations noted.

**Business rules:** BR-001, BR-002, BR-009, BR-010

**Traceability:** REQ-NFR-001, REQ-NFR-002, REQ-NFR-003, REQ-CON-002, REQ-CON-004

### BP-005: Design-order delivery process

**Description:** Work proceeds according to the order of files in `.design`, unless dependency order requires a documented exception.

**Trigger:** Implementation planning or page delivery sequencing begins.

**Outcome:** Delivery remains aligned to the selected business priority order.

**Business rules:** BR-011

**Traceability:** REQ-CON-003

## Business rules

### BR-001: Supplied design is the business source of truth

**Rule:** The supplied HTML/CSS design and screenshot references define the intended business appearance of the site.

**Rationale:** Pixel-perfect fidelity is the primary business requirement.

**Traceability:** REQ-NFR-001, REQ-CON-002, REQ-DATA-002

### BR-002: Manual visual approval determines final design acceptance

**Rule:** Screenshot comparison may support review, but final visual pass/fail is determined by manual approval.

**Rationale:** The blocker decision selected manual approval over strict numeric tolerance.

**Traceability:** REQ-NFR-001, REQ-NFR-002, REQ-NFR-003

### BR-003: Public recruitment content must remain publicly accessible

**Rule:** Public recruitment pages must be accessible without CMS/admin login.

**Rationale:** Public visitors and candidates need direct access to recruitment content.

**Traceability:** REQ-FUNC-001, REQ-FUNC-003

### BR-004: Designed forms must support real submission outcomes

**Rule:** Forms represented in the design must not remain static-only if they imply submission.

**Rationale:** The business selected API-connected forms.

**Traceability:** REQ-FUNC-004, REQ-INT-001

### BR-005: Supabase is the selected persistence/auth platform for this requirement

**Rule:** Form persistence and CMS authentication should use Supabase for this phase.

**Rationale:** The blocker decision selected Supabase and Supabase Auth.

**Traceability:** REQ-INT-001, REQ-INT-002

### BR-006: Form outcomes must be visible to the user

**Rule:** A user submitting a form must receive a visible success or failure outcome.

**Rationale:** Submissions need business-operable feedback and cannot fail silently.

**Traceability:** REQ-FUNC-004, REQ-INT-001

### BR-007: CMS pages are not public content

**Rule:** CMS/admin pages must be treated as protected operational surfaces rather than public pages.

**Rationale:** CMS surfaces are for authorized operational users.

**Traceability:** REQ-FUNC-002, REQ-FUNC-003, REQ-INT-002

### BR-008: CMS access requires Supabase Auth login

**Rule:** CMS users must authenticate through Supabase Auth before CMS/admin access is granted.

**Rationale:** The blocker decision selected Supabase Auth for CMS login QA and access behavior.

**Traceability:** REQ-FUNC-003, REQ-INT-002

### BR-009: Desktop approval must cover 1440px and 1920px

**Rule:** Desktop visual acceptance must include both 1440px and 1920px viewport widths.

**Rationale:** These are the agreed desktop QA targets.

**Traceability:** REQ-NFR-002, REQ-CON-004

### BR-010: Redesign is not an acceptable substitute for fidelity

**Rule:** Subjective improvements, rebranding, or modernization cannot replace the supplied design without explicit approval.

**Rationale:** The business objective is to reproduce the provided design.

**Traceability:** REQ-NFR-001, REQ-CON-002

### BR-011: Delivery follows design-file order

**Rule:** Implementation should follow the observed order of `.design` files unless an exception is documented.

**Rationale:** The blocker decision selected design-file order as the delivery sequence.

**Traceability:** REQ-CON-003

### BR-012: Existing stack continuity is a business constraint

**Rule:** Re-platforming is not part of this business requirement.

**Rationale:** Keeping the current stack limits delivery risk and scope expansion.

**Traceability:** REQ-CON-001

## Use cases

### UC-001: Visitor views public recruitment homepage

**Primary actor:** Public visitor

**Goal:** View the public recruitment homepage matching the supplied design.

**Preconditions:** Public site is available.

**Main success outcome:** Visitor sees the design-faithful homepage and can use visible navigation/CTAs.

**Acceptance criteria:**

- Homepage is reachable without login.
- Visual appearance receives manual approval at required desktop widths.
- Primary navigation and CTAs are available.

**Traceability:** REQ-FUNC-001, REQ-FUNC-005, REQ-NFR-001, REQ-NFR-002

### UC-002: Visitor browses public content pages

**Primary actor:** Public visitor

**Goal:** Navigate between recruitment, company, job, and news content represented in the design.

**Preconditions:** Public pages are implemented.

**Main success outcome:** Visitor reaches public content pages and sees content matching the design references.

**Acceptance criteria:**

- Public pages represented in `.design/recruitment_site` are reachable.
- Visible content and layout match design references.
- Public browsing does not require CMS login.

**Traceability:** REQ-FUNC-001, REQ-FUNC-005, REQ-DATA-001

### UC-003: Candidate submits a recruitment form

**Primary actor:** Candidate

**Goal:** Submit a designed recruitment/application form.

**Preconditions:** Candidate is on a page with a designed form.

**Main success outcome:** Candidate submits the form and receives a visible success or failure outcome.

**Acceptance criteria:**

- The form submits through Supabase-backed behavior.
- The user sees the submission outcome.
- The form remains visually faithful to the design.

**Traceability:** REQ-FUNC-004, REQ-INT-001, REQ-DATA-001, REQ-NFR-001

### UC-004: CMS user logs in and views dashboard

**Primary actor:** CMS user

**Goal:** Access CMS/admin pages after login.

**Preconditions:** CMS user has valid Supabase Auth access for QA/use.

**Main success outcome:** CMS user authenticates and reaches the CMS dashboard/admin surface.

**Acceptance criteria:**

- CMS/admin pages require login.
- Authenticated CMS user can reach the dashboard/admin surface.
- CMS pages match supplied design references.

**Traceability:** REQ-FUNC-002, REQ-FUNC-003, REQ-INT-002, REQ-NFR-001

### UC-005: Visual approver reviews a completed page

**Primary actor:** Visual approver

**Goal:** Approve or reject visual fidelity for a completed page.

**Preconditions:** Page is implemented and available in a running app.

**Main success outcome:** Page is manually approved or returned with deviations to fix.

**Acceptance criteria:**

- Page is reviewed at 1440px and 1920px.
- Screenshot comparison or browser inspection evidence is available.
- Final decision is manual approval or rejection.

**Traceability:** REQ-NFR-001, REQ-NFR-002, REQ-NFR-003

### UC-006: CMS user reviews operational CMS pages

**Primary actor:** CMS user

**Goal:** Navigate through implemented CMS/admin pages after login.

**Preconditions:** CMS user is authenticated.

**Main success outcome:** CMS user can reach CMS pages represented in the design.

**Acceptance criteria:**

- CMS pages from `.design/cms_site` are reachable after login.
- CMS navigation between admin pages is available.
- CMS content structure matches the design source.

**Traceability:** REQ-FUNC-002, REQ-FUNC-003, REQ-INT-002, REQ-DATA-001

## Business acceptance criteria

- BA-001: All public recruitment design pages are implemented and reachable.
- BA-002: All CMS/admin design pages are implemented and reachable only after login.
- BA-003: Designed forms submit through Supabase-backed behavior and show visible outcomes.
- BA-004: Desktop visual QA at 1440px and 1920px receives manual approval.
- BA-005: The provided design is not reinterpreted, rebranded, or replaced by generic UI.
- BA-006: The existing Next.js/React/TypeScript/Tailwind stack remains the implementation foundation.

## Risks and mitigations

| Risk ID | Risk | Impact | Mitigation | Traceability |
|---|---|---|---|---|
| RISK-001 | Pixel-perfect expectations are subjective without numeric tolerance | Rework during visual approval | Use screenshot comparison as evidence and final manual approval as the business decision | REQ-NFR-001, REQ-NFR-003 |
| RISK-002 | Design HTML may not map cleanly to production app behavior | Visual or interaction gaps | Treat design as source of truth while implementing safely and documenting deviations | REQ-NFR-004, REQ-CON-002 |
| RISK-003 | Supabase setup may be unavailable or incomplete | Forms/login cannot complete business QA | Confirm Supabase project credentials before integration work begins | REQ-INT-001, REQ-INT-002 |
| RISK-004 | CMS auth expectations may expand beyond login gating | Scope creep | Keep this phase limited to Supabase Auth-gated access unless new requirements are approved | REQ-FUNC-003, REQ-INT-002 |
| RISK-005 | Full mobile parity may be assumed later | Scope mismatch | State desktop-first acceptance and handle mobile/tablet parity as a later requirement if needed | REQ-CON-004 |
| RISK-006 | Design-order delivery may conflict with shared layout dependencies | Inefficient sequencing | Allow documented dependency-driven exceptions without changing business priority order | REQ-CON-003 |

## Gate 3 validation

Status: PASS

- Business objectives defined: PASS
- KPIs defined and traceable: PASS
- Stakeholders and decision rights identified: PASS
- Roles and permissions defined: PASS
- Business processes defined with BP-* IDs and REQ traceability: PASS
- Business rules defined with BR-* IDs and REQ traceability: PASS
- Use cases defined with UC-* IDs and REQ traceability: PASS
- Acceptance criteria and risks documented: PASS
- Business rules kept separate from UI/API/schema design: PASS
- No code-level or schema-level design introduced: PASS

## Open questions

None for Gate 3 business definition.
