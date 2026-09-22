
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransitionDirection } from '@/hooks/use3DTransition';

interface Section3DOverlayProps {
  isVisible: boolean;
  direction: TransitionDirection;
  variation: { intensity: number; duration: number };
}

const Section3DOverlay: React.FC<Section3DOverlayProps> = ({ 
  isVisible, 
  direction, 
  variation 
}) => {
  const duration = variation.duration / 1000; // Convert to seconds
  const intensity = variation.intensity;

  // Dynamic gradient based on direction
  const getGradient = () => {
    if (direction === 'up') {
      return `linear-gradient(to top, rgba(var(--primary), ${intensity}), transparent 60%)`;
    } else if (direction === 'down') {
      return `linear-gradient(to bottom, rgba(var(--primary), ${intensity}), transparent 60%)`;
    }
    return `linear-gradient(45deg, rgba(var(--primary), ${intensity * 0.5}), transparent)`;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-40 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration * 0.3, ease: "easeOut" }}
        >
          {/* Subtle directional gradient sweep */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: getGradient(),
            }}
            initial={{ 
              opacity: 0,
              y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
            }}
            animate={{ 
              opacity: 1,
              y: 0,
            }}
            exit={{ 
              opacity: 0,
              y: direction === 'up' ? -20 : direction === 'down' ? 20 : 0,
            }}
            transition={{ 
              duration,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
          />
          
          {/* Ultra-light blur layer */}
          <motion.div
            className="absolute inset-0 backdrop-blur-[1px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: intensity * 2 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: duration * 0.5,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Section3DOverlay;
