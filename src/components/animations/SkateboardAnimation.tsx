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
        
        // Move to "Hi, I'm" text and jump over it
        await controls.start({
          x: "-30%",
          y: [0, -20, 0], // Higher jump over "Hi, I'm"
          rotate: [-2, 5, -1],
          transition: {
            x: { duration: 0.8, ease: "easeOut" },
            y: { duration: 0.8, times: [0, 0.5, 1], ease: "circOut" },
            rotate: { duration: 0.8, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Move to center with subtle bounce
        await controls.start({
          x: "0%",
          y: [0, -5, 0],
          rotate: [-1, 2, -1],
          transition: {
            x: { duration: 0.6, ease: "easeOut" },
            y: { duration: 0.6, times: [0, 0.5, 1], ease: "easeOut" },
            rotate: { duration: 0.6, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Continue toward right side
        await controls.start({
          x: "50%",
          y: [0, -10, 0], 
          rotate: [0, 3, 0],
          transition: {
            x: { duration: 0.5, ease: "easeInOut" },
            y: { duration: 0.5, times: [0, 0.5, 1], ease: "circOut" },
            rotate: { duration: 0.5, times: [0, 0.5, 1], ease: "easeInOut" }
          }
        });
        
        // Exit to the right with a jump downward
        await controls.start({
          x: "150%",
          y: "60px", // Jump down to "Hiram Barsky" level
          rotate: 0,
          transition: {
            x: { duration: 0.8, ease: "easeIn" },
            y: { duration: 0.8, ease: "anticipate" },
            rotate: { duration: 0.8, ease: "easeInOut" }
          }
        });
        
        // Return journey preparation - flip the ghost to face left
        await controls.start({
          scaleX: -1, // Flip horizontally to face left
          transition: { duration: 0.1 }
        });
        
        setDirection("left");
        
        // Start return journey from right side (already at Hiram Barsky level)
        await controls.start({
          x: "150%",
          transition: { duration: 0.1 }
        });
        
        // Move under "Hiram Barsky" text on return journey
        await controls.start({
          x: "50%",
          y: "60px", // Keep at Hiram Barsky level
          rotate: [2, -2, 1],
          transition: {
            x: { duration: 0.8, ease: "easeOut" },
            y: { duration: 0.8, ease: "easeOut" },
            rotate: { duration: 0.8, times: [0, 0.5, 1], ease: "easeOut" }
          }
        });
        
        // Continue to left side
        await controls.start({
          x: "0%",
          y: "60px", // Keep at Hiram Barsky level
          rotate: [1, -3, 1],
          transition: {
            x: { duration: 0.8, ease: "easeInOut" },
            y: { duration: 0.8, ease: "easeInOut" },
            rotate: { duration: 0.8, times: [0, 0.5, 1], ease: "easeInOut" }
          }
        });
        
        // Exit to the left
        await controls.start({
          x: "-120%",
          y: "60px", // Keep at Hiram Barsky level
          rotate: [0, -2, 0],
          transition: {
            x: { duration: 0.8, ease: "easeIn" },
            y: { duration: 0.8, ease: "easeIn" },
            rotate: { duration: 0.8, times: [0, 0.5, 1], ease: "easeInOut" }
          }
        });
        
        // Start the jump back up to top position
        await controls.start({
          y: "0%", // Return to top position for next cycle
          scaleX: 1, // Flip back to face right
          transition: { duration: 0.1 }
        });
        
        // Loop the animation
        runAnimation();
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
