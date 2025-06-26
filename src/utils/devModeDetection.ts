
export const shouldShowEditingControls = (): boolean => {
  // Only show editing controls in development environment
  return import.meta.env.DEV;
};

export const isDevMode = (): boolean => {
  return import.meta.env.DEV;
};

export const isDevelopment = (): boolean => {
  return import.meta.env.DEV;
};
