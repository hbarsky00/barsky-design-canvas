
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useOptimizedSync } from '@/hooks/useOptimizedSync';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const OptimizedDevModeSyncButton: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { triggerManualSync, syncState } = useOptimizedSync(projectId || '');

  // Don't render if not in dev mode or no project
  if (!isDevMode || !projectId) {
    return null;
  }

  const getButtonState = () => {
    if (syncState.isSyncing) {
      return {
        variant: 'default' as const,
        className: 'bg-blue-600 hover:bg-blue-700 text-white',
        icon: <Loader2 className="h-4 w-4 mr-2 animate-spin" />,
        text: `Syncing... (${syncState.pendingChanges} pending)`
      };
    }

    if (syncState.hasQueuedChanges) {
      return {
        variant: 'default' as const,
        className: 'bg-orange-600 hover:bg-orange-700 text-white animate-pulse',
        icon: <Clock className="h-4 w-4 mr-2" />,
        text: `${syncState.pendingChanges} Changes Queued`
      };
    }

    return {
      variant: 'default' as const,
      className: 'bg-green-600 hover:bg-green-700 text-white',
      icon: <CheckCircle className="h-4 w-4 mr-2" />,
      text: 'All Synced'
    };
  };

  const buttonState = getButtonState();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col items-end space-y-2">
        {/* Status indicator */}
        {(syncState.hasQueuedChanges || syncState.isSyncing) && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border text-sm">
            <div className="flex items-center space-x-2 text-gray-700">
              {syncState.isSyncing ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                  <span>Processing changes...</span>
                </>
              ) : (
                <>
                  <Clock className="h-3 w-3 text-orange-600" />
                  <span>Changes queued for sync</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Main sync button */}
        <Button
          onClick={triggerManualSync}
          disabled={syncState.isSyncing}
          className={`shadow-lg transition-all duration-200 ${buttonState.className}`}
          variant={buttonState.variant}
        >
          {buttonState.icon}
          {buttonState.text}
        </Button>
      </div>
    </div>
  );
};

export default OptimizedDevModeSyncButton;
