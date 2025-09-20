import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CrackPatterns from './CrackPatterns';

interface CrackOverlayProps {
  isActive: boolean;
  size: number;
  onComplete?: () => void;
  duration?: number;
}

const CrackOverlay: React.FC<CrackOverlayProps> = ({ 
  isActive, 
  size, 
  onComplete,
  duration = 2000 
}) => {
  const [showCracks, setShowCracks] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShowCracks(true);
      
      // Show particles after initial crack animation
      const particleTimer = setTimeout(() => {
        setShowParticles(true);
      }, 200);

      // Auto-hide after duration
      const hideTimer = setTimeout(() => {
        setShowCracks(false);
        setShowParticles(false);
        onComplete?.();
      }, duration);

      return () => {
        clearTimeout(particleTimer);
        clearTimeout(hideTimer);
      };
    } else {
      setShowCracks(false);
      setShowParticles(false);
    }
  }, [isActive, duration, onComplete]);

  // Generate random particles for glass effect
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: 120 + Math.random() * 80 - 40,
    y: 100 + Math.random() * 80 - 40,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 0.3,
  }));

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ 
        width: size, 
        height: size,
        borderRadius: '50%',
        zIndex: 3
      }}
    >
      <AnimatePresence>
        {(showCracks || isActive) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0"
          >
            <CrackPatterns isVisible={showCracks} size={size} />
          </motion.div>
        )}
        
        {/* Glass particles effect */}
        {showParticles && (
          <div className="absolute inset-0">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ 
                  x: particle.x,
                  y: particle.y,
                  opacity: 1,
                  scale: 1 
                }}
                animate={{ 
                  x: particle.x + (Math.random() - 0.5) * 60,
                  y: particle.y + Math.random() * 40 + 20,
                  opacity: 0,
                  scale: 0.3,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 1.5,
                  delay: particle.delay,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="absolute bg-white/70 shadow-sm"
                style={{
                  width: particle.size,
                  height: particle.size,
                  borderRadius: '50%',
                  filter: 'blur(0.5px)',
                }}
              />
            ))}
          </div>
        )}
        
        {/* Glass distortion effect */}
        {showCracks && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 67% 50%, rgba(255,255,255,0.4) 0%, transparent 30%)',
              filter: 'blur(1px)',
              borderRadius: '50%',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default CrackOverlay;