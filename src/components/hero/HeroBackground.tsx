
import React from "react";
import { motion } from "framer-motion";

const HeroBackground: React.FC = () => {
  return (
    <>
      {/* Enhanced Layered Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-purple-50/30 to-indigo-50/40" />
      
      {/* Animated Mesh Gradient */}
      <motion.div 
        animate={{ 
          background: [
            "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(119, 255, 198, 0.1) 0%, transparent 50%)"
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0"
      />
      
      {/* Enhanced Floating Glass Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, 0],
          x: [0, 20, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-80 h-80 glass-accent rounded-full blur-3xl opacity-40" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, -15, 0],
          x: [0, -30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl opacity-50" 
      />
      
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          y: [0, -40, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        className="absolute top-1/2 left-1/4 w-40 h-40 bg-blue-400/10 rounded-full blur-2xl" 
      />

      {/* Animated Dots Pattern */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-blue-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default HeroBackground;
