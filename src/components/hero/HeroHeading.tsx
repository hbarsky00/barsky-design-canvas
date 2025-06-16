
import React from "react";
import { motion } from "framer-motion";

interface HeroHeadingProps {
  isVisible: boolean;
}

const HeroHeading: React.FC<HeroHeadingProps> = ({ isVisible }) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex items-center justify-center gap-6"
      >
        <div className="floating-element">
          <img
            src="/lovable-uploads/64bd5f41-d480-486a-a9f4-80d820b53519.png"
            alt="Barsky Design Logo"
            className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 object-contain flex-shrink-0 drop-shadow-lg"
            loading="eager"
          />
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 font-script pb-8" style={{ lineHeight: '1.1' }}>
          Hiram
          <span className="block text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Barsky</span>
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="space-y-2"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
          UX/UI Designer & Frontend Developer
        </h2>
        <p className="text-xl text-gray-600">
          Creating User-Centered Digital Experiences
        </p>
      </motion.div>
    </div>
  );
};

export default HeroHeading;
