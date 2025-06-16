
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
  const { syncChangesToFiles, isSyncing, hasChangesToSync: syncHasChanges } = useDevModeSync(projectId || '');
  const { hasChanges } = useDevModeDatabase(projectId || '');
  const [localHasChanges, setLocalHasChanges] = useState(false);

  // Check for changes in database
  useEffect(() => {
    const checkChanges = async () => {
      if (projectId) {
        try {
          const result = await hasChanges();
          console.log('🎯 DevModeSyncButton: Database changes check:', result);
          setLocalHasChanges(result);
        } catch (error) {
          console.error('❌ DevModeSyncButton: Error checking changes:', error);
          setLocalHasChanges(false);
        }
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

  // Use both sync and local state for determining if there are changes
  const finalHasChanges = syncHasChanges || localHasChanges;

  console.log('🎯 DevModeSyncButton render:', { 
    isDevMode, 
    finalHasChanges, 
    syncHasChanges,
    localHasChanges,
    projectId,
    isSyncing,
    timestamp: new Date().toISOString()
  });

  if (!projectId) {
    console.log('❌ DevModeSyncButton: Not showing - no projectId');
    return null;
  }

  // Show the button if we're in dev mode OR if there are changes to sync
  if (!isDevMode && !finalHasChanges) {
    console.log('❌ DevModeSyncButton: Not showing - not in dev mode and no changes');
    return null;
  }

  const handlePublishClick = async () => {
    console.log('🚀 Publish button clicked, finalHasChanges:', finalHasChanges);
    if (finalHasChanges && !isSyncing) {
      try {
        await syncChangesToFiles();
      } catch (error) {
        console.error('❌ DevModeSyncButton: Error during sync:', error);
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-[99999]">
      <Button
        onClick={handlePublishClick}
        disabled={isSyncing || !finalHasChanges}
        className={`${
          finalHasChanges 
            ? 'bg-green-600 hover:bg-green-700' 
            : 'bg-gray-400 cursor-not-allowed'
        } text-white shadow-lg transition-all duration-200`}
      >
        {isSyncing ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Upload className="h-4 w-4 mr-2" />
            Publish Changes {finalHasChanges ? '(*)' : ''}
          </>
        )}
      </Button>
    </div>
  );
};

export default DevModeSyncButton;
