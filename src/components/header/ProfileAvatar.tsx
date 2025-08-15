
import React from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";

const ProfileAvatar: React.FC = () => {
  return (
    <IdentityBadge
      to="/"
      ariaLabel="Go to homepage"
      imageSrc="/lovable-uploads/78032197-3673-4153-8d7b-6376818c5feb.png?v=2"
      name="Hiram Barsky"
      subtitle="Product Design + AI"
      size="md"
      subtitleStyle="pill"
      className="shrink-0"
    />
  );
};

export default ProfileAvatar;
