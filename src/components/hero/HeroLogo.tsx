
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getOptimizedImageSrc } from "@/utils/imageOptimization";

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
      <Link to="/" className="flex items-center gap-4 group">
        <div className="relative">
          <img
            src="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
            alt="Hiram Barsky"
            className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 rounded-full border-4 border-[hsl(var(--blue-vibrant))] shadow-xl object-cover object-center transition-transform duration-300 group-hover:scale-105 flex-shrink-0"
            loading="eager"
            width="112"
            height="112"
          />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-[hsl(var(--navy-primary))] mb-1">
            Hiram Barsky
          </span>
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl text-[hsl(var(--neutral-500))]">|</span>
            <span className="text-lg md:text-xl text-[hsl(var(--blue-accent))] font-medium">
              Product Design + AI
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default HeroLogo;
