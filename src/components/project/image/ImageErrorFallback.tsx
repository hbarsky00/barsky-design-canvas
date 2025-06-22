
import React from 'react';
import { AlertCircle, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageErrorFallbackProps {
  showEditingControls: boolean;
  originalSrc?: string;
}

const ImageErrorFallback: React.FC<ImageErrorFallbackProps> = ({ 
  showEditingControls,
  originalSrc = ''
}) => {
  const fileName = originalSrc.split('/').pop() || 'Unknown';
  
  return (
    <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center p-6">
      <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-600 mb-2">Image Failed to Load</h3>
      
      {showEditingControls && (
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500">File: {fileName}</p>
          <p className="text-xs text-gray-400 max-w-xs break-all">{originalSrc}</p>
          <div className="flex items-center space-x-2 text-xs text-blue-600">
            <Upload className="h-3 w-3" />
            <span>Hover to replace image</span>
          </div>
        </div>
      )}
      
      {!showEditingControls && (
        <p className="text-sm text-gray-500 text-center">
          This image is currently unavailable
        </p>
      )}
    </div>
  );
};

export default ImageErrorFallback;
