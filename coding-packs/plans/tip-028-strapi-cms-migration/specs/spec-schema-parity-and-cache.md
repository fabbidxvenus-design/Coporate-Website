# SPEC: Schema Parity, Route Sequencing, and Cache Invalidation

[SPEC] Additional THOROUGH-tier specs from architecture and TDD review.

## AC-16: Schema map blocks route migration
- Given: TIP-028 implementation has not produced `coding-packs/strapi/schema-map.md`
- When: a route migration task attempts to switch public/admin routes to Strapi
- Then: implementation must stop and create the schema mapping first

## AC-17: Critical field parity is complete
- Given: legacy repository fixtures and Strapi fixtures for jobs, news, about, settings, and applications
- When: the parity check runs
- Then: record counts and critical route fields (`slug`, `locale`, `title`, `status`, `publishedAt`, relations) match 100% unless exclusions are explicitly documented

## AC-18: Route cutover is incremental
- Given: the migration is in progress
- When: a route group is switched to Strapi
- Then: that route group passes mock-mode and Strapi-mode tests before the next route group starts

## AC-19: Strapi content update invalidates cache
- Given: Strapi content for a published job, article, about page, or setting is updated
- When: the configured webhook or revalidation endpoint receives a valid request
- Then: affected Next.js cache entries/routes are invalidated and subsequent reads can return updated content

## AC-20: Cache invalidation is authenticated
- Given: an unauthenticated or invalid webhook request reaches the revalidation endpoint
- When: the endpoint validates the request
- Then: it rejects the request without revalidating cache and without leaking secrets

## AC-21: Performance does not regress beyond agreed budget
- Given: Strapi mode is enabled and public pages fetch CMS content
- When: `/vi/jobs`, `/vi/about`, and `/ja/news/[slug]` are smoke-tested
- Then: added Strapi integration does not introduce avoidable client-side fetch waterfalls, and the plan records a target of LCP < 2.5s for production verification where Lighthouse is available
