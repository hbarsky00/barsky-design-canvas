
import React from "react";
import MaximizableImage from "./MaximizableImage";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import ImageUploadButton from "./ImageUploadButton";

interface ImageGalleryProps {
  images: string[];
  imageCaptions?: Record<string, string>;
  onImageReplace?: (originalSrc: string, newSrc: string) => void;
  projectId?: string;
  maxImages?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  imageCaptions = {},
  onImageReplace,
  projectId,
  maxImages = 10
}) => {
  const showEditingControls = shouldShowEditingControls();

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {images.map((imageSrc, index) => (
          <div key={index} className="relative">
            <MaximizableImage
              src={imageSrc}
              alt={imageCaptions[imageSrc] || `Project image ${index + 1}`}
              caption={imageCaptions[imageSrc]}
              className="rounded-lg shadow-lg w-full h-auto"
            />
            
            {/* Image replacement button for editing mode */}
            {showEditingControls && onImageReplace && (
              <div className="absolute top-2 right-2">
                <ImageUploadButton
                  onImageSelected={(newSrc) => onImageReplace(imageSrc, newSrc)}
                  buttonText="Replace"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add more images button in editing mode */}
      {showEditingControls && images.length < maxImages && (
        <div className="text-center">
          <ImageUploadButton
            onImageSelected={(newSrc) => {
              // This would need to be handled by the parent component
              console.log('Add new image:', newSrc);
            }}
            buttonText="Add Image"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
