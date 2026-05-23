# Phase 05 — Rate Limiting Documentation

## DET-EDGE-002: Rate Limiting

**Requirement:** Rate limiting is an infrastructure-level requirement — document the current state and recommended approach.

## Current State

The application API (`POST /api/applications`) has:
- Client-side + server-side validation for required fields, email, MIME type, file size
- Error handling with visible 500/503 feedback on failure
- No application-level rate limiting

No rate limiting layer exists.

## Recommended Implementation

Rate limiting should be implemented at the infrastructure level, not in application code.

| Endpoint | Limit | Purpose |
|---|---|---|
| `POST /api/applications` | 10 req/min per IP | Anti-spam |
| `POST /api/auth/signin` | 5 attempts/min per IP | Anti-brute-force |

## Implementation Options

### Option 1: Vercel Edge Middleware (recommended for Vercel deployments)
```
// middleware.ts
// Rate limit via Vercel's built-in rate limiting or KV store
```

### Option 2: Upstash Redis
Distributed rate limiting with per-IP tracking.

### Option 3: Cloudflare Rate Limiting Rules
Edge-level rate limiting with no application code changes.

## Out of Scope

Do NOT implement application-level rate limiting in API routes. This is an infrastructure concern. Document for deployment.