import React from "react";
import { motion } from "framer-motion";
import { useStickyScroll } from "@/hooks/useStickyScroll";
import { useStickyScrollContext } from "./StickyScrollContainer";

interface StickyScrollCardProps {
  children: React.ReactNode;
  index: number;
  className?: string;
}

const StickyScrollCard: React.FC<StickyScrollCardProps> = ({
  children,
  index,
  className = ""
}) => {
  const { containerRef, cards } = useStickyScrollContext();

  const { opacity, scale, y, zIndex } = useStickyScroll(
    containerRef,
    cards,
    index
  );

  return (
    <motion.div
      ref={cards[index].ref}
      className={`absolute inset-0 w-full h-full ${className}`}
      style={{
        opacity,
        scale,
        y,
        zIndex
      }}
    >
      {children}
    </motion.div>
  );
};

export default StickyScrollCard;