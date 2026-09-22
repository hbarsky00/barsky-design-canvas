
import { motion } from "framer-motion";

const AnimatedBar = () => {
  return (
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
  );
};

export default AnimatedBar;
