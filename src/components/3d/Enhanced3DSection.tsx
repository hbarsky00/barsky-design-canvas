import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useAdvanced3DTilt } from "@/hooks/useAdvanced3DTilt";
import { cn } from "@/lib/utils";

interface Enhanced3DSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "elevated";
  layered?: boolean;
  parallax?: boolean;
}

const Enhanced3DSection: React.FC<Enhanced3DSectionProps> = ({
  children,
  className,
  variant = "default",
  layered = true,
  parallax = true,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { containerStyle, layers } = useAdvanced3DTilt(sectionRef, {
    maxTilt: 6,
    depthLayers: layered ? 3 : 1,
    blurIntensity: 1,
  });

  const variants = {
    default: "bg-background/50",
    glass: "bg-background/80 backdrop-blur-sm border border-border/50",
    elevated: "bg-card shadow-elevation border border-border/20",
  };

  return (
    <motion.section
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden rounded-xl transform-gpu",
        variants[variant],
        className
      )}
      style={{
        transformStyle: "preserve-3d",
        ...(parallax ? containerStyle : {}),
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Layers */}
      {layered && (
        <>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-inherit"
            style={layers[0]}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-tl from-accent/3 via-transparent to-muted/3 rounded-inherit"
            style={layers[1]}
          />
        </>
      )}
      
      {/* Content */}
      <motion.div
        className="relative z-10"
        style={layered ? layers[2] : {}}
      >
        {children}
      </motion.div>
      
      {/* Ambient Light */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-inherit pointer-events-none" />
    </motion.section>
  );
};

export default Enhanced3DSection;