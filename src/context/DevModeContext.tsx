
import React, { createContext, useContext, useState, useEffect } from 'react';

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
  isLovableEnvironment: boolean;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if we're in Lovable environment (staging domain) vs published site
  const isLovableEnvironment = window.location.hostname.includes('lovable.app') || 
                               window.location.hostname === 'localhost' ||
                               window.location.hostname.includes('127.0.0.1') ||
                               window.location.port === '5173'; // Vite dev server

  const [isDevMode, setIsDevMode] = useState(() => {
    // Only allow dev mode in Lovable environment
    if (!isLovableEnvironment) {
      return false;
    }
    // Initialize from localStorage only in Lovable environment
    const saved = localStorage.getItem('devMode');
    return saved === 'true';
  });

  const toggleDevMode = () => {
    // Only allow toggling in Lovable environment
    if (!isLovableEnvironment) {
      console.log('Dev mode is only available in Lovable environment');
      return;
    }

    setIsDevMode(prev => {
      const newValue = !prev;
      localStorage.setItem('devMode', newValue.toString());
      console.log('Dev mode toggled to:', newValue);
      return newValue;
    });
  };

  // Save to localStorage whenever it changes (only in Lovable environment)
  useEffect(() => {
    if (isLovableEnvironment) {
      localStorage.setItem('devMode', isDevMode.toString());
      console.log('Dev mode state:', isDevMode, 'Environment:', isLovableEnvironment ? 'Lovable' : 'Published');
    }
  }, [isDevMode, isLovableEnvironment]);

  // Force dev mode off if not in Lovable environment
  useEffect(() => {
    if (!isLovableEnvironment && isDevMode) {
      setIsDevMode(false);
    }
  }, [isLovableEnvironment, isDevMode]);

  return (
    <DevModeContext.Provider value={{ isDevMode, toggleDevMode, isLovableEnvironment }}>
      {children}
    </DevModeContext.Provider>
  );
};

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    throw new Error('useDevMode must be used within a DevModeProvider');
  }
  return context;
};
