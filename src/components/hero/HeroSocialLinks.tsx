
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
      transition={{ duration: 0.6, delay: 1.3 }}
      className="flex items-center justify-center space-x-4 pt-4"
    >
      <span className="text-sm text-gray-500">Connect with me:</span>
      <div className="flex space-x-3">
        <a 
          href="https://www.linkedin.com/in/hiram-barsky" 
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-button p-3 hover:bg-blue-100/80 rounded-lg transition-all duration-300 floating-element"
        >
          <Linkedin className="h-5 w-5 text-gray-600" />
        </a>
        <a 
          href="https://figma.com/@hirambarsky" 
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-button p-3 hover:bg-purple-100/80 rounded-lg transition-all duration-300 floating-element"
        >
          <Figma className="h-5 w-5 text-gray-600" />
        </a>
        <a 
          href="https://drive.google.com/file/d/1EaLXCdtpeVOaTfcdW__4epeLvrpZJnw-/view?usp=drivesdk"
          target="_blank" 
          rel="noopener noreferrer"
          className="glass-button p-3 hover:bg-green-100/80 rounded-lg transition-all duration-300 floating-element"
        >
          <Download className="h-5 w-5 text-gray-600" />
        </a>
      </div>
    </motion.div>
  );
};

export default HeroSocialLinks;
