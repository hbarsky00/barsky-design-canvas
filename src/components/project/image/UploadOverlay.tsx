
import React from 'react';

interface UploadOverlayProps {
  isUploading: boolean;
}

const UploadOverlay: React.FC<UploadOverlayProps> = ({ isUploading }) => {
  if (!isUploading) return null;

  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2" />
        <div className="text-sm">Uploading to Vercel Blob...</div>
      </div>
    </div>
  );
};

export default UploadOverlay;
