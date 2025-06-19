
import React, { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import EditImageButton from "@/components/dev/EditImageButton";
import EditableText from "@/components/dev/EditableText";
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
  const { getImageSrc, saveTextContent, getTextContent } = useProjectPersistence(currentProjectId);
  
  // Simple state management - no complex hooks
  const [displayedImage, setDisplayedImage] = useState(() => {
    // Priority: imageReplacements prop > persistence > original
    if (imageReplacements?.[src]) {
      return imageReplacements[src];
    }
    return getImageSrc(src);
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Create a unique caption key based on the original image src and project
  const createCaptionKey = (imageSrc: string, projectId: string) => {
    // Create a hash of the image src to ensure uniqueness
    const srcHash = imageSrc.split('/').pop()?.replace(/[^a-zA-Z0-9]/g, '_') || 'unknown';
    return `image_caption_${srcHash}_${projectId}`;
  };
  
  const captionKey = createCaptionKey(src, currentProjectId);
  
  // Get the saved caption or use the provided caption as fallback
  const savedCaption = getTextContent(captionKey, caption || 'Click to add a caption...');
  
  // Update displayed image when replacements change
  useEffect(() => {
    const newSrc = imageReplacements?.[src] || getImageSrc(src);
    if (newSrc !== displayedImage) {
      console.log('📸 MaximizableImage: Updating displayed image:', newSrc.substring(0, 50) + '...');
      setDisplayedImage(newSrc);
      setHasError(false);
    }
  }, [src, imageReplacements, getImageSrc, displayedImage]);
  
  // Listen for project updates - simplified
  useEffect(() => {
    const handleProjectUpdate = (e: CustomEvent) => {
      const detail = e.detail || {};
      if (detail.src === src && detail.newSrc) {
        console.log('🔄 MaximizableImage: Project update for this image');
        setDisplayedImage(detail.newSrc);
        setHasError(false);
      }
    };

    window.addEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    
    return () => {
      window.removeEventListener('projectDataUpdated', handleProjectUpdate as EventListener);
    };
  }, [src]);
  
  const handleImageClick = () => {
    const imageTitle = savedCaption || alt || "Image";

    if (imageList && currentIndex !== undefined) {
      maximizeImage(displayedImage, imageTitle, imageList, currentIndex);
    } else {
      maximizeImage(displayedImage, imageTitle);
    }
  };

  const handleImageReplace = useCallback((newSrc: string) => {
    console.log('🔄 MaximizableImage: Image replace triggered:', {
      originalSrc: src.substring(0, 30) + '...',
      newSrc: newSrc.substring(0, 30) + '...',
      projectId: currentProjectId
    });
    
    // Immediate UI update
    setDisplayedImage(newSrc);
    setHasError(false);
    
    // Call parent callback if provided
    if (onImageReplace) {
      onImageReplace(newSrc);
    }
  }, [src, currentProjectId, onImageReplace]);

  const handleImageRemove = useCallback(() => {
    console.log('🗑️ MaximizableImage: Image remove triggered:', {
      originalSrc: src.substring(0, 30) + '...',
      projectId: currentProjectId
    });
    
    if (onImageRemove) {
      onImageRemove();
    }
  }, [src, currentProjectId, onImageRemove]);

  const handleCaptionUpdate = useCallback((newCaption: string) => {
    console.log('📝 MaximizableImage: Updating caption for image:', {
      src: src.substring(0, 30) + '...',
      captionKey,
      newCaption: newCaption.substring(0, 50) + '...'
    });
    
    // Save the caption with the unique key
    saveTextContent(captionKey, newCaption);
    
    // Call parent callback if provided
    if (onCaptionUpdate) {
      onCaptionUpdate(newCaption);
    }
  }, [captionKey, saveTextContent, onCaptionUpdate]);

  const handleImageError = () => {
    console.error('❌ Image failed to load:', displayedImage.substring(0, 50) + '...');
    setHasError(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const imageAltText = savedCaption || alt;
  
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
          imageAltText={imageAltText}
          aspectRatio={aspectRatio}
          priority={priority}
          refreshKey={0}
          onImageClick={handleImageClick}
          onImageError={handleImageError}
          onImageLoad={handleImageLoad}
        />
      </motion.div>
      
      {/* Caption section with unique key */}
      <div className="mt-2 text-sm text-gray-600 italic text-center">
        <EditableText 
          initialText={savedCaption}
          textKey={captionKey}
          multiline={true}
          onUpdate={handleCaptionUpdate}
        >
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
    </div>
  );
};

export default MaximizableImage;
