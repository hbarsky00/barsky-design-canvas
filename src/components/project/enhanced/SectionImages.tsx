
import React from 'react';
import { GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MaximizableImage from '../MaximizableImage';
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
  onCaptionUpdate?: (imageSrc: string, newCaption: string) => void;
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
  onImageReorder,
  onCaptionUpdate
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
        
        // Create unique handlers for each image with proper caption handling
        const handleRemoveThisImage = handleImageRemove ? () => {
          console.log(`🗑️ SectionImages: Removing image at index ${index}:`, imageSrc);
          handleImageRemove(imageSrc);
        } : undefined;
        
        const handleReplaceThisImage = (newSrc: string) => {
          console.log(`🔄 SectionImages: Replacing image at index ${index}:`, imageSrc, 'with', newSrc);
          handleImageReplace(imageSrc, newSrc);
        };
        
        const handleCaptionChange = (newCaption: string) => {
          console.log(`📝 SectionImages: Updating caption for image:`, {
            imageSrc: imageSrc.substring(0, 30) + '...',
            newCaption: newCaption.substring(0, 50) + '...',
            index
          });
          
          if (onCaptionUpdate) {
            onCaptionUpdate(imageSrc, newCaption);
          }
        };
        
        return (
          <div 
            key={`${sectionKey}-image-${index}-${imageSrc.slice(-10)}`} 
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
            
            <MaximizableImage
              src={imageSrc}
              alt={caption}
              caption={caption}
              imageList={sectionImages.map(getReplacedImageSrc)}
              currentIndex={index}
              className="rounded-lg sm:rounded-xl shadow-md sm:shadow-elevated-lg w-full overflow-hidden"
              onImageReplace={handleReplaceThisImage}
              onImageRemove={handleRemoveThisImage}
              onCaptionUpdate={handleCaptionChange}
              projectId={projectId}
              hideEditButton={false}
              allowRemove={!!handleImageRemove}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SectionImages;
