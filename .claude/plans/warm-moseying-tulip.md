# Implementation Plan: Add Job Editing/Creation to Admin

## Context
The admin panel lacks the ability to create new job listings or edit existing ones. This feature is necessary for administrative management of recruitment. The existing implementation for news management serves as the blueprint for this request.

## Implementation Plan

### 1. Repository Updates (lib/db/repositories/jobs.ts)
Extend the existing `jobsRepository` to support CRUD operations, mirroring the `newsRepository` pattern.
- Implement `findById(id: string)`
- Implement `findAll()` (all status)
- Implement `create(data)`
- Implement `update(id, data)`
- Implement `delete(id)`

### 2. API Routes (app/api/jobs/...)
Mirror the news API routes for job management.
- Create `app/api/jobs/[id]/route.ts` for GET, PUT, DELETE operations, protected by `requireAdmin()`.
- Create `app/api/jobs/route.ts` for POST (create) operation, protected by `requireAdmin()`.

### 3. UI Implementation
- Create reusable `components/admin/JobForm.tsx`. This component will accept `job?: Job` (if editing) and manage form state for job fields (title, description, requirements, benefits, salary, etc.).
- Create `app/admin/jobs/new/page.tsx`:
    - Layout: Standard admin layout.
    - Content: Header ("Create Job") + `JobForm` component.
- Create `app/admin/jobs/[id]/edit/page.tsx`:
    - Layout: Standard admin layout.
    - Content: Data fetch (job by ID) + Header ("Edit Job") + `JobForm` component (with pre-filled data).

## Critical Files
- `lib/db/repositories/jobs.ts`
- `app/api/jobs/[id]/route.ts`
- `app/api/jobs/route.ts`
- `components/admin/JobForm.tsx`
- `app/admin/jobs/new/page.tsx`
- `app/admin/jobs/[id]/edit/page.tsx`

## Verification
- Run `npm run type-check` to ensure repository/API signatures are valid.
- Manually test:
    - Navigate to `/admin/jobs/new`, fill the form, click save.
    - Verify new job appears in `/admin/jobs` listing.
    - Navigate to `/admin/jobs/[id]/edit`, modify fields, click save.
    - Verify changes persist in the listing.
- Run `playwright test` to check for regressions in existing admin pages.
