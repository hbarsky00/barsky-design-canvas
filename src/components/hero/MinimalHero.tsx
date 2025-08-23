

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Linkedin, Calendar } from "lucide-react";
import WinampVisualizer from "./WinampVisualizer";
import { EditableContent } from "@/components/editor/EditableContent";

const MinimalHero: React.FC = () => {
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const imageUrl = 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp';
  const videoUrl = 'https://barskyux.com/wp-content/uploads/2025/08/social_u3514236419_httpss.mj_.runiIdLWyCYKV4_have_me_smile_at_the_scr_4838b019-f29d-486d-9a03-8725c08d3cd1_1.mp4';

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
    
    // Scroll to next section
    const nextSection = document.getElementById('case-studies');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="intro"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 relative
                 pt-safe-top pb-safe-bottom overflow-hidden"
    >
      {/* Winamp Visualizer Background */}
      <WinampVisualizer />
      
      {/* Enhanced background with professional gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface-container-low" />
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto cursor-pointer w-full relative z-10" onClick={handleNavigateDown}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-3 sm:gap-4 lg:gap-4 xl:gap-5 2xl:gap-6"
        >
          {/* Enhanced Avatar with better styling */}
          <div className="flex justify-center order-1">
            <div 
              className="relative cursor-pointer group"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-24 w-24 xs:h-28 xs:w-28 sm:h-32 sm:w-32 lg:h-40 lg:w-40 
                             xl:h-48 xl:w-48 2xl:h-60 2xl:w-60 rounded-full overflow-hidden 
                             shadow-elegant ring-4 ring-white/20 group-hover:shadow-glow 
                             transition-all duration-300 relative">
                <img
                  src={imageUrl}
                  alt="Hiram Barsky profile"
                  className="w-full h-full object-cover"
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

          {/* Content with proper typography hierarchy */}
          <div className="order-2 space-y-2 sm:space-y-3 lg:space-y-3">
            <EditableContent
              contentKey="hero-name"
              defaultContent="Hiram Barsky"
              pagePath="/"
              sectionName="hero"
              renderAs="h1"
              className="heading-hero text-foreground mb-1 sm:mb-1 lg:mb-2 leading-tight"
            />
            <EditableContent
              contentKey="hero-title"
              defaultContent="I Design AI-Powered UX That Boosts Conversion by 40%+ <br /> 15+ Years Experience | Fintech • Healthcare • SaaS"
              pagePath="/"
              sectionName="hero"
              renderAs="h2"
              className="heading-subhero text-muted-foreground leading-relaxed"
            />
            <a 
              href="https://barskydesign.pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg xs:text-xl sm:text-2xl lg:text-2xl xl:text-3xl 2xl:text-3xl 
                       text-primary hover:text-primary/80 transition-all duration-200 
                       inline-block font-medium underline decoration-primary/30 
                       hover:decoration-primary/60 underline-offset-4"
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
              className="text-base sm:text-lg lg:text-xl text-muted-foreground/80"
            />
          </div>
        </motion.div>

        {/* Enhanced Contact Icons Row with refined spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center space-x-4 sm:space-x-5 lg:space-x-6 xl:space-x-7 2xl:space-x-8
                     mt-4 sm:mt-5 lg:mt-6 xl:mt-7 2xl:mt-8 order-3"
        >
          <motion.a
            href="mailto:hbarsky01@gmail.com"
            aria-label="Email Hiram Barsky"
            className="p-3 sm:p-4 lg:p-4 xl:p-5 2xl:p-6 rounded-xl 
                       hover:bg-primary/5 hover:shadow-elegant transition-all duration-300
                       min-w-[44px] min-h-[44px] flex items-center justify-center group"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 
                           text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/hiram-barsky/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn"
            className="p-3 sm:p-4 lg:p-4 xl:p-5 2xl:p-6 rounded-xl 
                       hover:bg-primary/5 hover:shadow-elegant transition-all duration-300
                       min-w-[44px] min-h-[44px] flex items-center justify-center group"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 
                               text-muted-foreground group-hover:text-primary transition-colors" />
          </motion.a>

          <motion.a
            href="https://calendly.com/barskyuxdesignservices/30min"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book Appointment"
            className="p-3 sm:p-4 lg:p-4 xl:p-5 2xl:p-6 rounded-xl 
                       hover:bg-accent/10 hover:shadow-elegant transition-all duration-300
                       min-w-[44px] min-h-[44px] flex items-center justify-center group"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 
                               text-muted-foreground group-hover:text-accent transition-colors" />
          </motion.a>

          {/* Enhanced Skip to Contact Button */}
          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              const contactSection = document.getElementById('contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            aria-label="Skip to Contact section"
            className="px-4 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-3 xl:px-7 xl:py-4 2xl:px-8 2xl:py-5
                       bg-primary text-primary-foreground rounded-full hover:bg-primary/90 
                       shadow-elegant hover:shadow-glow transition-all duration-300
                       min-w-[44px] min-h-[44px] flex items-center justify-center 
                       text-sm sm:text-base lg:text-base font-medium"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Skip to Contact
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced Continue Button */}
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
          <span className="text-sm text-muted-foreground/60 font-medium">Continue</span>
          <button
            onClick={handleNavigateDown}
            className="group flex flex-col items-center justify-center 
                       text-muted-foreground hover:text-primary transition-all duration-300 
                       cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 
                       rounded-lg min-w-[80px] p-2"
            aria-label="Continue to next section"
          >
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="flex justify-center w-full"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="group-hover:scale-110 transition-transform duration-200 mx-auto"
              >
                <path 
                  d="m6 9 6 6 6-6" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default MinimalHero;

