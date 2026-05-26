# Strapi CMS Permissions

This document defines the permission model and access control for the Strapi CMS.

## API Access
- A restricted API token must be used for all requests from the Corporate Website.
- Token Scope: `read` for all collection types (`jobs`, `articles`, `site-settings`, `about-pages`) for public consumption.
- Token Scope: `create` for the `applications` collection type to allow public form submissions.

## Strapi Admin Access
- Strapi Admin access is restricted to authorized personnel only.
- Roles:
  - `Admin`: Full access.
  - `Editor`: Access to manage `jobs`, `articles`, `about-pages`, and `site-settings` content.
  - `Recruiter`: Access to view and update `applications` and `jobs`.

## Media and CV Privacy
- CV files uploaded through public applications must NOT be publicly accessible.
- Strapi Media Library must have strict permissions: public assets only for public content, private folders for candidate data.
- Ensure that public access is explicitly disabled for folders containing CVs.
- Prefer existing signed/server-mediated download behavior for CV access.
- If Strapi stores CV files, expose them only through authenticated server-side download/proxy routes or time-limited signed access; never render raw private media URLs in client UI.

## Server API Boundary
- Next.js server code is the only allowed consumer of `STRAPI_API_TOKEN`.
- Client components must consume transformed domain data from Next.js routes/loaders, not raw Strapi entities.
- Public API responses must not include internal Strapi metadata unless already part of the app domain contract.

## Validation and Sanitization
- Application submissions must be schema-validated before Strapi writes.
- CV uploads must enforce allowed mime types and size limits before storage.
- Rich text from Strapi must be rendered through safe serializers or sanitization; unsanitized HTML injection is prohibited.

## Audit Logging
- Log security-sensitive events server-side: unauthorized Strapi responses, failed admin access, application validation failures, and CV access failures.
- Logs must omit tokens, credentials, raw signed URLs, and sensitive candidate content.
