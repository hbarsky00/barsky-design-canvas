
import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MaximizableImage from '../../MaximizableImage';

interface SectionImageManagerProps {
  images: string[];
  title: string;
  imageCaptions: Record<string, string>;
  projectId?: string;
  showEditingControls: boolean;
  maxImages: number;
  isSelecting: boolean;
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
  onImageReplace: (index: number, newSrc: string) => void;
}

const SectionImageManager: React.FC<SectionImageManagerProps> = ({
  images,
  title,
  imageCaptions,
  projectId,
  showEditingControls,
  maxImages,
  isSelecting,
  onAddImage,
  onRemoveImage,
  onImageReplace
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-800">Section Images</h3>
        {showEditingControls && images.length < maxImages && projectId && (
          <Button
            onClick={onAddImage}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
            disabled={isSelecting}
          >
            <Plus className="h-4 w-4" />
            <span>{isSelecting ? 'Uploading...' : 'Add Image'}</span>
          </Button>
        )}
        {showEditingControls && !projectId && (
          <p className="text-xs text-gray-500">Project ID required for uploads</p>
        )}
      </div>

      <div className="space-y-6">
        {images.map((imageSrc, index) => (
          <div key={index} className="relative group/image">
            <MaximizableImage
              src={imageSrc}
              alt={`${title} image ${index + 1}`}
              caption={imageCaptions[imageSrc] || `${title} supporting image`}
              imageList={images}
              currentIndex={index}
              className="rounded-xl shadow-elevated-lg w-full glass-card layered-depth"
              projectId={projectId}
              hideEditButton={!showEditingControls}
              allowRemove={showEditingControls}
              onImageReplace={(newSrc) => onImageReplace(index, newSrc)}
              onImageRemove={() => onRemoveImage(index)}
            />
            {showEditingControls && (
              <Button
                onClick={() => onRemoveImage(index)}
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-200 bg-red-500 hover:bg-red-600 text-white z-10"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionImageManager;
