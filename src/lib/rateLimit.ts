/**
 * Simple, zero-dependency in-memory sliding window rate limiter
 * optimized for serverless deployments.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const cache = new Map<string, RateLimitRecord>();

// Cleanup interval to prevent memory leaks in long-running processes
let lastCleanup = Date.now();
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

function cleanupCache(now: number, windowMs: number) {
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  const threshold = now - windowMs;
  for (const [ip, record] of cache.entries()) {
    const active = record.timestamps.filter((t) => t > threshold);
    if (active.length === 0) {
      cache.delete(ip);
    } else {
      record.timestamps = active;
    }
  }
}

export interface RateLimitOptions {
  limit: number;      // Maximum requests allowed within the window
  windowMs: number;   // Window size in milliseconds
}

export function isRateLimited(
  ip: string,
  options: RateLimitOptions
): { limited: boolean; remaining: number; resetMs: number } {
  const now = Date.now();
  
  // Cleanup old records periodically
  cleanupCache(now, options.windowMs);

  let record = cache.get(ip);
  if (!record) {
    record = { timestamps: [] };
    cache.set(ip, record);
  }

  // Filter timestamps within the sliding window
  const windowStart = now - options.windowMs;
  record.timestamps = record.timestamps.filter((t) => t > windowStart);

  if (record.timestamps.length >= options.limit) {
    const oldest = record.timestamps[0];
    const resetMs = oldest + options.windowMs - now;
    return {
      limited: true,
      remaining: 0,
      resetMs: Math.max(0, resetMs),
    };
  }

  record.timestamps.push(now);
  return {
    limited: false,
    remaining: options.limit - record.timestamps.length,
    resetMs: options.windowMs,
  };
}
