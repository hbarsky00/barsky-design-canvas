
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HLetterProps {
  isDarkMode: boolean;
  letterTransition: any;
}

const HLetter = ({ isDarkMode, letterTransition }: HLetterProps) => {
  return (
    <div className="relative">
      <motion.div
        className={cn(
          "relative text-2xl font-bold transition-colors",
          isDarkMode ? "text-white" : "text-barsky-dark"
        )}
        variants={{
          initial: { scale: 1, rotate: 0 },
          hover: { scale: 1.2, y: -3, rotate: [0, -5, 0], 
            transition: {
              rotate: {
                duration: 0.5,
                ease: "easeInOut",
                times: [0, 0.5, 1],
              }
            }
          }
        }}
        transition={letterTransition}
      >
        <span className="relative z-10">H</span>
        
        {/* Animated dot for B */}
        <motion.span
          className="absolute -top-2 -right-1 h-2 w-2 rounded-full bg-barsky-blue"
          variants={{
            initial: { opacity: 0, scale: 0 },
            hover: { 
              opacity: 1, 
              scale: [0, 1.5, 1],
              y: [0, -5, 0],
              transition: {
                duration: 0.6,
                times: [0, 0.5, 1],
                repeat: 0
              }
            }
          }}
        />
      </motion.div>
    </div>
  );
};

export default HLetter;
