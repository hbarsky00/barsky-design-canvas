
import React, { useState } from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";
import { useScrollToHomeTop } from "@/hooks/useScrollToHomeTop";
import { useHeaderNavigation } from "./useHeaderNavigation";

const ProfileAvatar: React.FC = () => {
  // Using your working external image URL
  const imageUrl = '/images/hiram-barsky-profile.webp';
  const videoUrl: string | undefined = undefined; // the barskyux.com clip is gone; the still stands in
  
  const { setIsIntentionalScrolling } = useHeaderNavigation();
  
  const scrollToHomeTop = useScrollToHomeTop(() => {
    setIsIntentionalScrolling(true);
    // Clear the flag after scroll animation completes
    setTimeout(() => {
      setIsIntentionalScrolling(false);
    }, 1000);
  });
  
  return (
    <div className="relative" onClick={scrollToHomeTop}>
      <IdentityBadge
        ariaLabel="Go to homepage"
        imageSrc={imageUrl}
        videoSrc={videoUrl}
        name="Hiram Barsky"
        subtitle="Product Designer + AI"
        size="md"
        subtitleStyle="pill"
        autoPlay={true}
        className="shrink-0"
      />
    </div>
  );
};

export default ProfileAvatar;
