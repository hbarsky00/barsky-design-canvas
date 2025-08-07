import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import HLetter from "./HLetter";
import IramText from "./IramText";
import HeroBarskyText from "./HeroBarskyText";
import AnimatedBar from "./AnimatedBar";
import DesignerSparkle from "./DesignerSparkle";

const HeroAnimatedLogo = () => {
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
    <motion.div
      className="relative flex items-center justify-center"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
    >
      {/* Logo Container */}
      <HLetter isDarkMode={isDarkMode} letterTransition={letterTransition} />
      <IramText isDarkMode={isDarkMode} letterTransition={letterTransition} />
      <div className="mx-2">
        <AnimatedBar />
      </div>
      <HeroBarskyText isDarkMode={isDarkMode} letterTransition={letterTransition} />
      <DesignerSparkle />
    </motion.div>
  );
};

export default HeroAnimatedLogo;