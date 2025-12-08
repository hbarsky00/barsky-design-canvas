
import React from "react";
import { motion } from "framer-motion";
import { Download, Figma, Linkedin } from "lucide-react";

interface HeroSocialLinksProps {
  isVisible: boolean;
}

const HeroSocialLinks: React.FC<HeroSocialLinksProps> = ({ isVisible }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 2.0 }}
      className="flex items-center justify-center space-x-6 pt-4 lg:pt-6"
    >
      <span className="text-base lg:text-lg text-gray-500 font-medium">Connect with me:</span>
      <div className="flex space-x-4 lg:space-x-5">
        <motion.a 
          href="https://www.linkedin.com/in/hiram-barsky" 
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-button p-4 lg:p-5 hover:bg-blue-100/80 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-sm [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
          whileHover={{ 
            scale: 1.1, 
            y: -3,
            boxShadow: "0 10px 25px -3px rgba(59, 130, 246, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Linkedin className="h-6 w-6 lg:h-7 lg:w-7 text-gray-600" />
        </motion.a>
        <motion.a 
          href="https://figma.com/@hirambarsky" 
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-button p-4 lg:p-5 hover:bg-purple-100/80 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-sm [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
          whileHover={{ 
            scale: 1.1, 
            y: -3,
            boxShadow: "0 10px 25px -3px rgba(139, 92, 246, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Figma className="h-6 w-6 lg:h-7 lg:w-7 text-gray-600" />
        </motion.a>
        <motion.a 
          href="https://drive.google.com/file/d/1EaLXCdtpeVOaTfcdW__4epeLvrpZJnw-/view?usp=drivesdk"
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-button p-4 lg:p-5 hover:bg-green-100/80 rounded-xl transition-all duration-300 backdrop-blur-sm shadow-sm [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
          whileHover={{ 
            scale: 1.1, 
            y: -3,
            boxShadow: "0 10px 25px -3px rgba(34, 197, 94, 0.4)"
          }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="h-6 w-6 lg:h-7 lg:w-7 text-gray-600" />
        </motion.a>
      </div>
    </motion.div>
  );
};

export default HeroSocialLinks;
