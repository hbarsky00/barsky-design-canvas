import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

const FloatingConsultationBubble: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
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
  }, [location.pathname]);

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToContact}
          className="hidden sm:flex fixed z-50 btn-brand shadow-lg right-[5.25rem] sm:right-6"
          style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
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