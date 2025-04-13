
import { motion } from "framer-motion";

const DesignerSparkle = () => {
  return (
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
  );
};

export default DesignerSparkle;
