# SPEC: Strapi Data Source Boundary

[SPEC] Behavioral specs extracted from TIP-028 for Red/Green Gate.

## AC-01: Mock mode never calls Strapi
- Given: `USE_MOCK_DATA=true` and no `STRAPI_URL` or `STRAPI_API_TOKEN` are configured
- When: public loaders or admin data loaders request jobs, news, about content, settings, or applications
- Then: the app returns mock data and does not initialize or call the Strapi client

## AC-02: Strapi mode requires explicit configuration
- Given: `USE_MOCK_DATA=false` and `STRAPI_URL` or `STRAPI_API_TOKEN` is missing
- When: a production repository attempts to read CMS content
- Then: the request fails with a clear safe configuration error and never falls back to mock data

## AC-03: Strapi mode uses typed normalized domain data
- Given: `USE_MOCK_DATA=false` and Strapi returns a valid collection response
- When: repository methods transform jobs, news, applications, settings, or about content
- Then: callers receive existing app domain types, not raw Strapi entities

## AC-04: Production failure does not silently fallback
- Given: `USE_MOCK_DATA=false` and Strapi returns network, 401/403, validation, or 500 errors
- When: route handlers or loaders request content
- Then: the app returns a safe error/empty/notFound behavior according to route semantics and does not return mock content
