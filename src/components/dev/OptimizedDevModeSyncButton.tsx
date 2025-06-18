
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useOptimizedSync } from '@/hooks/useOptimizedSync';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, CheckCircle, Clock, AlertCircle, RotateCcw, Trash2, Shield, Image } from 'lucide-react';
import { toast } from 'sonner';
import { debugCache } from '@/utils/debugUtils';

const OptimizedDevModeSyncButton: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { triggerManualSync, forceReset, syncState } = useOptimizedSync(projectId || '');

  // Don't render if not in dev mode or no project
  if (!isDevMode || !projectId) {
    return null;
  }

  // SAFE: Clear only published cache - preserves ALL dev work
  const handleSafeCacheClear = () => {
    debugCache.clearOnlyPublishedCache();
    toast.success('Published cache cleared', {
      description: 'All dev work preserved'
    });
  };

  // SELECTIVE: Clear only images - preserves dev image work
  const handleImageCacheClear = () => {
    debugCache.clearImageCache();
    toast.success('Image cache cleared', {
      description: 'Dev image work preserved'
    });
  };

  // SMART: Conditional clear based on environment
  const handleSmartClear = () => {
    debugCache.conditionalClearAll();
    forceReset();
    toast.success('Smart cache clear completed', {
      description: 'Dev work automatically preserved'
    });
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
        {/* Enhanced status indicator with dev mode protection info */}
        {(syncState.hasQueuedChanges || syncState.isSyncing || syncState.isStuck) && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border text-sm">
            <div className="flex items-center space-x-2 text-gray-700">
              {syncState.isStuck ? (
                <>
                  <AlertCircle className="h-3 w-3 text-red-600" />
                  <span>Sync stuck - dev work protected</span>
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

        {/* Enhanced debugging controls with selective clearing */}
        {syncState.isStuck && (
          <div className="flex flex-col gap-2">
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
                onClick={handleSmartClear}
                variant="outline"
                size="sm"
                className="bg-white/90 backdrop-blur-sm text-blue-600 hover:text-blue-700"
                title="Smart clearing - automatically preserves dev work"
              >
                <Shield className="h-3 w-3 mr-1" />
                Smart Clear
              </Button>
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={handleSafeCacheClear}
                variant="outline"
                size="sm"
                className="bg-white/90 backdrop-blur-sm text-green-600 hover:text-green-700"
                title="Clear published cache only - preserves ALL dev work"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Safe Clear
              </Button>
              
              <Button
                onClick={handleImageCacheClear}
                variant="outline"
                size="sm"
                className="bg-white/90 backdrop-blur-sm text-purple-600 hover:text-purple-700"
                title="Clear image cache only - preserves dev images"
              >
                <Image className="h-3 w-3 mr-1" />
                Image Clear
              </Button>
            </div>
          </div>
        )}

        {/* Dev mode protection indicator */}
        {debugCache.isDevMode() && (
          <div className="text-xs text-green-600 bg-green-50 backdrop-blur-sm rounded px-2 py-1 border border-green-200">
            <Shield className="h-3 w-3 inline mr-1" />
            Dev Mode Protection Active
          </div>
        )}

        {/* Debug console helpers - with safe commands */}
        {process.env.NODE_ENV === 'development' && (
          <div className="text-xs text-gray-500 bg-white/90 backdrop-blur-sm rounded px-2 py-1 max-w-xs">
            Safe commands:
            <br />
            <code className="text-green-600">debugCache.clearOnlyPublishedCache()</code>
            <br />
            <code className="text-purple-600">debugCache.clearImageCache()</code>
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimizedDevModeSyncButton;
