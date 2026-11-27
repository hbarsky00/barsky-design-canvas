
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * The always-available CTA once a visitor is past the intro.
 *
 * It spent an unknown length of time dark because it looked up `#hero`, an id
 * this homepage does not have -- the first section is `#intro` -- so
 * `hasScrolledPastHero` was never evaluated and `isVisible` never left false.
 *
 * It yields to ScrollEngagement's one-time prompt while that is up, so there
 * is never more than one floating CTA on screen. The prompt is the rarer,
 * higher-value message (once per 30 days); this is the standing one.
 */
const FloatingConsultationBubble: React.FC = () => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [promptOpen, setPromptOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const onPrompt = (e: Event) => {
      setPromptOpen((e as CustomEvent<boolean>).detail === true);
    };
    window.addEventListener('engagement-prompt', onPrompt);
    return () => window.removeEventListener('engagement-prompt', onPrompt);
  }, []);

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
      const contactSection = document.getElementById("contact");

      if (introSection && contactSection) {
        const introRect = introSection.getBoundingClientRect();
        const contactRect = contactSection.getBoundingClientRect();

        // Check if user has scrolled past the intro section
        const hasScrolledPastIntro = introRect.bottom <= 0;

        // Check if user is in the contact section
        const isInContactSection = contactRect.top <= window.innerHeight && contactRect.bottom >= 0;

        // Show button if scrolled past intro but not in contact section
        setIsVisible(hasScrolledPastIntro && !isInContactSection);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const scrollToContact = () => {
    if (typeof document !== 'undefined') {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: reduceMotion ? "auto" : "smooth",
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
      {isVisible && !promptOpen && (
        <motion.div
          initial={reduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { scale: 1, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
          transition={
            reduceMotion
              ? { duration: 0.15 }
              : { delay: 0.2, type: "spring", stiffness: 260, damping: 20 }
          }
          whileHover={reduceMotion ? undefined : { scale: 1.05 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          /* Only exists because the visitor scrolled. Stripped by
             capture-prerendered-bodies before the snapshot is written, so it is
             never baked into the static HTML every visitor receives. */
          data-transient=""
          className="fixed z-30
                   left-4 bottom-4
                   sm:left-6 sm:bottom-6"
          style={{ 
            bottom: "calc(1rem + env(safe-area-inset-bottom))",
            left: "calc(1rem + env(safe-area-inset-left))"
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
            <span className="ml-2 truncate">Book a free consultation</span>
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingConsultationBubble;
