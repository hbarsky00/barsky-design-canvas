
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingConsultationBubble: React.FC = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on homepage
    if (location.pathname !== "/") {
      setIsVisible(false);
      return;
    }

    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      const contactSection = document.getElementById("contact");
      
      if (heroSection && contactSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const contactRect = contactSection.getBoundingClientRect();
        
        // Check if user has scrolled past the hero section
        const hasScrolledPastHero = heroRect.bottom <= 0;
        
        // Check if user is in the contact section
        const isInContactSection = contactRect.top <= window.innerHeight && contactRect.bottom >= 0;
        
        // Show button if scrolled past hero but not in contact section
        setIsVisible(hasScrolledPastHero && !isInContactSection);
      }
    };

    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToContact = () => {
    if (typeof document !== 'undefined') {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }
  };

  if (location.pathname !== "/") {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="fixed z-50
                   right-4 bottom-4
                   sm:right-6 sm:bottom-6"
          style={{ 
            bottom: "calc(1rem + env(safe-area-inset-bottom))",
            right: "calc(1rem + env(safe-area-inset-right))"
          }}
        >
          <Button
            onClick={scrollToContact}
            variant="brand"
            size="default"
            className="shadow-lg
                     flex items-center justify-center
                     min-w-[44px] min-h-[44px]
                     px-3 py-2 sm:px-4 sm:py-3
                     text-sm sm:text-base
                     rounded-full
                     max-w-[calc(100vw-2rem)] sm:max-w-none"
          >
            <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="ml-2 truncate">Book A Free Consultation</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingConsultationBubble;
