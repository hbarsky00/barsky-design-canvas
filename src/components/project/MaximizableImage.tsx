import React, { useState, useEffect } from "react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import ImageOverlay from "./image/ImageOverlay";
import UploadOverlay from "./image/UploadOverlay";
import ImageErrorFallback from "./image/ImageErrorFallback";
import EditableCaption from "../caption/EditableCaption";
import { useImageUploadHandler } from "./image/useImageUploadHandler";
import AnnotatedImage from "../case-study/AnnotatedImage";
import { ImageAnnotation } from "@/data/structuredCaseStudies";

interface MaximizableImageProps {
  src: string;
  alt: string;
  caption?: string;
  annotations?: ImageAnnotation[];
  imageList?: string[];
  currentIndex?: number;
  priority?: boolean;
  className?: string;
  projectId?: string;
  hideEditButton?: boolean;
  allowRemove?: boolean;
  onImageReplace?: (newSrc: string) => void;
  onImageRemove?: () => void;
  width?: number;
  height?: number;
  aspectRatio?: string;
  fit?: 'cover' | 'contain';
}

const MaximizableImage: React.FC<MaximizableImageProps> = ({
  src,
  alt,
  caption,
  annotations,
  imageList = [src],
  currentIndex = 0,
  priority = false,
  className = "",
  projectId,
  hideEditButton = false,
  allowRemove = false,
  onImageReplace,
  onImageRemove,
  width,
  height,
  aspectRatio,
  fit = 'cover',
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
    onImageReplace: newSrc => {
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
      maximizeImage(currentSrc, caption || alt, imageList, currentIndex);
    }
  };

  const handleImageKeypress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleMaximize();
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

  const imageTitle = alt || 'Image';
  const isLoomVideo = currentSrc.includes('loom.com/share/');

  const getEmbedUrl = (url: string) => {
    if (isLoomVideo) {
      const videoId = url.split('loom.com/share/')[1]?.split('?')[0];
      return `https://www.loom.com/embed/${videoId}`;
    }
    return url;
  };

  // Handle placeholder images
  if (currentSrc === "placeholder") {
    return (
      <figure 
        className={`relative group overflow-hidden w-full max-w-full ${className}`} 
        data-lovable-element="image-container" 
        data-lovable-editable="image-wrapper"
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-4 max-w-md">
              {alt}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              Placeholder — replace with final image
            </p>
          </div>
          <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>
        {caption && (
          <EditableCaption 
            imageSrc={currentSrc} 
            initialCaption={caption} 
            projectId={projectId} 
            variant="default"
            size="xs"
            alignment="center"
          />
        )}
      </figure>
    );
  }

  // Annotations temporarily hidden - fallback to regular image
  // if (annotations && annotations.length > 0) {
  //   return (
  //     <figure 
  //       className={`relative group overflow-hidden w-full max-w-full ${className}`}
  //       data-lovable-element="image-container" 
  //       data-lovable-editable="image-wrapper"
  //       style={aspectRatio ? { aspectRatio } : undefined}
  //     >
  //       <AnnotatedImage
  //         src={currentSrc}
  //         alt={alt}
  //         annotations={annotations}
  //         className="w-full h-auto"
  //       />
  //       <EditableCaption 
  //         imageSrc={currentSrc} 
  //         initialCaption={caption || ''} 
  //         projectId={projectId} 
  //         variant="default"
  //         size="xs"
  //         alignment="center"
  //       />
  //     </figure>
  //   );
  // }

  return (
    <figure 
      className={`relative group overflow-hidden cursor-pointer w-full max-w-full ${className}`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)} 
      data-lovable-element="image-container" 
      data-lovable-editable="image-wrapper"
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {imageError ? (
        <ImageErrorFallback showEditingControls={showEditingControls} originalSrc={currentSrc} />
      ) : isLoomVideo ? (
        <iframe 
          src={getEmbedUrl(currentSrc)} 
          title={imageTitle} 
          className="w-full h-full transition-transform duration-300 group-hover:scale-105" 
          frameBorder="0" 
          allowFullScreen 
          onLoad={handleImageLoad}
          style={{
            opacity: isUploading ? 0.7 : 1,
            transition: 'opacity 0.3s ease',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '70vh'
          }} 
        />
      ) : (
        <img 
          src={currentSrc} 
          alt={alt} 
          title={imageTitle} 
          width={width}
          height={height}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          loading={priority ? "eager" : "lazy"} 
          onClick={handleMaximize} 
          onKeyDown={handleImageKeypress} 
          onError={handleImageError} 
          onLoad={handleImageLoad} 
          data-lovable-editable="image" 
          data-image-src={currentSrc} 
          data-project-id={projectId} 
          tabIndex={0} 
          role="button" 
          aria-label={`Click to view ${alt} in full screen`}
          style={{
            opacity: isUploading ? 0.7 : 1,
            transition: 'opacity 0.3s ease',
            display: 'block',
            width: '100%',
            height: fit === 'contain' ? 'auto' : '100%',
            maxWidth: '100%',
            imageRendering: 'crisp-edges',
            filter: 'contrast(1.03) saturate(1.02) brightness(1.01)',
            maxHeight: '70vh',
            objectFit: fit
          }} 
          className={`w-full max-w-full image-high-quality image-drop-shadow ${fit === 'contain' ? 'h-auto object-contain' : 'h-full object-cover'} transition-transform duration-300 group-hover:scale-105`} 
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
      
      <EditableCaption 
        imageSrc={currentSrc} 
        initialCaption={caption || ''} 
        projectId={projectId} 
        variant="default"
        size="xs"
        alignment="center"
      />
    </figure>
  );
};

export default MaximizableImage;
