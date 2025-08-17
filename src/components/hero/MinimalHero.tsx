

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Linkedin, Calendar } from "lucide-react";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { NavigationProps } from "@/types/navigation";

interface MinimalHeroProps extends NavigationProps {}

const MinimalHero: React.FC<MinimalHeroProps> = ({ 
  navigateDown, 
  canNavigateDown,
  isMobile 
}) => {
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const imageUrl = 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp';
  const videoUrl = 'https://barskyux.com/wp-content/uploads/2025/08/social_u3514236419_httpss.mj_.runiIdLWyCYKV4_have_me_smile_at_the_scr_4838b019-f29d-486d-9a03-8725c08d3cd1_1.mp4';

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.play().catch(console.error);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  // Track scroll position to hide continue button permanently
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // If user scrolls past 20% of hero section, hide continue button permanently
      if (scrollPosition > heroHeight * 0.2 && showContinueButton) {
        setShowContinueButton(false);
        setHasScrolledPastHero(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showContinueButton]);

  const handleNavigateDown = () => {
    // Hide continue button immediately when clicked
    setShowContinueButton(false);
    setHasScrolledPastHero(true);
    
    // Navigate to next section
    if (navigateDown) {
      navigateDown();
    }
  };

  return (
    <section 
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-white relative
                 pt-safe-top pb-safe-bottom"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto cursor-pointer w-full" onClick={handleNavigateDown}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-4 sm:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8"
        >
          {/* Avatar with hover video effect */}
          <div className="flex justify-center order-1">
            <div 
              className="relative cursor-pointer"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-24 w-24 xs:h-28 xs:w-28 sm:h-32 sm:w-32 lg:h-40 lg:w-40 
                             xl:h-48 xl:w-48 2xl:h-60 2xl:w-60 rounded-full overflow-hidden shadow-lg relative">
                <img
                  src={imageUrl}
                  alt="Hiram Barsky profile photo"
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isHovering ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                    isHovering ? 'opacity-100' : 'opacity-0'
                  }`}
                  muted
                  playsInline
                  preload="metadata"
                  loop
                  autoPlay={false}
                />
              </div>
            </div>
          </div>

          {/* Content - More proportional text scaling */}
          <div className="order-2">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl 
                         xl:text-7xl 2xl:text-8xl
                         font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6 leading-tight">
              Hiram Barsky
            </h1>
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl 
                         xl:text-5xl 2xl:text-6xl
                         font-medium text-gray-900 mb-3 sm:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7">
              Product Designer + AI
            </h2>
            <a 
              href="https://barskydesign.pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl text-blue-600 hover:text-blue-700 
                       transition-colors duration-200 mb-2 lg:mb-3 xl:mb-4 2xl:mb-5 inline-block font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              barskydesign.pro
            </a>
            <p className="text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-gray-600">
              Clifton, NJ
            </p>
          </div>
        </motion.div>

        {/* Contact Icons Row - Reasonable sizing with better proportions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center space-x-6 sm:space-x-8 lg:space-x-10 xl:space-x-12 2xl:space-x-14
                     mt-6 sm:mt-8 lg:mt-10 xl:mt-12 2xl:mt-14 order-3"
        >
          <motion.a
            href="mailto:hbarsky01@gmail.com"
            aria-label="Email Hiram Barsky"
            className="p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-7 rounded-xl hover:bg-blue-50 transition-all duration-300
                       min-w-[44px] min-h-[44px] flex items-center justify-center hover:scale-110 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 
                           text-gray-600 hover:text-blue-600 transition-colors" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/hiram-barsky/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn"
            className="p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-7 rounded-xl hover:bg-blue-50 transition-all duration-300
                       min-w-[44px] min-h-[44px] flex items-center justify-center hover:scale-110 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 
                               text-gray-600 hover:text-blue-600 transition-colors" />
          </motion.a>

          <motion.a
            href="https://calendly.com/barskyuxdesignservices/30min"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book Appointment"
            className="p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-7 rounded-xl hover:bg-green-50 transition-all duration-300
                       min-w-[44px] min-h-[44px] flex items-center justify-center hover:scale-110 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 
                               text-gray-600 hover:text-green-600 transition-colors" />
          </motion.a>
        </motion.div>
      </div>

      {/* Continue Button with proper full-width centering */}
      <motion.div 
        className="absolute bottom-8 inset-x-0 px-4"
        animate={{ 
          opacity: showContinueButton ? 1 : 0,
          scale: showContinueButton ? 1 : 0.8,
          y: showContinueButton ? 0 : 20
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ 
          pointerEvents: showContinueButton ? 'auto' : 'none',
          visibility: showContinueButton ? 'visible' : 'hidden'
        }}
      >
        <div className="flex justify-center w-full">
          <SectionNavigation
            onNavigateDown={handleNavigateDown}
            canNavigateUp={false}
            canNavigateDown={canNavigateDown}
            downLabel="Continue"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default MinimalHero;

