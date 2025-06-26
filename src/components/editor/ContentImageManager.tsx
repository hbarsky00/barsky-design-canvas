
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
  const [forceUpdate, setForceUpdate] = useState(0);
  const showEditingControls = shouldShowEditingControls();
  
  console.log('🖼️ ContentImageManager: Rendering with', localImages.length, 'images');
  console.log('🔧 ContentImageManager: Show editing controls:', showEditingControls);
  
  const { isSelecting, handleImageAdd } = useImageUpload({ 
    projectId, 
    onImageAdd: (imageSrc) => {
      console.log('📷 ContentImageManager: Image upload callback triggered:', imageSrc.substring(0, 50) + '...');
      
      const updatedImages = [...localImages, imageSrc];
      setLocalImages(updatedImages);
      setForceUpdate(prev => prev + 1);
      
      // Call parent callback
      onImageAdd?.(imageSrc);
      
      console.log('✅ ContentImageManager: Image added to local state, new count:', updatedImages.length);
    }
  });

  // Sync with parent images prop
  useEffect(() => {
    console.log('🔄 ContentImageManager: Images prop changed from', localImages.length, 'to', images.length);
    setLocalImages(images);
    setForceUpdate(prev => prev + 1);
  }, [images]);

  const handleImageReplace = useCallback((index: number, newSrc: string) => {
    if (!onImageReplace || !showEditingControls) return;
    
    console.log('🔄 ContentImageManager: Replacing image at index', index, 'with:', newSrc.substring(0, 50) + '...');
    
    const updatedImages = [...localImages];
    updatedImages[index] = newSrc;
    setLocalImages(updatedImages);
    setForceUpdate(prev => prev + 1);
    
    onImageReplace(index, newSrc);
  }, [localImages, onImageReplace, showEditingControls]);

  const handleImageRemove = useCallback((index: number) => {
    if (!onImageRemove || !showEditingControls) return;
    
    const updatedImages = localImages.filter((_, i) => i !== index);
    
    console.log('🗑️ ContentImageManager: Removing image at index:', index);
    console.log('Images after removal:', updatedImages);
    
    setLocalImages(updatedImages);
    setForceUpdate(prev => prev + 1);
    onImageRemove(index);
  }, [localImages, onImageRemove, showEditingControls]);

  // Don't show anything if no images and no editing controls
  if (!showEditingControls && localImages.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-4" key={`manager-${forceUpdate}`}>
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
        componentKey={forceUpdate}
        onImageReplace={showEditingControls ? handleImageReplace : () => {}}
        onImageRemove={showEditingControls ? handleImageRemove : () => {}}
      />
    </div>
  );
};

export default ContentImageManager;
