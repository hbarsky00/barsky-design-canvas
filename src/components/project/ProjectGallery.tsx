
import React from "react";
import ProjectMultiImageGallery from "./ProjectMultiImageGallery";
import { useImageMaximizer } from "@/context/ImageMaximizerContext";

interface ProjectGalleryProps {
  galleryImages?: string[];
  captions?: Record<string, string>;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ 
  galleryImages = [],
  captions = {}
}) => {
  const { maximizeImage } = useImageMaximizer();
  
  const handleImageClick = (image: string, title: string) => {
    // Pass the full gallery images array and current index for navigation
    const currentIndex = galleryImages.indexOf(image);
    maximizeImage(image, title, galleryImages, currentIndex);
    console.log("Gallery image clicked from ProjectGallery:", image);
  };
  
  // If we have gallery images, show a carousel
  if (galleryImages && galleryImages.length > 0) {
    return (
      <ProjectMultiImageGallery
        images={galleryImages}
        captions={captions}
        onImageClick={handleImageClick}
      />
    );
  }
  
  return null;
};

export default ProjectGallery;
