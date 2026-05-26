# SPEC: Payload Dev Operations

## AC-01: Dev setup instructions in coding-packs/payload/setup.md
- Given: `coding-packs/payload/setup.md`
- When: Developer reads the file
- Then: File documents: env vars, Payload admin path, how Payload connects to PostgreSQL on port 5432, and the command sequence to run locally

## AC-02: .env.example documents Payload/Postgres dev vars
- Given: `.env.example`
- When: Developer reads the file
- Then: File contains `PAYLOAD_SECRET`, `PAYLOAD_URL`, `DATABASE_URL`, and `USE_MOCK_DATA` with placeholder values and clear comments explaining each

## AC-03: Applications create persists to Payload/Postgres
- Given: Payload mode is active and valid env
- When: Candidate submits application via `POST /api/applications`
- Then: Application persists to Payload applications collection or PostgreSQL via repository, and private fields are not exposed in API responses

## AC-04: Contact form persists to db (non-CMS)
- Given: App is running in Payload mode
- When: Candidate submits contact form via `POST /api/contact`
- Then: Submission persists to the contact table via db repository (contact form is not a Payload collection)