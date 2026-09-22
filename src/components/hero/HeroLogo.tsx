
import React from "react";
import { motion } from "framer-motion";
import IdentityBadge from "@/components/shared/IdentityBadge";

interface HeroLogoProps {
  isVisible: boolean;
}

const HeroLogo: React.FC<HeroLogoProps> = ({ isVisible }) => {
  // Using your working external image URL
  const imageUrl = '/images/hiram-barsky-profile.png';
  const videoUrl = '/uploads/archive/profile-hero.mp4';
  
  const MotionIdentityBadge = motion(IdentityBadge);
  
  return (
    <div className="flex justify-center md:justify-start mb-8">
      <MotionIdentityBadge
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ 
          opacity: isVisible ? 1 : 0, 
          scale: isVisible ? 1 : 0.8, 
          y: isVisible ? 0 : 20 
        }}
        transition={{ 
          duration: 0.6, 
          delay: 0.2,
          ease: "easeOut"
        }}
        imageSrc={imageUrl}
        videoSrc={videoUrl}
        name="Hiram Barsky"
        subtitle="Product Design + AI"
        size="lg"
        subtitleStyle="text"
        autoPlay={true}
      />
    </div>
  );
};

export default HeroLogo;
