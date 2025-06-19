
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useSimplifiedSync } from '@/hooks/useSimplifiedSync';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const SimplifiedSyncButton: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { syncToLive, isSyncing, hasChanges, queueSize } = useSimplifiedSync(projectId || '');

  if (!isDevMode || !projectId) {
    return null;
  }

  const getButtonState = () => {
    if (isSyncing) {
      return {
        variant: 'default' as const,
        className: 'bg-blue-600 hover:bg-blue-700 text-white',
        icon: <Loader2 className="h-4 w-4 mr-2 animate-spin" />,
        text: 'Syncing to live...',
        disabled: true
      };
    }

    if (hasChanges || queueSize > 0) {
      return {
        variant: 'default' as const,
        className: 'bg-green-600 hover:bg-green-700 text-white',
        icon: <Upload className="h-4 w-4 mr-2" />,
        text: `Sync to live${queueSize > 0 ? ` (${queueSize} pending)` : ''}`,
        disabled: false
      };
    }

    return {
      variant: 'default' as const,
      className: 'bg-gray-600 hover:bg-gray-700 text-white',
      icon: <CheckCircle className="h-4 w-4 mr-2" />,
      text: 'No changes to sync',
      disabled: false
    };
  };

  const buttonState = getButtonState();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col items-end space-y-2">
        {/* Status indicator */}
        {(hasChanges || queueSize > 0 || isSyncing) && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border text-sm">
            <div className="flex items-center space-x-2 text-gray-700">
              {isSyncing ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                  <span>Publishing to live...</span>
                </>
              ) : queueSize > 0 ? (
                <>
                  <Clock className="h-3 w-3 text-orange-600" />
                  <span>{queueSize} changes queued</span>
                </>
              ) : hasChanges ? (
                <>
                  <AlertCircle className="h-3 w-3 text-green-600" />
                  <span>Ready to sync</span>
                </>
              ) : null}
            </div>
          </div>
        )}

        {/* Main sync button */}
        <Button
          onClick={syncToLive}
          disabled={buttonState.disabled}
          className={`shadow-lg transition-all duration-200 ${buttonState.className}`}
          variant={buttonState.variant}
        >
          {buttonState.icon}
          {buttonState.text}
        </Button>

        {/* Dev mode indicator */}
        <div className="text-xs text-green-600 bg-green-50 backdrop-blur-sm rounded px-2 py-1 border border-green-200">
          Dev Mode • Simplified Sync
        </div>
      </div>
    </div>
  );
};

export default SimplifiedSyncButton;
