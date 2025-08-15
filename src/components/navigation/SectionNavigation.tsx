
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SectionNavigationProps {
  onNavigateUp?: () => void;
  onNavigateDown?: () => void;
  canNavigateUp?: boolean;
  canNavigateDown?: boolean;
  upLabel?: string;
  downLabel?: string;
  className?: string;
  isVisible?: boolean;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({
  onNavigateUp,
  onNavigateDown,
  canNavigateUp = true,
  canNavigateDown = true,
  upLabel = "Previous section",
  downLabel = "Next section",
  className = "",
  isVisible = true
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className={`flex flex-col items-center justify-center space-y-8 ${className}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10, scale: 0.9 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Up Navigation Arrow */}
          {canNavigateUp && onNavigateUp && (
            <motion.button
              className="group flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              onClick={onNavigateUp}
              aria-label={upLabel}
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="mb-2 flex justify-center"
              >
                <ChevronUp size={20} className="group-hover:scale-110 transition-transform duration-200" />
              </motion.div>
              <span className="text-xs font-medium opacity-70 group-hover:opacity-100 transition-opacity text-center">{upLabel}</span>
            </motion.button>
          )}

          {/* Down Navigation Arrow */}
          {canNavigateDown && onNavigateDown && (
            <motion.button
              className="group flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              onClick={onNavigateDown}
              aria-label={downLabel}
            >
              <span className="text-xs font-medium opacity-70 group-hover:opacity-100 transition-opacity mb-2 text-center">{downLabel}</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex justify-center"
              >
                <ChevronDown size={20} className="group-hover:scale-110 transition-transform duration-200" />
              </motion.div>
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SectionNavigation;
