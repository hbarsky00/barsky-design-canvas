
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TransitionDirection } from '@/hooks/use3DTransition';

interface Section3DOverlayProps {
  isVisible: boolean;
  direction: TransitionDirection;
}

const Section3DOverlay: React.FC<Section3DOverlayProps> = ({ isVisible, direction }) => {
  const getTransforms = (direction: TransitionDirection) => {
    switch (direction) {
      case 'up':
        return {
          rotateX: [-15, 0, 15],
          rotateY: [5, 0, -5],
          translateZ: [200, 0, -200],
        };
      case 'down':
        return {
          rotateX: [15, 0, -15],
          rotateY: [-5, 0, 5],
          translateZ: [-200, 0, 200],
        };
      default:
        return {
          rotateX: [0, 0, 0],
          rotateY: [0, 0, 0],
          translateZ: [0, 0, 0],
        };
    }
  };

  const transforms = getTransforms(direction);

  return (
    <AnimatePresence>
      {isVisible && (
        <div 
          className="fixed inset-0 z-50 pointer-events-none"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {/* Background blur layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 bg-background/90 backdrop-blur-sm"
            style={{ transform: 'translateZ(-300px)' }}
          />

          {/* Geometric layer - back */}
          <motion.div
            initial={{ 
              opacity: 0,
              rotateX: transforms.rotateX[0],
              rotateY: transforms.rotateY[0],
              translateZ: transforms.translateZ[0],
              scale: 0.8
            }}
            animate={{ 
              opacity: 0.6,
              rotateX: transforms.rotateX[1],
              rotateY: transforms.rotateY[1],
              translateZ: transforms.translateZ[1],
              scale: 1
            }}
            exit={{ 
              opacity: 0,
              rotateX: transforms.rotateX[2],
              rotateY: transforms.rotateY[2],
              translateZ: transforms.translateZ[2],
              scale: 1.2
            }}
            transition={{ 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl border border-primary/20 shadow-2xl" />
          </motion.div>

          {/* Geometric layer - middle */}
          <motion.div
            initial={{ 
              opacity: 0,
              rotateX: transforms.rotateX[0] * 0.6,
              rotateY: transforms.rotateY[0] * 0.6,
              translateZ: transforms.translateZ[0] * 0.5,
              scale: 0.9
            }}
            animate={{ 
              opacity: 0.4,
              rotateX: transforms.rotateX[1],
              rotateY: transforms.rotateY[1],
              translateZ: transforms.translateZ[1] * 0.5,
              scale: 1
            }}
            exit={{ 
              opacity: 0,
              rotateX: transforms.rotateX[2] * 0.6,
              rotateY: transforms.rotateY[2] * 0.6,
              translateZ: transforms.translateZ[2] * 0.5,
              scale: 1.1
            }}
            transition={{ 
              duration: 0.8, 
              delay: 0.1,
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-secondary/30 to-secondary/15 rounded-xl border border-secondary/30 shadow-xl" />
          </motion.div>

          {/* Geometric layer - front */}
          <motion.div
            initial={{ 
              opacity: 0,
              rotateX: transforms.rotateX[0] * 0.3,
              rotateY: transforms.rotateY[0] * 0.3,
              scale: 1.1
            }}
            animate={{ 
              opacity: 0.2,
              rotateX: transforms.rotateX[1],
              rotateY: transforms.rotateY[1],
              scale: 1
            }}
            exit={{ 
              opacity: 0,
              rotateX: transforms.rotateX[2] * 0.3,
              rotateY: transforms.rotateY[2] * 0.3,
              scale: 0.9
            }}
            transition={{ 
              duration: 0.8, 
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            className="absolute inset-0 flex items-center justify-center"
            style={{ 
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-accent/40 to-accent/20 rounded-lg border border-accent/40 shadow-lg" />
          </motion.div>

          {/* Gradient overlay with parallax */}
          <motion.div
            initial={{ 
              opacity: 0,
              y: direction === 'up' ? -50 : 50,
              scale: 0.95
            }}
            animate={{ 
              opacity: 0.3,
              y: 0,
              scale: 1
            }}
            exit={{ 
              opacity: 0,
              y: direction === 'up' ? 50 : -50,
              scale: 1.05
            }}
            transition={{ 
              duration: 0.6, 
              delay: 0.1,
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
          />
        </div>
      )}
    </AnimatePresence>
  );
};

export default Section3DOverlay;
