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
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            duration: 0.4, 
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className="fixed inset-0 z-[70] flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, hsl(var(--background) / 0.98), hsl(var(--muted) / 0.95))",
            backdropFilter: "blur(8px)",
            willChange: "transform, opacity",
          }}
        >
          {/* Loading content */}
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative z-10 flex flex-col items-center space-y-4"
          >
            {/* Simple Loading spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                rotate: { duration: 1, repeat: Infinity, ease: "linear" }
              }}
              className="w-8 h-8 border-2 border-transparent border-t-primary rounded-full"
              style={{
                willChange: "transform",
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