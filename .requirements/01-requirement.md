# Requirement 01: Build Corporate Website from Design

## Source request

User wants to build the corporate website from the HTML/CSS design assets in `D:\WORKSPACE\CODE\Coporate_Website\.design` and emphasized that the implementation must preserve the design with pixel-perfect accuracy.

## Clarified requirements

- Scope: build the entire site represented by the design assets.
- Source of truth: HTML/CSS files in `.design`, with associated `screen.png` references.
- Verification: both screenshot/manual visual QA and screenshot comparison where feasible.
- Responsive priority: desktop-first, with current stack preserved.
- Stack constraint: keep the existing Next.js/Tailwind setup; do not replace the stack for this requirement.

## Observed design inventory

The design folder currently includes at least two surfaces:

### Recruitment/public site

- Home page: `.design/recruitment_site/trang_chu_fabbi_final_precision/code.html`
- About page: `.design/recruitment_site/ve_fabbi_fabbi_final_precision/code.html`
- Job search page: `.design/recruitment_site/tim_kiem_cong_viec_fabbi_final_precision/code.html`
- Job detail page: `.design/recruitment_site/chi_tiet_cong_viec_fabbi_final_precision/code.html`
- Apply now page: `.design/recruitment_site/ung_tuyen_ngay_fabbi_final_precision/code.html`
- Quick application form: `.design/recruitment_site/form_ung_tuyen_nhanh_fabbi_final_precision/code.html`
- News listing: `.design/recruitment_site/tin_tuc_fabbi_final_precision/code.html`
- News detail: `.design/recruitment_site/tin_tuc_chi_tiet_fabbi_final_precision/code.html`

### CMS/admin site

- Dashboard: `.design/cms_site/bang_dieu_khien_cms_fabbi/code.html`
- Recruitment name management: `.design/cms_site/quan_ly_ten_tuyen_dung_cms_fabbi/code.html`
- News management: `.design/cms_site/quan_ly_tin_tuc_cms_fabbi/code.html`
- Applications management: `.design/cms_site/quan_ly_ung_tuyen_cms_fabbi/code.html`
- Settings: `.design/cms_site/settings_cms_fabbi/code.html`

## Functional requirements

### FR-01: Public recruitment site pages

The app must implement all public/recruitment pages represented in `.design/recruitment_site`.

Acceptance criteria:

- Each design HTML page has a corresponding Next.js route.
- Page layout, spacing, typography, color tokens, component arrangement, and visible content match the HTML/CSS design and `screen.png` reference as closely as possible.
- Shared public header/footer/navigation are consistent with the design.
- Primary CTAs and navigation links route to the corresponding implemented pages.

### FR-02: CMS/admin pages

The app must implement all CMS/admin pages represented in `.design/cms_site`.

Acceptance criteria:

- Each CMS design HTML page has a corresponding `/admin` route or nested admin route.
- Sidebar/header/table/card layouts match the design.
- Visible form controls, buttons, status indicators, and data table structures match the design.
- CMS pages may use static/mock data unless real backend integration is explicitly requested later.

### FR-03: Design token parity

The app must extract and reuse the design tokens present in the HTML/CSS source.

Acceptance criteria:

- Primary palette, surface palette, typography family, radii, spacing, and container dimensions match the design source.
- Token definitions are centralized in Tailwind/config/global CSS where practical.
- Avoid repeated hardcoded styling when a design token exists.

### FR-04: Pixel-perfect visual parity

The implementation must prioritize visual parity over code cleanup or redesign.

Acceptance criteria:

- Layout structure, item arrangement, component hierarchy, colors, typography, and spacing must remain faithful to the design source.
- Do not “improve” or reinterpret the UI unless required for technical correctness.
- If a design choice conflicts with generic component conventions, the design source wins.

### FR-05: Desktop-first responsive behavior

The first implementation milestone prioritizes desktop pixel-perfect output.

Acceptance criteria:

- Desktop viewport matching the design screenshot width is the primary QA target.
- The app must not visibly break on common desktop widths.
- Mobile/tablet responsiveness can be improved later unless already specified in the source HTML/CSS.

### FR-06: Keep current app stack

The implementation must use the existing project stack.

Acceptance criteria:

- Use Next.js, React, TypeScript, and Tailwind already configured in the repository.
- Do not replace the framework or styling foundation.
- Add dependencies only when clearly necessary for matching the design or running verification.

## Non-functional requirements

### NFR-01: Visual QA

- Run the app locally before marking implementation complete.
- Capture or inspect screenshots against `.design/**/screen.png` references.
- Report any known visual deviations explicitly.

### NFR-02: Code quality

- Preserve semantic HTML where possible without compromising visual parity.
- Keep components focused and avoid large files where practical.
- Prefer existing components only when they can match the design accurately.

### NFR-03: Security and stability

- Do not introduce unsafe HTML injection from design files.
- If porting markup from HTML designs, convert it into React/TSX safely.
- Avoid remote Tailwind CDN usage in the production app; use project Tailwind build instead.

## Out of scope for this requirement

- Real CMS authentication and authorization beyond existing placeholder routing.
- Supabase/database integration unless separately requested.
- Content management CRUD behavior beyond static visual page parity.
- Full mobile pixel-perfect parity unless later clarified.
- Rebranding, redesigning, or modernizing the provided design.

## Open questions

1. What exact desktop viewport width should be treated as the golden pixel-perfect target for each screenshot if the screenshots differ in dimensions?
2. Should CMS pages be publicly reachable during development, or should they stay behind the existing admin layout/login placeholder?
3. Should form submissions be non-functional static UI for now, or should they connect to Supabase/API endpoints in this phase?
4. Are all `.design` pages equally high priority, or should public recruitment pages be completed before CMS pages?

## Gate 1 validation

Status: PASS WITH OPEN QUESTIONS

- Stakeholder/source identified: user request plus `.design` HTML/CSS and screenshots.
- Scope clarified: entire site from design assets.
- Source of truth clarified: HTML/CSS design files and `screen.png` references.
- Verification clarified: manual visual QA plus screenshot comparison where feasible.
- Constraints clarified: desktop-first and keep existing Next.js/Tailwind stack.
- Remaining open questions are non-blocking for starting implementation, but they affect QA precision and integration scope.
