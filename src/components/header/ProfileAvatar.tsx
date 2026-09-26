
import React, { useState } from "react";
import { useReducedMotion } from "framer-motion";
import IdentityBadge from "@/components/shared/IdentityBadge";
import { useScrollToHomeTop } from "@/hooks/useScrollToHomeTop";
import { useHeaderNavigation } from "./useHeaderNavigation";

const ProfileAvatar: React.FC = () => {
  // Using your working external image URL
  const imageUrl = '/images/hiram-barsky-profile.webp';
  // The wave clip used to point at barskyux.com, which stopped resolving, so it
  // was set to undefined. The file itself was fine all along — 1080x1080,
  // already masked to a circle — it had just been left in public/uploads/archive
  // and then dropped from the repo entirely. Recovered from 926ed1a3.
  const prefersReducedMotion = useReducedMotion();
  const videoUrl: string | undefined = prefersReducedMotion ? undefined : '/hiram-barsky-wave.mp4';

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
        /* Hover-triggered, not autoplaying. A looping face in the header is a
           distraction on every page; the wave is a greeting, not an animation. */
        autoPlay={false}
        className="shrink-0"
      />
    </div>
  );
};

export default ProfileAvatar;
