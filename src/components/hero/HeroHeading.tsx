import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "../AnimatedText";

interface HeroHeadingProps {
  isVisible: boolean;
}
const HeroHeading: React.FC<HeroHeadingProps> = ({
  isVisible
}) => {
  return <div className="relative">
      
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={isVisible ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      duration: 0.6,
      delay: 1.2
    }}>
        
        
        <AnimatedText text="Product Designer & AI Partner focused on outcomes." tag="h1" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-on-surface block mb-4 leading-tight mx-auto max-w-6xl [text-wrap:balance]" delay={1000} type="word" animation="fade" staggerChildren={0.05} />
        
        
        
        <motion.div initial={{
        width: 0
      }} animate={isVisible ? {
        width: "150px"
      } : {}} transition={{
        duration: 1,
        delay: 1.5
      }} className="h-0.5 bg-primary/30 mx-auto rounded-full mb-2" />
      </motion.div>
    </div>;
};
export default HeroHeading;