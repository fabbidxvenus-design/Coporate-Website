# Recruitment Content Model

## Rule
Public recruitment pages should render from CMS-backed jobs, applications, and news content rather than hardcoded page data.

## Apply
- Jobs need title, department/category, location, employment type, salary/range, skills/tags, description, requirements, benefits, status, publish dates.
- Applications need candidate identity, contact fields, selected job, CV/portfolio metadata, message, source, status, timestamps.
- News needs title, slug, excerpt, body, cover image, category/tags, status, author, publish dates.
- Public routes should only expose published content.

## Why
The target product is SaaS-like with an admin CMS, so public content must be editable and governed.

## Exceptions
Marketing copy for static company/about sections can start static, but should be isolated for later CMS migration.
