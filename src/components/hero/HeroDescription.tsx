import React from "react";
import { motion } from "framer-motion";

interface HeroDescriptionProps {
  isVisible: boolean;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({ isVisible }) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto px-2 sm:px-4"
    >
      
    </motion.p>
  );
};

export default HeroDescription;
