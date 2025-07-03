
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
        I create intelligent, user-centered digital experiences by combining thoughtful UX/UI design with cutting-edge generative AI integration. From intuitive interfaces to AI-powered web applications, I bring ideas to life through design and technology.
      </motion.p>
    </div>
  );
};

export default HeroDescription;
