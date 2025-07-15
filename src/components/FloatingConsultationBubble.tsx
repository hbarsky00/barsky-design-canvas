import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingConsultationBubble: React.FC = () => {
  let location;
  
  try {
    location = useLocation();
  } catch (error) {
    // If router context is not available, don't show bubble
    return null;
  }
  
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!location) return;
    
    // Only show on homepage
    if (location.pathname !== "/") {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const isInContactSection = rect.top <= window.innerHeight && rect.bottom >= 0;
        setIsVisible(!isInContactSection);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location?.pathname]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  if (!location || location.pathname !== "/") {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToContact}
          className="fixed bottom-6 right-6 z-50 bg-blue-vibrant hover:bg-blue-accent text-white font-semibold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 transition-colors duration-300"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="hidden sm:inline">Book Your Free UX Consultation</span>
          <span className="sm:hidden">Free Consultation</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingConsultationBubble;