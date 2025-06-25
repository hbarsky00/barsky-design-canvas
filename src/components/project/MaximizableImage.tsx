
import React, { useState, useEffect } from "react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import ImageOverlay from "./image/ImageOverlay";
import UploadOverlay from "./image/UploadOverlay";
import ImageErrorFallback from "./image/ImageErrorFallback";
import { useImageUploadWithCaption } from "./image/useImageUploadWithCaption";

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
  const [currentSrc, setCurrentSrc] = useState(src);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [forceRefresh, setForceRefresh] = useState(0);
  const showEditingControls = shouldShowEditingControls();

  const { handleImageReplace, isGeneratingCaption } = useImageUploadWithCaption({
    projectId,
    currentSrc,
    onImageReplace: (newSrc) => {
      console.log('✅ MaximizableImage: Image replaced successfully:', newSrc);
      setCurrentSrc(newSrc);
      setImageError(false);
      setImageLoaded(false);
      setForceRefresh(prev => prev + 1);
      if (onImageReplace) {
        onImageReplace(newSrc);
      }
    },
    setCurrentSrc,
    setImageError,
    setForceRefresh
  });

  const isUploading = isGeneratingCaption;

  // Update source when prop changes
  useEffect(() => {
    if (src !== currentSrc && src) {
      console.log('🔄 MaximizableImage: Source updated from prop:', src);
      setCurrentSrc(src);
      setImageError(false);
      setImageLoaded(false);
      setForceRefresh(prev => prev + 1);
    }
  }, [src]);

  // Log image loading attempts
  useEffect(() => {
    console.log('🖼️ MaximizableImage: Loading image:', {
      src: currentSrc,
      projectId,
      alt: alt.substring(0, 30),
      caption: caption?.substring(0, 30),
      forceRefresh
    });
  }, [currentSrc, projectId, alt, caption, forceRefresh]);

  const handleMaximize = () => {
    if (!imageError && imageLoaded) {
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
    console.error('❌ Image failed to load:', {
      src: currentSrc,
      projectId,
      alt,
      forceRefresh
    });
    setImageError(true);
    setImageLoaded(false);
  };

  const handleImageLoad = () => {
    console.log('✅ Image loaded successfully:', {
      src: currentSrc.substring(0, 50) + '...',
      projectId,
      alt: alt.substring(0, 30),
      forceRefresh
    });
    setImageError(false);
    setImageLoaded(true);
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className="relative group overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {imageError ? (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-gray-500 text-sm">Image failed to load</p>
              <p className="text-gray-400 text-xs mt-1">{currentSrc.substring(0, 50)}...</p>
              {showEditingControls && (
                <button 
                  onClick={() => document.getElementById(`file-upload-${currentIndex}`)?.click()}
                  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs"
                >
                  Replace Image
                </button>
              )}
            </div>
          </div>
        ) : (
          <img
            src={currentSrc}
            alt={alt}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            loading={priority ? "eager" : "lazy"}
            onClick={handleMaximize}
            onError={handleImageError}
            onLoad={handleImageLoad}
            key={`${currentSrc}-${forceRefresh}`}
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

        {/* Hidden file input for image replacement */}
        {showEditingControls && (
          <input
            id={`file-upload-${currentIndex}`}
            type="file"
            accept="image/*"
            onChange={handleImageReplace}
            className="hidden"
          />
        )}
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
