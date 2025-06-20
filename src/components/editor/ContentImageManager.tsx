
import React, { useState, useEffect, useCallback } from 'react';
import { shouldShowEditingControls } from '@/utils/devModeDetection';
import ImageUploadButton from './image-manager/ImageUploadButton';
import ImageList from './image-manager/ImageList';
import { useImageUpload } from './image-manager/useImageUpload';

interface ContentImageManagerProps {
  images: string[];
  onImageAdd?: (imageSrc: string) => void;
  onImageReplace?: (index: number, newSrc: string) => void;
  onImageRemove?: (index: number) => void;
  maxImages?: number;
  projectId?: string;
  imageCaptions?: Record<string, string>;
}

const ContentImageManager: React.FC<ContentImageManagerProps> = ({
  images,
  onImageAdd,
  onImageReplace,
  onImageRemove,
  maxImages = 3,
  projectId,
  imageCaptions = {}
}) => {
  const [localImages, setLocalImages] = useState<string[]>(images);
  const [componentKey, setComponentKey] = useState(Date.now());
  const showEditingControls = shouldShowEditingControls();
  
  const { isSelecting, handleImageAdd } = useImageUpload({ 
    projectId, 
    onImageAdd: (imageSrc) => {
      const updatedImages = [...localImages, imageSrc];
      setLocalImages(updatedImages);
      setComponentKey(Date.now());
      onImageAdd?.(imageSrc);
    }
  });

  // Sync with parent images prop and force complete refresh
  useEffect(() => {
    if (JSON.stringify(images) !== JSON.stringify(localImages)) {
      console.log('🔄 ContentImageManager: Images changed, forcing complete refresh');
      console.log('Old images:', localImages);
      console.log('New images:', images);
      
      setLocalImages(images);
      setComponentKey(Date.now());
    }
  }, [images]);

  // Listen for global image replacement events
  useEffect(() => {
    const handleImageReplaced = (event: CustomEvent) => {
      const { oldSrc, newSrc } = event.detail;
      console.log('🔄 Global image replacement detected:', oldSrc, '->', newSrc);
      
      setLocalImages(prev => {
        const updated = prev.map(img => img === oldSrc ? newSrc : img);
        console.log('Updated local images:', updated);
        return updated;
      });
      setComponentKey(Date.now());
    };

    window.addEventListener('imageReplaced', handleImageReplaced as EventListener);
    return () => {
      window.removeEventListener('imageReplaced', handleImageReplaced as EventListener);
    };
  }, []);

  const handleImageReplace = useCallback((index: number, newSrc: string) => {
    if (!onImageReplace) return;
    
    console.log('🔄 ContentImageManager: Replacing image at index', index, 'with:', newSrc);
    
    setLocalImages(prev => {
      const updated = [...prev];
      updated[index] = newSrc;
      console.log('Updated images after replacement:', updated);
      return updated;
    });
    
    setComponentKey(Date.now());
    onImageReplace(index, newSrc);
  }, [onImageReplace]);

  const handleImageRemove = useCallback((index: number) => {
    if (!onImageRemove) return;
    
    const updatedImages = localImages.filter((_, i) => i !== index);
    
    console.log('🗑️ ContentImageManager: Removing image at index:', index);
    setLocalImages(updatedImages);
    setComponentKey(Date.now());
    onImageRemove(index);
  }, [localImages, onImageRemove]);

  if (!onImageAdd && localImages.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-4" key={`manager-${componentKey}`}>
      {showEditingControls && onImageAdd && (
        <ImageUploadButton
          onImageAdd={handleImageAdd}
          isSelecting={isSelecting}
          isDisabled={isSelecting}
          maxImages={maxImages}
          currentImageCount={localImages.length}
          projectId={projectId}
        />
      )}

      <ImageList
        images={localImages}
        imageCaptions={imageCaptions}
        projectId={projectId}
        showEditingControls={showEditingControls}
        componentKey={componentKey}
        onImageReplace={handleImageReplace}
        onImageRemove={handleImageRemove}
      />
    </div>
  );
};

export default ContentImageManager;
