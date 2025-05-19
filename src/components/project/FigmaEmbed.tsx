
import React from "react";
import ProjectMultiImageGallery from "./ProjectMultiImageGallery";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";

interface FigmaEmbedProps {
  embedUrl: string;
  galleryImages?: string[];
  captions?: Record<string, string>;
}

const FigmaEmbed: React.FC<FigmaEmbedProps> = ({ 
  embedUrl, 
  galleryImages = [],
  captions = {}
}) => {
  const { maximizeImage } = useImageMaximizer();
  
  const handleImageClick = (image: string, title: string) => {
    maximizeImage(image, title);
  };
  
  // If we have gallery images, show a carousel instead of Figma embed
  if (galleryImages && galleryImages.length > 0) {
    return (
      <ProjectMultiImageGallery
        images={galleryImages}
        captions={captions}
        onImageClick={handleImageClick}
      />
    );
  }
  
  // If we have an embed URL, use the Figma embed
  if (embedUrl) {
    return (
      <div className="mb-12 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
        <iframe 
          style={{
            border: "none",
            width: "100%",
            height: "500px",
            borderRadius: "8px"
          }}
          src={embedUrl}
          allowFullScreen
          title="Project Figma Embed"
        ></iframe>
      </div>
    );
  }
  
  return null;
};

export default FigmaEmbed;
