
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownCircle } from "lucide-react";
import AnimatedText from "./AnimatedText";
import FloatingElement from "./animations/FloatingElement";
import ShakeElement from "./animations/ShakeElement";
import BounceWrapper from "./animations/BounceWrapper";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Delay to allow page to load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Function to scroll to contact section
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
            <div className="relative">
              <AnimatedText 
                text="Hi, I'm" 
                tag="h2" 
                className="text-xl sm:text-2xl font-semibold mb-3 text-barsky-text"
                delay={500}
                type="word"
                animation="bounce"
                staggerChildren={0.05}
              />
              <AnimatedText
                text="Hiram Barsky"
                tag="h1"
                className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-barsky-dark"
                delay={700}
                type="word"
                animation="bounce"
                staggerChildren={0.1}
              />
            </div>
            
            <div className="relative mb-8">
              <AnimatedText
                text="Product Designer & Developer"
                tag="p"
                className="text-xl sm:text-2xl mb-4 text-barsky-text"
                delay={900}
                type="word"
                animation="fade"
              />
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="text-base sm:text-lg mb-6 text-barsky-text-light max-w-3xl mx-auto md:mx-0"
              >
                I design for real people, and love finding simplicity in the complex. Through these three case studies, I'll show how I approach UX, strategy, and AI-driven design
              </motion.p>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-8 mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3, duration: 0.5 }}
              >
                <BounceWrapper intensity="medium" wiggle={true}>
                  <a href="#projects" className="btn-primary relative">
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
                  </a>
                </BounceWrapper>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <BounceWrapper intensity="subtle">
                  <a href="#contact" onClick={scrollToContact} className="btn-outline">
                    Get In Touch
                  </a>
                </BounceWrapper>
              </motion.div>
            </div>
          </div>
          
          <FloatingElement yAmount={8} duration={2} className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden md:block">
            <BounceWrapper intensity="medium">
              <a href="#projects" aria-label="Scroll to projects">
                <ArrowDownCircle className="w-10 h-10 text-barsky-blue" />
              </a>
            </BounceWrapper>
          </FloatingElement>
        </div>
      </div>
    </section>
  );
};

export default Hero;
