
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

  // Dynamic grid layout based on image count
  const getGridLayout = () => {
    if (images.length === 1) {
      return "grid-cols-1";
    } else if (images.length === 2) {
      return "grid-cols-1 md:grid-cols-2"; // 2 columns on tablet and desktop
    } else {
      return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"; // Default layout for 3+ images
    }
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
            onImageReplace={(newSrc) => onImageReplace(index, newSrc)}
            onImageRemove={() => onImageRemove(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageList;
