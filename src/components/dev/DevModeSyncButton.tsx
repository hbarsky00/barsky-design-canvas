
import React, { useEffect } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useDevModeSync } from '@/hooks/useDevModeSync';
import { useParams } from 'react-router-dom';

const DevModeSyncButton: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { syncChangesToFiles, hasChangesToSync } = useDevModeSync(projectId || '');

  // Auto-sync changes when they're detected
  useEffect(() => {
    if (hasChangesToSync && isDevMode && projectId) {
      console.log('🔄 DevModeSyncButton: Auto-syncing changes detected');
      const timeoutId = setTimeout(() => {
        syncChangesToFiles();
      }, 2000); // 2 second delay to batch rapid changes

      return () => clearTimeout(timeoutId);
    }
  }, [hasChangesToSync, isDevMode, projectId, syncChangesToFiles]);

  // Don't render anything - this component now works invisibly in the background
  return null;
};

export default DevModeSyncButton;
