import React from 'react';
import { motion } from 'framer-motion';

interface MetricDisplayProps {
  value: string;
  label: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'cyan' | 'purple' | 'green';
}

const MetricDisplay: React.FC<MetricDisplayProps> = ({
  value,
  label,
  size = 'md',
  color = 'cyan',
}) => {
  const sizeClasses = {
    sm: 'text-3xl sm:text-4xl',
    md: 'text-4xl sm:text-5xl lg:text-6xl',
    lg: 'text-5xl sm:text-6xl lg:text-7xl',
  };
  
  const colorClasses = {
    cyan: 'text-neon-cyan',
    purple: 'text-neon-purple',
    green: 'text-neon-green',
  };
  
  const glowColors = {
    cyan: '0 0 20px hsl(var(--neon-cyan) / 0.5), 0 0 40px hsl(var(--neon-cyan) / 0.3)',
    purple: '0 0 20px hsl(var(--neon-purple) / 0.5), 0 0 40px hsl(var(--neon-purple) / 0.3)',
    green: '0 0 20px hsl(var(--neon-green) / 0.5), 0 0 40px hsl(var(--neon-green) / 0.3)',
  };

  return (
    <div className="space-y-1">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, type: 'spring' }}
        className={`${sizeClasses[size]} ${colorClasses[color]} font-bold font-mono tracking-tight`}
        style={{
          textShadow: glowColors[color],
        }}
      >
        {value}
      </motion.div>
      <p className="text-sm sm:text-base text-muted-foreground font-medium">
        {label}
      </p>
    </div>
  );
};

export default MetricDisplay;
