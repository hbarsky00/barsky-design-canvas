import React, { useState, useEffect } from "react";
import { imgDims } from "@/utils/imageDims";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import ImageOverlay from "./image/ImageOverlay";
import ImageErrorFallback from "./image/ImageErrorFallback";
import EditableCaption from "../caption/EditableCaption";
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
  const [currentSrc, setCurrentSrc] = useState(src);
  const [imageError, setImageError] = useState(false);
  const showEditingControls = shouldShowEditingControls();
  
  
  // Only update source if prop actually changes
  useEffect(() => {
    if (src !== currentSrc && src) {
      console.log('🔄 MaximizableImage: Source updated from prop:', src);
      setCurrentSrc(src);
      setImageError(false);
    }
  }, [src]);

  const handleMaximize = () => {
    if (imageError) return;
    // Every section used to pass only its own images, so prev/next was trapped
    // inside whichever section you happened to click in — you could not walk a
    // case study end to end. Each MaximizableImage already stamps the element
    // with data-image-src, so reading them back in DOM order gives the whole
    // case study in the order it appears on the page, with no prop drilling and
    // nothing for a new section to remember to wire up.
    const onPage = Array.from(
      document.querySelectorAll<HTMLElement>("[data-image-src]")
    ).map((el) => el.getAttribute("data-image-src") || "");
    const pageList = onPage.filter(Boolean);
    const indexOnPage = pageList.indexOf(currentSrc);
    if (pageList.length > 1 && indexOnPage !== -1) {
      maximizeImage(currentSrc, caption || alt, pageList, indexOnPage);
    } else {
      maximizeImage(currentSrc, caption || alt, imageList, currentIndex);
    }
  };

  const handleImageKeypress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleMaximize();
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
  //
  //
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

  // We only know an image's shape if the caller told us. The old default was a
  // hard 16/9 box plus object-fit:cover, so anything that wasn't 16:9 got
  // silently cropped to fit: device mockups lost their edges, 1.60-ratio
  // screenshots lost ~10% top and bottom, and a 0.46-ratio phone screenshot
  // (zocdoc-signup.png) was shaved down to a horizontal sliver. When the shape
  // Callers almost never pass width/height, which is why 14 of 15 images on a
  // case study shipped without them. Fall back to the measured intrinsic size.
  const measured = imgDims(currentSrc);
  const resolvedWidth = width ?? measured.width;
  const resolvedHeight = height ?? measured.height;

  // is unknown, let the image set its own height instead of cutting it to a
  // guess. Callers that declare aspectRatio or width+height still get a
  // reserved box, and cover can't crop there because the box matches.
  const knownAspectRatio =
    aspectRatio ?? (resolvedWidth && resolvedHeight ? `${resolvedWidth} / ${resolvedHeight}` : undefined);
  const resolvedFit = knownAspectRatio ? fit : 'contain';

  return (
    <figure 
      className={`relative group overflow-hidden cursor-pointer w-full max-w-full ${className}`} 
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}

      style={knownAspectRatio ? { aspectRatio: knownAspectRatio } : undefined}
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
          width={resolvedWidth}
          height={resolvedHeight}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
          loading={priority ? "eager" : "lazy"} 
          onClick={handleMaximize} 
          onKeyDown={handleImageKeypress} 
          onError={handleImageError} 
          onLoad={handleImageLoad}
          data-image-src={currentSrc} 
          data-project-id={projectId} 
          tabIndex={0} 
          role="button" 
          aria-label={`Click to view ${alt} in full screen`}
          style={{
            transition: 'opacity 0.3s ease',
            display: 'block',
            width: '100%',
            height: resolvedFit === 'contain' ? 'auto' : '100%',
            maxWidth: '100%',
            imageRendering: 'crisp-edges',
            filter: 'contrast(1.03) saturate(1.02) brightness(1.01)',
            maxHeight: '70vh',
            objectFit: resolvedFit
          }} 
          className={`w-full max-w-full image-high-quality image-drop-shadow ${resolvedFit === 'contain' ? 'h-auto object-contain' : 'h-full object-cover'} transition-transform duration-300 group-hover:scale-105`} 
        />
      )}
      
      <ImageOverlay
        isHovered={isHovered}
        imageError={imageError}
        onMaximize={handleMaximize}
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
