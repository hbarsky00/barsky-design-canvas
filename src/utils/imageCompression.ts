
export const compressImageFile = async (file: File, maxSizeKB: number = 1000): Promise<File> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Less aggressive resizing since we're using storage now
      const maxWidth = 1200;
      const maxHeight = 1200;
      
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
      
      // Enable high-quality rendering with clarity enhancement
      if (ctx) {
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.filter = 'contrast(1.06) saturate(1.02) brightness(1.01)';
        ctx.drawImage(img, 0, 0, width, height);
        ctx.filter = 'none';
      }
      
      // Convert to blob with high quality
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error('Failed to compress image'));
          return;
        }
        
        const compressedFile = new File([blob], file.name, {
          type: 'image/jpeg',
          lastModified: Date.now()
        });
        
        const finalSizeKB = (compressedFile.size / 1024);
        console.log(`📷 Image compressed: ${finalSizeKB.toFixed(2)}KB`);
        
        resolve(compressedFile);
      }, 'image/jpeg', 0.92);
    };
    
    img.onerror = () => reject(new Error('Failed to load image for compression'));
    img.src = URL.createObjectURL(file);
  });
};

export const validateImageSize = (file: File, maxSizeKB: number = 1000): boolean => {
  const sizeInKB = file.size / 1024;
  console.log(`🔍 Image size validation: ${sizeInKB.toFixed(2)}KB (limit: ${maxSizeKB}KB)`);
  return sizeInKB <= maxSizeKB;
};

// Get optimal compression settings based on file size
export const getOptimalCompressionSettings = (file: File): { maxSizeKB: number; quality: number } => {
  const fileSizeKB = file.size / 1024;
  
  if (fileSizeKB > 5000) {
    return { maxSizeKB: 800, quality: 0.6 }; // Aggressive for very large files
  } else if (fileSizeKB > 2000) {
    return { maxSizeKB: 1000, quality: 0.7 }; // Moderate for large files
  } else {
    return { maxSizeKB: 1200, quality: 0.8 }; // Light compression for smaller files
  }
};
