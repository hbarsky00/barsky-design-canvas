
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
  if (images.length === 0) return null;

  return (
    <div className="space-y-6">
      {images.map((imageSrc, index) => (
        <div key={`${imageSrc}-${index}-${componentKey}`} className="relative group/image">
          <div className="glass-card p-4 layered-depth">
            <MaximizableImage
              src={imageSrc}
              alt={`Content image ${index + 1}`}
              caption={imageCaptions[imageSrc] || `Image ${index + 1}`}
              imageList={images}
              currentIndex={index}
              className="rounded-lg shadow-md w-full overflow-hidden"
              projectId={projectId}
              hideEditButton={!showEditingControls}
              allowRemove={showEditingControls}
              onImageReplace={(newSrc) => onImageReplace(index, newSrc)}
              onImageRemove={() => onImageRemove(index)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImageList;
