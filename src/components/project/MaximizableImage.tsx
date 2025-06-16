
import React from "react";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import EditImageButton from "@/components/dev/EditImageButton";
import EditableText from "@/components/dev/EditableText";
import { useParams } from "react-router-dom";
import { useImageState } from "@/hooks/useImageState";
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
  hideEditButton = false
}) => {
  const { maximizeImage } = useImageMaximizer();
  const { projectId: routeProjectId } = useParams<{ projectId: string }>();
  const currentProjectId = projectId || routeProjectId || '';
  
  console.log('🖼️ MaximizableImage render:', { src: src.substring(0, 50), currentProjectId, hideEditButton });
  
  const { displayedImage, refreshKey, forceRefresh, updateDisplayedImage, hasDevModeChanges } = useImageState({
    src,
    projectId: currentProjectId
  });

  useProjectDataSync({
    projectId: currentProjectId,
    onRefresh: forceRefresh
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
    console.log('🔄 MaximizableImage: Image replacement requested', { 
      oldSrc: src, 
      newSrc: newSrc.substring(0, 50) + '...', 
      projectId: currentProjectId 
    });
    
    // Immediately update the displayed image for instant feedback
    updateDisplayedImage(newSrc);
    
    // Call the parent callback if provided
    if (onImageReplace) {
      console.log('📞 Calling parent onImageReplace callback');
      onImageReplace(newSrc);
    }
    
    // Force refresh after a short delay to ensure all data is updated
    setTimeout(() => {
      console.log('🔄 Forcing refresh after image replacement');
      forceRefresh();
    }, 100);
  };

  const handleImageError = () => {
    console.error('❌ Image failed to load:', displayedImage);
    // Try fallback to original source
    if (displayedImage !== src) {
      console.log('🔄 Falling back to original source:', src);
      updateDisplayedImage(src);
    }
  };

  const imageAltText = caption || alt;
  
  return (
    <div className="w-full">
      <motion.div 
        className={`rounded-lg overflow-hidden border border-gray-100 shadow-sm group relative ${className} ${hasDevModeChanges ? 'ring-2 ring-blue-400 ring-opacity-50' : ''}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        key={`${displayedImage}-${refreshKey}`}
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
          refreshKey={refreshKey}
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
