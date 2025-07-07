import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the window
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // Add a delay before enabling exit intent
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000); // Wait 5 seconds before enabling

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShown]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleGetAudit = () => {
    setIsVisible(false);
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const benefits = [
    "AI Integration Opportunity Assessment",
    "Conversion Rate Optimization Analysis", 
    "Competitive UX Benchmark Report",
    "Strategic Roadmap for 40%+ Improvement"
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 pt-8 relative text-center">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="flex items-center justify-center gap-3 mb-2">
                <Sparkles className="h-8 w-8 text-white" />
                <h2 className="text-2xl font-bold text-white">Wait! Don't Miss This...</h2>
              </div>
              
              <p className="text-white">
                Before you go, let me help you identify exactly how AI can 10X your conversion rate
              </p>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Get Your FREE AI+UX Audit
                </h3>
                <p className="text-gray-600">
                  I'll personally analyze your digital product and show you specific opportunities for 40%+ improvement
                </p>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* Value Proposition */}
              <div className="bg-green-50 p-4 rounded-lg mb-6 text-center">
                <p className="text-sm text-green-800 font-semibold">
                  🎯 Typical Value: $2,500 • Your Price: FREE
                </p>
                <p className="text-xs text-green-600 mt-1">
                  Limited time offer for serious business owners
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <Button
                  onClick={handleGetAudit}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get My Free AI+UX Audit
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <button
                  onClick={handleClose}
                  className="w-full text-gray-500 hover:text-gray-700 text-sm transition-colors py-2"
                >
                  No thanks, I'll figure it out myself
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-500">
                <span>✓ Google UX Certified</span>
                <span>✓ 15+ Years Experience</span>
                <span>✓ 24hr Response</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentPopup;