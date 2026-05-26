# Schema Mapping: Legacy DB → Strapi

This document maps legacy database types to Strapi content types for the migration.

## 1. Jobs

| Legacy Field | Strapi Field | Notes |
|---|---|---|
| `id` | `documentId` | Strapi uses `documentId` instead of UUID |
| `title` | `title` | Direct map |
| `slug` | `slug` | UID type, auto-generated |
| `description` | `description` | Legacy is plain text, Strapi is richtext |
| `requirements` | `requirements` | Legacy plain text → Strapi richtext |
| `benefits` | `benefits` | Legacy plain text → Strapi richtext |
| `salary_min` | `salaryRange` | Combine min/max into range string |
| `salary_max` | `salaryRange` | e.g., "10M - 20M VND" |
| `location` | `location` | Direct map |
| `employment_type` | `employmentType` | Snake → camelCase |
| `skills` | `skills` | JSON array → Strapi JSON list |
| `status` | `status` | Same enumeration values |
| `published_at` | `publishedAt` | Legacy `published_at` → Strapi `publishedAt` |
| `department` | `category` | Map department to category |
| `closed_at` | `expiresAt` | Semantic rename |
| `image` | (media) | Will use Strapi media upload |

## 2. News Articles

| Legacy Field | Strapi Field | Notes |
|---|---|---|
| `id` | `documentId` | Strapi uses `documentId` |
| `title` | `title` | Direct map |
| `slug` | `slug` | UID type |
| `content` | `body` | Legacy plain text → Strapi richtext |
| `excerpt` | `excerpt` | Direct map |
| `thumbnail_url` | `coverImage` | Map to Strapi media |
| `content_images` | (embedded in body) | Extract from rich text or JSON |
| `author_name` | `author` | Merge into single author field |
| `author_role` | (dropped) | Not in Strapi schema |
| `tags` | `tags` | JSON array → Strapi list |
| `status` | `status` | Same enumeration |
| `views` | (local field) | Track separately, not in Strapi |
| `published_at` | `publishedAt` | Map field name |

## 3. Applications

| Legacy Field | Strapi Field | Notes |
|---|---|---|
| `id` | `documentId` | |
| `job_id` | `job` | Relation to Job content type |
| `full_name` | `candidateName` | Direct map |
| `email` | `candidateEmail` | Direct map |
| `phone` | `candidatePhone` | Direct map |
| `portfolio_url` | `message` | Combine into message |
| `message` | `message` | Append to message |
| `cv_filename` | `cvFile` | Map to Strapi media |
| `cv_path` | `cvFile` | Media storage in Strapi |
| `cv_mime_type` | (metadata) | Handled by Strapi |
| `cv_size` | (metadata) | Handled by Strapi |
| `status` | `status` | Different enumeration, map values |
| `created_at` | `createdAt` | Auto-managed by Strapi |

## 4. Site Settings

| Legacy Field | Strapi Field | Notes |
|---|---|---|
| `key` | `siteTitle`, `contactEmail` | Flatten to specific fields |
| `value` | (mapped) | Depends on key |
| `type` | (typed fields) | Use Strapi typed fields instead |

## 5. About Page

| Legacy Field | Strapi Field | Notes |
|---|---|---|
| `locale` | `locale` | Direct map |
| `hero_title` | `title` | Map to top-level title |
| `hero_subtitle` | `intro` | Map to intro |
| `mission_content` | `activity` | Map to activity richtext |
| `values` | `stats` | JSON → Strapi JSON |
| `team_members` | (custom component) | Create TeamMember component |
| `stats` | `stats` | JSON array |

## Migration Notes

1. **Locale Handling**: Strapi i18n plugin handles locale per content type
2. **Media Files**: Upload existing images to Strapi media library
3. **Status Mapping**:
   - Application status: `pending` → `pending`, `reviewing` → `reviewed`
4. **Rich Text**: Convert plain text to Markdown or HTML for Strapi richtext
5. **Relations**: Applications link to Jobs via Strapi relation type