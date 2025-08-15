
import React from "react";
import { motion } from "framer-motion";
import IdentityBadge from "@/components/shared/IdentityBadge";

interface HeroLogoProps {
  isVisible: boolean;
}

const HeroLogo: React.FC<HeroLogoProps> = ({ isVisible }) => {
  // Your uploaded headshot image URL
  const imageUrl = 'https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/ed0e5085-ca47-4b76-9a2f-dba63d0d7e4c.png';
  
  console.log('HeroLogo: Using image URL:', imageUrl);
  
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
