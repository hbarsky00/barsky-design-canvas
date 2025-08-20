import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInteractive3DTilt } from "@/hooks/useInteractive3DTilt";
import { cn } from "@/lib/utils";

interface Floating3DButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  floating?: boolean;
  pulsing?: boolean;
}

const Floating3DButton: React.FC<Floating3DButtonProps> = ({
  children,
  className,
  variant = "primary",
  size = "md",
  onClick,
  disabled = false,
  floating = true,
  pulsing = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { containerStyle, glareStyle, isHovered } = useInteractive3DTilt(buttonRef, {
    maxTilt: 8,
    scale: 1.05,
    speed: 200,
    glare: true,
  });

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary/25",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-secondary/25",
    ghost: "bg-background/50 text-foreground hover:bg-accent shadow-accent/25",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <motion.button
      ref={buttonRef}
      className={cn(
        "relative overflow-hidden rounded-lg font-medium transition-all duration-200 transform-gpu",
        "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2",
        "active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        floating && "shadow-lg hover:shadow-xl",
        pulsing && !disabled && "animate-pulse",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        ...containerStyle,
        boxShadow: isHovered 
          ? `0 10px 30px -5px var(--shadow-color, rgba(0,0,0,0.25)), 0 0 0 1px rgba(255,255,255,0.1) inset`
          : `0 4px 15px -2px var(--shadow-color, rgba(0,0,0,0.15))`,
      }}
      onClick={onClick}
      disabled={disabled}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
      
      {/* Glare Effect */}
      <div
        style={glareStyle}
        className="pointer-events-none z-20 rounded-inherit"
      />
      
      {/* Floating Animation */}
      {floating && !disabled && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-inherit bg-current"
          style={{ opacity: 0.1 }}
          animate={{
            y: [0, -2, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </motion.button>
  );
};

export default Floating3DButton;