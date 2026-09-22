/**
 * Security monitoring and logging utilities
 */

interface SecurityEvent {
  type: 'role_change' | 'admin_access' | 'suspicious_activity';
  userId?: string;
  details: Record<string, any>;
  timestamp: Date;
}

class SecurityMonitor {
  private events: SecurityEvent[] = [];
  private maxEvents = 1000;

  /**
   * Log a security-related event
   */
  logEvent(event: Omit<SecurityEvent, 'timestamp'>) {
    const securityEvent: SecurityEvent = {
      ...event,
      timestamp: new Date()
    };

    this.events.push(securityEvent);
    
    // Keep only the most recent events
    if (this.events.length > this.maxEvents) {
      this.events = this.events.slice(-this.maxEvents);
    }

    // Log critical events to console
    if (event.type === 'role_change' || event.type === 'suspicious_activity') {
      console.warn('🔐 Security Event:', securityEvent);
    }
  }

  /**
   * Log role changes for audit trail
   */
  logRoleChange(userId: string, oldRole: string, newRole: string, adminUserId: string) {
    this.logEvent({
      type: 'role_change',
      userId: adminUserId,
      details: {
        targetUserId: userId,
        oldRole,
        newRole,
        action: 'role_change'
      }
    });
  }

  /**
   * Log admin access attempts
   */
  logAdminAccess(userId: string, resource: string, success: boolean) {
    this.logEvent({
      type: 'admin_access',
      userId,
      details: {
        resource,
        success,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
      }
    });
  }

  /**
   * Get recent security events
   */
  getEvents(limit = 50): SecurityEvent[] {
    return this.events.slice(-limit);
  }

  /**
   * Clear all events
   */
  clearEvents() {
    this.events = [];
  }
}

export const securityMonitor = new SecurityMonitor();

/**
 * Rate limiting utility for forms
 */
class RateLimiter {
  private attempts = new Map<string, number[]>();
  private maxAttempts = 5;
  private windowMs = 15 * 60 * 1000; // 15 minutes

  /**
   * Check if action is rate limited
   */
  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return true;
    }

    // Record this attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    
    return false;
  }

  /**
   * Get remaining attempts
   */
  getRemainingAttempts(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    const now = Date.now();
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    return Math.max(0, this.maxAttempts - recentAttempts.length);
  }
}

export const rateLimiter = new RateLimiter();
