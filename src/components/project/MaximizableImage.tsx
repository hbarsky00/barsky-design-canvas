
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

  console.log('🖼️ MaximizableImage: Show editing controls:', showEditingControls);

  const { handleImageReplace } = useImageUploadHandler({
    projectId,
    currentSrc,
    onImageReplace: (newSrc) => {
      console.log('✅ MaximizableImage: Image replaced successfully:', newSrc);
      setCurrentSrc(newSrc);
      setImageError(false);
      setIsUploading(false);
      if (onImageReplace) {
        onImageReplace(newSrc);
      }
    },
    setCurrentSrc,
    setImageError,
    setForceRefresh: () => {}
  });

  // Handle upload start and completion
  const handleUploadStart = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow uploads in dev mode
    if (!showEditingControls) {
      event.target.value = '';
      return;
    }

    const file = event.target.files?.[0];
    if (!file || !projectId) {
      event.target.value = '';
      return;
    }

    console.log('📤 Starting image upload...');
    setIsUploading(true);
    
    try {
      await handleImageReplace(event);
    } catch (error) {
      console.error('❌ Upload error:', error);
      setIsUploading(false);
      setImageError(true);
    }
    
    // Always clear the input
    event.target.value = '';
  };

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
    // Only allow removal in dev mode
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

  // Use alt text as the title instead of caption to avoid HTML
  const imageTitle = alt || 'Image';

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
            title={imageTitle}
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
