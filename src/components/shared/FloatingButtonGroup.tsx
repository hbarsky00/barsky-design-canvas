import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, Coffee } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingButtonGroup: React.FC = () => {
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);

  // Only show on homepage
  if (location.pathname !== '/') {
    return null;
  }

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, duration: 0.3 }}
    >
      {/* Scroll to Top Button - only visible on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={scrollToTop}
              size="icon"
              className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Buy Me Coffee Button - always visible with premium hover glow */}
      <motion.a
        href="https://buy.stripe.com/dRm14n2dl2xF7bG8O8dUY01"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-full shadow-lg transition-all duration-300 group"
        whileHover={{ 
          scale: 1.05, 
          y: -3,
          boxShadow: "0 10px 25px -3px rgba(217, 119, 6, 0.5)"
        }}
        whileTap={{ scale: 0.95 }}
      >
        <Coffee 
          size={20} 
          className="group-hover:animate-pulse" 
        />
        <span className="text-sm font-semibold">Buy Me a Coffee</span>
      </motion.a>
    </motion.div>
  );
};

export default FloatingButtonGroup;