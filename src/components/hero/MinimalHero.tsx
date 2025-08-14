
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
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-white relative
                 pt-safe-top pb-safe-bottom"
    >
      <div className="max-w-6xl xl:max-w-7xl 2xl:max-w-8xl mx-auto cursor-pointer w-full" onClick={navigateDown}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-8 sm:gap-10 xl:gap-16 2xl:gap-20"
        >
          {/* Avatar - Centered and much larger on desktop */}
          <div className="flex justify-center order-1">
            <div className="relative">
              <Avatar className="h-24 w-24 xs:h-28 xs:w-28 sm:h-32 sm:w-32 lg:h-40 lg:w-40 
                               xl:h-64 xl:w-64 2xl:h-80 2xl:w-80 shadow-lg">
                <AvatarImage
                  src="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
                  alt="Hiram Barsky profile photo"
                  className="object-cover"
                />
                <AvatarFallback>HB</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Content - Centered with much larger text on desktop */}
          <div className="order-2">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl 
                         xl:text-8xl 2xl:text-9xl
                         font-bold text-gray-900 mb-4 sm:mb-6 xl:mb-8 2xl:mb-12 leading-tight">
              Hiram Barsky
            </h1>
            <a 
              href="https://barskydesign.pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg xs:text-xl sm:text-2xl xl:text-4xl 2xl:text-5xl text-blue-600 hover:text-blue-700 
                       transition-colors duration-200 mb-3 xl:mb-6 2xl:mb-8 inline-block font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              barskydesign.pro
            </a>
            <p className="text-base sm:text-lg xl:text-2xl 2xl:text-3xl text-gray-600">
              Clifton, NJ
            </p>
          </div>
        </motion.div>

        {/* Contact Icons Row - Much larger on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center space-x-6 sm:space-x-8 xl:space-x-16 2xl:space-x-20
                     mt-8 sm:mt-12 xl:mt-20 2xl:mt-24 order-3"
        >
          <motion.a
            href="mailto:hbarsky01@gmail.com"
            aria-label="Email Hiram Barsky"
            className="p-3 sm:p-4 xl:p-8 2xl:p-10 rounded-xl hover:bg-blue-50 transition-all duration-300
                       min-w-[44px] min-h-[44px] xl:min-w-[80px] xl:min-h-[80px] 2xl:min-w-[100px] 2xl:min-h-[100px]
                       flex items-center justify-center hover:scale-110 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-16 xl:w-16 2xl:h-20 2xl:w-20 
                           text-gray-600 hover:text-blue-600 transition-colors" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/hiram-barsky/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn"
            className="p-3 sm:p-4 xl:p-8 2xl:p-10 rounded-xl hover:bg-blue-50 transition-all duration-300
                       min-w-[44px] min-h-[44px] xl:min-w-[80px] xl:min-h-[80px] 2xl:min-w-[100px] 2xl:min-h-[100px]
                       flex items-center justify-center hover:scale-110 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-16 xl:w-16 2xl:h-20 2xl:w-20 
                               text-gray-600 hover:text-blue-600 transition-colors" />
          </motion.a>

          <motion.a
            href="https://calendly.com/barskyuxdesignservices/30min"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book Appointment"
            className="p-3 sm:p-4 xl:p-8 2xl:p-10 rounded-xl hover:bg-green-50 transition-all duration-300
                       min-w-[44px] min-h-[44px] xl:min-w-[80px] xl:min-h-[80px] 2xl:min-w-[100px] 2xl:min-h-[100px]
                       flex items-center justify-center hover:scale-110 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-16 xl:w-16 2xl:h-20 2xl:w-20 
                               text-gray-600 hover:text-green-600 transition-colors" />
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
