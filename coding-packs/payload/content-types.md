# Payload CMS Content Types

## Collections Overview

| Collection | Slug | Purpose | Singleton |
|---|---|---|---|
| Jobs | `jobs` | Job postings | No |
| Articles | `articles` | News/blog articles | No |
| Applications | `applications` | Job applications | No |
| Media | `media` | File uploads (images, CVs) | No |
| Site Settings | `site-settings` | Global settings | Yes |
| About Pages | `about-pages` | About page content | No |

## Jobs Collection

```typescript
{
  slug: string;          // URL slug (unique)
  title: { vi: string; ja: string };           // Job title
  department: { vi: string; ja: string };    // Department name
  location: { vi: string; ja: string };       // Job location
  employment_type: { vi: string; ja: string }; // e.g. "Toàn thời gian"
  salary_range: { vi: string; ja: string };   // e.g. "35.000.000 - 55.000.000 VND"
  skills: string[];                            // Required skills
  description: { vi: string; ja: string };    // Job description (markdown)
  requirements: { vi: string; ja: string };   // Requirements (markdown)
  benefits: { vi: string; ja: string };       // Benefits (markdown)
  status: 'draft' | 'review' | 'published' | 'closed' | 'archived';
  published_at: string;                       // ISO date
  image?: { url: string };                     // Featured image (media)
}
```

## Articles Collection

```typescript
{
  slug: string;                  // URL slug
  title: { vi: string; ja: string };
  excerpt: { vi: string; ja: string };        // Short summary
  body: { vi: string; ja: string };            // Article content (markdown)
  cover_image?: { url: string };               // Featured image
  content_images?: Array<{ url: string }>;      // Inline images
  category: string;                             // e.g. "giai_thuong", "nguoi_fabbi"
  tags: string[];
  status: 'draft' | 'published';
  author: { vi: string; ja: string };          // Author name
  published_at: string;                         // ISO date
}
```

## Applications Collection

```typescript
{
  job_id: string;
  full_name: string;
  email: string;
  phone: string;
  portfolio_url?: string;
  message?: string;
  status: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
}
```

Note: CV file uploads are handled via the `/api/applications` route's multipart form handling. The CV file is stored locally or via Payload media collection. CV file metadata (path, filename, size, MIME type) is stored in the application record.

## Media Collection

Uses Payload's built-in media collection. Configure in Payload config:

```typescript
{
  slug: 'media',
  upload: {
    limits: {
      maxFileSize: 10_000_000,  // 10MB
      maxImageWidth: 4096,
      maxImageHeight: 4096,
    },
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300 },
      { name: 'og', width: 1200, height: 630 },
    ],
    adminThumbnail: 'thumbnail',
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
}
```

Allowed MIME types for CV uploads (enforced in `/api/applications` route):
- `application/pdf`
- `application/msword`
- `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

## Site Settings Collection (Singleton)

```typescript
{
  companyName: { vi: string; ja: string };
  slogan: { vi: string; ja: string };
  founded: string;                        // ISO date "YYYY-MM-DD"
  representative: {
    name: { vi: string; ja: string };
    title: { vi: string; ja: string };
  };
  headcount: string;                      // e.g. "300+"
  contactEmail: string;
  contactPhone: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    tiktok: string;
  };
  offices: Array<{
    name: { vi: string; ja: string };
    address: { vi: string; ja: string };
    phone: string;
  }>;
}
```

## About Pages Collection

```typescript
{
  locale: string;                         // "vi" or "ja"
  heroTitle: { vi: string; ja: string };
  heroSubtitle: { vi: string; ja: string };
  heroImage?: { url: string };
  visionTitle: string;
  visionContent: { vi: string; ja: string };
  missionTitle: string;
  missionContent: { vi: string; ja: string };
  valuesTitle: string;
  values: Array<{
    key: string;
    title: { vi: string; ja: string };
    description: { vi: string; ja: string };
  }>;
  teamTitle: string;
  teamMembers: Array<{
    name: { vi: string; ja: string };
    role: { vi: string; ja: string };
    imageUrl?: { url: string };
  }>;
  stats: Array<{
    value: string;
    label: { vi: string; ja: string };
  }>;
}
```

## Access Control

All collections except `media` should have authenticated access (API-only). The `media` collection may be publicly readable for cover images.

Payload access control example:

```typescript
access: {
  read: () => true,         // Public read for published content
  create: isAdmin,          // Only admins
  update: isAdmin,
  delete: isAdmin,
},
```