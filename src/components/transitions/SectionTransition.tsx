import React from "react";
import { motion } from "framer-motion";
import AdvancedSectionTransition from "./AdvancedSectionTransition";

interface SectionTransitionProps {
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: "fade" | "wipe" | "morph" | "perspective" | "wave" | "parallax";
  delay?: number;
  intensity?: number;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  as = "section",
  id,
  className = "",
  children,
  variant = "fade",
  delay = 0,
  intensity = 1,
}) => {
  // Use advanced transitions for new variants
  if (["morph", "perspective", "wave", "parallax"].includes(variant)) {
    return (
      <AdvancedSectionTransition
        as={as}
        id={id}
        className={className}
        variant={variant as "morph" | "perspective" | "wave" | "parallax"}
        delay={delay}
        intensity={intensity}
      >
        {children}
      </AdvancedSectionTransition>
    );
  }

  // Original fade and wipe animations
  const MotionTag: any = motion[as as keyof typeof motion] || motion.section;

  return (
    <MotionTag
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={`relative ${className}`}
      style={{ 
        transform: 'translate3d(0,0,0)',
        willChange: 'transform, opacity'
      }}
    >
      {variant === "wipe" && (
        <motion.div
          aria-hidden
          initial={{ x: "-100%", opacity: 0.22 }}
          whileInView={{ x: "100%", opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          viewport={{ once: true }}
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10"
          style={{ mixBlendMode: "normal" }}
        />
      )}
      {children}
    </MotionTag>
  );
};

export default SectionTransition;
