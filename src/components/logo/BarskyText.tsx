
import { motion } from "framer-motion";
import AnimatedLetter from "./AnimatedLetter";

interface BarskyTextProps {
  letterTransition: any;
  isDarkMode: boolean;
}

const BarskyText = ({ letterTransition, isDarkMode }: BarskyTextProps) => {
  return (
    <motion.div
      className="text-2xl font-bold text-barsky-blue ml-0.5"
      variants={{
        initial: { y: 0 },
        hover: { 
          y: 0,
          transition: {
            staggerChildren: 0.03,
            delayChildren: 0.2,
            ease: "easeOut"
          }
        }
      }}
    >
      {["B", "a", "r", "s", "k", "y"].map((letter, index) => (
        <AnimatedLetter 
          key={index}
          letter={letter} 
          index={index} 
          isDarkMode={isDarkMode}
          letterTransition={letterTransition}
        />
      ))}
    </motion.div>
  );
};

export default BarskyText;
