export const shouldShowEditingControls = (): boolean => {
  // Completely disable editing controls across all projects
  return false;
};

export const isDevMode = (): boolean => {
  // Keep dev mode detection for other purposes but disable editing
  return false;
};

export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};
