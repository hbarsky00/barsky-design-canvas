import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInteractive3DTilt } from "@/hooks/useInteractive3DTilt";
import { cn } from "@/lib/utils";

interface Interactive3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
  perspective?: number;
  speed?: number;
  depth?: boolean;
}

const Interactive3DCard: React.FC<Interactive3DCardProps> = ({
  children,
  className,
  maxTilt = 12,
  scale = 1.02,
  glare = true,
  perspective = 1000,
  speed = 400,
  depth = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { containerStyle, glareStyle, isHovered } = useInteractive3DTilt(cardRef, {
    maxTilt,
    perspective,
    scale,
    speed,
    glare,
  });

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative transform-gpu transition-shadow duration-300",
        depth && "shadow-elevation",
        depth && isHovered && "shadow-elevation-hover",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        ...containerStyle,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Card Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
      
      {/* Glare Effect */}
      {glare && (
        <div
          style={glareStyle}
          className="pointer-events-none z-20 rounded-inherit"
        />
      )}
      
      {/* Depth Shadow */}
      {depth && (
        <div
          className="absolute inset-0 -z-10 rounded-inherit bg-gradient-to-br from-primary/5 to-secondary/5 blur-sm"
          style={{
            transform: `translateZ(-10px) scale(${isHovered ? 0.98 : 0.95})`,
            opacity: isHovered ? 0.8 : 0.4,
            transition: `all ${speed}ms cubic-bezier(0.03, 0.98, 0.52, 0.99)`,
          }}
        />
      )}
    </motion.div>
  );
};

export default Interactive3DCard;