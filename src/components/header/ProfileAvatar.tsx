
import React from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";


const ProfileAvatar: React.FC = () => {
  return (
    <IdentityBadge
      to="/"
      ariaLabel="Go to homepage"
      imageSrc="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
      name="Hiram Barsky"
      subtitle="Product Design + AI"
      size="md"
      subtitleStyle="pill"
      className="shrink-0"
    />
  );
};

export default ProfileAvatar;
