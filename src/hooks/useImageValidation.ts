
import { useCallback } from 'react';

export const useImageValidation = () => {
  const validateImageFile = useCallback((file: File) => {
    // Validate file type first
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`Invalid file type: ${file.type}. Please use JPG, PNG, or WebP format.`);
    }
    
    // Check initial file size
    const maxInitialSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxInitialSize) {
      throw new Error(`File is too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum allowed size is 50MB.`);
    }
  }, []);

  const validateImageUrl = useCallback((url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    return url.startsWith('data:') || 
           url.startsWith('blob:') || 
           url.startsWith('http://') || 
           url.startsWith('https://') ||
           url.startsWith('/');
  }, []);

  return {
    validateImageFile,
    validateImageUrl
  };
};
