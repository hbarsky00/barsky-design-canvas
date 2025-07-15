
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HeroStatementLogo from "../logo/HeroStatementLogo";

interface HeroLogoProps {
  isVisible: boolean;
}

const HeroLogo: React.FC<HeroLogoProps> = ({ isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ 
        duration: 0.6, 
        delay: 0.2,
        ease: "easeOut"
      }}
      className="flex justify-center md:justify-start mb-8"
    >
      <HeroStatementLogo isVisible={isVisible} />
    </motion.div>
  );
};

export default HeroLogo;
