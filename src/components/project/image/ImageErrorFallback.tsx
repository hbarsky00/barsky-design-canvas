
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ImageErrorFallbackProps {
  originalSrc?: string;
}

const ImageErrorFallback: React.FC<ImageErrorFallbackProps> = ({
  originalSrc = ''
}) => {
  return (
    <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6">
      <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">Image Failed to Load</h3>
      <p className="text-sm text-gray-500 text-center">
        This image is currently unavailable
      </p>
    </div>
  );
};

export default ImageErrorFallback;
