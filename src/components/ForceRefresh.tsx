import * as React from 'react';

// Component to force a hard refresh if React modules are corrupted
export const ForceRefresh: React.FC = () => {
  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof Storage === 'undefined') return;
    
    // Add reload prevention - only allow one reload per 5 seconds
    const lastReload = typeof localStorage !== 'undefined' ? localStorage.getItem('lastForceReload') : null;
    const now = Date.now();
    
    if (lastReload && (now - parseInt(lastReload)) < 5000) {
      console.log('⏸️ Skipping ForceRefresh - too recent reload');
      return;
    }
    
    // Only check for critical React failures, not minor issues
    try {
      if (!React || typeof React.useEffect !== 'function') {
        console.error('🚨 Critical React failure detected');
        localStorage.setItem('lastForceReload', now.toString());
        setTimeout(() => {
          window.location.reload();
        }, 100);
        return;
      }
      
      console.log('✅ React core is functional');
    } catch (error) {
      console.error('🚨 React error detected:', error);
      localStorage.setItem('lastForceReload', now.toString());
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }
  }, []);

  return null;
};