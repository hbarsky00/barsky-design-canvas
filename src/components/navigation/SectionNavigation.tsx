
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
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({
  onNavigateUp,
  onNavigateDown,
  canNavigateUp = true,
  canNavigateDown = true,
  upLabel = "Previous section",
  downLabel = "Next section",
  className = ""
}) => {
  return (
    <div className={`fixed inset-x-0 pointer-events-none z-40 ${className}`}>
      {/* Up Navigation Arrow */}
      {canNavigateUp && onNavigateUp && (
        <motion.div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={onNavigateUp}
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronUp size={24} />
          </motion.div>
          <p className="text-sm mt-2">{upLabel}</p>
        </motion.div>
      )}

      {/* Down Navigation Arrow */}
      {canNavigateDown && onNavigateDown && (
        <motion.div
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 cursor-pointer hover:text-gray-600 transition-colors pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          onClick={onNavigateDown}
        >
          <p className="text-sm mb-2">{downLabel}</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SectionNavigation;
