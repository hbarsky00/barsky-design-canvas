
import React from "react";
import { motion } from "framer-motion";
import IdentityBadge from "@/components/shared/IdentityBadge";

interface HeroLogoProps {
  isVisible: boolean;
}

const HeroLogo: React.FC<HeroLogoProps> = ({ isVisible }) => {
  const imageUrl = `/lovable-uploads/325d731b-d2fd-40e0-979d-6af8e498503f.png`;
  console.log('HeroLogo: Loading image from:', imageUrl);

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
