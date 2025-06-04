
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Linkedin, Figma } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroContentProps {
  isVisible: boolean;
}

const HeroContent: React.FC<HeroContentProps> = ({ isVisible }) => {
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
          className="flex flex-col gap-6"
        >
          <div className="w-full flex justify-center lg:justify-start">
            <div className="w-full max-w-xs lg:max-w-sm rounded-full overflow-hidden shadow-lg">
              <img
                src="/lovable-uploads/64bd5f41-d480-486a-a9f4-80d820b53519.png"
                alt="Barsky Design Logo"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight text-center lg:text-left">
            Hiram
            <span className="block text-blue-600">Barsky</span>
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-2 text-center lg:text-left"
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
        className="text-lg text-gray-600 leading-relaxed max-w-xl text-center lg:text-left mx-auto lg:mx-0"
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
        className="flex flex-wrap gap-2 max-w-xl justify-center lg:justify-start mx-auto lg:mx-0"
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
        className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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
        className="flex items-center space-x-4 pt-4 justify-center lg:justify-start"
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
  );
};

export default HeroContent;
