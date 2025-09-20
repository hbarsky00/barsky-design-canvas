import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import MaterialDesignLoader from "@/components/loading/MaterialDesignLoader";

interface RoomTransitionProps {
  isVisible: boolean;
  children?: React.ReactNode;
  projectTitle?: string;
  stage?: "exiting" | "corridor" | "entering";
}

const RoomTransition: React.FC<RoomTransitionProps> = ({ 
  isVisible, 
  children, 
  projectTitle,
  stage = "corridor"
}) => {
  const getStageContent = () => {
    switch (stage) {
      case "exiting":
        return (
          <motion.div
            initial={{ opacity: 1, scale: 1, rotateY: 0, z: 0 }}
            animate={{ 
              opacity: 0, 
              scale: 0.8, 
              rotateY: -15,
              z: -200,
            }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        );
      
      case "entering":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 1.2, rotateY: 15, z: 200 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotateY: 0,
              z: 0,
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        );
      
      default: // corridor
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center space-y-6"
          >
            {/* Spatial Corridor Effect */}
            <motion.div
              className="relative w-full max-w-md h-32 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Perspective Lines */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 border-md-sys-outline-variant"
                  style={{
                    width: `${80 - i * 12}%`,
                    height: '2px',
                    top: `${20 + i * 15}%`,
                    transform: 'translateX(-50%)',
                    opacity: 0.3 - i * 0.05,
                  }}
                  animate={{
                    scaleX: [1, 1.1, 1],
                    opacity: [0.3 - i * 0.05, 0.5 - i * 0.05, 0.3 - i * 0.05],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.1,
                  }}
                />
              ))}
              
              {/* Depth Particles */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute bg-md-sys-primary rounded-full"
                  style={{
                    width: Math.random() * 4 + 2,
                    height: Math.random() * 4 + 2,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [0, 1, 0],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </motion.div>

            {/* Material Design Loader */}
            <MaterialDesignLoader 
              size="lg"
              text={projectTitle ? `Loading ${projectTitle}...` : "Transitioning to project..."}
            />

            {/* Progress Dots */}
            <motion.div 
              className="flex space-x-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-md-sys-primary rounded-full"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        );
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[80] overflow-hidden"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
            background: stage === "corridor" 
              ? "linear-gradient(135deg, hsl(var(--md-sys-color-surface) / 0.98), hsl(var(--md-sys-color-surface-container) / 0.95))"
              : "transparent",
            backdropFilter: stage === "corridor" ? "blur(12px)" : "none",
          }}
        >
          {getStageContent()}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RoomTransition;