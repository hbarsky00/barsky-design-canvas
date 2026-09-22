import React from "react";
import { motion } from "framer-motion";

interface MaterialDesignLoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

const MaterialDesignLoader: React.FC<MaterialDesignLoaderProps> = ({ 
  size = "md", 
  className = "",
  text = "Loading..."
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const particleSize = {
    sm: 2,
    md: 3,
    lg: 4
  };

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {/* Main Ring with Morphing Arc */}
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Background Ring */}
        <div 
          className={`absolute inset-0 rounded-full border-2 border-md-sys-outline-variant ${sizeClasses[size]}`}
        />
        
        {/* Animated Arc */}
        <motion.div
          className={`absolute inset-0 rounded-full border-2 border-transparent border-t-md-sys-primary ${sizeClasses[size]}`}
          animate={{ 
            rotate: 360,
            borderRightColor: ["transparent", "hsl(var(--md-sys-color-primary))", "transparent"],
            borderBottomColor: ["transparent", "transparent", "hsl(var(--md-sys-color-primary))"],
          }}
          transition={{ 
            rotate: { duration: 1.2, repeat: Infinity, ease: "linear" },
            borderRightColor: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
            borderBottomColor: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Morphing Particles */}
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute bg-md-sys-primary rounded-full"
            style={{
              width: particleSize[size],
              height: particleSize[size],
              top: '50%',
              left: '50%',
              originX: 0.5,
              originY: 0.5,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.3, 1],
              opacity: [0.7, 1, 0.7],
              x: [
                0, 
                Math.cos((index * 120 * Math.PI) / 180) * (size === 'sm' ? 12 : size === 'md' ? 18 : 24),
                0
              ],
              y: [
                0,
                Math.sin((index * 120 * Math.PI) / 180) * (size === 'sm' ? 12 : size === 'md' ? 18 : 24),
                0
              ]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
          />
        ))}

        {/* Central Breathing Dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-md-sys-tertiary rounded-full"
          style={{
            width: particleSize[size] * 1.5,
            height: particleSize[size] * 1.5,
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Loading Text */}
      <motion.p 
        className="text-md-sys-on-surface-variant text-body-medium font-medium"
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {text}
      </motion.p>
    </div>
  );
};

export default MaterialDesignLoader;