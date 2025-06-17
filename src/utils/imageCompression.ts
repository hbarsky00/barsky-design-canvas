
export const compressImageFile = async (file: File, maxSizeKB: number = 500): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions while maintaining aspect ratio
      const maxWidth = 1200;
      const maxHeight = 1200;
      
      let { width, height } = img;
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Start with high quality and reduce if needed
      let quality = 0.8;
      let dataURL = canvas.toDataURL('image/jpeg', quality);
      
      // Reduce quality until we meet size requirements
      while (dataURL.length * 0.75 / 1024 > maxSizeKB && quality > 0.1) {
        quality -= 0.1;
        dataURL = canvas.toDataURL('image/jpeg', quality);
      }
      
      console.log(`📷 Image compressed: ${(dataURL.length * 0.75 / 1024).toFixed(2)}KB`);
      resolve(dataURL);
    };
    
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = URL.createObjectURL(file);
  });
};

export const validateImageSize = (dataURL: string): boolean => {
  // Check if the data URL is within reasonable limits (500KB)
  const sizeInBytes = dataURL.length * 0.75; // Approximate size after base64 encoding
  const sizeInKB = sizeInBytes / 1024;
  
  console.log(`🔍 Image size validation: ${sizeInKB.toFixed(2)}KB`);
  
  return sizeInKB <= 500; // 500KB limit
};
