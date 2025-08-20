import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PageTransitionProps {
  isVisible: boolean;
  children?: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ isVisible, children }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, rotateY: 90, scale: 0.8 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.25, 0.46, 0.45, 0.94],
            rotateY: { duration: 0.6 },
            scale: { duration: 0.4 }
          }}
          className="fixed inset-0 z-[70] flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, hsl(var(--background) / 0.95), hsl(var(--muted) / 0.9))",
            backdropFilter: "blur(20px)",
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateX: -45 }}
            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateX: 45 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10"
            style={{ transformStyle: "preserve-3d" }}
          />
          
          {/* Loading content */}
          <motion.div
            initial={{ y: 30, opacity: 0, rotateX: 45 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            exit={{ y: -30, opacity: 0, rotateX: -45 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative z-10 flex flex-col items-center space-y-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Enhanced 3D Loading spinner */}
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-12 h-12 border-4 border-transparent border-t-primary rounded-full shadow-lg"
              style={{
                filter: "drop-shadow(0 4px 8px hsl(var(--primary) / 0.3))",
                transform: "translateZ(20px)",
              }}
            />
            
            {/* Custom content */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageTransition;