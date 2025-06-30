
import React from "react";
import { motion } from "framer-motion";

interface HeroDescriptionProps {
  isVisible: boolean;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({
  isVisible
}) => {
  return (
    <div className="relative mb-8">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-xl mb-4 text-gray-700 font-medium sm:text-3xl"
      >
        Improving Digital Experiences Through Research & Strategy
      </motion.p>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-base sm:text-lg mb-6 text-gray-600 max-w-4xl mx-auto leading-relaxed"
      >
        Barsky Design helps businesses improve the user experience of their digital products through comprehensive user research, strategic design thinking, and data-driven solutions. We partner with companies to transform user insights into measurable business outcomes.
      </motion.p>
    </div>
  );
};

export default HeroDescription;
