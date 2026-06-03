/**
 * DWEX Rate Limiter — In-memory rate limiting for API routes
 * Protects against brute force attacks on auth endpoints
 */

interface RateLimitEntry {
  count: number
  resetTime: number
}

// In-memory store (resets on server restart — acceptable for rate limiting)
const store = new Map<string, RateLimitEntry>()

// Cleanup old entries every 10 minutes
if (typeof globalThis !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store.entries()) {
      if (now > entry.resetTime) {
        store.delete(key)
      }
    }
  }, 10 * 60 * 1000)
}

export interface RateLimitConfig {
  /** Maximum number of requests allowed in the window */
  maxRequests: number
  /** Time window in milliseconds */
  windowMs: number
}

// Preset configurations
export const RATE_LIMITS = {
  /** Login: 5 attempts per 15 minutes per IP */
  login: { maxRequests: 5, windowMs: 15 * 60 * 1000 },
  /** Signup: 3 attempts per hour per IP */
  signup: { maxRequests: 3, windowMs: 60 * 60 * 1000 },
  /** Password reset: 3 attempts per hour per IP */
  passwordReset: { maxRequests: 3, windowMs: 60 * 60 * 1000 },
  /** General API: 100 requests per minute per IP */
  general: { maxRequests: 100, windowMs: 60 * 1000 },
  /** Admin API: 30 requests per minute per IP */
  admin: { maxRequests: 30, windowMs: 60 * 1000 },
} as const

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number
  retryAfterMs: number
}

/**
 * Check if a request should be rate limited
 * @param key - Unique identifier (typically IP address or user ID)
 * @param config - Rate limit configuration
 * @returns Rate limit result with remaining requests and reset time
 */
export function checkRateLimit(key: string, config: RateLimitConfig): RateLimitResult {
  const now = Date.now()
  const entry = store.get(key)

  // No existing entry or window has expired — start fresh
  if (!entry || now > entry.resetTime) {
    store.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    })
    return {
      allowed: true,
      remaining: config.maxRequests - 1,
      resetTime: now + config.windowMs,
      retryAfterMs: 0,
    }
  }

  // Within the window — check count
  if (entry.count >= config.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: entry.resetTime,
      retryAfterMs: entry.resetTime - now,
    }
  }

  // Increment count
  entry.count++
  return {
    allowed: true,
    remaining: config.maxRequests - entry.count,
    resetTime: entry.resetTime,
    retryAfterMs: 0,
  }
}

/**
 * Extract client IP from request headers
 * Works with Vercel, Cloudflare, and standard proxies
 */
export function getClientIp(request: Request): string {
  // Check various headers that might contain the real IP
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIp = request.headers.get('x-real-ip')
  if (realIp) {
    return realIp.trim()
  }

  const cfIp = request.headers.get('cf-connecting-ip')
  if (cfIp) {
    return cfIp.trim()
  }

  // Fallback — use a generic key
  return 'unknown'
}

/**
 * Apply rate limiting to an API route handler
 * Returns an error response if rate limited, null otherwise
 */
export function applyRateLimit(
  request: Request,
  config: RateLimitConfig = RATE_LIMITS.general
): { limited: false } | { limited: true; retryAfterMs: number; remaining: number } {
  const ip = getClientIp(request)
  const result = checkRateLimit(`ip:${ip}`, config)

  if (!result.allowed) {
    return {
      limited: true,
      retryAfterMs: result.retryAfterMs,
      remaining: result.remaining,
    }
  }

  return { limited: false }
}
