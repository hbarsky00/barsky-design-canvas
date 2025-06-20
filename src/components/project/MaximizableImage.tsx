
import React, { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import EditImageButton from "@/components/dev/EditImageButton";
import SimpleCaptionEditor from "@/components/captions/SimpleCaptionEditor";
import { useParams } from "react-router-dom";
import { useProjectPersistence } from "@/hooks/useProjectPersistence";
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
  onImageRemove?: () => void;
  projectId?: string;
  hideEditButton?: boolean;
  allowRemove?: boolean;
  imageReplacements?: Record<string, string>;
  onCaptionUpdate?: (newCaption: string) => void;
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
  onImageRemove,
  projectId,
  hideEditButton = false,
  allowRemove = true,
  imageReplacements,
  onCaptionUpdate
}) => {
  const { maximizeImage } = useImageMaximizer();
  const { projectId: routeProjectId } = useParams<{ projectId: string }>();
  const currentProjectId = projectId || routeProjectId || '';
  const { getImageSrc } = useProjectPersistence(currentProjectId);
  
  // Get the displayed image (with replacements applied)
  const displayedImage = imageReplacements?.[src] || getImageSrc(src);
  
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleImageClick = () => {
    if (imageList && currentIndex !== undefined) {
      maximizeImage(displayedImage, alt, imageList, currentIndex);
    } else {
      maximizeImage(displayedImage, alt);
    }
  };

  const handleImageReplace = useCallback((newSrc: string) => {
    console.log('🔄 MaximizableImage: Image replace triggered:', {
      originalSrc: src.substring(0, 30) + '...',
      newSrc: newSrc.substring(0, 30) + '...'
    });
    
    if (onImageReplace) {
      onImageReplace(newSrc);
    }
  }, [src, onImageReplace]);

  const handleImageRemove = useCallback(() => {
    console.log('🗑️ MaximizableImage: Image remove triggered:', {
      originalSrc: src.substring(0, 30) + '...'
    });
    
    if (onImageRemove) {
      onImageRemove();
    }
  }, [src, onImageRemove]);

  const handleImageError = () => {
    console.error('❌ Image failed to load:', displayedImage.substring(0, 50) + '...');
    setHasError(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };
  
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
  
  // Show error state
  if (hasError) {
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
              onClick={() => {
                setHasError(false);
                setIsLoading(true);
              }}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition-colors"
            >
              Retry Loading
            </button>
          </div>
        </motion.div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <motion.div 
        className={`rounded-lg overflow-hidden border border-gray-100 shadow-sm group relative ${className}`}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {!hideEditButton && (
          <EditImageButton 
            src={src} 
            onImageReplace={handleImageReplace}
            onImageRemove={allowRemove ? handleImageRemove : undefined}
            projectId={currentProjectId}
            allowRemove={allowRemove}
          />
        )}
        
        <ImageDisplay
          displayedImage={displayedImage}
          imageAltText={alt}
          aspectRatio={aspectRatio}
          priority={priority}
          refreshKey={0}
          onImageClick={handleImageClick}
          onImageError={handleImageError}
          onImageLoad={handleImageLoad}
        />
      </motion.div>
      
      {/* Display AI-generated captions only - no editing */}
      <div className="mt-2 text-sm text-gray-600 italic text-center">
        <SimpleCaptionEditor 
          imageSrc={src}
          projectId={currentProjectId}
          fallbackCaption={caption}
        >
          {(captionText) => (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {captionText}
            </motion.div>
          )}
        </SimpleCaptionEditor>
      </div>
    </div>
  );
};

export default MaximizableImage;
