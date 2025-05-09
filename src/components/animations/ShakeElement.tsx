
import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from "@/lib/utils";

interface ShakeElementProps {
  children: React.ReactNode;
  className?: string;
  trigger?: boolean;
  interval?: number;
  intensity?: 'subtle' | 'medium' | 'strong';
  duration?: number;
}

const ShakeElement: React.FC<ShakeElementProps> = ({
  children,
  className,
  trigger = false,
  interval = 0,
  intensity = 'medium',
  duration = 0.5,
}) => {
  const controls = useAnimation();
  const [shouldShake, setShouldShake] = useState(trigger);
  
  // Set intensity of the shake
  const getIntensityValues = () => {
    switch (intensity) {
      case 'subtle':
        return [-1, 1, -0.5, 0.5, 0];
      case 'strong':
        return [-6, 6, -4, 4, -2, 2, 0];
      case 'medium':
      default:
        return [-3, 3, -2, 2, -1, 1, 0];
    }
  };

  // Auto-trigger if interval specified
  useEffect(() => {
    if (interval > 0) {
      const timer = setInterval(() => {
        setShouldShake(true);
        setTimeout(() => setShouldShake(false), duration * 1000);
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [interval, duration]);

  // Trigger from props
  useEffect(() => {
    setShouldShake(trigger);
    if (trigger) {
      const timer = setTimeout(() => setShouldShake(false), duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  // Run the shake animation
  useEffect(() => {
    if (shouldShake) {
      controls.start({
        rotate: getIntensityValues(),
        transition: {
          duration: duration,
          ease: "easeInOut"
        }
      });
    }
  }, [shouldShake, controls, duration]);

  return (
    <motion.div 
      className={cn("inline-block", className)}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};

export default ShakeElement;
