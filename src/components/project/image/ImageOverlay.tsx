
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
  // Overlay has been removed - component now returns null
  return null;
};

export default ImageOverlay;
