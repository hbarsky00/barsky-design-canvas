
import React from "react";
import ProjectMultiImageGallery from "./ProjectMultiImageGallery";

interface FigmaEmbedProps {
  embedUrl?: string;
  galleryImages?: string[];
  captions?: Record<string, string>;
  onImageClick?: (image: string, title: string) => void;
}

const FigmaEmbed: React.FC<FigmaEmbedProps> = ({ embedUrl, galleryImages = [], captions = {}, onImageClick }) => {
  // If we have gallery images, show them instead of the Figma embed
  if (galleryImages && galleryImages.length > 0) {
    return (
      <ProjectMultiImageGallery 
        images={galleryImages} 
        captions={captions} 
        onImageClick={onImageClick} 
      />
    );
  }
  
  // If there's no gallery images but we have a Figma embed URL, show that
  if (embedUrl) {
    return (
      <div className="mb-8 rounded-lg overflow-hidden shadow-sm">
        <div className="w-full" style={{ height: '450px' }}>
          <iframe
            src={embedUrl}
            title="Figma Design"
            className="w-full h-full border-0"
            allowFullScreen
          />
        </div>
      </div>
    );
  }
  
  // If there's no gallery images and no Figma embed, return null
  return null;
};

export default FigmaEmbed;
