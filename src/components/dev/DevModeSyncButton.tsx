
import React, { useEffect, useRef } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useDevModeSync } from '@/hooks/useDevModeSync';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';

const DevModeSyncButton: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { syncChangesToFiles, hasChangesToSync, isSyncing } = useDevModeSync(projectId || '');
  
  const syncTriggeredRef = useRef(false);

  // Auto-sync when changes are detected
  useEffect(() => {
    if (hasChangesToSync && isDevMode && projectId && !syncTriggeredRef.current && !isSyncing) {
      console.log('🔄 DevModeSyncButton: Auto-syncing detected changes');
      syncTriggeredRef.current = true;
      
      const timeoutId = setTimeout(() => {
        syncChangesToFiles().finally(() => {
          syncTriggeredRef.current = false;
        });
      }, 2000); // 2 second delay for auto-sync

      return () => {
        clearTimeout(timeoutId);
        syncTriggeredRef.current = false;
      };
    }
    
    if (!hasChangesToSync) {
      syncTriggeredRef.current = false;
    }
  }, [hasChangesToSync, isDevMode, projectId, syncChangesToFiles, isSyncing]);

  // Manual sync button
  const handleManualSync = () => {
    if (!isSyncing && projectId) {
      console.log('🖱️ DevModeSyncButton: Manual sync triggered');
      syncChangesToFiles();
    }
  };

  // Don't render if not in dev mode or no project
  if (!isDevMode || !projectId) {
    return null;
  }

  // Show sync button when there are changes
  if (hasChangesToSync || isSyncing) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={handleManualSync}
          disabled={isSyncing}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
          {isSyncing ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Syncing to Live...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Sync to Live ({hasChangesToSync ? 'Changes Ready' : 'No Changes'})
            </>
          )}
        </Button>
      </div>
    );
  }

  return null;
};

export default DevModeSyncButton;
