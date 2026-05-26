# Payload CMS Setup Guide

## Overview

Payload CMS is a headless CMS embedded directly inside the Next.js application, storing data in PostgreSQL. It provides a fully customizable admin UI at `/admin` — replacing any previous custom CMS management screens.

## Prerequisites

- Node.js 18+
- PostgreSQL running on port `5432` (or `DATABASE_URL` pointing to any Postgres instance)
- `pnpm` package manager

## Environment Variables

Add these to `.env.local`:

```env
# Payload CMS (required)
PAYLOAD_SECRET=your-secret-at-least-32-characters
PAYLOAD_URL=http://localhost:3000

# PostgreSQL — Payload storage backend
# Local dev default: postgres://user:password@localhost:5432/dbname
DATABASE_URL=postgres://user:password@localhost:5432/dbname

# Data source mode (default: Payload CMS mode)
# Leave unset or set to 'false' for Payload mode
# Set to 'true' for mock-data-only mode (tests/emergency only)
# USE_MOCK_DATA=false

# Payload collections (defaults — only override if renamed)
PAYLOAD_COLLECTION_JOBS=jobs
PAYLOAD_COLLECTION_ARTICLES=articles
PAYLOAD_COLLECTION_APPLICATIONS=applications
PAYLOAD_COLLECTION_MEDIA=media
PAYLOAD_COLLECTION_SITE_SETTINGS=site-settings
PAYLOAD_COLLECTION_ABOUT_PAGES=about-pages
```

Generate a secret:

```bash
# macOS/Linux
openssl rand -base64 32

# Windows PowerShell
[Convert]::ToBase64String((1..32 | ForEach-Object { [byte](Get-Random -Max 256) }))
```

## Installation

```bash
pnpm add payload
```

Payload v3 is already included as a project dependency.

## Data Source Mode

The application uses a 3-mode strategy:

| `USE_MOCK_DATA` | `PAYLOAD_SECRET` | `DATABASE_URL` | Mode | Description |
|---|---|---|---|---|
| `true` | — | — | mock | Mock data only, no external deps |
| `false` / unset | set | any | payload | Payload CMS + Postgres |
| `false` / unset | not set | set | postgres | Direct Postgres (no Payload UI) |

**Dev default is Payload mode** (requires `PAYLOAD_SECRET` + `DATABASE_URL`).

## Quick Start (Dev)

```bash
# 1. Ensure PostgreSQL is running on port 5432
#    Example: docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=dbname postgres:16

# 2. Create .env.local from .env.example
cp .env.example .env.local
# Fill in PAYLOAD_SECRET and DATABASE_URL

# 3. Start dev server
pnpm dev

# 4. Open Payload admin UI
open http://localhost:3000/admin

# 5. Create your first admin user when prompted

# 6. Create content — jobs, articles, settings, etc.
```

## Payload Admin UI

- **URL**: `http://localhost:3000/admin`
- **Access**: Authenticated via Payload's own user system (separate from the app's admin auth)
- **Collections**: Jobs, Articles, Applications, Media, Site Settings, About Pages

## PostgreSQL Setup (Local Dev)

### Option A: Docker

```bash
docker run -d \
  --name postgres_payload \
  -p 5432:5432 \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=dbname \
  postgres:16-alpine
```

### Option B: Existing Postgres

Use your existing Supabase or managed Postgres. Get the connection string from your provider's dashboard.

### Verify Connection

```bash
psql $DATABASE_URL -c "SELECT version();"
```

## Payload Collections

### Jobs Collection

Fields: `slug`, `title` (i18n), `department` (i18n), `location` (i18n), `employment_type` (i18n), `salary_range` (i18n), `skills`, `description` (i18n), `requirements` (i18n), `benefits` (i18n), `status`, `published_at`, `image`

### Articles Collection

Fields: `slug`, `title` (i18n), `excerpt` (i18n), `body` (i18n), `cover_image` (media), `content_images` (media[]), `category`, `tags`, `status`, `author` (i18n), `published_at`

### Applications Collection

Fields: `job_id`, `full_name`, `email`, `phone`, `portfolio_url`, `message`, `status`

CV files handled via file upload in the applications API route. Payload media collection for storage.

### Media Collection

Built-in Payload media collection. Configure allowed MIME types for CV uploads.

### Site Settings Collection

Singleton: `companyName`, `slogan` (i18n), `founded`, `representative`, `headcount`, `contactEmail`, `contactPhone`, `socialLinks`, `offices`

### About Pages Collection

Localized pages: `heroTitle` (i18n), `heroSubtitle` (i18n), `heroImage`, `visionTitle`, `visionContent` (i18n), `missionTitle`, `missionContent` (i18n), `valuesTitle`, `values[]`, `teamTitle`, `teamMembers[]`, `stats[]`

## Localization (i18n)

Configure `vi` (Vietnamese) and `ja` (Japanese) as supported locales. All i18n fields typed as `{ vi: string; ja: string }`.

## API Access

```typescript
import { initPayloadClient } from '@/lib/payload/client'

const payload = await initPayloadClient()
const { docs } = await payload.find({
  collection: 'jobs',
  where: { status: { equals: 'published' } },
})
```

## Mock Data Mode (Tests / Emergency)

For local development without Payload/Postgres:

```env
USE_MOCK_DATA=true
```

No `PAYLOAD_SECRET` or `DATABASE_URL` required. App uses local mock data.

## Troubleshooting

### "PAYLOAD_SECRET is not configured"
Set `PAYLOAD_SECRET` in `.env.local`. See section above for generation.

### "No valid configuration found"
Non-test environments require either `PAYLOAD_SECRET` (Payload mode) or `DATABASE_URL` (direct Postgres mode). Set `USE_MOCK_DATA=true` for mock-only mode.

### Database connection failed
Verify PostgreSQL is running on the port in `DATABASE_URL`. Test with `psql $DATABASE_URL -c "SELECT 1"`.

### Payload admin not loading
Check that Payload routes are mounted in the Next.js app. See `lib/payload/` for the embedded Payload configuration.