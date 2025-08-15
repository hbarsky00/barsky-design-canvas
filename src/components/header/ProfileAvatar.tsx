
import React from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";


const ProfileAvatar: React.FC = () => {
  return (
    <IdentityBadge
      to="/"
      ariaLabel="Go to homepage"
      imageSrc="/lovable-uploads/6a382e66-1489-49cf-9809-b2165cdc7823.png"
      name="Hiram Barsky"
      subtitle="Product Design + AI"
      size="md"
      subtitleStyle="pill"
      className="shrink-0"
    />
  );
};

export default ProfileAvatar;
