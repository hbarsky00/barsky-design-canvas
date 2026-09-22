
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadButtonProps {
  onImageAdd: () => void;
  isSelecting: boolean;
  isDisabled: boolean;
  maxImages: number;
  currentImageCount: number;
  projectId?: string;
}

const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  onImageAdd,
  isSelecting,
  isDisabled,
  maxImages,
  currentImageCount,
  projectId
}) => {
  if (currentImageCount >= maxImages) return null;

  return (
    <div className="flex justify-start">
      <Button
        onClick={onImageAdd}
        variant="outline"
        size="sm"
        className="flex items-center space-x-2 [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
        disabled={isDisabled || !projectId}
      >
        <Plus className="h-4 w-4" />
        <span>{isSelecting ? 'Uploading...' : 'Add Image'}</span>
      </Button>
      {!projectId && (
        <p className="text-xs text-gray-500 ml-2 mt-1">Project ID required for uploads</p>
      )}
    </div>
  );
};

export default ImageUploadButton;
