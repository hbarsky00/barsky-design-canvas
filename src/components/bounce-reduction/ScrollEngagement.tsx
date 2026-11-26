import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

/**
 * The one thing this site remembers about a visitor.
 *
 * It used to be `engagement-shown: 'true'`, written the first time the scroll
 * prompt fired and never expiring — so the site's entire memory of a human
 * being was "have I already interrupted this person", permanently. A founder
 * who read a case study in January and came back in March got *less* than a
 * first-timer, which is the opposite of how a relationship should work.
 *
 * Now it stores a timestamp and forgets after 30 days: long enough to not nag
 * anyone inside one decision cycle, short enough that a genuinely returning
 * visitor is treated as one. Legacy 'true' values are read as "suppressed,
 * start the clock now" so nobody who already saw it gets it again immediately.
 */
const ENGAGEMENT_KEY = 'engagement-shown';
const ENGAGEMENT_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const suppressEngagement = () => {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(ENGAGEMENT_KEY, String(Date.now()));
  } catch {
    /* Safari private mode throws on setItem; the prompt is not worth a crash. */
  }
};

const engagementSuppressed = (): boolean => {
  if (typeof localStorage === 'undefined') return false;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(ENGAGEMENT_KEY);
  } catch {
    return false;
  }
  if (!raw) return false;
  // Pre-2026-11-26 value: suppress once more, but start the clock from now.
  if (raw === 'true') {
    suppressEngagement();
    return true;
  }
  const shownAt = Number(raw);
  if (!Number.isFinite(shownAt)) return false;
  return Date.now() - shownAt < ENGAGEMENT_TTL_MS;
};

const ScrollEngagement: React.FC = () => {
  const location = useLocation();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showEngagementPrompt, setShowEngagementPrompt] = useState(false);
  const [isConsultationBubbleVisible, setIsConsultationBubbleVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Only show on homepage and check for consultation bubble visibility
      if (location.pathname === "/") {
        const heroSection = document.getElementById("hero");
        const contactSection = document.getElementById("contact");
        
        // Check if consultation bubble should be visible
        let consultationBubbleVisible = false;
        if (heroSection && contactSection) {
          const heroRect = heroSection.getBoundingClientRect();
          const contactRect = contactSection.getBoundingClientRect();
          const hasScrolledPastHero = heroRect.bottom <= 0;
          const isInContactSection = contactRect.top <= window.innerHeight && contactRect.bottom >= 0;
          consultationBubbleVisible = hasScrolledPastHero && !isInContactSection;
        }
        
        setIsConsultationBubbleVisible(consultationBubbleVisible);

        // Only show engagement prompt if consultation bubble is not visible
        if (progress > 60 && !engagementSuppressed() && !consultationBubbleVisible) {
          setShowEngagementPrompt(true);
          suppressEngagement();
        }
        
        // Hide engagement prompt if consultation bubble becomes visible
        if (consultationBubbleVisible && showEngagementPrompt) {
          setShowEngagementPrompt(false);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname, showEngagementPrompt]);

  const scrollToContact = () => {
    setShowEngagementPrompt(false);
    if (typeof document !== 'undefined') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: scrollProgress / 100 }}
        style={{ transformOrigin: '0%' }}
      >
        <div className="h-full bg-primary" />
      </motion.div>

      {/* Engagement Prompt */}
      <AnimatePresence>
        {showEngagementPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white rounded-lg shadow-xl p-4 z-40 border"
          >
            <div className="flex items-start space-x-3">
              <MessageCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">
                  Building something?
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Tell me what it is and I'll tell you if I'm the right person to build it.
                </p>
                <div className="flex space-x-2">
                  <Button onClick={scrollToContact} size="sm">
                    Get Started
                  </Button>
                  <Button 
                    onClick={() => setShowEngagementPrompt(false)}
                    variant="outline" 
                    size="sm"
                  >
                    Maybe Later
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollEngagement;