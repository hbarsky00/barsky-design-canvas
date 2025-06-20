import React, { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MaximizableImage from '../project/MaximizableImage';
import { shouldShowEditingControls } from '@/utils/devModeDetection';

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

  // Sync with parent images prop and force complete refresh
  useEffect(() => {
    if (JSON.stringify(images) !== JSON.stringify(localImages)) {
      console.log('🔄 ContentImageManager: Images changed, forcing complete refresh');
      console.log('Old images:', localImages);
      console.log('New images:', images);
      
      setLocalImages(images);
      setComponentKey(Date.now()); // Force complete re-render
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

  const handleImageAdd = useCallback(() => {
    if (localImages.length >= maxImages || !onImageAdd) return;
    
    const newImage = "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png";
    const updatedImages = [...localImages, newImage];
    
    console.log('➕ ContentImageManager: Adding image:', newImage);
    setLocalImages(updatedImages);
    setComponentKey(Date.now());
    onImageAdd(newImage);
  }, [localImages, maxImages, onImageAdd]);

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
      {showEditingControls && onImageAdd && localImages.length < maxImages && (
        <div className="flex justify-start">
          <Button
            onClick={handleImageAdd}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Image</span>
          </Button>
        </div>
      )}

      {localImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {localImages.map((imageSrc, index) => (
            <div key={`${imageSrc}-${index}-${componentKey}`} className="relative group/image">
              <div className="glass-card p-3 layered-depth">
                <MaximizableImage
                  src={imageSrc}
                  alt={`Content image ${index + 1}`}
                  caption={imageCaptions[imageSrc] || `Image ${index + 1}`}
                  imageList={localImages}
                  currentIndex={index}
                  className="rounded-lg shadow-md w-full overflow-hidden"
                  projectId={projectId}
                  hideEditButton={!showEditingControls}
                  allowRemove={showEditingControls}
                  onImageReplace={(newSrc) => handleImageReplace(index, newSrc)}
                  onImageRemove={() => handleImageRemove(index)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentImageManager;
