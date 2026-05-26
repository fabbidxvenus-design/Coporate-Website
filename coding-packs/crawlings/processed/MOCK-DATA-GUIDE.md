# MOCK-DATA-GUIDE.md

## Overview
This mock data package provides a production-like seed for the Fabbi Holdings website. It is structured to facilitate local development and eventual Supabase migration.

## Structure
- `site-content.{vi,ja}.json`: Global site settings, company identity, about content.
- `news.{vi,ja}.json`: Blog and news articles.
- `portfolio.{vi,ja}.json`: Project showcase data.
- `media-manifest.json`: Asset mapping for all images.
- `mock-seed.json`: Aggregate file for seeding local databases or mock service workers.

## Usage in App
The data is designed to be loaded by a mock provider (e.g., `lib/mock-data.ts`). Future Supabase migration should use the `mock-seed.json` as the template for database schema and initial data inserts.

### Mapping to Mock Service Worker / Provider
- `siteSettings`: Map to global context or theme provider.
- `jobs`: Feed directly to `app/[locale]/jobs/page.tsx` and detail pages.
- `newsArticles`: Feed to `app/[locale]/news/page.tsx`.
- `portfolioItems`: Feed to dynamic portfolio rendering logic.

## Translation Status
- Data marked with `"translationStatus": "machine_draft_needs_review"` requires manual review by a native Japanese speaker before moving to production.
