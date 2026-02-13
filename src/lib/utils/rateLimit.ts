/**
 * Simple in-memory rate limiter for API routes
 *
 * Uses a Map to track requests per identifier (usually IP) with a sliding window.
 * Entries are automatically cleaned up on each check to prevent memory leaks.
 *
 * NOTE: This is in-memory only — state resets on server restart and does NOT
 * persist across serverless function instances. For production at scale,
 * consider Redis, Vercel KV, or Upstash.
 */

interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitEntry>();

// Sliding window duration in milliseconds (60 seconds)
const WINDOW_MS = 60 * 1000;

/**
 * Check if a request from the given identifier is allowed.
 *
 * @param identifier - Unique identifier for the requester (IP address, user ID, etc.)
 * @param limit - Maximum number of requests allowed per window (default: 5)
 * @returns Object with `allowed` boolean and `remaining` request count
 *
 * @example
 * const { allowed, remaining } = checkRateLimit(request.ip || "anonymous", 5);
 * if (!allowed) {
 *   return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 * }
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const windowStart = now - WINDOW_MS;

  // Clean up expired entries from all tracked identifiers
  for (const [key, entry] of rateLimitMap.entries()) {
    entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart);
    if (entry.timestamps.length === 0) {
      rateLimitMap.delete(key);
    }
  }

  // Get or create entry for this identifier
  const entry = rateLimitMap.get(identifier) || { timestamps: [] };

  // Filter to only timestamps within the current window
  entry.timestamps = entry.timestamps.filter((ts) => ts > windowStart);

  const requestCount = entry.timestamps.length;

  if (requestCount >= limit) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  // Record this request
  entry.timestamps.push(now);
  rateLimitMap.set(identifier, entry);

  return {
    allowed: true,
    remaining: limit - requestCount - 1,
  };
}
