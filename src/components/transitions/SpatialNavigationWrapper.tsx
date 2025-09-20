import React from "react";
import { motion } from "framer-motion";

interface SpatialNavigationWrapperProps {
  children: React.ReactNode;
  className?: string;
  isNavigating?: boolean;
}

const SpatialNavigationWrapper: React.FC<SpatialNavigationWrapperProps> = ({
  children,
  className = "",
  isNavigating = false,
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      style={{
        perspective: "1200px",
        transformStyle: "preserve-3d",
      }}
      animate={isNavigating ? {
        scale: 0.95,
        rotateY: -2,
        z: -50,
      } : {
        scale: 1,
        rotateY: 0,
        z: 0,
      }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {/* Depth layers for 3D effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, transparent, hsl(var(--md-sys-color-shadow) / 0.05))",
          transform: "translateZ(-10px)",
        }}
        animate={isNavigating ? {
          opacity: 0.3,
        } : {
          opacity: 0,
        }}
        transition={{
          duration: 0.4,
        }}
      />
      
      {/* Main content */}
      <motion.div
        className="relative z-10"
        animate={isNavigating ? {
          filter: "blur(1px)",
        } : {
          filter: "blur(0px)",
        }}
        transition={{
          duration: 0.3,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default SpatialNavigationWrapper;