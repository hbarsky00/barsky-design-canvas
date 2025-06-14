
export const removeDuplicateImages = (images: string[]): string[] => {
  return Array.from(new Set(images));
};

export const deduplicateAllImages = (imageArrays: (string[] | string | undefined)[]): string[] => {
  const allImages: string[] = [];
  
  imageArrays.forEach(item => {
    if (typeof item === 'string') {
      allImages.push(item);
    } else if (Array.isArray(item)) {
      allImages.push(...item);
    }
  });
  
  return removeDuplicateImages(allImages);
};

export const selectUniqueImages = (
  challengeImage?: string,
  challengeGalleryImages?: string[],
  processImage?: string,
  processBottomImage?: string,
  resultImage?: string,
  resultGalleryImages?: string[]
) => {
  // Collect all available images
  const allImages = deduplicateAllImages([
    challengeImage,
    challengeGalleryImages,
    processImage,
    processBottomImage,
    resultImage,
    resultGalleryImages
  ]);

  const usedImages = new Set<string>();
  
  // Select unique images for each section
  const selectNextUnique = (preferredImages?: string[]): string | undefined => {
    if (preferredImages) {
      for (const img of preferredImages) {
        if (!usedImages.has(img)) {
          usedImages.add(img);
          return img;
        }
      }
    }
    
    // Fallback to any unused image
    for (const img of allImages) {
      if (!usedImages.has(img)) {
        usedImages.add(img);
        return img;
      }
    }
    
    return undefined;
  };

  return {
    challenge: {
      beforeHeader: selectNextUnique(challengeImage ? [challengeImage] : challengeGalleryImages),
      afterHeader: selectNextUnique(challengeGalleryImages)
    },
    process: {
      beforeHeader: selectNextUnique(processImage ? [processImage] : undefined),
      afterHeader: selectNextUnique(processBottomImage ? [processBottomImage] : undefined)
    },
    result: {
      beforeHeader: selectNextUnique(resultImage ? [resultImage] : resultGalleryImages),
      afterHeader: selectNextUnique(resultGalleryImages)
    }
  };
};
