
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GhostSkateboardSvg from "./GhostSkateboardSvg";
import { Sparkles } from "lucide-react";

interface CelebrationEffectProps {
  show: boolean;
  onComplete?: () => void;
  message?: string;
}

const CelebrationEffect: React.FC<CelebrationEffectProps> = ({ 
  show, 
  onComplete,
  message = "Great job!"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (show) {
      setIsVisible(true);
      
      // Hide after animation completes
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.5, y: 50, opacity: 0 }}
            animate={{ 
              scale: 1, 
              y: 0, 
              opacity: 1,
              transition: { type: "spring", damping: 8 }
            }}
            exit={{ scale: 0.5, y: -50, opacity: 0 }}
            className="bg-barsky-blue text-white px-6 py-4 rounded-xl shadow-lg flex items-center gap-3"
          >
            <motion.div 
              animate={{ 
                rotate: [0, -10, 10, -5, 0],
                transition: { duration: 0.5, times: [0, 0.2, 0.4, 0.7, 1] }
              }}
              className="relative"
            >
              <GhostSkateboardSvg className="h-10 w-10" ghostOffset={5} />
            </motion.div>
            
            <div>
              <motion.p 
                className="font-bold text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {message}
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0], 
                scale: [0.5, 1.2, 0.8],
                transition: { 
                  duration: 1.5, 
                  repeat: 2,
                  repeatType: "loop"
                }
              }}
              className="absolute top-0 right-0 -mt-2 -mr-2"
            >
              <Sparkles className="text-yellow-300 h-6 w-6" />
            </motion.div>
          </motion.div>
          
          {/* Confetti effect */}
          <ConfettiEffect />
        </div>
      )}
    </AnimatePresence>
  );
};

// Simple confetti effect
const ConfettiEffect = () => {
  // Create array of confetti pieces
  const confettiPieces = Array.from({ length: 50 }).map((_, i) => {
    const size = Math.random() * 10 + 5;
    const xPos = typeof window !== 'undefined' ? (Math.random() - 0.5) * window.innerWidth * 0.8 : 0;
    return (
      <motion.div
        key={i}
        initial={{ 
          x: 0,
          y: -20,
          opacity: 1,
          scale: 0
        }}
        animate={{ 
          x: xPos,
          y: typeof window !== 'undefined' ? window.innerHeight * 0.9 : 500,
          opacity: [1, 1, 0],
          scale: 1,
          rotate: Math.random() * 360,
        }}
        transition={{ 
          duration: Math.random() * 2 + 1,
          ease: "easeOut"
        }}
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: Math.random() > 0.5 ? "50%" : "0%",
          background: getRandomColor()
        }}
      />
    );
  });
  
  return <>{confettiPieces}</>;
};

// Helper to get random confetti colors
const getRandomColor = () => {
  const colors = [
    "#5D5DFF", // barsky-blue
    "#4B4ACF", // barsky-blue-dark
    "#FF5733", // Orange
    "#FFD700", // Yellow
    "#7FFF00", // Green
    "#9370DB", // Purple
    "#FF69B4", // Pink
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default CelebrationEffect;
