
import React from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";

const ProfileAvatar: React.FC = () => {
  // Using your new uploaded headshot with correct Lovable path
  const imageUrl = '/lovable-uploads/f956968d-5248-4275-b0b3-dbea23c0d1b6.png';
  
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
