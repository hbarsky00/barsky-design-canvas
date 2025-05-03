
import React, { useEffect, useState } from "react";
import AnimatedText from "./AnimatedText";
import { ArrowDownCircle } from "lucide-react";

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Delay to allow page to load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center bg-barsky-bg-light">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center md:text-left">
          <div className={`transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <AnimatedText 
              text="Hi, I'm" 
              tag="h2" 
              className="text-xl sm:text-2xl font-semibold mb-3 text-barsky-text"
              delay={500}
            />
            <AnimatedText
              text="Hiram Barsky"
              tag="h1"
              className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 text-barsky-dark"
              delay={700}
            />
            <AnimatedText
              text="Product Designer & Developer"
              tag="p"
              className="text-xl sm:text-2xl mb-8 text-barsky-text"
              delay={900}
            />
            
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-8" style={{ animationDelay: '1100ms' }}>
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn-outline">
                Get In Touch
              </a>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
            <a href="#projects" aria-label="Scroll to projects">
              <ArrowDownCircle className="w-10 h-10 text-barsky-blue" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
