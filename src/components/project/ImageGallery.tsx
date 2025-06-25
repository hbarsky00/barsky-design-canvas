
import React from "react";
import MaximizableImage from "./MaximizableImage";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import ImageUploadButton from "../editor/image-manager/ImageUploadButton";

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
                <button
                  onClick={() => {
                    // Simple file input for replacement
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          const result = event.target?.result as string;
                          onImageReplace(imageSrc, result);
                        };
                        reader.readAsDataURL(file);
                      }
                    };
                    input.click();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                >
                  Replace
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add more images button in editing mode */}
      {showEditingControls && images.length < maxImages && (
        <div className="text-center">
          <button
            onClick={() => {
              // Simple file input for adding new images
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    const result = event.target?.result as string;
                    console.log('Add new image:', result);
                  };
                  reader.readAsDataURL(file);
                }
              };
              input.click();
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Add Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
