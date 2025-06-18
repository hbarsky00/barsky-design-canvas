
import React, { useEffect, useRef } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useDevModeSync } from '@/hooks/useDevModeSync';
import { useParams } from 'react-router-dom';

const DevModeSyncButton: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { syncChangesToFiles, hasChangesToSync } = useDevModeSync(projectId || '');
  
  // Use ref to track if we've already triggered sync to prevent loops
  const syncTriggeredRef = useRef(false);

  // Always use useEffect, but conditionally execute the logic inside
  useEffect(() => {
    if (hasChangesToSync && isDevMode && projectId && !syncTriggeredRef.current) {
      console.log('🔄 DevModeSyncButton: Auto-syncing changes detected');
      syncTriggeredRef.current = true;
      
      const timeoutId = setTimeout(() => {
        syncChangesToFiles().finally(() => {
          // Reset the flag after sync completes
          syncTriggeredRef.current = false;
        });
      }, 1500); // Reduced to 1.5 seconds for faster sync

      return () => {
        clearTimeout(timeoutId);
        syncTriggeredRef.current = false;
      };
    }
    
    // Reset flag when no changes to sync
    if (!hasChangesToSync) {
      syncTriggeredRef.current = false;
    }
  }, [hasChangesToSync, isDevMode, projectId, syncChangesToFiles]);

  // Don't render anything - this component works invisibly in the background
  return null;
};

export default DevModeSyncButton;
