
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
      console.log('DevModeSyncButton: Project data updated, forcing re-render');
      setForceUpdate(prev => prev + 1);
    };

    const handleStorageChange = () => {
      console.log('DevModeSyncButton: Storage changed, forcing re-render');
      setForceUpdate(prev => prev + 1);
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Also listen for any changes in localStorage that might affect our project
  useEffect(() => {
    const interval = setInterval(() => {
      setForceUpdate(prev => prev + 1);
    }, 2000); // Check every 2 seconds

    return () => clearInterval(interval);
  }, []);

  console.log('DevModeSyncButton render:', { 
    isDevMode, 
    hasChangesToSync, 
    projectId,
    forceUpdate,
    timestamp: new Date().toISOString()
  });

  if (!isDevMode || !projectId) {
    console.log('DevModeSyncButton: Not showing - devMode or projectId missing');
    return null;
  }

  if (!hasChangesToSync) {
    console.log('DevModeSyncButton: Not showing - no changes to sync');
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-[99999]">
      <Button
        onClick={syncChangesToFiles}
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
            Publish Changes
          </>
        )}
      </Button>
    </div>
  );
};

export default DevModeSyncButton;
