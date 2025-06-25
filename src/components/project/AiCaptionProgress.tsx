
import React from "react";
import { shouldShowEditingControls } from "@/utils/devModeDetection";

interface AiCaptionProgressProps {
  isGenerating: boolean;
  generationProgress: { current: number; total: number } | null;
  aiCaptionsCount: number;
}

const AiCaptionProgress: React.FC<AiCaptionProgressProps> = ({
  isGenerating,
  generationProgress,
  aiCaptionsCount
}) => {
  const showEditingControls = shouldShowEditingControls();
  
  // Don't show anything if not in dev mode or if there are no captions
  if (!showEditingControls || aiCaptionsCount === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm font-medium text-gray-700">
            Image Captions Loaded from Database
          </span>
        </div>
        
        <div className="text-sm text-gray-600">
          {aiCaptionsCount} caption{aiCaptionsCount !== 1 ? 's' : ''} loaded
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        All captions are saved in the database - no API calls needed
      </div>
    </div>
  );
};

export default AiCaptionProgress;
