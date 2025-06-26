
import React from 'react';
import { Maximize2, Upload, Trash2 } from 'lucide-react';

interface ImageOverlayProps {
  isHovered: boolean;
  isUploading: boolean;
  imageError: boolean;
  showEditingControls: boolean;
  hideEditButton?: boolean;
  allowRemove?: boolean;
  onMaximize: () => void;
  onImageReplace: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove?: () => void;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({
  isHovered,
  isUploading,
  imageError,
  showEditingControls,
  hideEditButton = false,
  allowRemove = false,
  onMaximize,
  onImageReplace,
  onImageRemove
}) => {
  return (
    <>
      {/* Maximize overlay - always visible on hover */}
      <div 
        className={`absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center ${
          isHovered && !imageError ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={onMaximize}
          className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          title="View full size"
        >
          <Maximize2 size={20} />
        </button>
      </div>

      {/* Edit controls overlay - only visible in dev mode */}
      {showEditingControls && !hideEditButton && (
        <div className={`absolute top-2 right-2 flex space-x-2 transition-opacity duration-300 ${
          isHovered || isUploading ? 'opacity-100' : 'opacity-0'
        }`}>
          {/* Replace image button */}
          <label className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:scale-110">
            <Upload size={16} />
            <input
              type="file"
              accept="image/*"
              onChange={onImageReplace}
              className="hidden"
              disabled={isUploading}
            />
          </label>

          {/* Remove image button */}
          {allowRemove && onImageRemove && (
            <button
              onClick={onImageRemove}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              title="Remove image"
              disabled={isUploading}
            >
              <Trash2 size={16} />
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ImageOverlay;
