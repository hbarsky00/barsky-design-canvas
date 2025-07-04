
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IramTextProps {
  isDarkMode: boolean;
  letterTransition: any;
}

const IramText = ({ isDarkMode, letterTransition }: IramTextProps) => {
  return (
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
      {["i", "r", "a", "m", " ", "B", "a", "r", "s", "k", "y"].map((letter, index) => (
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
  );
};

export default IramText;
