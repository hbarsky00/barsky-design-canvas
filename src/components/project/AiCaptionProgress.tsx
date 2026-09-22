
import React from "react";
import { motion } from "framer-motion";

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
  if (isGenerating) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 p-6 text-center"
      >
        <div className="flex items-center justify-center space-x-3 text-blue-700">
          <div className="animate-spin h-5 w-5 border-b-2 border-blue-600"></div>
          <span className="font-medium">🤖 Generating AI-powered image captions...</span>
        </div>
        {generationProgress && (
          <div className="mt-3">
            <div className="text-sm text-blue-600">
              Processing image {generationProgress.current} of {generationProgress.total}
            </div>
            <div className="w-full bg-blue-200 h-2 mt-2">
              <div 
                className="bg-blue-600 h-2 transition-all duration-300"
                style={{ width: `${(generationProgress.current / generationProgress.total) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
      </motion.div>
    );
  }

  if (!isGenerating && aiCaptionsCount > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-200 p-4 text-center text-green-700"
      >
        ✅ AI captions generated for {aiCaptionsCount} images
      </motion.div>
    );
  }

  return null;
};

export default AiCaptionProgress;
