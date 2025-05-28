
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
