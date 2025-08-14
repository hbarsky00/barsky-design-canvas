
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
          className="fixed z-50 btn-brand shadow-lg
                   right-4 bottom-4
                   sm:right-6 sm:bottom-6
                   flex items-center justify-center
                   min-w-[44px] min-h-[44px]
                   px-3 py-2 sm:px-4 sm:py-3
                   text-sm sm:text-base
                   rounded-full sm:rounded-lg
                   max-w-[calc(100vw-2rem)] sm:max-w-none"
          style={{ 
            bottom: "calc(1rem + env(safe-area-inset-bottom))",
            right: "calc(1rem + env(safe-area-inset-right))"
          }}
        >
          <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
          <span className="hidden xs:inline sm:hidden ml-1 truncate">Free UX</span>
          <span className="hidden sm:inline ml-2 truncate">Book Your Free UX Consultation</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default FloatingConsultationBubble;
