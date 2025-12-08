import React from "react";
import { motion } from "framer-motion";

const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden opacity-30 pointer-events-none">
      {/* Purple Orb - Top Left */}
      <motion.div
        className="absolute w-[500px] h-[500px] md:w-[600px] md:h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(263 85% 67% / 0.8) 0%, hsl(263 85% 67% / 0) 70%)",
          filter: "blur(120px)",
          top: "-10%",
          left: "-5%",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 1.1, 1],
          rotate: [0, 45, 90, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blue Orb - Center Right */}
      <motion.div
        className="absolute w-[450px] h-[450px] md:w-[550px] md:h-[550px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(231 92% 58% / 0.7) 0%, hsl(231 92% 58% / 0) 70%)",
          filter: "blur(120px)",
          top: "30%",
          right: "-10%",
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, 40, 0],
          scale: [1, 1.15, 1.25, 1],
          rotate: [0, -30, -60, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Cyan Orb - Bottom Center */}
      <motion.div
        className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(187 100% 42% / 0.6) 0%, hsl(187 100% 42% / 0) 70%)",
          filter: "blur(120px)",
          bottom: "-5%",
          left: "30%",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -60, -30, 0],
          scale: [1, 1.3, 1.1, 1],
          rotate: [0, 60, 120, 0],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  );
};

export default AuroraBackground;
