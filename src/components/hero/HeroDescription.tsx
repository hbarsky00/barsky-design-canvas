
import React from "react";
import { motion } from "framer-motion";

interface HeroDescriptionProps {
  isVisible: boolean;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({
  isVisible
}) => {
  return (
    <div className="relative mb-6">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-lg mb-3 text-gray-700 font-medium sm:text-xl"
      >
        Improving Digital Experiences Through Research & Strategy
      </motion.p>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-sm sm:text-base mb-4 text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        We help businesses improve user experience through research, strategic design thinking, and data-driven solutions.
      </motion.p>
    </div>
  );
};

export default HeroDescription;
