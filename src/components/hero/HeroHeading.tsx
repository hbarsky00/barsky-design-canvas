
import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "../AnimatedText";
import BackgroundRemovalProcessor from "./BackgroundRemovalProcessor";
import { shouldShowEditingControls } from "@/utils/devModeDetection";

interface HeroHeadingProps {
  isVisible: boolean;
}

const HeroHeading: React.FC<HeroHeadingProps> = ({ isVisible }) => {
  const [currentImageSrc, setCurrentImageSrc] = useState("/lovable-uploads/2d17e5c5-6394-4af8-a954-4b94033e5574.png");
  const showEditingControls = shouldShowEditingControls();
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center mb-3 relative"
      >
        <img
          src={currentImageSrc}
          alt="Hiram Barsky Product Designer"
          className="h-24 sm:h-28 lg:h-32 w-auto object-contain"
          loading="eager"
        />
        
        {showEditingControls && (
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
            <BackgroundRemovalProcessor
              currentImageSrc={currentImageSrc}
              onImageProcessed={setCurrentImageSrc}
            />
          </div>
        )}
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <AnimatedText 
          text="UX/UI Product Designer & Gen AI Developer" 
          tag="h2" 
          className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700 block mb-2"
          delay={1000}
          type="word"
          animation="fade"
          staggerChildren={0.05}
        />
        
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: "150px" } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-2"
        />
      </motion.div>
    </div>
  );
};

export default HeroHeading;
