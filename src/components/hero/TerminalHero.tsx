import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Mail, Linkedin, Github, Calendar, ChevronDown } from 'lucide-react';
import ParticleNetwork from './ParticleNetwork';
import { useHeaderNavigation } from '@/components/header/useHeaderNavigation';

const TerminalHero: React.FC = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [showContinueButton, setShowContinueButton] = useState(true);
  const { scrollToSection } = useHeaderNavigation();
  
  const imageUrl = 'https://barskyux.com/wp-content/uploads/2025/06/IMG_20250531_123836_952.webp';
  
  const promptText = '> /imagine prompt: ideal lead ux designer';
  const responseText = 'Hiram Barsky. 10+ Years Shipping Fintech Products. AI-Augmented Workflows.';
  
  // Typing effect for response
  useEffect(() => {
    const startDelay = setTimeout(() => {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= responseText.length) {
          setDisplayedText(responseText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTypingComplete(true);
        }
      }, 35 + Math.random() * 25); // Random delay to mimic LLM output
      
      return () => clearInterval(typingInterval);
    }, 1500);
    
    return () => clearTimeout(startDelay);
  }, []);
  
  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  // Scroll handler for continue button
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      setShowContinueButton(scrollPosition < heroHeight * 0.15);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleNavigateDown = () => {
    scrollToSection('case-studies');
  };

  return (
    <section 
      className="min-h-screen pb-16 sm:pb-20 flex items-center justify-center px-4 sm:px-6 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 20% 30%, hsl(var(--terminal-surface) / 0.8) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, hsl(var(--neon-purple) / 0.05) 0%, transparent 50%),
          linear-gradient(180deg, hsl(var(--terminal-bg)) 0%, hsl(220 25% 4%) 100%)
        `
      }}
    >
      {/* Particle Background */}
      <ParticleNetwork />
      
      {/* Grid overlay for cyber effect */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-cyan) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
      
      <div className="max-w-5xl mx-auto w-full relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-6 sm:gap-8"
        >
          {/* Avatar with neon glow */}
          <motion.div 
            className="relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Neon ring */}
            <motion.div
              className="absolute -inset-2 rounded-full"
              style={{
                background: `conic-gradient(from 0deg, hsl(var(--neon-cyan)), hsl(var(--neon-purple)), hsl(var(--neon-cyan)))`,
                filter: 'blur(8px)',
                opacity: 0.6,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            
            <div className="relative h-28 w-28 sm:h-36 sm:w-36 lg:h-44 lg:w-44 rounded-full overflow-hidden ring-2 ring-neon-cyan/30 bg-terminal-surface">
              <img
                src={imageUrl}
                alt="Hiram Barsky"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </motion.div>
          
          {/* Terminal prompt section */}
          <div className="w-full max-w-3xl">
            {/* Prompt input (faded) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-left mb-4"
            >
              <code className="font-mono text-sm sm:text-base text-muted-foreground/50">
                {promptText}
              </code>
            </motion.div>
            
            {/* Response (typing effect) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 1 }}
              className="text-left"
            >
              <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                <span 
                  className="bg-gradient-to-r from-neon-cyan via-foreground to-neon-purple bg-clip-text text-transparent"
                  style={{
                    textShadow: isTypingComplete ? '0 0 30px hsl(var(--neon-cyan) / 0.3)' : 'none'
                  }}
                >
                  {displayedText}
                </span>
                {!isTypingComplete && (
                  <span 
                    className={`inline-block w-[3px] h-[1em] ml-1 bg-neon-cyan align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transition: 'opacity 0.1s' }}
                  />
                )}
              </h1>
            </motion.div>
            
            {/* Subtext after typing completes */}
            <AnimatePresence>
              {isTypingComplete && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mt-6 space-y-2"
                >
                  <p className="text-lg sm:text-xl text-muted-foreground">
                    Lead UX Designer • Driving Design Strategy & Leadership
                  </p>
                  <a 
                    href="https://barskydesign.pro"
                    className="inline-block text-neon-cyan hover:text-neon-cyan-glow transition-colors font-mono text-sm"
                  >
                    barskydesign.pro
                  </a>
                  <p className="text-sm text-muted-foreground/70">Clifton, NJ</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Social icons */}
          <AnimatePresence>
            {isTypingComplete && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center gap-4 sm:gap-6 mt-4"
              >
                {[
                  { icon: Mail, href: 'mailto:hbarsky01@gmail.com', label: 'Email' },
                  { icon: Linkedin, href: 'https://www.linkedin.com/in/hiram-barsky/', label: 'LinkedIn' },
                  { icon: Github, href: 'https://github.dev/hbarsky00', label: 'GitHub' },
                  { icon: Calendar, href: 'https://calendly.com/barskyuxdesignservices/30min', label: 'Book Appointment' },
                ].map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    aria-label={label}
                    className="p-3 rounded-xl bg-terminal-surface/50 border border-neon-cyan/20 
                               hover:border-neon-cyan/50 hover:bg-terminal-surface transition-all duration-300
                               hover:shadow-[0_0_20px_hsl(var(--neon-cyan)/0.2)]"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground/70 hover:text-neon-cyan transition-colors" />
                  </motion.a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Continue button */}
        <AnimatePresence>
          {showContinueButton && isTypingComplete && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              onClick={handleNavigateDown}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 
                         text-muted-foreground/50 hover:text-neon-cyan transition-colors cursor-pointer"
              aria-label="Scroll to case studies"
            >
              <span className="text-xs font-mono uppercase tracking-wider">Continue</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ChevronDown className="h-5 w-5" />
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TerminalHero;
