
import React from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";

const ProfileAvatar: React.FC = () => {
  const imageUrl = `/lovable-uploads/325d731b-d2fd-40e0-979d-6af8e498503f.png`;
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
