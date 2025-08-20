
import React from 'react';
import { Button } from '@/components/ui/button';
import { useProfileImageUpload } from '@/hooks/useProfileImageUpload';

const ProfileImageUploader: React.FC = () => {
  const { uploadProfileImage, isUploading } = useProfileImageUpload();

  const handleUpload = async () => {
    const result = await uploadProfileImage();
    if (result) {
      console.log('✅ Profile image uploaded and saved:', result);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
      <h3 className="text-sm font-medium mb-2 font-display">Upload Profile Image</h3>
      <p className="text-xs text-gray-600 mb-3">Click to upload your headshot</p>
      <Button 
        onClick={handleUpload}
        disabled={isUploading}
        size="sm"
      >
        {isUploading ? 'Uploading...' : 'Upload Profile Image'}
      </Button>
    </div>
  );
};

export default ProfileImageUploader;
