import React from "react";
import { motion, Variants } from "framer-motion";

interface RouteTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const routeVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  enter: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

const RouteTransition: React.FC<RouteTransitionProps> = ({ children, className = "" }) => {
  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={routeVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default RouteTransition;
