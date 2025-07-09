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
      scale: 0.9
    }} animate={isVisible ? {
      opacity: 1,
      scale: 1
    } : {}} transition={{
      duration: 0.8,
      delay: 0.2
    }} className="flex justify-center mb-3">
        <img alt="Hiram Barsky Product Designer" loading="eager" src="/lovable-uploads/ffa8416f-51a7-4966-a274-50bf8b2a3c8c.png" className="h-[115px] sm:h-[134px] lg:h-[154px] w-auto object-contain" />
      </motion.div>
      
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
        
        
        <AnimatedText text="Turn Your Digital Product Into a Revenue Machine" tag="h1" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 block mb-4 leading-tight" delay={1000} type="word" animation="fade" staggerChildren={0.05} />
        
        <AnimatedText text="15+ Years Experience • 40%+ Conversion Improvements • AI Integration Expert" tag="div" className="text-lg sm:text-xl font-medium text-gray-700 mb-4 leading-relaxed" delay={1200} type="word" animation="fade" staggerChildren={0.02} />
        
        <motion.div initial={{
        width: 0
      }} animate={isVisible ? {
        width: "150px"
      } : {}} transition={{
        duration: 1,
        delay: 1.5
      }} className="h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-2" />
      </motion.div>
    </div>;
};
export default HeroHeading;