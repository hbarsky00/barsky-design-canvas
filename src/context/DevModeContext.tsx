
import React, { createContext, useContext, useState, useEffect } from 'react';

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDevMode, setIsDevMode] = useState(() => {
    // Initialize from localStorage
    const saved = localStorage.getItem('devMode');
    return saved === 'true';
  });

  const toggleDevMode = () => {
    setIsDevMode(prev => {
      const newValue = !prev;
      localStorage.setItem('devMode', newValue.toString());
      console.log('Dev mode toggled to:', newValue);
      return newValue;
    });
  };

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('devMode', isDevMode.toString());
    console.log('Dev mode state:', isDevMode);
  }, [isDevMode]);

  return (
    <DevModeContext.Provider value={{ isDevMode, toggleDevMode }}>
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
