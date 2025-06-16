
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';
import { useDevModeSync } from '@/hooks/useDevModeSync';
import { useParams } from 'react-router-dom';

const DevModeSyncButton: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { syncChangesToFiles, isSyncing, hasChangesToSync } = useDevModeSync(projectId || '');

  console.log('DevModeSyncButton render:', { isDevMode, hasChangesToSync, projectId });

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
