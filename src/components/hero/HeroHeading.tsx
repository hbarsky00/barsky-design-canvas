
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
        text="Barsky Design" 
        tag="h1" 
        className="text-4xl sm:text-6xl font-bold mb-4 text-gray-900 block"
        delay={800}
        type="word"
        animation="bounce"
        staggerChildren={0.1}
      />
      <AnimatedText 
        text="UX Research & Design Agency" 
        tag="h2" 
        className="text-lg sm:text-2xl font-semibold text-gray-600 block"
        delay={1000}
        type="word"
        animation="fade"
        staggerChildren={0.05}
      />
    </div>
  );
};

export default HeroHeading;
