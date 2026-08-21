import React, { useState, useEffect } from "react";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";
import ImageErrorFallback from "./image/ImageErrorFallback";
import EditableCaption from "../caption/EditableCaption";
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
  width?: number;
  height?: number;
  aspectRatio?: string;
  fit?: 'cover' | 'contain';
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
  width,
  height,
  aspectRatio,
  fit = 'cover',
}) => {
  const { maximizeImage } = useImageMaximizer();
  const [currentSrc, setCurrentSrc] = useState(src);
  const [imageError, setImageError] = useState(false);

  // Only update source if prop actually changes
  useEffect(() => {
    if (src !== currentSrc && src) {
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

  const handleImageError = () => setImageError(true);
  const handleImageLoad = () => setImageError(false);

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
        <div className="relative aspect-video rounded-xs overflow-hidden shadow-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
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

  return (
    <figure
      className={`relative group overflow-hidden cursor-pointer w-full max-w-full ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {imageError ? (
        <ImageErrorFallback originalSrc={currentSrc} />
      ) : isLoomVideo ? (
        <iframe
          src={getEmbedUrl(currentSrc)}
          title={imageTitle}
          className="w-full h-full transition-transform duration-300 group-hover:scale-105"
          frameBorder="0"
          allowFullScreen
          onLoad={handleImageLoad}
          style={{
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
          tabIndex={0}
          role="button"
          aria-label={`Click to view ${alt} in full screen`}
          style={{
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
