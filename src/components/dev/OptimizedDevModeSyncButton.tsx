
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useOptimizedSync } from '@/hooks/useOptimizedSync';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, CheckCircle, Clock, AlertCircle, RotateCcw, Trash2 } from 'lucide-react';
import { debugCache } from '@/utils/debugUtils';

const OptimizedDevModeSyncButton: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { triggerManualSync, forceReset, syncState } = useOptimizedSync(projectId || '');

  // Don't render if not in dev mode or no project
  if (!isDevMode || !projectId) {
    return null;
  }

  const handleDebugCacheClear = () => {
    debugCache.clearAllCaches();
    forceReset();
  };

  const getButtonState = () => {
    if (syncState.isStuck) {
      return {
        variant: 'destructive' as const,
        className: 'bg-red-600 hover:bg-red-700 text-white',
        icon: <AlertCircle className="h-4 w-4 mr-2" />,
        text: 'Sync Stuck - Reset',
        onClick: forceReset
      };
    }

    if (syncState.isSyncing) {
      return {
        variant: 'default' as const,
        className: 'bg-blue-600 hover:bg-blue-700 text-white',
        icon: <Loader2 className="h-4 w-4 mr-2 animate-spin" />,
        text: `Syncing... (${syncState.pendingChanges} pending)`,
        onClick: syncState.pendingChanges === 0 ? forceReset : triggerManualSync
      };
    }

    if (syncState.hasQueuedChanges) {
      return {
        variant: 'default' as const,
        className: 'bg-orange-600 hover:bg-orange-700 text-white animate-pulse',
        icon: <Clock className="h-4 w-4 mr-2" />,
        text: `${syncState.pendingChanges} Changes Queued`,
        onClick: triggerManualSync
      };
    }

    return {
      variant: 'default' as const,
      className: 'bg-green-600 hover:bg-green-700 text-white',
      icon: <CheckCircle className="h-4 w-4 mr-2" />,
      text: 'All Synced',
      onClick: triggerManualSync
    };
  };

  const buttonState = getButtonState();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col items-end space-y-2">
        {/* Enhanced status indicator with debug info */}
        {(syncState.hasQueuedChanges || syncState.isSyncing || syncState.isStuck) && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border text-sm">
            <div className="flex items-center space-x-2 text-gray-700">
              {syncState.isStuck ? (
                <>
                  <AlertCircle className="h-3 w-3 text-red-600" />
                  <span>Sync stuck - click to reset</span>
                </>
              ) : syncState.isSyncing ? (
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
            {/* Debug timestamp */}
            <div className="text-xs text-gray-500 mt-1">
              Last update: {new Date(syncState.lastSyncTime || Date.now()).toLocaleTimeString()}
            </div>
          </div>
        )}

        {/* Main sync button */}
        <Button
          onClick={buttonState.onClick}
          disabled={syncState.isSyncing && !syncState.isStuck}
          className={`shadow-lg transition-all duration-200 ${buttonState.className}`}
          variant={buttonState.variant}
        >
          {buttonState.icon}
          {buttonState.text}
        </Button>

        {/* Enhanced debugging controls */}
        {syncState.isStuck && (
          <div className="flex gap-2">
            <Button
              onClick={forceReset}
              variant="outline"
              size="sm"
              className="bg-white/90 backdrop-blur-sm"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Force Reset
            </Button>
            
            <Button
              onClick={handleDebugCacheClear}
              variant="outline"
              size="sm"
              className="bg-white/90 backdrop-blur-sm text-red-600 hover:text-red-700"
              title="Clear all caches and reset completely"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Clear Cache
            </Button>
          </div>
        )}

        {/* Debug console helper - only show in dev mode */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-500 bg-white/90 backdrop-blur-sm rounded px-2 py-1">
            Debug: Use <code>debugCache.clearAllCaches()</code> in console
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizedDevModeSyncButton;
