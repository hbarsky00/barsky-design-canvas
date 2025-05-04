import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import GhostSkateboardSvg from "./GhostSkateboardSvg";

interface SkateboardAnimationProps {
  startDelay?: number;
}

const SkateboardAnimation: React.FC<SkateboardAnimationProps> = ({ startDelay = 1500 }) => {
  const controls = useAnimation();
  const ghostRef = useRef<HTMLDivElement>(null);
  const [direction, setDirection] = React.useState<"right" | "left">("right");
  
  // Start the animation sequence and keep it looping
  useEffect(() => {
    const startAnimation = async () => {
      // Wait for the initial delay
      await new Promise(resolve => setTimeout(resolve, startDelay));
      
      // Start the continuous animation
      const runAnimation = async () => {
        // Initial position - left side, outside the screen
        await controls.start({
          x: "-120%",
          y: "0%",
          scaleX: 1, 
          transition: { duration: 0.1, ease: "easeOut" }
        });
        
        setDirection("right");
        
        // Move from left to center with jumps
        await controls.start({
          x: "-50%",
          y: [0, -15, 0, -10, 0],
          rotate: [-2, 2, -1, 1, 0],
          transition: {
            x: { duration: 1.2, ease: "easeOut" },
            y: { duration: 1.2, times: [0, 0.2, 0.4, 0.7, 1], ease: "easeOut" },
            rotate: { duration: 1.2, times: [0, 0.2, 0.4, 0.7, 1], ease: "easeOut" }
          }
        });
        
        // Continue to right side with more jumps
        await controls.start({
          x: "50%",
          y: [0, -20, 0, -15, 0],
          rotate: [0, 3, -2, 2, 0],
          transition: {
            x: { duration: 1.5, ease: "linear" },
            y: { duration: 1.5, times: [0, 0.3, 0.5, 0.8, 1], ease: "easeOut" },
            rotate: { duration: 1.5, times: [0, 0.3, 0.5, 0.8, 1], ease: "easeOut" }
          }
        });
        
        // Exit to the right with final jump
        await controls.start({
          x: "120%",
          y: [0, -10, 0],
          rotate: [0, 2, 0],
          transition: {
            x: { duration: 0.8, ease: "easeIn" },
            y: { duration: 0.8, times: [0, 0.5, 1], ease: "easeOut" },
            rotate: { duration: 0.8, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Flip direction for return journey
        await controls.start({
          scaleX: -1,
          transition: { duration: 0.1 }
        });
        
        setDirection("left");
        
        // Return from right to center with jumps
        await controls.start({
          x: "50%",
          y: [0, -15, 0, -10, 0],
          rotate: [0, -2, 1, -1, 0],
          transition: {
            x: { duration: 0.1 },
            y: { duration: 0.1 },
            rotate: { duration: 0.1 }
          }
        });
        
        await controls.start({
          x: "0%",
          y: [0, -20, 0, -15, 0],
          rotate: [0, -3, 2, -2, 0],
          transition: {
            x: { duration: 1.5, ease: "linear" },
            y: { duration: 1.5, times: [0, 0.3, 0.5, 0.8, 1], ease: "easeOut" },
            rotate: { duration: 1.5, times: [0, 0.3, 0.5, 0.8, 1], ease: "easeOut" }
          }
        });
        
        // Continue to left side with more jumps
        await controls.start({
          x: "-120%",
          y: [0, -10, 0],
          rotate: [0, -2, 0],
          transition: {
            x: { duration: 1.2, ease: "easeIn" },
            y: { duration: 1.2, times: [0, 0.5, 1], ease: "easeOut" },
            rotate: { duration: 1.2, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Flip back to original direction
        await controls.start({
          scaleX: 1,
          transition: { duration: 0.1 }
        });
        
        // Loop the animation
        setTimeout(runAnimation, 500); // Small pause between loops
      };
      
      runAnimation();
    };
    
    startAnimation();
  }, [controls, startDelay]);

  return (
    <motion.div
      ref={ghostRef}
      className={`absolute z-10 transform ${direction === "left" ? "opacity-80" : "opacity-100"}`}
      initial={{ x: "-150%", rotate: 0, y: 0, scaleX: 1 }}
      animate={controls}
    >
      <GhostSkateboardSvg className="ghost-rider" />
    </motion.div>
  );
};

export default SkateboardAnimation;
