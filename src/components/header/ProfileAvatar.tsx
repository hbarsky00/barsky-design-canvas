
import React, { useState } from "react";
import IdentityBadge from "@/components/shared/IdentityBadge";
import { useScrollToHomeTop } from "@/hooks/useScrollToHomeTop";
import { useHeaderNavigation } from "./useHeaderNavigation";

const ProfileAvatar: React.FC = () => {
  // Using your working external image URL
  const imageUrl = 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp';
  const videoUrl = 'https://barskyux.com/wp-content/uploads/2025/08/social_u3514236419_httpss.mj_.runiIdLWyCYKV4_have_me_smile_at_the_scr_4838b019-f29d-486d-9a03-8725c08d3cd1_1.mp4';
  
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
