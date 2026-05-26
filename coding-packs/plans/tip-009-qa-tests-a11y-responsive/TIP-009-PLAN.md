# TIP-009: QA, Tests, Accessibility, Responsive Verification

## HEADER
- TIP-ID: TIP-009
- Project: Corporate Website
- Module: QA & Verification
- Priority: P0
- Depends on: TIP-014, TIP-013, TIP-012, TIP-008, TIP-007, TIP-006, TIP-005, TIP-004, TIP-001
- Estimated: L

## CONTEXT
- Working dir: D:\WORKSPACE\CODE\Coporate_Website
- Tech stack: Next.js 15, TypeScript, Tailwind, Playwright
- Key files to read first: `playwright.config.ts`, `app/(public)/jobs/page.tsx`, `middleware.ts`
- Patterns to follow: Red-Green test pattern, Playwright E2E standards

## APPLICABLE STANDARDS
- [testing.md](../../../.claude/rules/common/testing.md) — 80% coverage requirement
- [performance.md](../../../.claude/rules/web/performance.md) — Core Web Vitals
- [security.md](../../../.claude/rules/common/security.md) — Auth/protection

## TASK
Implement comprehensive QA verification including unit tests for validation schemas, E2E tests for core user journeys, accessibility audits, and responsive layout verification across key breakpoints.

## SPECIFICATIONS
### Unit Tests
- Validation schemas (Contact, Application)
- Auth middleware protection

### E2E Tests
- Critical flows: Home, About, Jobs, News, Auth (Admin login/protection), Application submission
- Draft visibility check
- Language switcher

### Accessibility & Responsive
- Axe-core scan for major public/admin pages
- Manual responsive check at 320, 768, 1024, 1440px
- Visual regression snapshots

## ACCEPTANCE CRITERIA
- Given the application When running unit tests Then 80%+ coverage is maintained
- Given the E2E suite When running Then all core flows pass (CI/CD green)
- Given an axe-core scan When running on major pages Then no critical accessibility violations exist
- Given any breakpoint (320-1440px) When checking Then no horizontal overflow occurs

## CONSTRAINTS
- DO NOT: bypass security checks in E2E tests
- REUSE: existing Playwright infrastructure and utility mocks
- SKIP: non-core routes if necessary for time
