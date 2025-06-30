
import React from "react";
import { motion } from "framer-motion";

interface HeroDescriptionProps {
  isVisible: boolean;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({
  isVisible
}) => {
  return (
    <div className="relative mb-4">
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-lg mb-4 text-gray-700 font-medium sm:text-xl max-w-4xl mx-auto leading-relaxed"
      >
        We transform digital experiences through comprehensive user research and strategic design thinking, using our data-driven approach to help businesses create user-friendly solutions that drive meaningful results and lasting impact.
      </motion.p>
    </div>
  );
};

export default HeroDescription;
