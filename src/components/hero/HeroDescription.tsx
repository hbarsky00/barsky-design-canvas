
import React from "react";
import { motion } from "framer-motion";

interface HeroDescriptionProps {
  isVisible: boolean;
}

const HeroDescription: React.FC<HeroDescriptionProps> = ({ isVisible }) => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="text-lg text-gray-600 leading-relaxed max-w-4xl mx-auto"
    >
      With over 15 years of experience in the design industry as a UX / UI Design Specialist, I help growing businesses and startups with product branding and web/mobile design. I specialize in scalable solutions for responsive applications, utilizing user research and data for actionable insights. A collaborative team player, I'm dedicated to mentorship and delivering high-impact, innovative design solutions.
    </motion.p>
  );
};

export default HeroDescription;
