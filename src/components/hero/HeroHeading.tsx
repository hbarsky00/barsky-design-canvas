
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
        text="Hi, I'm Hiram" 
        tag="h2" 
        className="text-xl sm:text-2xl font-semibold mb-4 text-white block"
        delay={800}
        type="word"
        animation="bounce"
        staggerChildren={0.05}
      />
      <AnimatedText
        text="AI-Fluent UX Designer"
        tag="h1"
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-white leading-tight block"
        delay={1000}
        type="word"
        animation="bounce"
        staggerChildren={0.1}
      />
      <AnimatedText
        text="Driving 40% Conversion Gains Through Strategic Design"
        tag="p"
        className="text-lg sm:text-xl text-white leading-relaxed block"
        delay={1200}
        type="word"
        animation="fade"
      />
    </div>
  );
};

export default HeroHeading;
