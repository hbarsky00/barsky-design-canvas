
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
      className="flex flex-col sm:flex-row justify-center gap-6"
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          size="lg" 
          onClick={scrollToProjects}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl backdrop-blur-md transition-all duration-300 w-full sm:w-auto relative overflow-hidden group"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          />
          <Sparkles className="mr-2 h-5 w-5" />
          View Our Research & Design Work
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
          className="glass-button border-2 border-blue-600/60 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold backdrop-blur-md transition-all duration-300 w-full sm:w-auto hover:border-blue-700 hover:shadow-xl"
        >
          <Mail className="mr-2 h-5 w-5" />
          Start Your Project
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroActionButtons;
