import React, { useRef } from "react";
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
  const cardRef = useRef<HTMLDivElement>(null);
  const { containerRef, totalCards } = useStickyScrollContext();

  const cards = Array.from({ length: totalCards }, (_, i) => ({
    id: `card-${i}`,
    ref: cardRef
  }));

  const { opacity, scale, y, zIndex } = useStickyScroll(
    containerRef,
    cards,
    index
  );

  return (
    <motion.div
      ref={cardRef}
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