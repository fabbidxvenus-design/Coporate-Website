# SPEC: Admin Workflows, Applications, and Security

[SPEC] Behavioral specs for admin Strapi handoff/CRUD, application submission, and private CV handling.

## AC-10: Admin shell remains protected and visually stable
- Given: an unauthenticated user requests `/admin`
- When: admin auth protection runs
- Then: the user cannot access CMS content directly and the existing protected behavior remains

## AC-11: Admin content workflow is explicit
- Given: an authenticated admin opens jobs or news management
- When: they create or edit content
- Then: the UI either performs in-app Strapi-backed CRUD with visible feedback or clearly hands off to Strapi Admin with accessible links

## AC-12: Strapi errors show safe admin feedback
- Given: Strapi returns a validation, authorization, or network error during an admin operation
- When: the admin workflow handles the response
- Then: the UI shows a safe visible error without exposing tokens or internal Strapi details

## AC-13: Application submission creates a production record
- Given: a candidate submits a valid application in production mode
- When: the application route processes the request
- Then: a Strapi application record or documented hybrid private-storage record is created and the candidate receives the existing success state

## AC-14: CV access remains private
- Given: an application includes CV metadata or a stored CV file
- When: an admin opens application detail or requests CV download
- Then: access is server-mediated/signed/private and no raw private path, token, or public CV URL is exposed

## AC-15: Environment docs contain no secrets
- Given: `.env.example` and Strapi docs are updated
- When: the files are reviewed
- Then: they list required variable names and setup instructions without real credentials
