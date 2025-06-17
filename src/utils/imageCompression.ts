
export const compressImageFile = async (file: File, maxSizeKB: number = 300): Promise<string> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // More aggressive resizing for database storage
      const maxWidth = 800;  // Reduced from 1200
      const maxHeight = 800; // Reduced from 1200
      
      let { width, height } = img;
      
      // Calculate new dimensions while maintaining aspect ratio
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
      
      // Draw and compress with better quality control
      ctx?.drawImage(img, 0, 0, width, height);
      
      // Start with lower quality for better compression
      let quality = 0.7;
      let dataURL = canvas.toDataURL('image/jpeg', quality);
      
      // More aggressive quality reduction to meet size requirements
      while (dataURL.length * 0.75 / 1024 > maxSizeKB && quality > 0.05) {
        quality -= 0.05; // Smaller steps for better control
        dataURL = canvas.toDataURL('image/jpeg', quality);
      }
      
      // If still too large, try reducing dimensions further
      if (dataURL.length * 0.75 / 1024 > maxSizeKB) {
        const scaleFactor = 0.8;
        canvas.width = Math.floor(width * scaleFactor);
        canvas.height = Math.floor(height * scaleFactor);
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
        dataURL = canvas.toDataURL('image/jpeg', 0.5);
      }
      
      const finalSizeKB = (dataURL.length * 0.75 / 1024);
      console.log(`📷 Image compressed: ${finalSizeKB.toFixed(2)}KB (quality: ${quality.toFixed(2)})`);
      
      if (finalSizeKB > maxSizeKB) {
        reject(new Error(`Unable to compress image below ${maxSizeKB}KB. Final size: ${finalSizeKB.toFixed(2)}KB`));
      } else {
        resolve(dataURL);
      }
    };
    
    img.onerror = () => reject(new Error('Failed to load image for compression'));
    img.src = URL.createObjectURL(file);
  });
};

export const validateImageSize = (dataURL: string, maxSizeKB: number = 300): boolean => {
  const sizeInBytes = dataURL.length * 0.75;
  const sizeInKB = sizeInBytes / 1024;
  
  console.log(`🔍 Image size validation: ${sizeInKB.toFixed(2)}KB (limit: ${maxSizeKB}KB)`);
  
  return sizeInKB <= maxSizeKB;
};

// New utility to get optimal compression settings based on image dimensions
export const getOptimalCompressionSettings = (file: File): { maxSizeKB: number; quality: number } => {
  const fileSizeKB = file.size / 1024;
  
  if (fileSizeKB > 2000) {
    return { maxSizeKB: 200, quality: 0.5 }; // Very aggressive for large files
  } else if (fileSizeKB > 1000) {
    return { maxSizeKB: 250, quality: 0.6 }; // Aggressive for medium files
  } else {
    return { maxSizeKB: 300, quality: 0.7 }; // Standard compression
  }
};
