
import React from "react";
import { ProjectDetails } from "@/data/types/project";

export const useProcessImages = (details: ProjectDetails) => {
  const processBeforeHeaderImage = details.imageConfig?.process?.beforeHeader;
  const processRegularImage = details.processImage;
  
  const processImages = React.useMemo(() => {
    const images: string[] = [];
    const seenImages = new Set<string>();
    
    // Add images in order, checking for duplicates
    if (processBeforeHeaderImage && !seenImages.has(processBeforeHeaderImage)) {
      images.push(processBeforeHeaderImage);
      seenImages.add(processBeforeHeaderImage);
    }
    
    if (processRegularImage && !seenImages.has(processRegularImage)) {
      images.push(processRegularImage);
      seenImages.add(processRegularImage);
    }
    
    // Add processGalleryImages to the process section, avoiding duplicates
    if (details.processGalleryImages) {
      details.processGalleryImages.forEach(imageSrc => {
        if (!seenImages.has(imageSrc)) {
          images.push(imageSrc);
          seenImages.add(imageSrc);
        }
      });
    }
    
    // Add servicesGalleryImages to the process section, avoiding duplicates
    if (details.servicesGalleryImages) {
      details.servicesGalleryImages.forEach(imageSrc => {
        if (!seenImages.has(imageSrc)) {
          images.push(imageSrc);
          seenImages.add(imageSrc);
        }
      });
    }
    
    return images;
  }, [processBeforeHeaderImage, processRegularImage, details.processGalleryImages, details.servicesGalleryImages]);

  return processImages;
};
