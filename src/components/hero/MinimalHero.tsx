
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Linkedin, Calendar } from "lucide-react";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { NavigationProps } from "@/types/navigation";

interface MinimalHeroProps extends NavigationProps {}

const MinimalHero: React.FC<MinimalHeroProps> = ({ 
  navigateDown, 
  canNavigateDown,
  isMobile 
}) => {
  return (
    <section 
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-white relative"
    >
      <div className="max-w-6xl mx-auto cursor-pointer" onClick={navigateDown}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8"
        >
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Hiram Barsky
            </h1>
            <a 
              href="https://barskydesign.pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xl sm:text-2xl text-blue-600 hover:text-blue-700 transition-colors duration-200 mb-2 inline-block"
              onClick={(e) => e.stopPropagation()}
            >
              barskydesign.pro
            </a>
            <p className="text-lg text-gray-600">
              Clifton, NJ
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <Avatar className="h-32 w-32 sm:h-40 sm:w-40">
                <AvatarImage
                  src="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
                  alt="Hiram Barsky profile photo"
                  className="object-cover"
                />
                <AvatarFallback>HB</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </motion.div>

        {/* Contact Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center space-x-6 sm:space-x-8 mt-8"
        >
          <motion.a
            href="mailto:hbarsky01@gmail.com"
            aria-label="Email Hiram Barsky"
            className="p-3 sm:p-4 rounded-xl hover:bg-blue-50 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 text-gray-600 hover:text-blue-600 transition-colors" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/hiram-barsky/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn"
            className="p-3 sm:p-4 rounded-xl hover:bg-blue-50 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 text-gray-600 hover:text-blue-600 transition-colors" />
          </motion.a>

          <motion.a
            href="https://calendly.com/barskyuxdesignservices/30min"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book Appointment"
            className="p-3 sm:p-4 rounded-xl hover:bg-green-50 transition-all duration-300"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar className="h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 text-gray-600 hover:text-green-600 transition-colors" />
          </motion.a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <SectionNavigation
          onNavigateDown={navigateDown}
          canNavigateUp={false}
          canNavigateDown={canNavigateDown}
          downLabel="Continue"
        />
      </div>
    </section>
  );
};

export default MinimalHero;
