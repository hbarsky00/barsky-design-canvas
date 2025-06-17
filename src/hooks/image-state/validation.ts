
import { useCallback } from 'react';

export const useImageValidation = () => {
  // Validate URL helper - more strict for published content
  const isValidImageUrl = useCallback((url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    
    // Allow data URLs, blob URLs, and HTTP(S) URLs
    return url.startsWith('data:') || 
           url.startsWith('blob:') || 
           url.startsWith('http://') || 
           url.startsWith('https://') ||
           url.startsWith('/');
  }, []);

  // Validate URL for published content (stricter)
  const isValidPublishedUrl = useCallback((url: string): boolean => {
    if (!url || typeof url !== 'string') return false;
    
    // Only allow HTTP(S) URLs and absolute paths for published content
    return url.startsWith('http://') || 
           url.startsWith('https://') ||
           url.startsWith('/');
  }, []);

  return {
    isValidImageUrl,
    isValidPublishedUrl
  };
};
