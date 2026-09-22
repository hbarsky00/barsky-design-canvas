import { rateLimiter } from '@/utils/securityMonitor';

/**
 * Enhanced form validation with rate limiting
 */
export const validateFormSubmission = (identifier: string, data: any): { isValid: boolean; error?: string } => {
  // Check rate limiting
  if (rateLimiter.isRateLimited(identifier)) {
    const remaining = rateLimiter.getRemainingAttempts(identifier);
    return {
      isValid: false,
      error: `Too many attempts. Please try again later. (${remaining} attempts remaining)`
    };
  }

  // Basic validation
  if (!data.email || !data.name) {
    return {
      isValid: false,
      error: 'Email and name are required'
    };
  }

  // Email validation
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(data.email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  return { isValid: true };
};

/**
 * Generate secure form identifier for rate limiting
 */
export const getFormIdentifier = (type: string, ip?: string): string => {
  // In a real app, you'd use the actual IP address
  // For now, use a combination of form type and timestamp
  return `${type}_${Date.now()}`;
};