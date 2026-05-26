# SPEC: Job Detail Non-Excluded QC Fixes

## Scope
This spec covers TIP-026 only. COLOR, IMAGE, and MOCKDATA mismatches are intentionally excluded.

## AC-01: Share controls have accessible names
- Given: the job detail page is rendered for `/vi/jobs/senior-frontend-engineer-react`
- When: accessibility checks inspect all interactive share/icon controls
- Then: every button or link has a discernible accessible name

## AC-02: Related jobs use valid list semantics
- Given: related jobs are rendered on the job detail page
- When: accessibility checks inspect the related jobs section
- Then: no `aria-required-children` violation is reported

## AC-03: Related jobs render as full cards
- Given: related jobs are available from the existing data source
- When: the related jobs section renders
- Then: each related job is presented as a card with a title, available metadata rows, available tags/skills, and a visible detail link
- And: the section is not reduced to compact single-row links

## AC-04: Sidebar row structure uses available fields only
- Given: a job has available salary, location, department/category, tags/skills, and employment type fields
- When: the sidebar renders
- Then: available values are shown in reference-like grouped rows
- And: absent values such as quantity, missing deadline, phone, or email are not invented

## AC-05: Apply CTA non-color shape parity
- Given: the top apply CTA renders
- When: computed styles are inspected
- Then: non-color shape/layout mismatches such as 16px radius are corrected toward the reference 8px radius
- And: assertions do not require changing button background color or text color

## AC-06: Heading order remains accessible
- Given: the job detail page renders with title, content sections, sidebar, and related jobs
- When: heading levels are inspected
- Then: heading order is logical and does not trigger the previous heading-order accessibility warning
- And: visible copy is unchanged except for accessibility-only labels if needed

## AC-07: Responsive layout has no horizontal overflow
- Given: the job detail page is checked at 375, 768, 1024, and 1440 widths
- When: browser layout is measured
- Then: `document.documentElement.scrollWidth <= document.documentElement.clientWidth`
- And: sidebar and related job cards stack or fit without clipping

## AC-08: Excluded residual mismatches are documented
- Given: QC is rerun after implementation
- When: remaining mismatches are reviewed
- Then: COLOR, IMAGE, and MOCKDATA residual findings are listed as intentionally out of scope
- And: no code change silently fixes or modifies those excluded categories
