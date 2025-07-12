
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
          <picture>
            <source
              srcSet="/lovable-uploads/product-designer-portfolio-hiram-barsky-208w.webp 208w,
                      /lovable-uploads/product-designer-portfolio-hiram-barsky-416w.webp 416w"
              sizes="(max-width: 768px) 176px, 208px"
              type="image/webp"
            />
            <img
              src="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
              alt="Hiram Barsky Product Designer - Professional portfolio and case studies"
              className="h-44 w-44 md:h-52 md:w-52 lg:h-56 lg:w-56 rounded-full border-4 border-barsky-blue shadow-xl object-cover object-center transition-transform duration-300 group-hover:scale-105"
              style={{
                imageRendering: 'crisp-edges',
              }}
              loading="eager"
              fetchPriority="high"
              width="208"
              height="208"
            />
          </picture>
        </div>
      </Link>
    </motion.div>
  );
};

export default HeroLogo;
