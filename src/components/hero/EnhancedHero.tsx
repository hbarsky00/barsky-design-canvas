
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, ExternalLink, Figma, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EnhancedHero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const designSkills = [
    "User Research", "Wireframing", "Prototyping", "Visual Design", "Figma", 
    "React", "TypeScript", "Responsive Design", "Design Systems", "Usability Testing"
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Layered Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-indigo-50/30" />
      <div className="absolute inset-0 bg-grid-gray-900/[0.02] bg-[size:50px_50px]" />
      
      {/* Floating Glass Elements */}
      <div className="absolute top-20 right-20 w-64 h-64 glass-accent rounded-full blur-3xl gentle-float opacity-30" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl gentle-float opacity-40" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400/5 rounded-full blur-2xl gentle-float" style={{ animationDelay: '4s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Glass Container */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="glass-card-elevated p-12 space-y-8 layered-depth"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="outline" className="glass-button bg-green-50/80 text-green-700 border-green-200/50 px-4 py-2 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Available for design projects
              </Badge>
            </motion.div>

            {/* Main Heading with Logo */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center justify-center gap-6"
              >
                <div className="floating-element">
                  <img
                    src="/lovable-uploads/64bd5f41-d480-486a-a9f4-80d820b53519.png"
                    alt="Barsky Design Logo"
                    className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 object-contain flex-shrink-0 drop-shadow-lg"
                    loading="eager"
                  />
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Hiram
                  <span className="block text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Barsky</span>
                </h1>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-2"
              >
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700">
                  UX/UI Designer & Frontend Developer
                </h2>
                <p className="text-xl text-gray-600">
                  Creating User-Centered Digital Experiences
                </p>
              </motion.div>
            </div>

            {/* Value Proposition */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto"
            >
              I help startups and teams design intuitive digital experiences through user research, 
              wireframing, prototyping, and responsive frontend development. From concept to 
              implementation, I bridge the gap between user needs and business goals.
            </motion.p>

            {/* Design Skills Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
            >
              {designSkills.map((skill, index) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="glass-button bg-gray-100/80 text-gray-700 hover:bg-gray-200/80 transition-all duration-300 backdrop-blur-sm px-3 py-1.5"
                >
                  {skill}
                </Badge>
              ))}
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <Button 
                size="lg" 
                onClick={scrollToProjects}
                className="bg-blue-600 text-white hover:bg-blue-700 hover:text-white px-8 py-4 text-lg font-semibold shadow-elevated backdrop-blur-md transition-all duration-300"
              >
                View My Design Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={scrollToContact}
                className="glass-button border-2 border-blue-600/50 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold backdrop-blur-md transition-all duration-300"
              >
                Let's Collaborate
                <Mail className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex items-center justify-center space-x-4 pt-4"
            >
              <span className="text-sm text-gray-500">Connect with me:</span>
              <div className="flex space-x-3">
                <a 
                  href="https://www.linkedin.com/in/hiram-barsky" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-button p-3 hover:bg-blue-100/80 rounded-lg transition-all duration-300 floating-element"
                >
                  <Linkedin className="h-5 w-5 text-gray-600" />
                </a>
                <a 
                  href="https://figma.com/@hirambarsky" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-button p-3 hover:bg-purple-100/80 rounded-lg transition-all duration-300 floating-element"
                >
                  <Figma className="h-5 w-5 text-gray-600" />
                </a>
                <a 
                  href="https://drive.google.com/file/d/1EaLXCdtpeVOaTfcdW__4epeLvrpZJnw-/view?usp=drivesdk"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="glass-button p-3 hover:bg-green-100/80 rounded-lg transition-all duration-300 floating-element"
                >
                  <Download className="h-5 w-5 text-gray-600" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
