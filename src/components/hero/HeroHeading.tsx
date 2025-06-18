
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
            src="/lovable-uploads/dbb80825-868f-4eb2-bd39-ff480bcc5f2c.png"
            alt="Barsky Design Logo"
            className="h-[200px] w-auto object-contain flex-shrink-0 drop-shadow-lg"
            loading="eager"
          />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="space-y-1 sm:space-y-2 px-4 text-center"
      >
        <p className="text-base sm:text-lg md:text-xl text-gray-600 text-center">
          Creating User-Centered Digital Experiences
        </p>
      </motion.div>
    </div>
  );
};

export default HeroHeading;
