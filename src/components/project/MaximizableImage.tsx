
import React, { useState, useEffect } from "react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import ImageOverlay from "./image/ImageOverlay";
import UploadOverlay from "./image/UploadOverlay";
import ImageWithFallback from "./ImageWithFallback";
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
  }, [src, currentSrc]);

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

  // Fallback image URL
  const fallbackImageUrl = "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80";

  return (
    <div className={`relative ${className}`} key={`image-container-${refreshKey}`}>
      <div 
        className="relative group overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <ImageWithFallback
          src={currentSrc}
          alt={alt}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          fallbackSrc={fallbackImageUrl}
          priority={priority}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        
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
