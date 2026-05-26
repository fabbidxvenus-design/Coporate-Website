# TIP-008: Schema Parity and Cache Invalidation

**Agent:** backend architect
**Model:** opus
**File ownership:** `coding-packs/strapi/schema-map.md`, `coding-packs/strapi/data-parity-checklist.md`, `scripts/*strapi*parity*`, `app/api/revalidate/**`, cache/revalidation tests
**Blocked by:** tip-001-strapi-contract-docs
**Acceptance criteria:**
- [ ] Schema map explicitly maps legacy/domain fields to Strapi fields for every model.
- [ ] Data parity checklist requires 100% critical-field parity unless documented exclusions exist.
- [ ] Route migration order is captured and enforced in downstream tasks.
- [ ] Authenticated webhook/revalidation strategy is documented or implemented.
- [ ] Invalid webhook requests do not trigger cache invalidation.

## Context
[CORE] Added after architecture/TDD review identified implicit schema mapping and missing cache invalidation as blockers.

## Implementation Notes
Do not print private CV URLs or signed URLs in parity output. Prefer server-side revalidation route with shared secret if implementing webhooks.
