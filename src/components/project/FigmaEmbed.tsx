
import React from "react";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import ProjectMultiImageGallery from "./ProjectMultiImageGallery";

interface FigmaEmbedProps {
  embedUrl: string;
  galleryImages?: string[];
  captions?: Record<string, string>;
  onImageClick?: (image: string, title: string) => void;
}

const FigmaEmbed: React.FC<FigmaEmbedProps> = ({ 
  embedUrl, 
  galleryImages = [],
  captions = {},
  onImageClick
}) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = React.useState(true);
  const [hasError, setHasError] = React.useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // If gallery images are provided, render the gallery instead of the Figma embed
  if (galleryImages && galleryImages.length > 0) {
    return (
      <ProjectMultiImageGallery 
        images={galleryImages}
        captions={captions}
        onImageClick={onImageClick}
      />
    );
  }

  return (
    <motion.div 
      className="mb-4 rounded-lg overflow-hidden border border-gray-100 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {isLoading && (
        <div className="flex justify-center items-center py-10 bg-gray-50">
          <div className="animate-pulse text-barsky-text text-sm">
            Loading Figma embed...
          </div>
        </div>
      )}
      
      {hasError && (
        <div className="flex flex-col justify-center items-center py-10 bg-gray-50">
          <p className="text-barsky-text text-sm mb-2">
            The Figma embed couldn't be loaded on this device.
          </p>
          <a 
            href={embedUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-barsky-blue text-sm underline"
          >
            View in Figma
          </a>
        </div>
      )}
      
      <iframe 
        style={{ 
          border: "1px solid rgba(0, 0, 0, 0.1)",
          display: hasError ? "none" : "block"
        }} 
        width="100%" 
        height={isMobile ? "300" : "450"} 
        src={embedUrl}
        allowFullScreen 
        className={`w-full ${isMobile ? "scale-90 origin-top-left" : ""}`}
        onLoad={handleLoad}
        onError={handleError}
      ></iframe>
    </motion.div>
  );
};

export default FigmaEmbed;
