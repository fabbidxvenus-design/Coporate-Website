# Spec — Mock-vs-PostgreSQL Boundary

## Requirement Mapping

- TIP-022 Business Rules: 7, 10
- TIP-022 Error Handling: 1, 2
- TIP-022 Acceptance: `USE_MOCK_DATA=true` renders public pages without `DATABASE_URL` and without PostgreSQL initialization.

## Given / When / Then

### Scenario 1: Mock mode does not initialize PostgreSQL

Given `USE_MOCK_DATA=true` and `DATABASE_URL` is missing  
When public loaders for jobs, news, about, settings, and contact metadata are exercised  
Then they return mock data or mock-safe responses  
And they do not import, construct, or call the PostgreSQL pool/client.

### Scenario 2: DB mode never silently falls back to mock data

Given `USE_MOCK_DATA=false` and PostgreSQL is unavailable  
When a DB-backed public page, API route, or CMS loader executes  
Then the failure is explicit  
And no mock data is returned as a hidden fallback.

### Scenario 3: Flag semantics are centralized

Given code needs to decide between mock mode and DB mode  
When loaders/repositories evaluate the data source  
Then the decision uses one shared helper or boundary module  
And scattered one-off interpretations of `USE_MOCK_DATA` are avoided.

## Red Test Shape

Add tests that stub or spy on the PostgreSQL connection module and prove mock-mode code paths never touch it. Add DB-mode tests that assert missing configuration errors are propagated instead of returning mock rows.
