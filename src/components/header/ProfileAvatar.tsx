
import React from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";


const ProfileAvatar: React.FC = () => {
  return (
    <IdentityBadge
      to="/"
      ariaLabel="Go to homepage"
      imageSrc="https://barskyux.com/wp-content/uploads/2024/11/hiram-profile-pic.jpg"
      name="Hiram Barsky"
      subtitle="Product Design + AI"
      size="md"
      subtitleStyle="pill"
      className="shrink-0"
    />
  );
};

export default ProfileAvatar;
