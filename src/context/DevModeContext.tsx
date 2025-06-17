
import React, { createContext, useContext, useState, useEffect } from 'react';

interface DevModeContextType {
  isDevMode: boolean;
  toggleDevMode: () => void;
  isLovableEnvironment: boolean;
  useExternalDeployment: boolean;
}

const DevModeContext = createContext<DevModeContextType | undefined>(undefined);

export const DevModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if we're in Lovable environment (staging domain) vs published site (barskydesign.pro)
  const isLovableEnvironment = window.location.hostname.includes('lovable.app') || 
                               window.location.hostname === 'localhost' ||
                               window.location.hostname.includes('127.0.0.1') ||
                               window.location.port === '5173' || // Vite dev server
                               !window.location.hostname.includes('barskydesign.pro'); // Not the published domain

  // Since user has GitHub → Vercel setup, we'll use external deployment
  const useExternalDeployment = true;

  const [isDevMode, setIsDevMode] = useState(() => {
    // Only allow dev mode in Lovable environment
    if (!isLovableEnvironment) {
      console.log('🚫 DevModeContext: Not in Lovable environment, dev mode disabled');
      return false;
    }
    // Initialize from localStorage only in Lovable environment
    const saved = localStorage.getItem('devMode');
    const initialDevMode = saved === 'true';
    console.log('🎯 DevModeContext: Initial dev mode state:', initialDevMode, 'from localStorage:', saved);
    return initialDevMode;
  });

  console.log('🔧 DevModeContext: Current state -', { 
    isLovableEnvironment, 
    isDevMode, 
    hostname: window.location.hostname,
    port: window.location.port,
    href: window.location.href
  });

  const toggleDevMode = () => {
    // Only allow toggling in Lovable environment
    if (!isLovableEnvironment) {
      console.log('🚫 DevModeContext: Dev mode toggle blocked - not in Lovable environment');
      return;
    }

    setIsDevMode(prev => {
      const newValue = !prev;
      localStorage.setItem('devMode', newValue.toString());
      console.log('🔄 DevModeContext: Dev mode toggled from', prev, 'to', newValue);
      return newValue;
    });
  };

  // Save to localStorage whenever it changes (only in Lovable environment)
  useEffect(() => {
    if (isLovableEnvironment) {
      localStorage.setItem('devMode', isDevMode.toString());
      console.log('💾 DevModeContext: Dev mode state persisted:', { 
        isDevMode, 
        environment: isLovableEnvironment ? 'Lovable' : 'Published (barskydesign.pro)',
        saved: localStorage.getItem('devMode')
      });
    }
  }, [isDevMode, isLovableEnvironment]);

  // Force dev mode off if not in Lovable environment
  useEffect(() => {
    if (!isLovableEnvironment && isDevMode) {
      console.log('🚫 DevModeContext: Forcing dev mode off (not in Lovable environment)');
      setIsDevMode(false);
    }
  }, [isLovableEnvironment, isDevMode]);

  const contextValue = { isDevMode, toggleDevMode, isLovableEnvironment, useExternalDeployment };
  
  console.log('📤 DevModeContext: Providing context value:', contextValue);
  console.log('🏗️ DevModeContext: Provider is rendering with children');

  return (
    <DevModeContext.Provider value={contextValue}>
      {children}
    </DevModeContext.Provider>
  );
};

export const useDevMode = () => {
  const context = useContext(DevModeContext);
  if (context === undefined) {
    console.error('❌ useDevMode: Hook called outside of DevModeProvider');
    console.error('❌ useDevMode: Current component tree might not be wrapped with DevModeProvider');
    throw new Error('useDevMode must be used within a DevModeProvider');
  }
  console.log('🔍 useDevMode: Returning context:', context);
  return context;
};
