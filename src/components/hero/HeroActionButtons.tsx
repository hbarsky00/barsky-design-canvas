
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
          className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white px-6 py-3 text-base font-medium shadow-xl hover:shadow-2xl backdrop-blur-md transition-all duration-300 w-full sm:w-auto relative overflow-hidden group [&_svg]:text-white"
        >
          <Sparkles className="mr-2 h-4 w-4 text-white" />
          <span className="text-white">View Our Work</span>
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
          className="text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 text-base font-medium backdrop-blur-md transition-all duration-300 w-full sm:w-auto hover:shadow-xl border border-blue-600 hover:border-blue-600 relative overflow-hidden group"
        >
          <Mail className="mr-2 h-4 w-4 text-blue-600 group-hover:text-white" />
          <span className="font-medium text-blue-600 group-hover:text-white">Start Your Project</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroActionButtons;
