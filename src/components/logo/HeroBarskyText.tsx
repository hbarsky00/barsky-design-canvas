import { motion } from "framer-motion";
import AnimatedLetter from "./AnimatedLetter";

interface HeroBarskyTextProps {
  letterTransition: any;
  isDarkMode: boolean;
}

const HeroBarskyText = ({ letterTransition, isDarkMode }: HeroBarskyTextProps) => {
  return (
    <motion.div
      className="text-2xl md:text-3xl lg:text-4xl font-script text-barsky-blue ml-0.5"
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
      {["B", "a", "r", "s", "k", "y", " ", "D", "e", "s", "i", "g", "n"].map((letter, index) => (
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

export default HeroBarskyText;