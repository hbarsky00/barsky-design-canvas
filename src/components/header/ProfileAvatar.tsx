
import React, { useState, useEffect } from "react";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";
import IdentityBadge from "@/components/shared/IdentityBadge";

const ProfileAvatar: React.FC = () => {
  // Use a proper Supabase Storage URL instead of the local path
  const defaultImageUrl = 'https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/profile/profile-image-default.png';
  
  const [imageUrl, setImageUrl] = useState(() => {
    // Check localStorage for uploaded profile image
    const savedUrl = localStorage.getItem('profileImageUrl');
    return savedUrl || defaultImageUrl;
  });
  
  const { uploadProfileImage, isUploading } = useProfileImageUpload();
  const showEditingControls = shouldShowEditingControls();
  
  console.log('ProfileAvatar: Loading image from:', imageUrl);

  // Listen for profile image updates
  useEffect(() => {
    const handleProfileImageUpdate = (e: CustomEvent) => {
      console.log('🔄 ProfileAvatar: Profile image updated:', e.detail.imageUrl);
      setImageUrl(e.detail.imageUrl);
    };

    window.addEventListener('profileImageUpdated', handleProfileImageUpdate as EventListener);
    
    return () => {
      window.removeEventListener('profileImageUpdated', handleProfileImageUpdate as EventListener);
    };
  }, []);

  const handleImageUpload = async () => {
    if (isUploading) return;
    
    const newImageUrl = await uploadProfileImage();
    if (newImageUrl) {
      setImageUrl(newImageUrl);
    }
  };
  
  return (
    <div className="relative group">
      <IdentityBadge
        to="/"
        ariaLabel="Go to homepage"
        imageSrc={imageUrl}
        name="Hiram Barsky"
        subtitle="Product Design + AI"
        size="md"
        subtitleStyle="pill"
        className="shrink-0"
      />
      
      {showEditingControls && (
        <button
          onClick={handleImageUpload}
          disabled={isUploading}
          className="absolute -top-2 -right-2 w-6 h-6 bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-xs hover:bg-blue-700 disabled:bg-gray-400"
          title="Upload new profile image"
        >
          {isUploading ? '⋯' : '📷'}
        </button>
      )}
    </div>
  );
};

export default ProfileAvatar;
