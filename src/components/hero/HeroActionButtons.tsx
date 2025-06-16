
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
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
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 1.1 }}
      className="flex flex-col sm:flex-row justify-center gap-4"
    >
      <Button 
        size="lg" 
        onClick={scrollToProjects}
        className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white px-8 py-4 text-lg font-semibold shadow-elevated backdrop-blur-md transition-all duration-300"
      >
        View My Design Work
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      
      <Button 
        variant="outline" 
        size="lg"
        onClick={scrollToContact}
        className="glass-button border-2 border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold backdrop-blur-md transition-all duration-300"
      >
        Let's Collaborate
        <Mail className="ml-2 h-5 w-5" />
      </Button>
    </motion.div>
  );
};

export default HeroActionButtons;
