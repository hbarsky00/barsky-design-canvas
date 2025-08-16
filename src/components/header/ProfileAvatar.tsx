
import React from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";

const ProfileAvatar: React.FC = () => {
  // Using your working external image URL
  const imageUrl = 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp';
  
  return (
    <div className="relative flex items-center">
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
