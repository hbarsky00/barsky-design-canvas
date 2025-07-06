
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroActionButtonsProps {
  isVisible: boolean;
}

const HeroActionButtons: React.FC<HeroActionButtonsProps> = ({ isVisible }) => {
  const handleFreeConsultation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleViewResults = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
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
          variant="default"
          size="lg" 
          onClick={handleFreeConsultation}
          className="w-full sm:w-auto relative overflow-hidden group [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          <span>Get Free UX+AI Consultation</span>
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
          onClick={handleViewResults}
          className="w-full sm:w-auto relative overflow-hidden group [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 py-4 px-8 text-lg font-semibold transition-all duration-300"
        >
          <span className="font-medium">See Case Studies & ROI</span>
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroActionButtons;
