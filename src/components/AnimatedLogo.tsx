
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
            
            {/* Animated dot for H */}
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
        
        {/* iram text with animation */}
        <motion.div
          className={cn(
            "text-2xl font-bold transition-colors",
            isDarkMode ? "text-white" : "text-barsky-dark"
          )}
          variants={{
            initial: { x: 0 },
            hover: { 
              x: 2,
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1
              }
            }
          }}
          transition={letterTransition}
        >
          {["i", "r", "a", "m"].map((letter, index) => (
            <motion.span
              key={index}
              variants={{
                initial: { y: 0 },
                hover: { y: [0, -5, 0], 
                  transition: {
                    duration: 0.4,
                    times: [0, 0.5, 1],
                    delay: index * 0.06
                  }
                }
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Animated Bar */}
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-barsky-blue rounded-full"
          variants={{
            initial: { width: "30%", x: 0 },
            hover: { 
              width: "100%", 
              x: [0, 5, 0],
              transition: {
                width: {
                  duration: 0.3,
                  ease: "easeOut"
                },
                x: {
                  duration: 0.5,
                  times: [0, 0.5, 1],
                  delay: 0.2
                }
              }
            }
          }}
        />
        
        {/* Barsky text with animation */}
        <motion.div
          className="text-2xl font-bold text-barsky-blue ml-0.5"
          variants={{
            initial: { y: 0 },
            hover: { 
              y: 0,
              transition: {
                staggerChildren: 0.03,
                delayChildren: 0.2
              }
            }
          }}
        >
          {["B", "a", "r", "s", "k", "y"].map((letter, index) => (
            <motion.span
              key={index}
              variants={{
                initial: { y: 0, rotate: 0 },
                hover: { 
                  y: [0, -6, 0], 
                  rotate: index % 2 === 0 ? [0, 5, 0] : [0, -5, 0],
                  transition: {
                    duration: 0.4,
                    times: [0, 0.5, 1],
                    delay: index * 0.05
                  }
                }
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Designer sparkle effect */}
        <motion.div 
          className="absolute -top-3 -right-4"
          variants={{
            initial: { opacity: 0, scale: 0, rotate: 0 },
            hover: { 
              opacity: 1, 
              scale: [0, 1.2, 1],
              rotate: [0, 15, 10],
              transition: {
                duration: 0.5,
                times: [0, 0.7, 1],
                delay: 0.3
              }
            }
          }}
        >
          <span className="text-xs text-barsky-blue font-light relative">
            design
            <motion.span 
              className="absolute -top-1 -right-1 text-xs"
              variants={{
                initial: { opacity: 0 },
                hover: { 
                  opacity: [0, 1, 0],
                  scale: [0.5, 1.2, 0.8],
                  transition: {
                    duration: 0.8,
                    times: [0, 0.5, 1],
                    delay: 0.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }
                }
              }}
            >
              ✨
            </motion.span>
          </span>
        </motion.div>
      </motion.div>
    </Link>
  );
};

export default AnimatedLogo;
