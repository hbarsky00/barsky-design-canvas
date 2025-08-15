
import React from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";

const ProfileAvatar: React.FC = () => {
  const imageUrl = `/lovable-uploads/78032197-3673-4153-8d7b-6376818c5feb.png?t=${Date.now()}`;
  console.log('ProfileAvatar: Loading image from:', imageUrl);
  
  return (
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
  );
};

export default ProfileAvatar;
