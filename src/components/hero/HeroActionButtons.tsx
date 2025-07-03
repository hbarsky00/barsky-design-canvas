
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeroActionButtonsProps {
  isVisible: boolean;
}

const HeroActionButtons: React.FC<HeroActionButtonsProps> = ({ isVisible }) => {
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
          variant="default"
          size="lg" 
          asChild
          className="w-full sm:w-auto relative overflow-hidden group [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
        >
          <Link to="/projects">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>View My Work</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
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
          className="w-full sm:w-auto relative overflow-hidden group [&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
        >
          <span className="font-medium">Let's Collaborate</span>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default HeroActionButtons;
