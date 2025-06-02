
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface HeroLogoProps {
  isVisible: boolean;
}

const HeroLogo: React.FC<HeroLogoProps> = ({ isVisible }) => {
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
      <Link to="/">
        <div className="relative group">
          <img
            src="/lovable-uploads/b7ce93b1-4c6c-4cd9-80d0-ea98b91e7a62.png"
            alt="Hiram Barsky Logo"
            className="h-32 w-auto md:h-40 lg:h-44 object-contain transition-transform duration-300 group-hover:scale-105"
            style={{
              imageRendering: 'crisp-edges',
            }}
            loading="eager"
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default HeroLogo;
