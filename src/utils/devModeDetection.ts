
export const shouldShowEditingControls = (): boolean => {
  // Never show editing controls on production domain
  if (typeof window !== 'undefined' && window.location.hostname === 'barskydesign.pro') {
    return false;
  }
  
  // Only show editing controls in Lovable development environment
  // Check for both dev mode and specific development indicators
  return (
    import.meta.env.DEV && 
    (
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1' ||
      window.location.hostname.includes('lovable') ||
      window.location.hostname.includes('gitpod') ||
      window.location.hostname.includes('codespaces')
    )
  );
};

export const isDevMode = (): boolean => {
  return import.meta.env.DEV;
};

export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};
