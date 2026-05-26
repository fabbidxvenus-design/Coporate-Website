# Payload CMS API Permissions

## API Token Setup

1. Log in to Payload Admin UI (typically at `/admin`)
2. Go to **Settings → API Tokens**
3. Create a new token with appropriate permissions
4. Copy the token — it won't be shown again

## Token Types

### Full Access Token (Development)
- Read/Write on all collections
- Use for initial setup and development
- **Never** use in production

### Restricted Token (Production)

Create separate tokens with minimal permissions:

```typescript
// Payload config — generate tokens with scoped access
const config = buildConfig({
  collections: {
    jobs: {
      // Read-only for public API
      access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
    },
    articles: {
      access: {
        read: () => true,
        create: isAdmin,
        update: isAdmin,
        delete: isAdmin,
      },
    },
    applications: {
      // Public create (job seekers apply), admin read
      access: {
        read: isAdmin,
        create: () => true,
        update: isAdmin,
        delete: isAdmin,
      },
    },
  },
})
```

## Environment Variables

```env
# API token for Payload admin operations (CI/CD, webhooks)
PAYLOAD_ADMIN_TOKEN=your-admin-token

# Revalidation webhook secret
PAYLOAD_REVALIDATE_SECRET=your-revalidate-secret
```

## Production Checklist

- [ ] `PAYLOAD_SECRET` set to a random 32+ character string
- [ ] Admin token stored in secrets manager (not in repo)
- [ ] CORS configured to allow only your Next.js domain
- [ ] Rate limiting enabled on all public endpoints
- [ ] Admin UI access restricted to specific IP range (optional)
- [ ] Database connection uses SSL (`?ssl=true` in `DATABASE_URL`)
- [ ] Payload admin URL protected behind authentication
- [ ] API tokens rotated quarterly

## Webhook Security

Payload supports webhooks for cache revalidation. Secure webhook endpoints:

```typescript
export async function POST(request: Request) {
  const secret = request.headers.get('x-payload-secret')
  if (secret !== process.env.PAYLOAD_REVALIDATE_SECRET) {
    return new Response('Unauthorized', { status: 401 })
  }

  const body = await request.json()
  // Revalidate Next.js cache based on collection + operation
  revalidatePath(`/${body.collection}/${body.slug}`)
  return new Response('OK')
}
```

## Minimum Viable Security Config (Production)

```typescript
export default buildConfig({
  secret: process.env.PAYLOAD_SECRET,
  cors: ['https://your-domain.com'],
  csrf: {
    origin: ['https://your-domain.com'],
  },
  rateLimit: {
    window: 60 * 1000,  // 1 minute
    max: 100,          // requests per window
  },
})
```