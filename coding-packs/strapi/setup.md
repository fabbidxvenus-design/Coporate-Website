# Strapi CMS Setup Documentation

This document outlines the setup requirements for the Strapi CMS integration with the Corporate Website.

## Environment Variables
The following environment variables must be configured in the production environment:

- `STRAPI_URL`: The base URL of your Strapi instance (e.g., `https://api.cms.com`)
- `STRAPI_API_TOKEN`: A read-only API token for content retrieval. For admin operations, a token with appropriate write permissions is required.

## Strapi Instance Requirements
- Strapi v4+ or v5+
- REST API must be enabled for all content types
- CORS should be configured to allow requests only from the Corporate Website production domain
- API tokens must be generated within the Strapi Admin panel and passed securely to the Next.js environment

## Security Constraints
- Strapi Admin URL should be restricted to authorized access with strong authentication plus IP allowlisting, VPN, private network controls, or equivalent hosting protection.
- API tokens must be injected through server-side environment variables only and must never be exposed to browser-side code, client props, logs, screenshots, or API responses.
- Do not create `NEXT_PUBLIC_STRAPI_TOKEN` or any public environment variable containing private Strapi credentials.
- Sensitive media such as candidate CVs must be handled with private access controls; ensure Strapi media is not public unless explicitly intended for marketing/public content.
- Public content queries must filter by locale and published status before returning data to public routes.

## CORS Policy
- Allow only approved Corporate Website origins for browser-accessible Strapi endpoints.
- Do not use wildcard origins for credentialed requests.
- Prefer routing all Strapi calls through Next.js server-side route handlers/repositories so browsers do not call Strapi directly.

## Cache and Revalidation
- If Strapi webhooks trigger Next.js cache invalidation, protect the revalidation endpoint with a shared secret or equivalent signature validation.
- Invalid webhook requests must not revalidate content.
- Affected public routes should be revalidated per content type: jobs, news, about, and settings.
