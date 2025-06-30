
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroActionButtonsProps {
  isVisible: boolean;
}

const HeroActionButtons: React.FC<HeroActionButtonsProps> = ({ isVisible }) => {
  const scrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 1.1 }}
      className="flex flex-col sm:flex-row justify-center gap-4"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          size="lg" 
          onClick={scrollToProjects}
          className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white px-6 py-3 text-base font-semibold shadow-xl hover:shadow-2xl backdrop-blur-md transition-all duration-300 w-full sm:w-auto relative overflow-hidden group [&_svg]:text-white"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          />
          <Sparkles className="mr-2 h-4 w-4 text-white" />
          View Our Work
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform text-white" />
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          variant="outline" 
          size="lg"
          onClick={scrollToContact}
          className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white border-2 border-blue-600 px-6 py-3 text-base font-semibold backdrop-blur-md transition-all duration-300 w-full sm:w-auto hover:border-blue-700 hover:shadow-xl [&_svg]:text-white"
        >
          <Mail className="mr-2 h-4 w-4 text-white" />
          Start Your Project
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroActionButtons;
