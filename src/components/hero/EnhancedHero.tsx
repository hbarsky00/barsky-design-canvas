
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
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] bg-[size:50px_50px]" />
      <div className="absolute top-20 right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 px-3 py-1">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Available for design projects
              </Badge>
            </motion.div>

            {/* Main Heading with Logo */}
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex items-center gap-6"
              >
                <img
                  src="/lovable-uploads/64bd5f41-d480-486a-a9f4-80d820b53519.png"
                  alt="Barsky Design Logo"
                  className="h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28 object-contain flex-shrink-0 rounded-full"
                  loading="eager"
                />
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Hiram
                  <span className="block text-blue-600">Barsky</span>
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
              className="text-lg text-gray-600 leading-relaxed max-w-xl"
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
              className="flex flex-wrap gap-2 max-w-xl"
            >
              {designSkills.map((skill, index) => (
                <Badge 
                  key={skill} 
                  variant="secondary" 
                  className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
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
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                size="lg" 
                onClick={scrollToProjects}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold"
              >
                View My Design Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                onClick={scrollToContact}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 text-lg font-semibold"
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
              className="flex items-center space-x-4 pt-4"
            >
              <span className="text-sm text-gray-500">Connect with me:</span>
              <div className="flex space-x-3">
                <a 
                  href="https://linkedin.com/in/hirambarsky" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-gray-600" />
                </a>
                <a 
                  href="https://figma.com/@hirambarsky" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 hover:bg-purple-100 rounded-lg transition-colors"
                >
                  <Figma className="h-5 w-5 text-gray-600" />
                </a>
                <a 
                  href="https://drive.google.com/file/d/1EaLXCdtpeVOaTfcdW__4epeLvrpZJnw-/view?usp=drivesdk"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-100 hover:bg-green-100 rounded-lg transition-colors"
                >
                  <Download className="h-5 w-5 text-gray-600" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Project Showcase */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="/lovable-uploads/fc79b2eb-c9ff-47eb-b5a9-f5db1a7857c1.png"
                  alt="Featured UX/UI design project showcase - Mobile app designs"
                  className="w-full h-auto object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Project Info Overlay */}
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold mb-1">UX/UI Design Projects</h3>
                  <p className="text-sm opacity-90">User Research → Wireframes → Interactive Prototypes</p>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium">7+ Design Projects</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-blue-600 text-white rounded-xl p-4 shadow-lg"
              >
                <div className="flex items-center space-x-2">
                  <Figma className="h-4 w-4" />
                  <span className="text-sm font-medium">Live Web Apps</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedHero;
