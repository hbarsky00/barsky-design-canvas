
import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "../AnimatedText";

interface HeroHeadingProps {
  isVisible: boolean;
}

const HeroHeading: React.FC<HeroHeadingProps> = ({ isVisible }) => {
  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="flex justify-center mb-2"
      >
        <img
          src="/lovable-uploads/ac3cac82-c216-4f87-b7b5-f3dc7b3d58ad.png"
          alt="Barsky Design"
          className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
          loading="eager"
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <AnimatedText 
          text="UX Research & Design Agency" 
          tag="h2" 
          className="text-lg sm:text-2xl lg:text-3xl font-semibold text-gray-600 block mb-2"
          delay={1000}
          type="word"
          animation="fade"
          staggerChildren={0.05}
        />
        
        <motion.div
          initial={{ width: 0 }}
          animate={isVisible ? { width: "200px" } : {}}
          transition={{ duration: 1, delay: 1.5 }}
          className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"
        />
      </motion.div>
    </div>
  );
};

export default HeroHeading;
