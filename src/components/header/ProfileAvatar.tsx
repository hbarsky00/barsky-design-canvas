
import React from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";

const ProfileAvatar: React.FC = () => {
  // Your uploaded headshot image URL
  const imageUrl = 'https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/ed0e5085-ca47-4b76-9a2f-dba63d0d7e4c.png';
  
  console.log('ProfileAvatar: Using image URL:', imageUrl);
  
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
