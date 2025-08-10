import React from "react";
import { motion } from "framer-motion";

interface SectionTransitionProps {
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  className?: string;
  children: React.ReactNode;
  variant?: "fade" | "wipe";
  delay?: number;
}

const SectionTransition: React.FC<SectionTransitionProps> = ({
  as = "section",
  id,
  className = "",
  children,
  variant = "fade",
  delay = 0,
}) => {
  const MotionTag: any = motion[as as keyof typeof motion] || motion.section;

  return (
    <MotionTag
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      className={`relative ${className}`}
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
