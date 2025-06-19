
import React, { useEffect } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';
import { Button } from '@/components/ui/button';
import { Download, AlertTriangle, Bug } from 'lucide-react';

interface CaptionManagerProps {
  projectId: string;
}

const CaptionManager: React.FC<CaptionManagerProps> = ({ projectId }) => {
  const { isDevMode } = useDevMode();
  const { 
    captions, 
    loadCaptions, 
    exportCaptions, 
    debugCaptionConflicts 
  } = useSimpleCaptions(projectId);

  useEffect(() => {
    loadCaptions();
  }, [loadCaptions]);

  if (!isDevMode) return null;

  const captionCount = Object.keys(captions).filter(key => 
    captions[key] && 
    captions[key] !== 'Click to add a caption...' &&
    key.startsWith('img_caption_')
  ).length;

  const conflicts = debugCaptionConflicts();
  const conflictCount = Object.keys(conflicts).length;

  const handleDebugConflicts = () => {
    const conflictData = debugCaptionConflicts();
    console.log('🔍 CAPTION CONFLICTS DEBUG:', conflictData);
    
    if (Object.keys(conflictData).length === 0) {
      console.log('✅ No caption conflicts detected!');
    } else {
      console.warn('⚠️ Caption conflicts found:', conflictData);
    }
  };

  return (
    <div 
      className="fixed bottom-20 right-4 z-40 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200" 
      style={{ marginBottom: '100px' }}
    >
      <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        Enhanced Caption Manager
        {conflictCount > 0 && (
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        )}
      </div>
      
      <div className="text-xs text-gray-600 mb-3 space-y-1">
        <div>{captionCount} unique image captions saved</div>
        {conflictCount > 0 && (
          <div className="text-orange-600 font-medium">
            ⚠️ {conflictCount} caption conflicts detected
          </div>
        )}
        <div className="text-gray-500">
          Project: {projectId.substring(0, 8)}...
        </div>
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
        
        <Button
          onClick={handleDebugConflicts}
          size="sm"
          variant="outline"
          className="text-xs"
          title="Debug caption conflicts"
        >
          <Bug className="h-3 w-3 mr-1" />
          Debug
        </Button>
      </div>
      
      {conflictCount > 0 && (
        <div className="mt-2 text-xs text-orange-600 bg-orange-50 p-2 rounded">
          Check console for conflict details
        </div>
      )}
    </div>
  );
};

export default CaptionManager;
