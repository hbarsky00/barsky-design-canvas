import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useCaseStudySnapScroll } from '@/hooks/useCaseStudySnapScroll';

interface CaseStudySnapScrollContainerProps {
  children: React.ReactNode;
  totalCaseStudies: number;
  className?: string;
}

const CaseStudySnapScrollContainer: React.FC<CaseStudySnapScrollContainerProps> = ({
  children,
  totalCaseStudies,
  className = ''
}) => {
  const {
    containerRef,
    currentIndex,
    navigateNext,
    navigatePrevious,
    isSnapScrolling
  } = useCaseStudySnapScroll({ 
    totalCaseStudies,
    onCaseStudyChange: (index) => {
      // Optional: Add analytics or other side effects here
      console.log(`Viewing case study ${index + 1} of ${totalCaseStudies}`);
    }
  });

  return (
    <div className="relative">
      {/* Case Studies Container with Snap Scroll */}
      <div
        ref={containerRef}
        className={`case-study-snap-container ${className}`}
        style={{
          scrollBehavior: 'smooth'
        }}
      >
        {children}
      </div>

      {/* Navigation Indicators - Desktop Only */}
      <div className="hidden lg:block">
        {/* Previous Button */}
        <motion.button
          onClick={navigatePrevious}
          disabled={currentIndex === 0}
          className="fixed left-6 top-1/2 transform -translate-y-1/2 z-10 
                     bg-white/90 backdrop-blur-sm border border-gray-200 
                     rounded-full p-3 shadow-lg transition-all duration-200
                     hover:bg-white hover:scale-110 disabled:opacity-50 
                     disabled:cursor-not-allowed disabled:hover:scale-100"
          whileHover={{ scale: currentIndex > 0 ? 1.1 : 1 }}
          whileTap={{ scale: currentIndex > 0 ? 0.95 : 1 }}
          aria-label="Previous case study"
        >
          <ChevronUp className="w-5 h-5 text-gray-700" />
        </motion.button>

        {/* Next Button */}
        <motion.button
          onClick={navigateNext}
          disabled={currentIndex === totalCaseStudies - 1}
          className="fixed left-6 top-1/2 transform translate-y-8 z-10 
                     bg-white/90 backdrop-blur-sm border border-gray-200 
                     rounded-full p-3 shadow-lg transition-all duration-200
                     hover:bg-white hover:scale-110 disabled:opacity-50 
                     disabled:cursor-not-allowed disabled:hover:scale-100"
          whileHover={{ scale: currentIndex < totalCaseStudies - 1 ? 1.1 : 1 }}
          whileTap={{ scale: currentIndex < totalCaseStudies - 1 ? 0.95 : 1 }}
          aria-label="Next case study"
        >
          <ChevronDown className="w-5 h-5 text-gray-700" />
        </motion.button>

        {/* Progress Indicator */}
        <div className="fixed left-6 bottom-8 z-10 bg-white/90 backdrop-blur-sm 
                        border border-gray-200 rounded-full px-4 py-2 shadow-lg">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs text-gray-600 font-medium">
              {currentIndex + 1} / {totalCaseStudies}
            </span>
            <div className="flex flex-col space-y-1">
              {Array.from({ length: totalCaseStudies }, (_, i) => (
                <motion.div
                  key={i}
                  className={`w-1 h-4 rounded-full transition-all duration-300 ${
                    i === currentIndex 
                      ? 'bg-primary' 
                      : 'bg-gray-300'
                  }`}
                  animate={{
                    scale: i === currentIndex ? 1.2 : 1,
                    opacity: i === currentIndex ? 1 : 0.6
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Instructions - Show only on first visit */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isSnapScrolling ? 0 : 0.8 }}
        className="lg:hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10
                   bg-black/80 text-white text-sm px-4 py-2 rounded-full
                   pointer-events-none"
      >
        Swipe to navigate • {currentIndex + 1}/{totalCaseStudies}
      </motion.div>
    </div>
  );
};

export default CaseStudySnapScrollContainer;