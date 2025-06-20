
/**
 * Utility to detect if we're running in Lovable dev mode vs production
 */
export const isDevMode = (): boolean => {
  // Check if we're in Lovable's development environment
  const hostname = window.location.hostname;
  
  // Lovable dev mode indicators
  const isLovableDev = hostname.includes('lovable.app') || 
                      hostname.includes('localhost') || 
                      hostname === '127.0.0.1' ||
                      hostname.includes('gitpod.io') ||
                      hostname.includes('stackblitz.com');
  
  // Production domain
  const isProduction = hostname === 'barskydesign.pro' || 
                      hostname.includes('barskydesign.pro');
  
  // Default to dev mode if not explicitly production
  return !isProduction;
};

export const shouldShowEditingControls = (): boolean => {
  return isDevMode();
};
