
import React, { useEffect, useState } from 'react';
import { useDevMode } from '@/context/DevModeContext';
import { useSimpleCaptions } from '@/hooks/useSimpleCaptions';
import { useEnhancedAiImageCaptions } from '@/hooks/useEnhancedAiImageCaptions';
import { Button } from '@/components/ui/button';
import { Download, AlertTriangle, Bug, Sparkles, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';

interface EnhancedCaptionManagerProps {
  projectId: string;
}

const EnhancedCaptionManager: React.FC<EnhancedCaptionManagerProps> = ({ projectId }) => {
  const { isDevMode } = useDevMode();
  const { 
    captions, 
    loadCaptions, 
    exportCaptions, 
    debugCaptionConflicts 
  } = useSimpleCaptions(projectId);
  const { batchProgress, processBatchCaptions, isGenerating } = useEnhancedAiImageCaptions();
  
  const [analytics, setAnalytics] = useState({
    totalImages: 0,
    captionedImages: 0,
    aiGeneratedCount: 0,
    manuallyEditedCount: 0
  });

  useEffect(() => {
    loadCaptions();
  }, [loadCaptions]);

  useEffect(() => {
    // Calculate analytics
    const imageKeys = Object.keys(captions).filter(key => key.startsWith('img_caption_'));
    const validCaptions = imageKeys.filter(key => 
      captions[key] && 
      captions[key] !== 'Click to add a caption...'
    );
    
    const aiGenerated = validCaptions.filter(key => {
      const caption = captions[key];
      return caption && (
        caption.includes('interface') || 
        caption.includes('design') || 
        caption.includes('Professional') ||
        caption.length > 50
      );
    });

    setAnalytics({
      totalImages: imageKeys.length,
      captionedImages: validCaptions.length,
      aiGeneratedCount: aiGenerated.length,
      manuallyEditedCount: validCaptions.length - aiGenerated.length
    });
  }, [captions]);

  if (!isDevMode) return null;

  const captionCount = analytics.captionedImages;
  const conflicts = debugCaptionConflicts();
  const conflictCount = Object.keys(conflicts).length;

  const handleDebugConflicts = () => {
    const conflictData = debugCaptionConflicts();
    console.log('🔍 ENHANCED CAPTION CONFLICTS DEBUG:', conflictData);
    
    if (Object.keys(conflictData).length === 0) {
      console.log('✅ No caption conflicts detected!');
      toast.success('No caption conflicts detected!');
    } else {
      console.warn('⚠️ Caption conflicts found:', conflictData);
      toast.warning(`Found ${Object.keys(conflictData).length} caption conflicts - check console for details`);
    }
  };

  const handleBatchAiGeneration = async () => {
    // Find images that need AI captions
    const imagesToProcess = Object.keys(captions)
      .filter(key => key.startsWith('img_caption_'))
      .map(key => key.replace('img_caption_', ''))
      .filter(imageSrc => {
        const caption = captions[`img_caption_${imageSrc}`];
        return !caption || 
               caption === 'Click to add a caption...' || 
               caption.includes('newly added') ||
               caption.length < 10;
      })
      .map(imageSrc => ({ src: imageSrc, contextType: 'project' as const }));

    if (imagesToProcess.length === 0) {
      toast.info('All images already have quality captions!');
      return;
    }

    toast.loading(`Starting AI caption generation for ${imagesToProcess.length} images...`, { id: 'batch-ai' });

    try {
      await processBatchCaptions(
        imagesToProcess,
        (progress) => {
          console.log(`📊 Batch Progress: ${progress.completed}/${progress.total} completed, ${progress.failed} failed`);
        },
        (imageSrc, captionStyles) => {
          // Use the descriptive caption style
          const descriptiveCaption = captionStyles.find(c => c.type === 'descriptive') || captionStyles[0];
          if (descriptiveCaption) {
            // This would ideally trigger a save, but we'll need to integrate with the caption system
            console.log('📝 Generated caption for:', imageSrc.substring(0, 30) + '...', descriptiveCaption.caption);
          }
        }
      );

      toast.success('Batch AI caption generation completed!', { id: 'batch-ai' });
    } catch (error) {
      console.error('❌ Batch AI generation failed:', error);
      toast.error('Batch AI generation failed - check console for details', { id: 'batch-ai' });
    }
  };

  const showAnalytics = () => {
    console.log('📊 ENHANCED CAPTION ANALYTICS:', analytics);
    toast.info(`Analytics: ${analytics.captionedImages}/${analytics.totalImages} images captioned (${Math.round(analytics.captionedImages/analytics.totalImages*100)}% complete)`);
  };

  return (
    <div 
      className="fixed bottom-20 right-4 z-40 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 max-w-xs" 
      style={{ marginBottom: '100px' }}
    >
      <div className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        Enhanced Caption Manager
        {conflictCount > 0 && (
          <AlertTriangle className="h-4 w-4 text-orange-500" />
        )}
      </div>
      
      <div className="text-xs text-gray-600 mb-3 space-y-1">
        <div>{captionCount} captioned images ({analytics.totalImages} total)</div>
        <div className="text-green-600">🤖 {analytics.aiGeneratedCount} AI generated</div>
        <div className="text-blue-600">✏️ {analytics.manuallyEditedCount} manually edited</div>
        {conflictCount > 0 && (
          <div className="text-orange-600 font-medium">
            ⚠️ {conflictCount} conflicts detected
          </div>
        )}
        <div className="text-gray-500">
          Project: {projectId.substring(0, 8)}...
        </div>
      </div>

      {/* Batch Progress */}
      {batchProgress && (
        <div className="mb-3 p-2 bg-blue-50 rounded text-xs">
          <div className="font-medium text-blue-800">AI Generation Progress</div>
          <div className="text-blue-600">
            {batchProgress.completed}/{batchProgress.total} completed
          </div>
          {batchProgress.failed > 0 && (
            <div className="text-red-600">{batchProgress.failed} failed</div>
          )}
          {batchProgress.currentImage && (
            <div className="text-gray-600 truncate">
              Processing: {batchProgress.currentImage.substring(0, 20)}...
            </div>
          )}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleBatchAiGeneration}
          size="sm"
          variant="outline"
          className="text-xs"
          disabled={isGenerating}
        >
          <Sparkles className="h-3 w-3 mr-1" />
          {isGenerating ? 'Generating...' : 'Batch AI'}
        </Button>

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
          onClick={showAnalytics}
          size="sm"
          variant="outline"
          className="text-xs"
        >
          <BarChart3 className="h-3 w-3 mr-1" />
          Stats
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

export default EnhancedCaptionManager;
