
import React, { useEffect, useState } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { useDevModeSync } from '@/hooks/useDevModeSync';
import { useDevModeDatabase } from '@/hooks/useDevModeDatabase';
import { useParams } from 'react-router-dom';

const DevModeSyncButton: React.FC = () => {
  const { isDevMode, isLovableEnvironment } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { syncChangesToFiles, isSyncing, hasChangesToSync: syncHasChanges } = useDevModeSync(projectId || '');
  const { hasChanges } = useDevModeDatabase(projectId || '');
  const [localHasChanges, setLocalHasChanges] = useState(false);

  // Check for changes in database
  useEffect(() => {
    const checkChanges = async () => {
      if (projectId && isLovableEnvironment) {
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
    
    // Check for changes periodically only in Lovable environment
    if (isLovableEnvironment) {
      const interval = setInterval(checkChanges, 2000);
      
      // Listen for project data updates
      const handleProjectDataUpdate = (e: CustomEvent) => {
        console.log('🔄 DevModeSyncButton: Project data updated, checking for changes');
        
        // Prevent any navigation or page reload
        if (e.detail?.stayOnPage) {
          console.log('🔒 DevModeSyncButton: Staying on current page as requested');
        }
        
        checkChanges();
      };

      window.addEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
      
      return () => {
        clearInterval(interval);
        window.removeEventListener('projectDataUpdated', handleProjectDataUpdate as EventListener);
      };
    }
  }, [projectId, hasChanges, isLovableEnvironment]);

  // Use both sync and local state for determining if there are changes
  const finalHasChanges = syncHasChanges || localHasChanges;

  console.log('🎯 DevModeSyncButton render:', { 
    isDevMode, 
    isLovableEnvironment,
    finalHasChanges, 
    syncHasChanges,
    localHasChanges,
    projectId,
    isSyncing,
    timestamp: new Date().toISOString()
  });

  if (!projectId || !isLovableEnvironment) {
    console.log('❌ DevModeSyncButton: Not showing - no projectId or not in Lovable environment');
    return null;
  }

  // Show the button if we're in dev mode OR if there are changes to sync (only in Lovable environment)
  if (!isDevMode && !finalHasChanges) {
    console.log('❌ DevModeSyncButton: Not showing - not in dev mode and no changes');
    return null;
  }

  const handlePublishClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('🚀 Publish button clicked, finalHasChanges:', finalHasChanges);
    if (finalHasChanges && !isSyncing) {
      try {
        console.log('📤 Starting publish process - preventing any navigation');
        await syncChangesToFiles();
        console.log('✅ Publish completed - staying on current page');
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
