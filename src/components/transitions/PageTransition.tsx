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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8))",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Animated gradient overlay */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-indigo-500/10"
          />
          
          {/* Loading content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="relative z-10 flex flex-col items-center space-y-4"
          >
            {/* Loading spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-transparent border-t-blue-accent rounded-full"
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