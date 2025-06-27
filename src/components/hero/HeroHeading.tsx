
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
        text="Enhancing Product Experiences for Innovative Brands"
        tag="h1"
        className="text-xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight block"
        delay={1000}
        type="word"
        animation="bounce"
        staggerChildren={0.1}
      />
    </div>
  );
};

export default HeroHeading;
