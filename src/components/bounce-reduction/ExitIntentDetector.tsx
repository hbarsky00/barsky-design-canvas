import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExitIntentDetectorProps {
  onExitIntent: () => void;
  disabled?: boolean;
}

const ExitIntentDetector: React.FC<ExitIntentDetectorProps> = ({ 
  onExitIntent, 
  disabled = false 
}) => {
  const [showModal, setShowModal] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (disabled || hasTriggered) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the viewport (exit intent)
      // Check if cursor is moving upward and is near the top
      if (e.clientY <= 5 && e.movementY < -3) {
        setShowModal(true);
        setHasTriggered(true);
        onExitIntent();
      }
    };

    // Add a small delay before enabling to prevent immediate triggers
    const timer = setTimeout(() => {
      if (typeof document !== 'undefined') {
        document.addEventListener('mouseleave', handleMouseLeave);
      }
    }, 2000); // Wait 2 seconds before enabling exit detection

    return () => {
      clearTimeout(timer);
      if (typeof document !== 'undefined') {
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [disabled, hasTriggered, onExitIntent]);

  const handleContactClick = () => {
    setShowModal(false);
    if (typeof document !== 'undefined') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleViewWorkClick = () => {
    setShowModal(false);
    if (typeof document !== 'undefined') {
      const projectsSection = document.getElementById('case-studies');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Wait! Before you go...
              </h3>
              <p className="text-gray-600 mb-6">
                See how I've helped clients boost conversions by 40%+ with AI-powered UX design.
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleViewWorkClick}
                  className="w-full"
                  size="lg"
                >
                  View My Work & Results
                </Button>
                <Button 
                  onClick={handleContactClick}
                  variant="outline"
                  className="w-full"
                  size="lg"
                >
                  Get Free Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentDetector;