import React, { useRef, createContext, useContext, useMemo } from "react";
import { motion } from "framer-motion";

export interface StickyScrollCard {
  id: string;
  ref: React.RefObject<HTMLDivElement>;
}

interface StickyScrollContextType {
  containerRef: React.RefObject<HTMLDivElement>;
  totalCards: number;
  cards: StickyScrollCard[];
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

  // Create unique refs for each card
  const cards = useMemo(() => 
    Array.from({ length: cardCount }, (_, i) => ({
      id: `card-${i}`,
      ref: useRef<HTMLDivElement>(null)
    })), [cardCount]);

  // Calculate height to allow proper scrolling through all cards
  // Each card needs enough space to trigger its sticky behavior
  const containerHeight = `${cardCount * 100}vh`;

  return (
    <StickyScrollContext.Provider value={{ containerRef, totalCards: cardCount, cards }}>
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