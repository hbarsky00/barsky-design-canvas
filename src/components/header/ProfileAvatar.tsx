
import React from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";


const ProfileAvatar: React.FC = () => {
  return (
    <IdentityBadge
      to="/"
      ariaLabel="Go to homepage"
      imageSrc="/lovable-uploads/469aef11-cbb1-4638-bc5f-777e95a9b2fd.png"
      name="Hiram Barsky"
      subtitle="Product Design + AI"
      size="md"
      subtitleStyle="pill"
      className="shrink-0"
    />
  );
};

export default ProfileAvatar;
