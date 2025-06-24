
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
        text="AI-Fluent UX Designer" 
        tag="h2" 
        className="text-xl sm:text-2xl font-semibold mb-3 text-gray-600"
        delay={800}
        type="word"
        animation="bounce"
        staggerChildren={0.05}
      />
      <AnimatedText
        text="Driving 40% Conversion Gains Through Strategic Design"
        tag="h1"
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 leading-tight"
        delay={1000}
        type="word"
        animation="bounce"
        staggerChildren={0.1}
      />
    </div>
  );
};

export default HeroHeading;
