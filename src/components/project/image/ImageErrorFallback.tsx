
import React from 'react';

interface ImageErrorFallbackProps {
  showEditingControls: boolean;
}

const ImageErrorFallback: React.FC<ImageErrorFallbackProps> = ({ showEditingControls }) => {
  return (
    <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
      <div className="text-center">
        <div className="text-sm">Failed to load image</div>
        {showEditingControls && (
          <div className="text-xs mt-1">Try replacing with a new image</div>
        )}
      </div>
    </div>
  );
};

export default ImageErrorFallback;
