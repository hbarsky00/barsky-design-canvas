
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useDevModeSync } from '@/hooks/useDevModeSync';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Loader2 } from 'lucide-react';

const DevModeSyncButton: React.FC = () => {
  const { isDevMode, isLovableEnvironment } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { syncChangesToFiles, isSyncing, hasChangesToSync } = useDevModeSync(projectId || '');

  // Only show if we're in dev mode and have a project ID
  if (!isDevMode || !projectId) {
    return null;
  }

  // Don't show if no changes to sync
  if (!hasChangesToSync && !isSyncing) {
    return null;
  }

  const handlePublish = async () => {
    console.log('🚀 DevModeSyncButton: Publishing changes...');
    await syncChangesToFiles();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={handlePublish}
        disabled={isSyncing || !hasChangesToSync}
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        size="sm"
      >
        {isSyncing ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Publish Changes
          </>
        )}
      </Button>
    </div>
  );
};

export default DevModeSyncButton;
