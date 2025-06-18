
import React, { useEffect, useRef } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useDevModeSync } from '@/hooks/useDevModeSync';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, CheckCircle } from 'lucide-react';

const DevModeSyncButton: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { syncChangesToFiles, hasChangesToSync, isSyncing } = useDevModeSync(projectId || '');
  
  const lastSyncRef = useRef<number>(0);

  // Manual sync button
  const handleManualSync = () => {
    if (!isSyncing && projectId) {
      console.log('🖱️ DevModeSyncButton: Manual sync triggered');
      syncChangesToFiles();
      lastSyncRef.current = Date.now();
    }
  };

  // Don't render if not in dev mode or no project
  if (!isDevMode || !projectId) {
    return null;
  }

  // Always show the sync button for better visibility
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handleManualSync}
        disabled={isSyncing}
        className={`shadow-lg transition-all duration-200 ${
          hasChangesToSync 
            ? 'bg-orange-600 hover:bg-orange-700 text-white animate-pulse' 
            : isSyncing
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-green-600 hover:bg-green-700 text-white'
        }`}
      >
        {isSyncing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Syncing...
          </>
        ) : hasChangesToSync ? (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Sync Changes to Live
          </>
        ) : (
          <>
            <CheckCircle className="h-4 w-4 mr-2" />
            All Synced
          </>
        )}
      </Button>
    </div>
  );
};

export default DevModeSyncButton;
