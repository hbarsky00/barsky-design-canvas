
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
        transition={{ delay: 1.4, duration: 0.5 }}
        className="text-base sm:text-lg mb-4 sm:mb-8 text-on-surface-variant font-medium max-w-4xl mx-auto leading-relaxed"
      >
        I blend UX and AI to design, prototype, and ship experiences that scale and lift conversion.
      </motion.p>
      
      <p className="text-sm text-on-surface-variant mb-6 text-center">
        Google UX Certificate · WCAG 2.1 · AI integration
      </p>
    </div>
  );
};

export default HeroDescription;
