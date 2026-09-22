
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  yAmount?: number;
  xAmount?: number;
  duration?: number;
  delay?: number;
  rotate?: boolean;
}

const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className,
  yAmount = 10,
  xAmount = 0,
  duration = 3,
  delay = 0,
  rotate = false,
}) => {
  return (
    <motion.div
      className={cn("inline-block", className)}
      initial={{ y: 0, x: 0, rotate: 0 }}
      animate={{
        y: [-yAmount/2, yAmount/2, -yAmount/2],
        x: [-xAmount/2, xAmount/2, -xAmount/2],
        rotate: rotate ? [-1, 1, -1] : 0,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
