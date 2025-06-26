
import React from 'react';
import MaximizableImage from '../../project/MaximizableImage';

interface ImageListProps {
  images: string[];
  imageCaptions: Record<string, string>;
  projectId?: string;
  showEditingControls: boolean;
  componentKey: number;
  onImageReplace: (index: number, newSrc: string) => void;
  onImageRemove: (index: number) => void;
}

const ImageList: React.FC<ImageListProps> = ({
  images,
  imageCaptions,
  projectId,
  showEditingControls,
  componentKey,
  onImageReplace,
  onImageRemove
}) => {
  if (images.length === 0) {
    return null;
  }

  // Updated grid layout - max 2 columns for desktop/tablet
  const getGridLayout = () => {
    if (images.length === 1) {
      return "grid-cols-1";
    } else {
      return "grid-cols-1 md:grid-cols-2"; // Max 2 columns on tablet and desktop
    }
  };

  // Handle image replacement with proper event handling
  const handleImageReplace = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Create object URL for immediate display
    const newSrc = URL.createObjectURL(file);
    onImageReplace(index, newSrc);
    event.target.value = '';
  };

  return (
    <div className={`grid ${getGridLayout()} gap-6`} key={`image-list-${componentKey}`}>
      {images.map((image, index) => (
        <div key={`${image}-${index}-${componentKey}`} className="glass-card p-4 layered-depth">
          <MaximizableImage
            src={image}
            alt={`Image ${index + 1}`}
            caption={imageCaptions[image]}
            imageList={images}
            currentIndex={index}
            className="rounded-lg shadow-elevated w-full"
            projectId={projectId}
            hideEditButton={!showEditingControls}
            allowRemove={showEditingControls}
            onImageReplace={handleImageReplace(index)}
            onImageRemove={() => onImageRemove(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
