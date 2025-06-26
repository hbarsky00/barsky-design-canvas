
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
          className="bg-white/90 border border-gray-200 p-3 hover:bg-blue-50 hover:border-blue-200 rounded-lg transition-all duration-300 shadow-sm"
        >
          <Linkedin className="h-5 w-5 text-blue-600" />
        </a>
        <a 
          href="https://figma.com/@hirambarsky" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/90 border border-gray-200 p-3 hover:bg-purple-50 hover:border-purple-200 rounded-lg transition-all duration-300 shadow-sm"
        >
          <Figma className="h-5 w-5 text-purple-600" />
        </a>
        <a 
          href="https://drive.google.com/file/d/1EaLXCdtpeVOaTfcdW__4epeLvrpZJnw-/view?usp=drivesdk"
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white/90 border border-gray-200 p-3 hover:bg-green-50 hover:border-green-200 rounded-lg transition-all duration-300 shadow-sm"
        >
          <Download className="h-5 w-5 text-green-600" />
        </a>
      </div>
    </motion.div>
  );
};

export default HeroSocialLinks;
