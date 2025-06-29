
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
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <AnimatedText 
          text="Barsky Design" 
          tag="h1" 
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-gray-900 block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent"
          delay={800}
          type="word"
          animation="bounce"
          staggerChildren={0.1}
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
          className="text-lg sm:text-2xl lg:text-3xl font-semibold text-gray-600 block mb-4"
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
