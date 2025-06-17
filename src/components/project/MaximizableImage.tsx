
import React from "react";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import EditImageButton from "@/components/dev/EditImageButton";
import EditableText from "@/components/dev/EditableText";
import { useParams } from "react-router-dom";
import { useImageStateManager } from "@/hooks/useImageStateManager";
import { useProjectDataSync } from "@/hooks/useProjectDataSync";
import ImageDisplay from "./ImageDisplay";

interface MaximizableImageProps {
  src: string;
  alt: string;
  caption?: string;
  aspectRatio?: number;
  className?: string;
  priority?: boolean;
  imageList?: string[];
  currentIndex?: number;
  onImageReplace?: (newSrc: string) => void;
  projectId?: string;
  hideEditButton?: boolean;
  imageReplacements?: Record<string, string>;
}

const MaximizableImage: React.FC<MaximizableImageProps> = ({
  src,
  alt,
  caption,
  aspectRatio,
  className = "",
  priority = false,
  imageList,
  currentIndex,
  onImageReplace,
  projectId,
  hideEditButton = false,
  imageReplacements
}) => {
  const { maximizeImage } = useImageMaximizer();
  const { projectId: routeProjectId } = useParams<{ projectId: string }>();
  const currentProjectId = projectId || routeProjectId || '';
  
  const { 
    displayedImage, 
    updateDisplayedImage, 
    forceRefresh, 
    hasDevModeChanges, 
    hasError,
    isLoading,
    isValidUrl
  } = useImageStateManager({
    src,
    projectId: currentProjectId,
    imageReplacements
  });

  useProjectDataSync({
    projectId: currentProjectId,
    onRefresh: forceRefresh
  });
  
  // Debug info
  console.log('🖼️ MaximizableImage render:', {
    src: src.substring(0, 30) + '...',
    displayedImage: displayedImage.substring(0, 30) + '...',
    isValidUrl,
    hasError,
    isLoading,
    hasDevModeChanges,
    hasPublishedReplacement: !!imageReplacements?.[src],
    hideEditButton
  });
  
  const handleImageClick = () => {
    const imageTitle = caption || alt || "Image";

    if (imageList && currentIndex !== undefined) {
      maximizeImage(displayedImage, imageTitle, imageList, currentIndex);
    } else {
      maximizeImage(displayedImage, imageTitle);
    }
  };

  const handleImageReplace = (newSrc: string) => {
    console.log('🔄 MaximizableImage: Image replace triggered:', {
      originalSrc: src.substring(0, 30) + '...',
      newSrc: newSrc.substring(0, 30) + '...',
      projectId: currentProjectId
    });
    
    // Immediately update the displayed image for instant feedback
    updateDisplayedImage(newSrc);
    
    // Call the parent callback if provided
    if (onImageReplace) {
      onImageReplace(newSrc);
    }
  };

  const handleImageError = () => {
    console.error('❌ Image failed to load:', {
      displayedImage: displayedImage.substring(0, 50) + '...',
      isValidUrl,
      originalSrc: src.substring(0, 50) + '...'
    });
    
    // Only attempt fallback if we haven't already had an error and it's not the original source
    if (!hasError && displayedImage !== src) {
      console.log('🔄 Attempting fallback to original source');
      updateDisplayedImage(src);
    }
  };

  const imageAltText = caption || alt;
  
  // Show loading state
  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <motion.div 
          className="rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center min-h-[200px]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-gray-500 text-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p>Loading image...</p>
          </div>
        </motion.div>
      </div>
    );
  }
  
  // Show error state for invalid URLs or failed loads
  if (!isValidUrl || (hasError && displayedImage === src)) {
    return (
      <div className={`w-full ${className}`}>
        <motion.div 
          className="rounded-lg overflow-hidden border border-red-200 bg-red-50 flex items-center justify-center min-h-[200px]"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-red-600 text-center p-4">
            <p className="font-medium">⚠️ Image failed to load</p>
            <p className="text-sm mt-1">URL: {displayedImage.substring(0, 50)}...</p>
            <button 
              onClick={forceRefresh}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
            >
              Retry Loading
            </button>
          </div>
        </motion.div>
        {caption && (
          <div className="mt-2 text-sm text-gray-600 italic text-center">
            <EditableText initialText={caption}>
              {(text) => (
                <motion.div
                  className="pr-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {text}
                </motion.div>
              )}
            </EditableText>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <motion.div 
        className={`rounded-lg overflow-hidden border border-gray-100 shadow-sm group relative ${className} ${hasDevModeChanges ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        key={`${displayedImage}-${hasDevModeChanges}`}
      >
        {!hideEditButton && (
          <EditImageButton 
            src={src} 
            onImageReplace={handleImageReplace}
            projectId={currentProjectId}
          />
        )}
        
        <ImageDisplay
          displayedImage={displayedImage}
          imageAltText={imageAltText}
          aspectRatio={aspectRatio}
          priority={priority}
          refreshKey={hasDevModeChanges ? Date.now() : 0}
          onImageClick={handleImageClick}
          onImageError={handleImageError}
        />
      </motion.div>
      
      {caption && (
        <div className="mt-2 text-sm text-gray-600 italic text-center">
          <EditableText initialText={caption}>
            {(text) => (
              <motion.div
                className="pr-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {text}
              </motion.div>
            )}
          </EditableText>
        </div>
      )}
    </div>
  );
};

export default MaximizableImage;
