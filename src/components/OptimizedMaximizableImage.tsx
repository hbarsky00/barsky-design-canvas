import React from 'react';
import MaximizableImage from './project/MaximizableImage';

interface OptimizedMaximizableImageProps {
  src: string;
  alt: string;
  caption?: string;
  imageList?: string[];
  currentIndex?: number;
  priority?: boolean;
  className?: string;
  projectId?: string;
  hideEditButton?: boolean;
  allowRemove?: boolean;
  onImageReplace?: (newSrc: string) => void;
  onImageRemove?: () => void;
  width?: number;
  height?: number;
}

/**
 * Optimized wrapper for MaximizableImage with proper dimensions and loading
 */
export const OptimizedMaximizableImage: React.FC<OptimizedMaximizableImageProps> = ({
  src,
  alt,
  width,
  height,
  priority = false,
  ...props
}) => {
  return (
    <div style={{ aspectRatio: width && height ? `${width}/${height}` : 'auto' }}>
      <MaximizableImage
        src={src}
        alt={alt}
        {...props}
        priority={priority}
      />
    </div>
  );
};