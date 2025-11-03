/**
 * Server-side rate limiter for edge functions
 * Prevents abuse by limiting requests per IP address
 */

interface RateLimitStore {
  [key: string]: {
    attempts: number[];
    blocked: boolean;
    blockedUntil?: number;
  };
}

const store: RateLimitStore = {};
const MAX_ATTEMPTS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const BLOCK_DURATION_MS = 60 * 60 * 1000; // Block for 1 hour after threshold

export class RateLimiter {
  /**
   * Check if a client is rate limited
   * @param identifier - Unique identifier (IP address, email, etc.)
   * @returns true if allowed, false if rate limited
   */
  static checkLimit(identifier: string): boolean {
    const now = Date.now();
    
    if (!identifier) {
      // If we can't identify the client, allow but log
      console.warn('Rate limiter: No identifier provided');
      return true;
    }

    // Initialize if first request
    if (!store[identifier]) {
      store[identifier] = {
        attempts: [],
        blocked: false
      };
    }

    const client = store[identifier];

    // Check if currently blocked
    if (client.blocked && client.blockedUntil) {
      if (now < client.blockedUntil) {
        console.log(`Rate limit: Client ${identifier} is blocked until ${new Date(client.blockedUntil).toISOString()}`);
        return false;
      } else {
        // Unblock and reset
        client.blocked = false;
        client.blockedUntil = undefined;
        client.attempts = [];
      }
    }

    // Remove old attempts outside the window
    client.attempts = client.attempts.filter(time => now - time < WINDOW_MS);

    // Check if over limit
    if (client.attempts.length >= MAX_ATTEMPTS) {
      client.blocked = true;
      client.blockedUntil = now + BLOCK_DURATION_MS;
      console.warn(`Rate limit exceeded for ${identifier}: ${client.attempts.length} attempts in ${WINDOW_MS}ms`);
      return false;
    }

    // Record this attempt
    client.attempts.push(now);

    return true;
  }

  /**
   * Get remaining attempts for a client
   */
  static getRemainingAttempts(identifier: string): number {
    if (!identifier || !store[identifier]) {
      return MAX_ATTEMPTS;
    }

    const now = Date.now();
    const client = store[identifier];
    const recentAttempts = client.attempts.filter(time => now - time < WINDOW_MS);

    return Math.max(0, MAX_ATTEMPTS - recentAttempts.length);
  }

  /**
   * Clean up old entries to prevent memory leaks
   */
  static cleanup(): void {
    const now = Date.now();
    const keys = Object.keys(store);
    
    for (const key of keys) {
      const client = store[key];
      client.attempts = client.attempts.filter(time => now - time < WINDOW_MS);
      
      // Remove if no recent attempts and not blocked
      if (client.attempts.length === 0 && !client.blocked) {
        delete store[key];
      }
    }
  }
}

// Clean up every 10 minutes
setInterval(() => RateLimiter.cleanup(), 10 * 60 * 1000);
