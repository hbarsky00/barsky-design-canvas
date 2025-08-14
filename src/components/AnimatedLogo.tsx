
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import HLetter from "./logo/HLetter";
import IramText from "./logo/IramText";
import BarskyText from "./logo/BarskyText";
import AnimatedBar from "./logo/AnimatedBar";
import DesignerSparkle from "./logo/DesignerSparkle";

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
        <HLetter isDarkMode={isDarkMode} letterTransition={letterTransition} />
        <IramText isDarkMode={isDarkMode} letterTransition={letterTransition} />
        <div className="mx-1">
          <AnimatedBar />
        </div>
        <BarskyText isDarkMode={isDarkMode} letterTransition={letterTransition} />
        
        {/* Add "Design" text */}
        <motion.div
          className="ml-2 text-lg font-medium text-[hsl(var(--navy-primary))] dark:text-[hsl(var(--neutral-50))]"
          variants={{
            initial: { opacity: 0.7, x: 0 },
            hover: { 
              opacity: 1, 
              x: 3,
              transition: {
                duration: 0.3,
                delay: 0.4,
                ease: "easeOut"
              }
            }
          }}
        >
          Design
        </motion.div>
        
        <DesignerSparkle />
      </motion.div>
    </Link>
  );
};

export default AnimatedLogo;
