/**
 * Simple in-memory rate limiter using sliding window.
 * For production, use Redis or similar distributed store.
 */

interface RateLimitEntry {
  timestamps: number[]
}

const store = new Map<string, RateLimitEntry>()

export interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

function getClientIP(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || request.headers.get('x-real-ip') || '127.0.0.1'
}

export function getRateLimitKey(ip: string, endpoint: string): string {
  return `${ip}:${endpoint}`
}

export function checkRateLimit(
  key: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetMs: number } {
  const now = Date.now()
  const windowStart = now - config.windowMs

  let entry = store.get(key)

  if (!entry) {
    entry = { timestamps: [] }
    store.set(key, entry)
  }

  // Remove timestamps outside the window
  entry.timestamps = entry.timestamps.filter(t => t > windowStart)

  const count = entry.timestamps.length

  if (count >= config.maxRequests) {
    const oldest = Math.min(...entry.timestamps)
    return {
      allowed: false,
      remaining: 0,
      resetMs: oldest + config.windowMs - now,
    }
  }

  return {
    allowed: true,
    remaining: config.maxRequests - count - 1,
    resetMs: config.windowMs,
  }
}

export function recordRequest(key: string): void {
  let entry = store.get(key)
  if (!entry) {
    entry = { timestamps: [] }
    store.set(key, entry)
  }
  entry.timestamps.push(Date.now())

  // Cleanup old entries periodically (every 100 requests)
  if (Math.random() < 0.01) {
    cleanupStore()
  }
}

function cleanupStore(): void {
  const now = Date.now()
  const maxAge = 60000 // 1 minute max age
  for (const [key, entry] of store.entries()) {
    const cutoff = now - maxAge
    entry.timestamps = entry.timestamps.filter(t => t > cutoff)
    if (entry.timestamps.length === 0) {
      store.delete(key)
    }
  }
}

export function rateLimitResponse(
  request: Request,
  endpoint: string,
  config: RateLimitConfig
): Response | null {
  const ip = getClientIP(request)
  const key = getRateLimitKey(ip, endpoint)
  const result = checkRateLimit(key, config)

  if (!result.allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please try again later.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': Math.ceil(result.resetMs / 1000).toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': Math.ceil((Date.now() + result.resetMs) / 1000).toString(),
        },
      }
    )
  }

  return null
}

export function withRateLimit(
  request: Request,
  endpoint: string,
  config: RateLimitConfig
): { allowed: boolean; remaining: number; resetMs: number } {
  const ip = getClientIP(request)
  const key = getRateLimitKey(ip, endpoint)
  const result = checkRateLimit(key, config)

  if (result.allowed) {
    recordRequest(key)
  }

  return result
}

// Preset configurations
export const RATE_LIMITS = {
  applications: { maxRequests: 10, windowMs: 60000 },   // 10 req/min
  signin: { maxRequests: 5, windowMs: 60000 },          // 5 attempts/min
} as const