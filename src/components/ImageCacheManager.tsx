
import React, { useEffect } from 'react';
import { clearAllImageCaches } from '@/utils/imageCacheUtils';

const ImageCacheManager: React.FC = () => {
  useEffect(() => {
    // Clear caches on component mount
    clearAllImageCaches();
    
    const handleClearCaches = () => {
      clearAllImageCaches();
    };
    
    window.addEventListener('clearImageCaches', handleClearCaches);
    
    return () => {
      window.removeEventListener('clearImageCaches', handleClearCaches);
    };
  }, []);
  
  return null;
};

export default ImageCacheManager;
