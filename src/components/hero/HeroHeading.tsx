
import React from "react";
import { motion } from "framer-motion";

interface HeroHeadingProps {
  isVisible: boolean;
}

const HeroHeading: React.FC<HeroHeadingProps> = ({ isVisible }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex flex-col items-center justify-center space-y-3 sm:space-y-4"
      >
        <div className="floating-element">
          <img
            src="/lovable-uploads/64bd5f41-d480-486a-a9f4-80d820b53519.png"
            alt="Barsky Design Logo"
            className="h-16 w-16 sm:h-20 sm:w-20 lg:h-28 lg:w-28 object-contain flex-shrink-0 drop-shadow-lg"
            loading="eager"
          />
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 font-script text-center px-4" style={{ lineHeight: '1.2' }}>
          Hiram <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Barsky</span>
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="space-y-1 sm:space-y-2 px-4"
      >
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 text-center">
          UX/UI Designer & Frontend Developer
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center">
          Creating User-Centered Digital Experiences
        </p>
      </motion.div>
    </div>
  );
};

export default HeroHeading;
