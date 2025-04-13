
import { motion } from "framer-motion";

interface AnimatedLetterProps {
  letter: string;
  index?: number;
  isDarkMode: boolean;
  letterTransition: any;
}

const AnimatedLetter = ({ letter, index = 0, isDarkMode, letterTransition }: AnimatedLetterProps) => {
  return (
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
  );
};

export default AnimatedLetter;
