
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MaximizableImage from '../project/MaximizableImage';

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
  const [refreshKey, setRefreshKey] = useState(0);

  // Sync with parent images prop
  useEffect(() => {
    if (JSON.stringify(images) !== JSON.stringify(localImages)) {
      setLocalImages(images);
      setRefreshKey(prev => prev + 1);
    }
  }, [images, localImages]);

  const handleImageAdd = () => {
    if (localImages.length < maxImages && onImageAdd) {
      const newImage = "/lovable-uploads/e67e58d9-abe3-4159-b57a-fc76a77537eb.png";
      const updatedImages = [...localImages, newImage];
      setLocalImages(updatedImages);
      setRefreshKey(prev => prev + 1);
      onImageAdd(newImage);
    }
  };

  const handleImageReplace = (index: number, newSrc: string) => {
    const updatedImages = localImages.map((src, i) => i === index ? newSrc : src);
    setLocalImages(updatedImages);
    setRefreshKey(prev => prev + 1);
    
    if (onImageReplace) {
      onImageReplace(index, newSrc);
    }
  };

  const handleImageRemove = (index: number) => {
    const updatedImages = localImages.filter((_, i) => i !== index);
    setLocalImages(updatedImages);
    setRefreshKey(prev => prev + 1);
    
    if (onImageRemove) {
      onImageRemove(index);
    }
  };

  if (!onImageAdd && localImages.length === 0) {
    return null;
  }

  return (
    <div className="mt-8 space-y-4" key={refreshKey}>
      {onImageAdd && localImages.length < maxImages && (
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
            <div key={`${imageSrc}-${index}-${refreshKey}`} className="relative group/image">
              <div className="glass-card p-3 layered-depth">
                <MaximizableImage
                  src={imageSrc}
                  alt={`Content image ${index + 1}`}
                  caption={imageCaptions[imageSrc] || `Image ${index + 1}`}
                  imageList={localImages}
                  currentIndex={index}
                  className="rounded-lg shadow-md w-full overflow-hidden"
                  projectId={projectId}
                  hideEditButton={false}
                  allowRemove={true}
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
