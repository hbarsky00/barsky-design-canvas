

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Linkedin, Github, Calendar } from "lucide-react";
import ParticleNetwork from "./ParticleNetwork";
import { EditableContent } from "@/components/editor/EditableContent";
import AnimatedText from "../AnimatedText";
import { useHeaderNavigation } from "@/components/header/useHeaderNavigation";
import CrackOverlay from "@/components/effects/CrackOverlay";
import { useVideoTiming } from "@/hooks/useVideoTiming";

const MinimalHero: React.FC = () => {
  const [hasScrolledPastHero, setHasScrolledPastHero] = useState(false);
  const [showContinueButton, setShowContinueButton] = useState(true);
  const [showCrackEffect, setShowCrackEffect] = useState(false);
  const [avatarSize, setAvatarSize] = useState(160);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollToSection } = useHeaderNavigation();
  
  // Video timing hook for crack effect synchronization
  const { addTimestampTrigger } = useVideoTiming(videoRef, 3.5);

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

  // Set up crack effect trigger at window banging timestamp (3.5 seconds)
  useEffect(() => {
    addTimestampTrigger(3.5, () => {
      setShowCrackEffect(true);
    });
  }, [addTimestampTrigger]);

  // Update avatar size for responsive crack overlay
  useEffect(() => {
    const updateAvatarSize = () => {
      const width = window.innerWidth;
      if (width < 640) setAvatarSize(128);
      else if (width < 768) setAvatarSize(160);
      else if (width < 1024) setAvatarSize(192);
      else setAvatarSize(240);
    };

    updateAvatarSize();
    window.addEventListener('resize', updateAvatarSize);
    return () => window.removeEventListener('resize', updateAvatarSize);
  }, []);

  const handleNavigateDown = () => {
    // Use the unified scrolling from header navigation
    scrollToSection('case-studies');
  };

  return (
    <section 
      className="min-h-screen pb-16 sm:pb-20 flex items-center justify-center px-4 sm:px-6 relative overflow-hidden
                 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, hsl(231 92% 95% / 0.3) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, hsl(263 85% 95% / 0.2) 0%, transparent 50%),
          linear-gradient(135deg, hsl(0 0% 100%) 0%, hsl(220 20% 98%) 100%)
        `
      }}
    >
      {/* Professional Particle Network Background */}
      <ParticleNetwork />
      
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto w-full relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hero-loading flex flex-col items-center text-center gap-4 sm:gap-5 lg:gap-6 xl:gap-7 2xl:gap-8"
        >
          {/* Ultra-Modern Avatar with Premium Effects */}
          <motion.div 
            className="flex justify-center order-1"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <div className="relative">
              {/* Multi-layered Premium Glow System */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `
                    radial-gradient(circle, hsl(231 92% 58% / 0.15) 0%, transparent 70%),
                    conic-gradient(from 0deg, hsl(231 92% 58% / 0.2), hsl(263 85% 67% / 0.2), hsl(284 100% 75% / 0.2), hsl(231 92% 58% / 0.2))
                  `,
                  filter: "blur(16px)",
                  padding: '8px'
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{ 
                  scale: 1.2, 
                  filter: "blur(20px)",
                  transition: { duration: 0.3 }
                }}
              />
              
              {/* Secondary Glow Ring */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0"
                style={{
                  background: "conic-gradient(from 45deg, hsl(231 92% 58% / 0.3), hsl(263 85% 67% / 0.3), hsl(284 100% 75% / 0.3), hsl(231 92% 58% / 0.3))",
                  filter: "blur(8px)",
                  padding: '4px'
                }}
                whileHover={{ 
                  opacity: 0.8, 
                  scale: 1.15,
                  rotate: 180,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              
              <div className="h-24 w-24 xs:h-28 xs:w-28 sm:h-32 sm:w-32 lg:h-40 lg:w-40 
                             xl:h-48 xl:w-48 2xl:h-60 2xl:w-60 rounded-full overflow-hidden 
                             relative ring-4 ring-white/40 backdrop-blur-sm border-2 border-white/60"
                   style={{
                     boxShadow: `
                       0 16px 64px rgba(59, 130, 246, 0.15),
                       0 8px 32px rgba(168, 85, 247, 0.1),
                       inset 0 2px 4px rgba(255, 255, 255, 0.3)
                     `
                   }}>
                <img
                  src={imageUrl}
                  alt="Hiram Barsky profile"
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  loading="eager"
                  fetchPriority="high"
                  sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, (max-width: 1024px) 192px, 240px"
                  style={{ maxWidth: '240px', height: 'auto' }}
                />
                <video
                  ref={videoRef}
                  src={videoUrl}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 hover:opacity-100 transition-opacity duration-500"
                  muted
                  playsInline
                  preload="none"
                  loop
                  onMouseEnter={() => videoRef.current?.play()}
                  onMouseLeave={() => videoRef.current?.pause()}
                  onClick={() => setShowCrackEffect(!showCrackEffect)} // Click to trigger crack effect
                />
                
                {/* Crack Overlay Effect */}
                <CrackOverlay
                  isActive={showCrackEffect}
                  size={avatarSize}
                  onComplete={() => setShowCrackEffect(false)}
                  duration={3000}
                />
                
                {/* Premium Shimmer and Glass Effects */}
                <motion.div 
                  className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        transparent 0%, 
                        rgba(255, 255, 255, 0.6) 40%, 
                        rgba(59, 130, 246, 0.2) 50%, 
                        rgba(255, 255, 255, 0.6) 60%, 
                        transparent 100%
                      )
                    `,
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
                
                {/* Floating Light Particles */}
                <motion.div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  animate={{
                    background: [
                      "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)",
                      "radial-gradient(circle at 80% 70%, rgba(168, 85, 247, 0.1) 0%, transparent 40%)",
                      "radial-gradient(circle at 60% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 40%)",
                    ]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Content - More proportional text scaling */}
          <div className="order-2">
            {/* Enhanced Main H1 with gradient text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatedText
                text="Lead UX Designer | Driving Design Strategy & Leadership"
                tag="h1"
                type="word"
                animation="fade"
                delay={300}
                staggerChildren={0.04}
                className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl 
                           xl:text-4xl 2xl:text-5xl
                           font-display font-medium bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 
                           bg-clip-text text-transparent mb-1 sm:mb-1 lg:mb-1 xl:mb-1 2xl:mb-1 leading-[1.706]"
              />
              <AnimatedText
                text="Passion for High Craft, Gen AI, Cyber & Fintech"
                tag="div"
                type="word"
                animation="fade"
                delay={600}
                staggerChildren={0.04}
                className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl 
                           xl:text-4xl 2xl:text-5xl
                           font-display font-medium bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 
                           bg-clip-text text-transparent mb-2 sm:mb-3 lg:mb-3 xl:mb-4 2xl:mb-4 leading-[1.706]"
              />
            </motion.div>
            
            {/* Combined Hiram Barsky on one line */}
            <div className="flex flex-row items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <AnimatedText
                  text="Hiram Barsky"
                  tag="h2"
                  type="character"
                  animation="elastic"
                  delay={800}
                  staggerChildren={0.05}
                  className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl 
                             xl:text-7xl 2xl:text-8xl font-display font-bold 
                             bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 
                             bg-clip-text text-transparent leading-tight tracking-tight 
                             whitespace-nowrap mb-1 sm:mb-2 lg:mb-2 xl:mb-3 2xl:mb-3"
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <AnimatedText
                text="barskydesign.pro"
                tag="a"
                type="character"
                animation="slide"
                delay={2200}
                staggerChildren={0.03}
                className="text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl 
                         bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent
                         hover:from-blue-700 hover:to-purple-700 transition-all duration-300 
                         mb-1 lg:mb-2 xl:mb-2 2xl:mb-3 inline-block font-semibold cursor-pointer"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <AnimatedText
                text="Clifton, NJ"
                tag="p"
                type="character"
                animation="blur"
                delay={2800}
                staggerChildren={0.04}
                className="text-base sm:text-lg lg:text-xl xl:text-xl 2xl:text-2xl text-gray-700 font-medium"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Enhanced Contact Icons Row with reduced spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex justify-center items-center space-x-4 sm:space-x-6 lg:space-x-7 xl:space-x-8 2xl:space-x-9
                     mt-4 sm:mt-5 lg:mt-6 xl:mt-7 2xl:mt-8 order-3"
        >
          <motion.a
            href="mailto:hbarsky01@gmail.com"
            aria-label="Email Hiram Barsky"
            className="p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-7 rounded-2xl 
                       bg-gradient-to-br from-white/20 via-white/10 to-white/5 backdrop-blur-lg border border-white/30
                       hover:bg-gradient-to-br hover:from-blue-50/60 hover:via-blue-50/30 hover:to-white/10 
                       hover:border-blue-200/50 transition-all duration-500
                       min-w-[44px] min-h-[44px] flex items-center justify-center 
                       hover:shadow-xl hover:shadow-blue-500/25 group relative overflow-hidden"
            whileHover={{ 
              scale: 1.15, 
              y: -6,
              rotateY: 5,
            }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {/* Animated Ripple Background */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-blue-500/10 scale-0 group-hover:scale-100"
              transition={{ duration: 0.3 }}
            />
            
            <Mail className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 
                           text-gray-700 group-hover:text-blue-600 transition-all duration-300 relative z-10
                           group-hover:drop-shadow-sm" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/hiram-barsky/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn"
            className="p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-7 rounded-xl 
                       bg-white/10 backdrop-blur-sm border border-white/20
                       hover:bg-blue-50/50 hover:border-blue-200/50 transition-all duration-300
                       min-w-[44px] min-h-[44px] flex items-center justify-center 
                       hover:shadow-lg hover:shadow-blue-500/25"
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 
                               text-gray-700 hover:text-blue-600 transition-colors" />
          </motion.a>

          <motion.a
            href="https://github.dev/hbarsky00"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub"
            className="p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-7 rounded-xl 
                       bg-white/10 backdrop-blur-sm border border-white/20
                       hover:bg-gray-50/50 hover:border-gray-200/50 transition-all duration-300
                       min-w-[44px] min-h-[44px] flex items-center justify-center 
                       hover:shadow-lg hover:shadow-gray-500/25"
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 
                               text-gray-700 hover:text-gray-800 transition-colors" />
          </motion.a>

          <motion.a
            href="https://calendly.com/barskyuxdesignservices/30min"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book Appointment"
            className="p-3 sm:p-4 lg:p-5 xl:p-6 2xl:p-7 rounded-xl 
                       bg-white/10 backdrop-blur-sm border border-white/20
                       hover:bg-green-50/50 hover:border-green-200/50 transition-all duration-300
                       min-w-[44px] min-h-[44px] flex items-center justify-center 
                       hover:shadow-lg hover:shadow-green-500/25"
            whileHover={{ scale: 1.15, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 
                               text-gray-700 hover:text-green-600 transition-colors" />
          </motion.a>

          {/* Skip to Contact Button */}
         
        </motion.div>
      </div>

      {/* Continue Button - Fixed positioning within viewport */}
      {showContinueButton && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="fixed bottom-8 inset-x-0 mx-auto w-fit cursor-pointer group z-50 flex items-center justify-center"
          onClick={handleNavigateDown}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex flex-col items-center space-y-2 text-slate-700/80 hover:text-slate-800 transition-colors duration-300">
            <span className="text-sm font-medium animate-pulse bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30">
              Continue
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center group-hover:bg-white/30 group-hover:border-white/50 transition-all duration-300 shadow-lg"
            >
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" 
                     className="text-slate-700 group-hover:text-blue-600 transition-colors duration-200">
                  <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default MinimalHero;

