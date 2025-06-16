
import React, { useEffect, useState } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { useDevModeSync } from '@/hooks/useDevModeSync';
import { useParams } from 'react-router-dom';

const DevModeSyncButton: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { syncChangesToFiles, isSyncing, hasChangesToSync } = useDevModeSync(projectId || '');
  const [forceUpdate, setForceUpdate] = useState(0);

  // Listen for project data updates to force re-render
  useEffect(() => {
    const handleProjectDataUpdate = () => {
      console.log('🔄 DevModeSyncButton: Project data updated, forcing re-render');
      setForceUpdate(prev => prev + 1);
    };

    const handleStorageChange = () => {
      console.log('🔄 DevModeSyncButton: Storage changed, forcing re-render');
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Force refresh every few seconds to check for changes
  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  console.log('🎯 DevModeSyncButton render:', { 
    isDevMode, 
    hasChangesToSync, 
    projectId,
    forceUpdate,
    timestamp: new Date().toISOString()
  });

  if (!projectId) {
    console.log('❌ DevModeSyncButton: Not showing - no projectId');
    return null;
  }

  // Show the button if we're in dev mode OR if there are changes to sync
  if (!isDevMode && !hasChangesToSync) {
    console.log('❌ DevModeSyncButton: Not showing - not in dev mode and no changes');
    return null;
  }

  const handlePublishClick = () => {
    console.log('🚀 Publish button clicked, hasChangesToSync:', hasChangesToSync);
    syncChangesToFiles();
  };

  return (
    <div className="fixed bottom-4 left-4 z-[99999]">
      <Button
        onClick={handlePublishClick}
        disabled={isSyncing}
        className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
      >
        {isSyncing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Publish Changes {hasChangesToSync ? '(*)' : ''}
          </>
        )}
      </Button>
    </div>
  );
};

export default DevModeSyncButton;
