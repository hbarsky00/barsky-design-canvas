
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageOverlayProps {
  isHovered: boolean;
  isUploading: boolean;
  imageError: boolean;
  showEditingControls: boolean;
  hideEditButton: boolean;
  allowRemove: boolean;
  onMaximize: () => void;
  onImageReplace: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onImageRemove?: () => void;
}

const ImageOverlay: React.FC<ImageOverlayProps> = ({
  isHovered,
  isUploading,
  imageError,
  showEditingControls,
  hideEditButton,
  allowRemove,
  onMaximize,
  onImageReplace,
  onImageRemove
}) => {
  return (
    <AnimatePresence>
      {isHovered && !imageError && !isUploading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
        >
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={onMaximize}
              className="bg-white/90 hover:bg-white text-gray-900"
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            
            {showEditingControls && !hideEditButton && onImageReplace && (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageReplace}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={isUploading}
                />
                <Button
                  size="sm"
                  variant="secondary"
                  className="bg-blue-500/90 hover:bg-blue-600 text-white"
                  disabled={isUploading}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {showEditingControls && allowRemove && onImageRemove && (
              <Button
                size="sm"
                variant="secondary"
                onClick={onImageRemove}
                className="bg-red-500/90 hover:bg-red-600 text-white"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageOverlay;
