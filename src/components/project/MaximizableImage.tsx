
import React, { useState } from "react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import ImageOverlay from "./image/ImageOverlay";
import UploadOverlay from "./image/UploadOverlay";
import ImageErrorFallback from "./image/ImageErrorFallback";
import EditableCaption from "../caption/EditableCaption";

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
  onImageReplace?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove?: () => void;
  isUploading?: boolean;
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
  onImageRemove,
  isUploading = false
}) => {
  const { maximizeImage } = useImageMaximizer();
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const showEditingControls = shouldShowEditingControls();

  console.log('🖼️ MaximizableImage: Rendering with src:', src);

  const handleMaximize = () => {
    if (!imageError) {
      maximizeImage(src, alt, imageList, currentIndex);
    }
  };

  const handleImageRemove = () => {
    if (onImageRemove && showEditingControls) {
      onImageRemove();
    }
  };

  const handleImageError = () => {
    console.error('❌ Image failed to load:', src);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully');
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
            originalSrc={src}
          />
        ) : (
          <img
            src={src}
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
          onImageReplace={onImageReplace}
          onImageRemove={handleImageRemove}
        />
      </div>
      
      <EditableCaption
        imageSrc={src}
        initialCaption={caption || ''}
        projectId={projectId}
        className="maximizable-image-caption"
      />
    </div>
  );
};

export default MaximizableImage;
