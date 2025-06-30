
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedText from "./AnimatedText";
import FloatingElement from "./animations/FloatingElement";
import ShakeElement from "./animations/ShakeElement";
import BounceWrapper from "./animations/BounceWrapper";
import HeroLogo from "./hero/HeroLogo";
import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showHeroLogo, setShowHeroLogo] = useState(true);
  
  useEffect(() => {
    // Delay to allow page to load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      // Hide hero logo when approaching the end of hero section
      setShowHeroLogo(scrollPosition < heroHeight * 0.8);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to scroll to contact section
  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center bg-barsky-bg-light overflow-x-hidden relative">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'} relative`}>
            {/* Large Hero Logo - Left Aligned */}
            <HeroLogo isVisible={showHeroLogo} />
            
            <div className="relative">
              <AnimatedText 
                text="Hi, I'm" 
                tag="h2" 
                className="text-xl sm:text-2xl font-semibold mb-3 text-barsky-text"
                delay={800}
                type="word"
                animation="bounce"
                staggerChildren={0.05}
              />
              <AnimatedText
                text="Barsky Design"
                tag="h1"
                className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-barsky-dark"
                delay={1000}
                type="word"
                animation="bounce"
                staggerChildren={0.1}
              />
            </div>
            
            <div className="relative mb-8">
              <AnimatedText
                text="Freelance Product Designer"
                tag="p"
                className="text-xl sm:text-2xl mb-4 text-barsky-text"
                delay={1200}
                type="word"
                animation="fade"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.5 }}
                className="text-base sm:text-lg mb-6 text-barsky-text-light max-w-3xl mx-auto md:mx-0"
              >
                I help early-stage startups and teams create user-friendly digital experiences. I offer UX/UI design, design system creation, MVP design, and design audits to bring your ideas to life.
              </motion.p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.5 }}
              >
                <BounceWrapper intensity="medium" wiggle={true}>
                  <Button 
                    size="lg" 
                    asChild
                    className="relative"
                  >
                    <Link to="/projects">
                      View Projects
                      {/* Attention indicator */}
                      <motion.span
                        className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.8, 1, 0.8],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                      />
                    </Link>
                  </Button>
                </BounceWrapper>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.5 }}
              >
                <BounceWrapper intensity="subtle">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={scrollToContact}
                  >
                    Get In Touch
                  </Button>
                </BounceWrapper>
              </motion.div>
            </div>
          </div>
          
          <FloatingElement yAmount={8} duration={2} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block">
            <BounceWrapper intensity="medium">
              <Link to="/projects" aria-label="Scroll to projects">
                <ArrowDownCircle className="w-10 h-10 text-barsky-blue" />
              </Link>
            </BounceWrapper>
          </FloatingElement>
        </div>
      </div>
    </section>
  );
};

export default Hero;
