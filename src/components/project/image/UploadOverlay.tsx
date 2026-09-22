
import React from 'react';

interface UploadOverlayProps {
  isUploading: boolean;
}

const UploadOverlay: React.FC<UploadOverlayProps> = ({ isUploading }) => {
  if (!isUploading) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
          <span className="text-gray-700 font-medium">Uploading...</span>
        </div>
      </div>
    </div>
  );
};

export default UploadOverlay;
