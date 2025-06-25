export const shouldShowEditingControls = (): boolean => {
  // Enable editing controls for caption editing functionality
  return true;
};

export const isDevMode = (): boolean => {
  // Keep dev mode detection for other purposes but enable editing
  return true;
};

export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};
