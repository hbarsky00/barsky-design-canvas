
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// Fixed 2026-08-06 (full CTA audit) — this checked for getElementById("hero")
// and getElementById("contact"), requiring BOTH to be non-null before it
// would ever become visible. Neither element exists: HomepageLayout.tsx
// wraps the hero in id="intro" (not "hero"), and there's no homepage contact
// section at all — /contact is a separate routed page. The visibility
// condition was therefore always false: this floating "Book A Free
// Consultation" button has never appeared, on any scroll position, on any
// homepage visit, since whenever this logic was written.
const FloatingConsultationBubble: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show on homepage
    if (location.pathname !== "/") {
      setIsVisible(false);
      return;
    }

    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const handleScroll = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;

      const introSection = document.getElementById("intro");

      if (introSection) {
        const introRect = introSection.getBoundingClientRect();
        setIsVisible(introRect.bottom <= 0);
      }
    };

    // Initial check
    handleScroll();

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname]);

  const goToContact = () => {
    navigate("/contact");
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
          className="fixed z-30
                   left-4 bottom-4
                   sm:left-6 sm:bottom-6"
          style={{ 
            bottom: "calc(1rem + env(safe-area-inset-bottom))",
            left: "calc(1rem + env(safe-area-inset-left))"
          }}
        >
          <Button
            onClick={goToContact}
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
