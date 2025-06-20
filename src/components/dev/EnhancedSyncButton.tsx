
import React from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useEnhancedSync } from '@/hooks/useEnhancedSync';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Upload, Loader2, CheckCircle, Bell } from 'lucide-react';
import CaptionNotificationIndicator from '@/components/captions/CaptionNotificationIndicator';

const EnhancedSyncButton: React.FC = () => {
  const { isDevMode } = useDevMode();
  const { projectId } = useParams<{ projectId: string }>();
  const { syncToLive, isSyncing, hasChangesToSync, unpublishedCaptions } = useEnhancedSync(projectId || '');

  if (!isDevMode || !projectId) {
    return null;
  }

  const getButtonState = () => {
    if (isSyncing) {
      return {
        variant: 'default' as const,
        className: 'bg-blue-600 hover:bg-blue-700 text-white',
        icon: <Loader2 className="h-4 w-4 mr-2 animate-spin" />,
        text: 'Publishing to live...',
        disabled: true
      };
    }

    if (hasChangesToSync) {
      const captionText = unpublishedCaptions > 0 ? ` (${unpublishedCaptions} AI captions)` : '';
      return {
        variant: 'default' as const,
        className: 'bg-green-600 hover:bg-green-700 text-white',
        icon: unpublishedCaptions > 0 ? <Bell className="h-4 w-4 mr-2" /> : <Upload className="h-4 w-4 mr-2" />,
        text: `Publish to live${captionText}`,
        disabled: false
      };
    }

    return {
      variant: 'default' as const,
      className: 'bg-gray-600 hover:bg-gray-700 text-white',
      icon: <CheckCircle className="h-4 w-4 mr-2" />,
      text: 'No changes to publish',
      disabled: false
    };
  };

  const buttonState = getButtonState();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="flex flex-col items-end space-y-2">
        {/* Caption notification indicator */}
        {unpublishedCaptions > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border">
            <CaptionNotificationIndicator projectId={projectId} />
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
          Dev Mode • Enhanced Sync
        </div>
      </div>
    </div>
  );
};

export default EnhancedSyncButton;
