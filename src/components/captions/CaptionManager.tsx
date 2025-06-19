
import React, { useEffect } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';

interface CaptionManagerProps {
  projectId: string;
}

const CaptionManager: React.FC<CaptionManagerProps> = ({ projectId }) => {
  const { isDevMode } = useDevMode();
  const { captions, loadCaptions, exportCaptions } = useSimpleCaptions(projectId);

  useEffect(() => {
    loadCaptions();
  }, [loadCaptions]);

  if (!isDevMode) return null;

  const captionCount = Object.keys(captions).filter(key => 
    captions[key] && 
    captions[key] !== 'Click to add a caption...' &&
    key.startsWith('caption_') // Only count actual caption keys
  ).length;

  return (
    <div className="fixed bottom-20 right-4 z-40 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
      <div className="text-sm font-medium text-gray-700 mb-2">
        Caption Manager (Isolated)
      </div>
      <div className="text-xs text-gray-600 mb-3">
        {captionCount} captions saved
      </div>
      <div className="flex gap-2">
        <Button
          onClick={exportCaptions}
          size="sm"
          variant="outline"
          className="text-xs"
        >
          <Download className="h-3 w-3 mr-1" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default CaptionManager;
