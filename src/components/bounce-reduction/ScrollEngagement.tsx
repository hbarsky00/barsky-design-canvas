import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ScrollEngagement: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showEngagementPrompt, setShowEngagementPrompt] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Show engagement prompt if user scrolls past 60% but hasn't contacted
      if (progress > 60 && !localStorage.getItem('engagement-shown')) {
        setShowEngagementPrompt(true);
        localStorage.setItem('engagement-shown', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    setShowEngagementPrompt(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
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
                  Interested in boosting your conversions?
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Let's discuss how AI-powered UX can transform your business.
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