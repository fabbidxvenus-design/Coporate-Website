# Phase 06: Tests, Security, and Safe Implementation Audit

## ZFlow Context

**Phase purpose:** DET-TEST-001 through DET-TEST-005, DET-SEC-001 through DET-SEC-003

## Overview

Create and run automated checks for route reachability, auth protection, public form behavior, safe design conversion, and accessibility basics. Use separate verifier agents for code and security review.

## Test Strategy

### Unit / Component

- Validate public form Zod schemas.
- Validate API response helpers.
- Validate route/auth helper behavior where practical.

### Integration / API

- Public application submission API:
  - Required validation failure.
  - Successful Supabase persistence.
  - Supabase failure path.
- Login/auth flow:
  - Failed login does not grant access.
  - Signout removes session.

### E2E / Playwright

- Public route reachability without login.
- CMS direct access while unauthenticated redirects to login.
- Login failure remains on login page.
- Login success grants admin access.
- Form validation and visible success/failure states.
- CMS navigation between pages after auth.

## Audit Tasks

1. **Route and visual test coverage.**
   - Public pages: all `.design/recruitment_site` routes.
   - CMS pages: all `.design/cms_site` routes.
   - Screenshots at 1440px and 1920px for all target pages.

2. **Safe implementation review.**
   - Search for `dangerouslySetInnerHTML`, raw design HTML injection, and runtime design CDN dependencies.
   - Ensure no production dependency on Tailwind CDN from design HTML.
   - Confirm all user input reaches validation before success.

3. **Security review.**
   - Use `security-reviewer` agent.
   - Check auth boundary for `/admin/*`.
   - Check candidate submission privacy and error message safety.
   - Check open redirect protection on login redirect.
   - Check no hardcoded secrets.

4. **Code review.**
   - Use `typescript-reviewer` and `code-reviewer` agents.
   - Review for TypeScript correctness, async correctness, accessibility basics, maintainability, and no unsafe HTML injection.

5. **Quality gates.**
   - `pnpm type-check`.
   - `pnpm build`.
   - Playwright E2E.
   - Coverage gate: ≥80% if measured; if coverage tooling absent, record fail-open with rationale and manual evidence.

## Acceptance Criteria

- [ ] Public page route tests cover all public design pages.
- [ ] CMS page route tests cover all CMS design pages.
- [ ] Form validation failure, success, and Supabase failure are tested.
- [ ] Auth tests cover unauthenticated block, failed login, successful login, logout/session expiry.
- [ ] No unsafe design HTML injection.
- [ ] No runtime Tailwind CDN dependency.
- [ ] User input validated before successful submission.
- [ ] Security reviewer reports no CRITICAL/HIGH issues.
- [ ] TypeScript/code reviewer reports no CRITICAL/HIGH issues.
- [ ] Type-check and build pass.

## DET Traceability

DET-TEST-001, DET-TEST-002, DET-TEST-003, DET-TEST-004, DET-TEST-005, DET-SEC-001, DET-SEC-002, DET-SEC-003
