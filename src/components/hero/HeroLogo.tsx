
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { shouldShowEditingControls } from "@/utils/devModeDetection";
import { useProfileImageUpload } from "@/hooks/useProfileImageUpload";
import IdentityBadge from "@/components/shared/IdentityBadge";

interface HeroLogoProps {
  isVisible: boolean;
}

const HeroLogo: React.FC<HeroLogoProps> = ({ isVisible }) => {
  // Use a proper Supabase Storage URL instead of the local path
  const defaultImageUrl = 'https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/profile/profile-image-default.png';
  
  const [imageUrl, setImageUrl] = useState(() => {
    // Check localStorage for uploaded profile image
    const savedUrl = localStorage.getItem('profileImageUrl');
    return savedUrl || defaultImageUrl;
  });
  
  const { uploadProfileImage, isUploading } = useProfileImageUpload();
  const showEditingControls = shouldShowEditingControls();
  
  console.log('HeroLogo: Loading image from:', imageUrl);

  // Listen for profile image updates
  useEffect(() => {
    const handleProfileImageUpdate = (e: CustomEvent) => {
      console.log('🔄 HeroLogo: Profile image updated:', e.detail.imageUrl);
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
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ 
        duration: 0.6, 
        delay: 0.2,
        ease: "easeOut"
      }}
      className="flex justify-center md:justify-start mb-8 relative group"
    >
      <IdentityBadge
        to="/"
        imageSrc={imageUrl}
        name="Hiram Barsky"
        subtitle="Product Design + AI"
        size="lg"
        subtitleStyle="text"
      />
      
      {showEditingControls && (
        <button
          onClick={handleImageUpload}
          disabled={isUploading}
          className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-sm hover:bg-blue-700 disabled:bg-gray-400"
          title="Upload new profile image"
        >
          {isUploading ? '⋯' : '📷'}
        </button>
      )}
    </motion.div>
  );
};

export default HeroLogo;
