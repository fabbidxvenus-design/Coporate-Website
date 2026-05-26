# SPEC: About API

## AC-04: Vietnamese API content
- Given the app runs in mock/fresh-checkout mode
- When `GET /api/about?locale=vi` is requested
- Then the response is 200 with `{ success: true, data, error: null }` and Vietnamese About content.

## AC-05: Japanese API content
- Given the app runs in mock/fresh-checkout mode
- When `GET /api/about?locale=ja` is requested
- Then the response is 200 with `{ success: true, data, error: null }` and Japanese About content.

## AC-06: Invalid locale fallback
- Given the app runs in mock/fresh-checkout mode
- When `GET /api/about?locale=en` is requested
- Then the response uses Vietnamese fallback content without throwing.

## AC-07: No Supabase requirement
- Given Supabase credentials are missing or placeholders
- When the About API is requested
- Then it still returns mock About content instead of 503.
