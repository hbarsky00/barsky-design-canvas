import React, { useRef, createContext, useContext } from "react";
import { motion } from "framer-motion";

interface StickyScrollContextType {
  containerRef: React.RefObject<HTMLDivElement>;
  totalCards: number;
}

const StickyScrollContext = createContext<StickyScrollContextType | null>(null);

export const useStickyScrollContext = () => {
  const context = useContext(StickyScrollContext);
  if (!context) {
    throw new Error("useStickyScrollContext must be used within StickyScrollContainer");
  }
  return context;
};

interface StickyScrollContainerProps {
  children: React.ReactNode;
  cardCount: number;
  className?: string;
}

const StickyScrollContainer: React.FC<StickyScrollContainerProps> = ({
  children,
  cardCount,
  className = ""
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate height to allow proper scrolling through all cards
  // Each card needs enough space to trigger its sticky behavior
  const containerHeight = `${cardCount * 100}vh`;

  return (
    <StickyScrollContext.Provider value={{ containerRef, totalCards: cardCount }}>
      <div
        ref={containerRef}
        className={`relative ${className}`}
        style={{ height: containerHeight }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {children}
        </div>
      </div>
    </StickyScrollContext.Provider>
  );
};

export default StickyScrollContainer;