# SPEC: Old CMS UI Cleanup

## AC-01: No custom jobs admin CRUD pages remain
- Given: `app/admin/jobs/` directory
- When: Files are listed
- Then: Custom list/create/edit pages for jobs management do not exist at paths that duplicate Payload admin job management

## AC-02: No custom news admin CRUD pages remain
- Given: `app/admin/news/` directory
- When: Files are listed
- Then: Custom list/create/edit pages for news management do not exist at paths that duplicate Payload admin article management

## AC-03: No custom applications admin pages remain
- Given: `app/admin/applications/` directory
- When: Files are listed
- Then: Custom application list/detail pages do not exist if they duplicate Payload admin application management capabilities

## AC-04: No custom admin settings page remains
- Given: `app/admin/settings/` path
- When: Page file is checked
- Then: Custom settings page does not exist if it duplicates Payload admin site-settings management

## AC-05: No custom admin dashboard page remains (if owned by Payload)
- Given: `app/admin/page.tsx` (root admin)
- When: Page is checked
- Then: Custom CMS dashboard does not replace Payload admin as the management entry point; it either redirects to Payload admin or is removed

## AC-06: No stale lib/strapi or lib/db/repositories direct imports in app/admin/*
- Given: Remaining `app/admin/*` files (if any)
- When: Imports are scanned
- Then: No imports from `lib/strapi/*` or direct `lib/db/repositories` calls for CMS content; if admin pages remain, they use `lib/repositories` barrel

## AC-07: Payload webhook revalidation uses revalidate secret
- Given: `app/api/revalidate.ts`
- When: Request is made without or with wrong secret
- Then: Returns 401; returns success for valid secret; no secret value is leaked in error messages