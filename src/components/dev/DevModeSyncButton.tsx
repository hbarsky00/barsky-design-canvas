
import React, { useEffect, useState } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { useDevModeSync } from '@/hooks/useDevModeSync';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { useParams } from 'react-router-dom';

const DevModeSyncButton: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { syncChangesToFiles, isSyncing } = useDevModeSync(projectId || '');
  const { hasChanges } = useDevModeDatabase(projectId || '');
  const [hasChangesToSync, setHasChangesToSync] = useState(false);

  // Check for changes in database
  useEffect(() => {
    const checkChanges = async () => {
      if (projectId) {
        const result = await hasChanges();
        console.log('🎯 DevModeSyncButton: Database changes check:', result);
        setHasChangesToSync(result);
      }
    };
    
    checkChanges();
    
    // Check for changes periodically
    const interval = setInterval(checkChanges, 2000);
    
    // Listen for project data updates
    const handleProjectDataUpdate = () => {
      console.log('🔄 DevModeSyncButton: Project data updated, checking for changes');
      checkChanges();
    };

    window.addEventListener('projectDataUpdated', handleProjectDataUpdate);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('projectDataUpdated', handleProjectDataUpdate);
    };
  }, [projectId, hasChanges]);

  console.log('🎯 DevModeSyncButton render:', { 
    isDevMode, 
    hasChangesToSync, 
    projectId,
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
