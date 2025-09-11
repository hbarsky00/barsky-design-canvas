

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Linkedin, Github, Calendar } from "lucide-react";
import WinampVisualizer from "./WinampVisualizer";
import { EditableContent } from "@/components/editor/EditableContent";

const MinimalHero: React.FC = () => {
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const imageUrl = 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp';
  const videoUrl = 'https://barskyux.com/wp-content/uploads/2025/08/social_u3514236419_httpss.mj_.runiIdLWyCYKV4_have_me_smile_at_the_scr_4838b019-f29d-486d-9a03-8725c08d3cd1_1.mp4';

  // Track scroll position to show/hide continue button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Show button when near top, hide when scrolled down
      if (scrollPosition < heroHeight * 0.1) {
        setShowContinueButton(true);
        setHasScrolledPastHero(false);
      } else if (scrollPosition > heroHeight * 0.2) {
        setShowContinueButton(false);
        setHasScrolledPastHero(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateDown = () => {
    // Scroll to case studies section
    const scrollToCaseStudies = () => {
      const nextSection = document.getElementById('case-studies');
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return true;
      }
      return false;
    };

    // Try immediate scroll first
    if (!scrollToCaseStudies()) {
      // If element not found, wait for loading and try again
      let attempts = 0;
      const maxAttempts = 20; // 2 seconds total
      const interval = setInterval(() => {
        attempts++;
        if (scrollToCaseStudies() || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      }, 100);
    }
  };

  return (
    <section 
      id="intro"
      className="hero-container min-h-screen flex items-center justify-center px-4 sm:px-6 relative
                 pt-safe-top pb-safe-bottom overflow-hidden"
    >
      {/* Winamp Visualizer Background - positioned behind clickable area */}
      <div className="absolute inset-0 pointer-events-none">
        <WinampVisualizer />
      </div>
      
      {/* Simple background for text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100" />
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto cursor-pointer w-full relative z-20 
                       hover:opacity-95 transition-opacity duration-200" 
           onClick={(e) => {
             handleNavigateDown();
           }}
           title="Click anywhere to view case studies">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hero-loading flex flex-col items-center text-center gap-4 sm:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8"
        >
          {/* Avatar with optimized video loading */}
          <div className="flex justify-center order-1">
            <div 
              className="relative"
            >
              <div className="h-24 w-24 xs:h-28 xs:w-28 sm:h-32 sm:w-32 lg:h-40 lg:w-40 
                             xl:h-48 xl:w-48 2xl:h-60 2xl:w-60 rounded-full overflow-hidden shadow-lg relative">
                <img
                  src={imageUrl}
                  alt="Hiram Barsky profile"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 240px"
                  style={{ maxWidth: '240px', height: 'auto' }}
                />
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
                  muted
                  playsInline
                  preload="none"
                  loop
                  
                  onMouseEnter={() => videoRef.current?.play()}
                  onMouseLeave={() => videoRef.current?.pause()}
                />
              </div>
            </div>
          </div>

          {/* Content - More proportional text scaling */}
          <div className="order-2">
            {/* Main H1 with primary keyword for SEO */}
            <EditableContent
              contentKey="hero-title"
              defaultContent="I Design AI-Powered UX That Boosts Conversion by 40%+ <br /> 15+ Years Experience | Fintech • Healthcare • SaaS"
              pagePath="/"
              sectionName="hero"
              renderAs="h1"
              className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl 
                         xl:text-4xl 2xl:text-5xl
                         font-display font-medium text-gray-900 mb-3 sm:mb-4 lg:mb-5 xl:mb-6 2xl:mb-7 leading-[1.706]"
            />
            <EditableContent
              contentKey="hero-name"
              defaultContent="Hiram Barsky"
              pagePath="/"
              sectionName="hero"
              renderAs="p"
              className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl 
                         xl:text-7xl 2xl:text-8xl
                         font-display font-bold text-gray-800 mb-2 sm:mb-3 lg:mb-4 xl:mb-5 2xl:mb-6 leading-tight tracking-tight"
            />
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
            <EditableContent
              contentKey="hero-location"
              defaultContent="Clifton, NJ"
              pagePath="/"
              sectionName="hero"
              renderAs="p"
              className="text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-gray-600"
            />
          </div>
        </motion.div>

        {/* Contact Icons Row - Reasonable sizing with better proportions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
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
            href="https://github.dev/hbarsky00"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub"
            className="p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-7 rounded-xl hover:bg-blue-50 transition-all duration-300
                       min-w-[44px] min-h-[44px] flex items-center justify-center hover:scale-110 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 
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

          {/* Skip to Contact Button */}
         
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
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-white/80 font-medium">Continue</span>
          <button
            onClick={handleNavigateDown}
            className="group flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg min-w-[80px]"
            aria-label="Continue to next section"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center w-full"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:scale-110 transition-transform duration-200 mx-auto">
                <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default MinimalHero;

