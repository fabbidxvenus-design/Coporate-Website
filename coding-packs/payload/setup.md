# Payload CMS Setup Guide

## Overview

Payload CMS is a headless CMS that can be embedded directly inside the Next.js application, eliminating the need for a separate Docker container. It stores data in PostgreSQL and provides a fully customizable admin UI.

## Environment Variables

Add these to `.env.local`:

```env
# Payload CMS (required for payload data mode)
PAYLOAD_SECRET=your-secret-at-least-32-chars
PAYLOAD_URL=http://localhost:3000

# Collections (defaults shown — only override if renamed)
PAYLOAD_COLLECTION_JOBS=jobs
PAYLOAD_COLLECTION_ARTICLES=articles
PAYLOAD_COLLECTION_APPLICATIONS=applications
PAYLOAD_COLLECTION_MEDIA=media
PAYLOAD_COLLECTION_SITE_SETTINGS=site-settings
PAYLOAD_COLLECTION_ABOUT_PAGES=about-pages
```

## Installation

Payload v3 is installed as a regular npm dependency:

```bash
pnpm add payload
```

## Data Source Mode

The application uses a 3-mode data source strategy:

| `USE_MOCK_DATA` | `PAYLOAD_SECRET` | Mode | Description |
|---|---|---|---|
| `true` (default) | — | mock | Local mock data, no network |
| `false` | set | payload | Payload CMS as backend |
| `false` | not set | postgres | Supabase/Postgres fallback |

## Running Payload Locally

Payload can be embedded in Next.js (recommended for development) or run as a standalone service.

### Option A: Embedded in Next.js (Recommended for dev)

Add Payload routes to your Next.js app. Payload provides an embedded mode with `payloadInit()` that integrates into your existing Next.js server.

```typescript
// app/(payload)/custom.ts
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import path from 'path'

const config = buildConfig({
  // ... Payload config
  secret: process.env.PAYLOAD_SECRET!,
  // Use embedded PostgreSQL or connect to external DB
})
```

### Option B: Standalone with Docker

For production, run Payload as a separate service with its own database:

```yaml
# docker-compose.yml
services:
  payload:
    image: payloadcms/payload:latest
    environment:
      PAYLOAD_SECRET: ${PAYLOAD_SECRET}
      DATABASE_URI: postgresql://user:pass@db:5432/payload
    ports:
      - "3001:3000"
    depends_on:
      - db
```

## Payload Collections

### Jobs Collection

Fields: `slug`, `title` (i18n), `department` (i18n), `location` (i18n), `employment_type` (i18n), `salbage_range` (i18n), `skills`, `description` (i18n), `requirements` (i18n), `benefits` (i18n), `status`, `published_at`, `image`

### Articles Collection

Fields: `slug`, `title` (i18n), `excerpt` (i18n), `body` (i18n), `cover_image` (media), `content_images` (media[]), `category`, `tags`, `status`, `author` (i18n), `published_at`

### Applications Collection

Fields: `job_id`, `full_name`, `email`, `phone`, `portfolio_url`, `message`, `status`

Note: CV files are handled via file upload in the applications API route. Payload media collection is used for storage.

### Media Collection

Built-in Payload media collection. Configure allowed MIME types for CV uploads.

### Site Settings Collection

Singleton collection with: `companyName`, `slogan` (i18n), `founded`, `representative`, `headcount`, `contactEmail`, `contactPhone`, `socialLinks`, `offices`

### About Pages Collection

Localized pages with: `heroTitle` (i18n), `heroSubtitle` (i18n), `heroImage`, `visionTitle`, `visionContent` (i18n), `missionTitle`, `missionContent` (i18n), `valuesTitle`, `values[]`, `teamTitle`, `teamMembers[]`, `stats[]`

## Localization (i18n)

Payload supports locale-based fields. For the Fabbi site, configure `vi` (Vietnamese) and `ja` (Japanese) as supported locales. All i18n fields should be typed as `{ vi: string; ja: string }`.

## API Access

Payload generates a REST and GraphQL API automatically. Generate an API token in the Payload admin UI and use it for authenticated requests:

```typescript
const client = await getPayloadClient({
  secret: process.env.PAYLOAD_SECRET,
})
const { docs } = await client.find({
  collection: 'jobs',
  where: { status: { equals: 'published' } },
})
```