
import { useState, useEffect, useCallback } from 'react';

interface UseContentEditorStateProps {
  images: string[];
  onImageAdd?: (imageSrc: string) => void;
  onImageReplace?: (index: number, newSrc: string) => void;
  onImageRemove?: (index: number) => void;
}

export const useContentEditorState = ({
  images,
  onImageAdd,
  onImageReplace,
  onImageRemove
}: UseContentEditorStateProps) => {
  const [localImages, setLocalImages] = useState<string[]>(images);
  const [lastUpdateTime, setLastUpdateTime] = useState(Date.now());

  // Sync with parent images when they change
  useEffect(() => {
    const now = Date.now();
    // Only sync if enough time has passed since our last update (to avoid loops)
    if (now - lastUpdateTime > 200 && JSON.stringify(images) !== JSON.stringify(localImages)) {
      console.log('useContentEditorState: Syncing with parent images:', images);
      setLocalImages(images);
    }
  }, [images, localImages, lastUpdateTime]);

  const handleImageAdd = useCallback((imageSrc: string) => {
    console.log('useContentEditorState: Adding image:', imageSrc);
    const newImages = [...localImages, imageSrc];
    setLocalImages(newImages);
    setLastUpdateTime(Date.now());
    
    if (onImageAdd) {
      onImageAdd(imageSrc);
    }
  }, [localImages, onImageAdd]);

  const handleImageReplace = useCallback((index: number, newSrc: string) => {
    console.log('useContentEditorState: Replacing image at index', index, 'with:', newSrc);
    const newImages = [...localImages];
    newImages[index] = newSrc;
    setLocalImages(newImages);
    setLastUpdateTime(Date.now());
    
    if (onImageReplace) {
      onImageReplace(index, newSrc);
    }
  }, [localImages, onImageReplace]);

  const handleImageRemove = useCallback((index: number) => {
    console.log('useContentEditorState: Removing image at index:', index);
    const newImages = localImages.filter((_, i) => i !== index);
    setLocalImages(newImages);
    setLastUpdateTime(Date.now());
    
    if (onImageRemove) {
      onImageRemove(index);
    }
  }, [localImages, onImageRemove]);

  return {
    localImages,
    handleImageAdd,
    handleImageReplace,
    handleImageRemove
  };
};
