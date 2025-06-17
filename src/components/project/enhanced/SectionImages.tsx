
import React from 'react';
import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MaximizableImage from '../MaximizableImage';
import EditImageButton from '@/components/dev/EditImageButton';
import { useDevMode } from '@/context/DevModeContext';

interface SectionImagesProps {
  sectionImages: string[];
  imageCaptions: Record<string, string>;
  title: string;
  sectionKey: string;
  projectId: string;
  getReplacedImageSrc: (originalSrc: string) => string;
  handleImageReplace: (imageSrc: string, newSrc: string) => void;
  handleImageRemove?: (imageSrc: string) => void;
  onImageReorder?: (oldIndex: number, newIndex: number) => void;
}

const SectionImages: React.FC<SectionImagesProps> = ({
  sectionImages,
  imageCaptions,
  title,
  sectionKey,
  projectId,
  getReplacedImageSrc,
  handleImageReplace,
  handleImageRemove,
  onImageReorder
}) => {
  const { isDevMode } = useDevMode();
  const [draggedImageIndex, setDraggedImageIndex] = React.useState<number | null>(null);

  if (sectionImages.length === 0) {
    return null;
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedImageIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (dragIndex === dropIndex || draggedImageIndex === null) {
      setDraggedImageIndex(null);
      return;
    }

    if (onImageReorder) {
      onImageReorder(dragIndex, dropIndex);
    }
    
    setDraggedImageIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedImageIndex(null);
  };

  return (
    <div className="mobile-section-spacing">
      {sectionImages.map((imageSrc, index) => {
        const replacedSrc = getReplacedImageSrc(imageSrc);
        const caption = imageCaptions[imageSrc] || imageCaptions[replacedSrc] || `${title} illustration ${index + 1}`;
        
        const handleRemove = handleImageRemove ? () => handleImageRemove(imageSrc) : undefined;
        
        return (
          <div 
            key={`${sectionKey}-image-${index}`} 
            className={`glass-card mobile-image-container layered-depth relative group ${
              draggedImageIndex === index ? 'opacity-50' : ''
            }`}
            draggable={isDevMode}
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
          >
            {isDevMode && (
              <div className="absolute top-1 left-1 sm:top-2 sm:left-2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 sm:h-6 sm:w-6 bg-background/80 backdrop-blur-sm cursor-grab active:cursor-grabbing"
                  title="Drag to reorder"
                >
                  <GripVertical className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                </Button>
              </div>
            )}
            
            <EditImageButton
              src={replacedSrc}
              onImageReplace={(newSrc) => handleImageReplace(imageSrc, newSrc)}
              onImageRemove={handleRemove}
              projectId={projectId}
              allowRemove={!!handleImageRemove}
            />
            <MaximizableImage
              src={replacedSrc}
              alt={caption}
              caption={caption}
              imageList={sectionImages.map(getReplacedImageSrc)}
              currentIndex={index}
              className="rounded-lg sm:rounded-xl shadow-md sm:shadow-elevated-lg w-full overflow-hidden"
              onImageReplace={(newSrc) => handleImageReplace(imageSrc, newSrc)}
              onImageRemove={handleRemove}
              projectId={projectId}
              hideEditButton={true}
              allowRemove={!!handleImageRemove}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SectionImages;
