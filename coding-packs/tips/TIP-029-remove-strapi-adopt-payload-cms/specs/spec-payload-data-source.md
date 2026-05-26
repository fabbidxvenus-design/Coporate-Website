# SPEC: Payload Data Source

## AC-01: Mock mode never initializes Payload
- Given: `USE_MOCK_DATA=true` and no Payload/database env variables are configured
- When: any CMS-backed route is executed (jobs, news, about, settings, applications)
- Then: the app renders mock data and does not import or initialize Payload or connect to any database

## AC-02: Non-mock mode fails loudly without env
- Given: `USE_MOCK_DATA=false` and Payload env variables are missing
- When: a CMS-backed route is executed
- Then: the server fails with a clear error message listing missing variable names (without exposing secret values) and does not silently fall back to mock data

## AC-03: Public jobs render only published localized content
- Given: Payload contains published Vietnamese jobs and draft/review/closed/archived jobs
- When: `/vi/jobs` is loaded in non-mock mode
- Then: only published Vietnamese jobs are rendered in the existing visual layout

## AC-04: Public news renders only published localized content
- Given: Payload contains a published Japanese news article
- When: `/ja/news/[slug]` is loaded in non-mock mode
- Then: the page renders the article content transformed into app domain types without leaking raw Payload response shape

## AC-05: Draft jobs invisible publicly
- Given: Payload contains jobs with status `draft`, `review`, `closed`, or `archived`
- When: public jobs pages are loaded
- Then: those jobs are not displayed

## AC-06: Locale bounded at API boundaries
- Given: a request is made to public/API routes
- When: locale filtering is applied
- Then: only supported locales (`vi`, `ja`) are accepted; unsupported locales return appropriate error responses