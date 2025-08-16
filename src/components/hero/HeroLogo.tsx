
import React from "react";
import { motion } from "framer-motion";
import IdentityBadge from "@/components/shared/IdentityBadge";

interface HeroLogoProps {
  isVisible: boolean;
}

const HeroLogo: React.FC<HeroLogoProps> = ({ isVisible }) => {
  // Using the working image URL from previous diff
  const imageUrl = 'https://ctqttomppgkjbjkckise.supabase.co/storage/v1/object/public/published-images/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png';
  
  console.log('HeroLogo: Using image URL:', imageUrl);
  
  // Test image loading
  React.useEffect(() => {
    const img = new Image();
    img.onload = () => console.log('✅ HeroLogo image loaded successfully');
    img.onerror = (e) => console.error('❌ HeroLogo image failed to load:', e);
    img.src = imageUrl;
  }, [imageUrl]);
  
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
