
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BounceWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  intensity?: "subtle" | "medium" | "strong";
  bounce?: boolean;
  scale?: boolean;
  wiggle?: boolean;
}

const BounceWrapper: React.FC<BounceWrapperProps> = ({
  children,
  className,
  delay = 0,
  intensity = "medium",
  bounce = true,
  scale = true,
  wiggle = false,
}) => {
  // Configure animation intensity
  const intensityConfig = {
    subtle: {
      y: bounce ? [0, -3, 0] : 0,
      scale: scale ? [1, 1.03, 1] : 1,
      rotate: wiggle ? [-1, 1, -0.5, 0.5, 0] : 0,
    },
    medium: {
      y: bounce ? [0, -6, 0] : 0,
      scale: scale ? [1, 1.07, 1] : 1,
      rotate: wiggle ? [-2, 2, -1, 1, 0] : 0,
    },
    strong: {
      y: bounce ? [0, -10, 0] : 0,
      scale: scale ? [1, 1.12, 1] : 1,
      rotate: wiggle ? [-3, 3, -1.5, 1.5, 0] : 0,
    },
  };

  const config = intensityConfig[intensity];

  return (
    <motion.div
      className={cn("inline-flex", className)}
      whileHover={{
        y: config.y,
        scale: config.scale,
        rotate: config.rotate,
        transition: {
          duration: 0.5,
          delay: delay,
          type: "spring",
          stiffness: 500,
          damping: 10,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default BounceWrapper;
