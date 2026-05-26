# SPEC: Strapi Security Boundaries

[SPEC] Additional security specs from dedicated security review.

## AC-22: Strapi secrets are environment-only and server-only
- Given: Strapi integration is configured
- When: the app builds and browser bundles are inspected conceptually/tests assert public env usage
- Then: `STRAPI_API_TOKEN` and private credentials are read from server-side environment variables only and are never exposed to client bundles or responses

## AC-23: Strapi Admin access is restricted
- Given: Strapi Admin is used for content editing
- When: deployment documentation is reviewed
- Then: it requires explicit admin protection such as strong authentication plus IP allowlisting, VPN, private network, or equivalent hosting controls

## AC-24: CORS is restricted
- Given: Strapi is deployed for this website
- When: Strapi setup docs are reviewed
- Then: CORS allows only approved site/admin origins and does not use wildcard origins for credentialed requests

## AC-25: Application and upload validation is schema-based
- Given: a candidate submits application data and optional CV metadata/file
- When: the server processes the submission
- Then: schema validation enforces required fields, allowed CV mime types, max file size, and rejects malicious payloads before Strapi/storage writes

## AC-26: User HTML/rich text is sanitized before rendering
- Given: Strapi returns rich text or user-provided text fields
- When: content is rendered in the Next.js app
- Then: rendering uses safe serializers/sanitization and does not use unsanitized `dangerouslySetInnerHTML`

## AC-27: Security-sensitive events are auditable
- Given: admin auth failures, unauthorized Strapi responses, application submission failures, or CV access failures occur
- When: the server handles them
- Then: safe audit logs record event type and context without secrets, tokens, raw CV URLs, or sensitive candidate content
