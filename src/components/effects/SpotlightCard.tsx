import React from 'react';
import { motion } from 'framer-motion';
import { useSpotlightEffect } from '@/hooks/useSpotlightEffect';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  radius?: number;
  color?: string;
  intensity?: number;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  radius = 150,
  color = 'hsl(180 100% 50%)',
  intensity = 0.15,
}) => {
  const {
    spotlightRef,
    spotlightPosition,
    isHovering,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
  } = useSpotlightEffect(radius, color, intensity);

  return (
    <motion.div
      ref={spotlightRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {/* Spotlight overlay */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          background: isHovering
            ? `radial-gradient(${radius}px circle at ${spotlightPosition.x}px ${spotlightPosition.y}px, ${color.replace(')', ` / ${intensity})`).replace('hsl', 'hsla')}, transparent 100%)`
            : 'transparent',
          opacity: isHovering ? 1 : 0,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 1 : 0 }}
      />
      
      {/* Border glow effect */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
        style={{
          boxShadow: isHovering
            ? `inset 0 0 0 1px ${color.replace(')', ' / 0.3)').replace('hsl', 'hsla')}, 0 0 20px ${color.replace(')', ' / 0.1)').replace('hsl', 'hsla')}`
            : 'none',
          opacity: isHovering ? 1 : 0,
        }}
      />
      
      {children}
    </motion.div>
  );
};

export default SpotlightCard;
