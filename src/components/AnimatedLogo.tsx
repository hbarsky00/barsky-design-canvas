
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const AnimatedLogo = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  const letterVariants = {
    initial: {},
    hover: {},
  };

  const letterTransition = {
    type: "spring",
    stiffness: 400,
    damping: 40,
  };

  return (
    <Link to="/">
      <motion.div
        className="relative flex items-center"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      >
        {/* Logo Container */}
        <div className="relative">
          {/* H letter with animation */}
          <motion.div
            className={cn(
              "relative text-2xl font-bold transition-colors",
              isDarkMode ? "text-white" : "text-barsky-dark"
            )}
            variants={{
              initial: { scale: 1 },
              hover: { scale: 1.05, y: -2 }
            }}
            transition={letterTransition}
          >
            <span className="relative z-10">H</span>
            
            {/* Animated dot for H */}
            <motion.span
              className="absolute -top-2 -right-1 h-1.5 w-1.5 rounded-full bg-barsky-blue"
              variants={{
                initial: { opacity: 0, scale: 0 },
                hover: { opacity: 1, scale: 1 }
              }}
              transition={{ ...letterTransition, delay: 0.1 }}
            />
          </motion.div>
        </div>
        
        {/* iram text with animation */}
        <motion.div
          className={cn(
            "text-2xl font-bold transition-colors",
            isDarkMode ? "text-white" : "text-barsky-dark"
          )}
          variants={{
            initial: { x: 0 },
            hover: { x: 1 }
          }}
          transition={letterTransition}
        >
          iram
        </motion.div>
        
        {/* Animated Bar */}
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-barsky-blue rounded-full"
          variants={{
            initial: { width: "30%" },
            hover: { width: "100%" }
          }}
          transition={{ ...letterTransition, delay: 0.2 }}
        />
        
        {/* Barsky text with animation */}
        <motion.div
          className="text-2xl font-bold text-barsky-blue ml-0.5"
          variants={{
            initial: { y: 0 },
            hover: { y: -1 }
          }}
          transition={{ ...letterTransition, delay: 0.1 }}
        >
          Barsky
        </motion.div>
        
        {/* Designer sparkle effect */}
        <motion.div 
          className="absolute -top-3 -right-4"
          variants={{
            initial: { opacity: 0, scale: 0, rotate: 0 },
            hover: { opacity: 1, scale: 1, rotate: 15 }
          }}
          transition={{ ...letterTransition, delay: 0.3 }}
        >
          <span className="text-xs text-barsky-blue font-light">design</span>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default AnimatedLogo;
