
import React from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";

const ProfileAvatar: React.FC = () => {
  // Using the working image URL from previous diff
  const imageUrl = 'https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png';
  
  console.log('ProfileAvatar: Using image URL:', imageUrl);
  
  // Test image loading
  React.useEffect(() => {
    const img = new Image();
    img.onload = () => console.log('✅ ProfileAvatar image loaded successfully');
    img.onerror = (e) => console.error('❌ ProfileAvatar image failed to load:', e);
    img.src = imageUrl;
  }, [imageUrl]);
  
  return (
    <div className="relative">
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
    </div>
  );
};

export default ProfileAvatar;
