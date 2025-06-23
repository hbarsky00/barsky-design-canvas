
import React, { useState, useEffect } from "react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import ImageOverlay from "./image/ImageOverlay";
import UploadOverlay from "./image/UploadOverlay";
import ImageErrorFallback from "./image/ImageErrorFallback";
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
  const [refreshKey, setRefreshKey] = useState(0);
  const showEditingControls = shouldShowEditingControls();

  const { handleImageReplace } = useImageUploadHandler({
    projectId,
    currentSrc,
    onImageReplace,
    setCurrentSrc,
    setImageError,
    setForceRefresh: setRefreshKey
  });

  // Update current source when prop changes
  useEffect(() => {
    if (src !== currentSrc) {
      console.log('🔄 MaximizableImage: Source changed from', currentSrc.substring(0, 30), 'to', src.substring(0, 30));
      setCurrentSrc(src);
      setImageError(false);
      setRefreshKey(prev => prev + 1);
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

  // Simple cache busting only when needed
  const displayUrl = React.useMemo(() => {
    // Only add cache busting for blob URLs or when we have a refresh key > 0
    if (currentSrc.startsWith('blob:') || refreshKey > 0) {
      const separator = currentSrc.includes('?') ? '&' : '?';
      return `${currentSrc}${separator}t=${refreshKey}`;
    }
    return currentSrc;
  }, [currentSrc, refreshKey]);

  return (
    <div className={`relative ${className}`} key={`image-container-${refreshKey}`}>
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
            key={`img-${displayUrl}`}
            src={displayUrl}
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
      
      {caption && (
        <div className="mt-2 px-2">
          <p className="text-gray-600 text-sm text-center">{caption}</p>
        </div>
      )}
    </div>
  );
};

export default MaximizableImage;
