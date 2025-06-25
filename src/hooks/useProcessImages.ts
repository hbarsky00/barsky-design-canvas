
import { useMemo } from 'react';
import { ProjectDetails } from '@/data/types/project';

export const useProcessImages = (details: ProjectDetails) => {
  return useMemo(() => {
    const images: string[] = [];
    
    // Add process before header image if it exists
    if (details.imageConfig?.process?.beforeHeader) {
      images.push(details.imageConfig.process.beforeHeader);
    }
    
    // Add regular process image if it exists
    if (details.processImage) {
      images.push(details.processImage);
    }
    
    // Add process bottom image if it exists
    if (details.processBottomImage) {
      images.push(details.processBottomImage);
    }
    
    console.log('🔄 useProcessImages: Collected process images:', images.length);
    return images;
  }, [details]);
};
