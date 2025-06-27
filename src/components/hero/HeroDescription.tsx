import React from "react";
import { motion } from "framer-motion";
interface HeroDescriptionProps {
  isVisible: boolean;
}
const HeroDescription: React.FC<HeroDescriptionProps> = ({
  isVisible
}) => {
  return <div className="relative mb-8">
      <motion.p initial={{
      opacity: 0,
      y: 20
    }} animate={isVisible ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      delay: 1.2,
      duration: 0.5
    }} className="text-xl mb-4 text-gray-700 font-medium sm:text-3xl">
        Enhancing Product Experiences for Innovative Brands
      </motion.p>
      
      <motion.p initial={{
      opacity: 0,
      y: 20
    }} animate={isVisible ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      delay: 1.4,
      duration: 0.5
    }} className="text-base sm:text-lg mb-6 text-gray-600 max-w-4xl mx-auto leading-relaxed">
        With a strong background in product development and user experience design, I leverage data-driven insights to create solutions that align with both business objectives and user needs. I am passionate about collaborating with cross-functional teams to transform ideas into impactful products that not only meet market demands but also foster lasting customer relationships.
      </motion.p>
    </div>;
};
export default HeroDescription;