
import React, { useState } from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";
import { useScrollToHomeTop } from "@/hooks/useScrollToHomeTop";
import { useHeaderNavigation } from "./useHeaderNavigation";

const ProfileAvatar: React.FC = () => {
  // 96px source for a 48px avatar (2x DPR). The full 720x960 file was being
  // served here — 15x oversized, 101 KB, and eager, so it competed with LCP
  // for a picture the size of a thumbnail.
  const imageUrl = '/images/hiram-barsky-profile-96.webp';

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
        name="Hiram Barsky"
        subtitle="Designer and Developer"
        size="md"
        subtitleStyle="pill"
        autoPlay={true}
        className="shrink-0"
      />
    </div>
  );
};

export default ProfileAvatar;
