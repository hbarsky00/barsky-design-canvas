
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
  const [imageError, setImageError] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(0);
  const showEditingControls = shouldShowEditingControls();

  // Use the src prop directly - no local state management
  const currentSrc = src;

  console.log('🖼️ MaximizableImage: Rendering with src:', currentSrc);
  console.log('🖼️ MaximizableImage: Show editing controls:', showEditingControls);

  const { handleImageReplace } = useImageUploadHandler({
    projectId,
    currentSrc,
    onImageReplace: async (newSrc) => {
      console.log('✅ MaximizableImage: Upload completed, calling parent callback:', newSrc);
      setIsUploading(false);
      setImageError(false);
      if (onImageReplace) {
        await onImageReplace(newSrc);
      }
    },
    setCurrentSrc: () => {}, // No local state management
    setImageError,
    setForceRefresh
  });

  const handleUploadStart = async (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('📤 MaximizableImage: Upload started');
    setIsUploading(true);
    setImageError(false);
    
    try {
      await handleImageReplace(event);
    } catch (error) {
      console.error('❌ Upload error:', error);
      setIsUploading(false);
      setImageError(true);
    }
  };

  const handleMaximize = () => {
    if (!imageError) {
      maximizeImage(currentSrc, alt, imageList, currentIndex);
    }
  };

  const handleImageRemove = () => {
    if (onImageRemove && showEditingControls) {
      console.log('🗑️ Removing image:', currentSrc);
      onImageRemove();
    }
  };

  const handleImageError = () => {
    console.error('❌ Image failed to load:', currentSrc);
    setImageError(true);
    setIsUploading(false);
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', currentSrc.substring(0, 50) + '...');
    setImageError(false);
    setIsUploading(false);
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
          onImageReplace={handleUploadStart}
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
