
import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "../AnimatedText";

interface HeroHeadingProps {
  isVisible: boolean;
}

const HeroHeading: React.FC<HeroHeadingProps> = ({
  isVisible
}) => {
  return (
    <div className="relative">
      <motion.div 
        initial={{
          opacity: 0,
          y: 30
        }} 
        animate={isVisible ? {
          opacity: 1,
          y: 0
        } : {}} 
        transition={{
          duration: 0.8,
          delay: 0.3
        }}
      >
        <AnimatedText 
          text="I Design AI-Powered UX That Boosts Conversion by 40%+" 
          tag="h1" 
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 dark:text-white block mb-6 lg:mb-8 leading-tight mx-auto max-w-6xl [text-wrap:balance]" 
          delay={800} 
          type="word" 
          animation="fade" 
          staggerChildren={0.05} 
        />
        
        <motion.div 
          initial={{
            width: 0
          }} 
          animate={isVisible ? {
            width: "120px"
          } : {}} 
          transition={{
            duration: 0.8,
            delay: 1.5
          }} 
          className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" 
        />
      </motion.div>
    </div>
  );
};

export default HeroHeading;
