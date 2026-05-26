# SPEC: Public Strapi Content Rendering

[SPEC] Behavioral specs for published localized public content.

## AC-05: Public jobs render only published localized Strapi jobs
- Given: `USE_MOCK_DATA=false` and Strapi has Vietnamese jobs in statuses `published`, `draft`, `review`, `closed`, and `archived`
- When: `/vi/jobs` loads
- Then: only published Vietnamese jobs are rendered and the existing jobs page layout is preserved

## AC-06: Public jobs respect Japanese locale
- Given: `USE_MOCK_DATA=false` and Strapi has Vietnamese and Japanese jobs
- When: `/ja/jobs` loads
- Then: only Japanese published jobs are rendered

## AC-07: Public news detail renders transformed rich text
- Given: `USE_MOCK_DATA=false` and Strapi has a published Japanese article with rich text body
- When: `/ja/news/[slug]` loads
- Then: the page renders transformed article content through existing components without raw Strapi shapes

## AC-08: Missing unpublished detail content returns 404 behavior
- Given: `USE_MOCK_DATA=false` and a job or article slug is missing or unpublished
- When: the corresponding detail route loads
- Then: the route returns the existing notFound behavior instead of exposing draft content

## AC-09: About content maps localized Strapi fields
- Given: `USE_MOCK_DATA=false` and Strapi has localized aboutPage content
- When: `/vi/about` or `/ja/about` loads
- Then: the page renders localized transformed content without changing visual composition
