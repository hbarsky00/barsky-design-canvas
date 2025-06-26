
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

  return (
    <div className="grid grid-cols-1 gap-6" key={`image-list-${componentKey}`}>
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
