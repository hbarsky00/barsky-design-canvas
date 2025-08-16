
import React from "react";
import { motion } from "framer-motion";
import IdentityBadge from "@/components/shared/IdentityBadge";

interface HeroLogoProps {
  isVisible: boolean;
}

const HeroLogo: React.FC<HeroLogoProps> = ({ isVisible }) => {
  // Using your new uploaded headshot with correct Lovable path
  const imageUrl = '/lovable-uploads/f956968d-5248-4275-b0b3-dbea23c0d1b6.png';
  
  return (
    <motion.div
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
      className="flex justify-center md:justify-start mb-8"
    >
      <IdentityBadge
        to="/"
        imageSrc={imageUrl}
        name="Hiram Barsky"
        subtitle="Product Design + AI"
        size="lg"
        subtitleStyle="text"
      />
    </motion.div>
  );
};

export default HeroLogo;
