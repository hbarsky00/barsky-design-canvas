
export const shouldShowEditingControls = (): boolean => {
  // Only show editing controls in Lovable development environment
  // Check for both dev mode and Lovable-specific indicators
  return (
    import.meta.env.DEV && 
    (
      window.location.hostname === 'localhost' ||
      window.location.hostname.includes('lovable') ||
      window.location.hostname.includes('127.0.0.1') ||
      window.location.port !== ''
    )
  );
};

export const isDevMode = (): boolean => {
  return import.meta.env.DEV;
};

export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};
