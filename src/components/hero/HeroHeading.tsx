
import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "../AnimatedText";

interface HeroHeadingProps {
  isVisible: boolean;
}

const HeroHeading: React.FC<HeroHeadingProps> = ({ isVisible }) => {
  return (
    <div className="relative">
      <AnimatedText 
        text="Hi, I'm Hiram Barsky" 
        tag="h1" 
        className="text-lg sm:text-2xl font-semibold mb-4 text-gray-600 block"
        delay={800}
        type="word"
        animation="bounce"
        staggerChildren={0.05}
      />
    </div>
  );
};

export default HeroHeading;
