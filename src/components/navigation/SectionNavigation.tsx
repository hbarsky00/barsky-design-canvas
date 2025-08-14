
import React from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

interface SectionNavigationProps {
  onNavigateUp?: () => void;
  onNavigateDown?: () => void;
  canNavigateUp?: boolean;
  canNavigateDown?: boolean;
  upLabel?: string;
  downLabel?: string;
  className?: string;
  disabled?: boolean;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({
  onNavigateUp,
  onNavigateDown,
  canNavigateUp = true,
  canNavigateDown = true,
  upLabel = "Previous section",
  downLabel = "Next section",
  className = "",
  disabled = false
}) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-8 ${className}`}>
      {/* Up Navigation Arrow */}
      {canNavigateUp && onNavigateUp && (
        <motion.button
          className={`group flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg p-2 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={disabled ? undefined : onNavigateUp}
          aria-label={upLabel}
          disabled={disabled}
        >
          <motion.div
            animate={disabled ? {} : { y: [0, -4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mb-2"
          >
            <ChevronUp size={20} className="group-hover:scale-110 transition-transform duration-200" />
          </motion.div>
          <span className="text-xs font-medium opacity-70 group-hover:opacity-100 transition-opacity">{upLabel}</span>
        </motion.button>
      )}

      {/* Down Navigation Arrow */}
      {canNavigateDown && onNavigateDown && (
        <motion.button
          className={`group flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg p-2 ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={disabled ? undefined : onNavigateDown}
          aria-label={downLabel}
          disabled={disabled}
        >
          <span className="text-xs font-medium opacity-70 group-hover:opacity-100 transition-opacity mb-2">{downLabel}</span>
          <motion.div
            animate={disabled ? {} : { y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} className="group-hover:scale-110 transition-transform duration-200" />
          </motion.div>
        </motion.button>
      )}
    </div>
  );
};

export default SectionNavigation;
