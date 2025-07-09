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
  return <>
      {/* Maximize overlay - always visible on hover */}
      

      {/* Edit controls overlay - enhanced for better Lovable integration */}
      {showEditingControls && !hideEditButton && <div className={`absolute top-2 right-2 flex space-x-2 transition-opacity duration-300 ${isHovered || isUploading ? 'opacity-100' : 'opacity-0'}`} style={{
      pointerEvents: 'auto',
      zIndex: 10
    }}>
          {/* Replace image button - enhanced for Lovable edit detection */}
          <label className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:scale-110" data-lovable-editable="image-replace" data-action="replace-image" style={{
        pointerEvents: 'auto'
      }}>
            <Upload size={16} />
            <input type="file" accept="image/*" onChange={onImageReplace} className="hidden" disabled={isUploading} data-lovable-input="image-upload" />
          </label>

          {/* Remove image button - enhanced for Lovable integration */}
          {allowRemove && onImageRemove && <button onClick={onImageRemove} className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110" title="Remove image" disabled={isUploading} data-lovable-editable="image-remove" data-action="remove-image" style={{
        pointerEvents: 'auto'
      }}>
              <Trash2 size={16} />
            </button>}
        </div>}
    </>;
};
export default ImageOverlay;