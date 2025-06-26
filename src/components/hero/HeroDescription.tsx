
import React from "react";
import { motion } from "framer-motion";

interface HeroDescriptionProps {
  isVisible: boolean;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({ isVisible }) => {
  return (
    <div className="relative mb-8">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-xl sm:text-2xl mb-4 text-white font-medium"
      >
        Specializing in Accessibility Compliance & AI-Enhanced Design
      </motion.p>
      
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-base sm:text-lg mb-6 text-gray-200 max-w-4xl mx-auto leading-relaxed"
      >
        I bridge the gap between beautiful interfaces and business results using AI tools like Claude, Lovable.Dev, Figma AI, and Perplexity. 
        With WCAG expertise and cross-functional collaboration skills, I help companies solve the accessibility gap that 77% need but only 3% of businesses address.
      </motion.p>
    </div>
  );
};

export default HeroDescription;
