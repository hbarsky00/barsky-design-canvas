
import React from "react";
import { motion } from "framer-motion";

interface SkateboardAnimationProps {
  startDelay?: number;
}

const SkateboardAnimation: React.FC<SkateboardAnimationProps> = ({ startDelay = 1500 }) => {
  return (
    <motion.div
      className="absolute z-10 transform"
      initial={{ x: "-150%", rotate: 0, y: 0 }}
      animate={{
        x: "150%",
        rotate: [-2, 4, -3, 0],
        y: [-2, 3, -2, 0],
        transition: {
          delay: startDelay / 1000,
          duration: 1.8,
          ease: "easeInOut",
          rotate: {
            duration: 0.6,
            repeat: 3,
            repeatType: "mirror"
          },
          y: {
            duration: 0.4,
            repeat: 4,
            repeatType: "reverse"
          }
        }
      }}
    >
      <svg
        width="60"
        height="20"
        viewBox="0 0 60 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transform rotate-3"
      >
        {/* Skateboard deck */}
        <rect x="10" y="7" width="40" height="6" rx="3" fill="#5D5DFF" />
        
        {/* Wheels */}
        <circle cx="15" cy="16" r="4" fill="#333644" />
        <circle cx="45" cy="16" r="4" fill="#333644" />
        
        {/* Trucks */}
        <rect x="13" y="13" width="4" height="2" fill="#888" />
        <rect x="43" y="13" width="4" height="2" fill="#888" />
        
        {/* Character */}
        <circle cx="30" cy="5" r="4" fill="#333644" />
        <rect x="28" y="9" width="4" height="6" fill="#333644" />
        <line x1="28" y1="11" x2="24" y2="14" stroke="#333644" strokeWidth="2" />
        <line x1="32" y1="11" x2="36" y2="14" stroke="#333644" strokeWidth="2" />
        <line x1="28" y1="15" x2="26" y2="19" stroke="#333644" strokeWidth="2" />
        <line x1="32" y1="15" x2="34" y2="19" stroke="#333644" strokeWidth="2" />
      </svg>
    </motion.div>
  );
};

export default SkateboardAnimation;
