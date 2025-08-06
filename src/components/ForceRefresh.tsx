import React, { useEffect } from 'react';

// Component to force a hard refresh if React modules are corrupted
export const ForceRefresh: React.FC = () => {
  useEffect(() => {
    // Check if React is properly loaded
    try {
      if (!React || !React.useEffect || !React.useState) {
        console.error('🚨 React hooks not properly loaded - forcing refresh');
        window.location.reload();
        return;
      }
      
      // Test that hooks work
      const [test] = React.useState(true);
      if (test === undefined) {
        console.error('🚨 React useState not working - forcing refresh');
        window.location.reload();
        return;
      }
      
      console.log('✅ React modules are healthy');
    } catch (error) {
      console.error('🚨 React error detected:', error);
      window.location.reload();
    }
  }, []);

  return null;
};