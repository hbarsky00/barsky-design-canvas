
import React, { useState, useEffect } from "react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import ImageOverlay from "./image/ImageOverlay";
import UploadOverlay from "./image/UploadOverlay";
import ImageErrorFallback from "./image/ImageErrorFallback";
import EditableCaption from "../caption/EditableCaption";
import { useImageUploadHandler } from "./image/useImageUploadHandler";

interface MaximizableImageProps {
  src: string;
  alt: string;
  caption?: string;
  imageList?: string[];
  currentIndex?: number;
  priority?: boolean;
  className?: string;
  projectId?: string;
  hideEditButton?: boolean;
  allowRemove?: boolean;
  onImageReplace?: (newSrc: string) => void;
  onImageRemove?: () => void;
}

const MaximizableImage: React.FC<MaximizableImageProps> = ({
  src,
  alt,
  caption,
  imageList = [src],
  currentIndex = 0,
  priority = false,
  className = "",
  projectId,
  hideEditButton = false,
  allowRemove = false,
  onImageReplace,
  onImageRemove
}) => {
  const { maximizeImage } = useImageMaximizer();
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [imageError, setImageError] = useState(false);
  const showEditingControls = shouldShowEditingControls();

  const { handleImageReplace } = useImageUploadHandler({
    projectId,
    currentSrc,
    onImageReplace: (newSrc) => {
      console.log('✅ MaximizableImage: Image replaced successfully:', newSrc);
      setCurrentSrc(newSrc);
      setImageError(false);
      if (onImageReplace) {
        onImageReplace(newSrc);
      }
    },
    setCurrentSrc,
    setImageError,
    setForceRefresh: () => {} // Simplified - no forced refreshes
  });

  // Only update source if prop actually changes
  useEffect(() => {
    if (src !== currentSrc && src) {
      console.log('🔄 MaximizableImage: Source updated from prop:', src);
      setCurrentSrc(src);
      setImageError(false);
    }
  }, [src]);

  const handleMaximize = () => {
    if (!imageError) {
      maximizeImage(currentSrc, alt, imageList, currentIndex);
    }
  };

  const handleImageRemove = () => {
    if (onImageRemove) {
      console.log('🗑️ Removing image:', currentSrc);
      onImageRemove();
    }
  };

  const handleImageError = () => {
    console.error('❌ Image failed to load:', currentSrc);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', currentSrc.substring(0, 50) + '...');
    setImageError(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className="relative group overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imageError ? (
          <ImageErrorFallback 
            showEditingControls={showEditingControls}
            originalSrc={currentSrc}
          />
        ) : (
          <img
            src={currentSrc}
            alt={alt}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
            onClick={handleMaximize}
            onError={handleImageError}
            onLoad={handleImageLoad}
            style={{ 
              opacity: isUploading ? 0.7 : 1,
              transition: 'opacity 0.3s ease'
            }}
          />
        )}
        
        <UploadOverlay isUploading={isUploading} />
        
        <ImageOverlay
          isHovered={isHovered}
          isUploading={isUploading}
          imageError={imageError}
          showEditingControls={showEditingControls}
          hideEditButton={hideEditButton}
          allowRemove={allowRemove}
          onMaximize={handleMaximize}
          onImageReplace={handleImageReplace}
          onImageRemove={handleImageRemove}
        />
      </div>
      
      <EditableCaption
        imageSrc={currentSrc}
        initialCaption={caption || ''}
        projectId={projectId}
        className="maximizable-image-caption"
      />
    </div>
  );
};

export default MaximizableImage;
