import React from "react";
import { motion } from "framer-motion";

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Orbs */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-full h-full"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-orange-400/20 rounded-full blur-3xl" />
      </motion.div>

      {/* Flowing Lines */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
            }}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        ))}
      </motion.div>

      {/* Geometric Shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-8 h-8 border border-cyan-400/40"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-1/3 left-1/5 w-6 h-6 bg-gradient-to-br from-pink-400/30 to-purple-400/30 rounded-full"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Mesh Gradient Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30"
        animate={{
          background: [
            "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%, rgba(147, 51, 234, 0.1) 100%)",
            "linear-gradient(135deg, rgba(147, 51, 234, 0.1) 0%, transparent 50%, rgba(59, 130, 246, 0.1) 100%)",
            "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 50%, rgba(147, 51, 234, 0.1) 100%)",
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default AnimatedBackground;