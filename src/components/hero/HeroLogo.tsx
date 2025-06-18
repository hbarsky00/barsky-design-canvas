
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
            src="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
            alt="Barsky Design"
            className="h-40 w-40 md:h-48 md:w-48 lg:h-52 lg:w-52 rounded-full border-4 border-barsky-blue shadow-xl object-cover object-center transition-transform duration-300 group-hover:scale-105"
            style={{
              imageRendering: 'crisp-edges',
            }}
            loading="eager"
            width="208"
            height="208"
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default HeroLogo;
