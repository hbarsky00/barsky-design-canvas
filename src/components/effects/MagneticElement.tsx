import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticElementProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  distance?: number;
  springConfig?: {
    stiffness: number;
    damping: number;
    mass: number;
  };
}

const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  className,
  strength = 0.3,
  distance = 80,
  springConfig = { stiffness: 300, damping: 30, mass: 0.8 }
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const rotateX = useTransform(springY, [-distance, distance], [5, -5]);
  const rotateY = useTransform(springX, [-distance, distance], [-5, 5]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;
    
    const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distanceFromCenter < distance) {
      const magneticStrength = (distance - distanceFromCenter) / distance;
      x.set(deltaX * strength * magneticStrength);
      y.set(deltaY * strength * magneticStrength);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn("relative", className)}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

export default MagneticElement;