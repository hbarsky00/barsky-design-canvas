
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
      <div className="max-w-6xl xl:max-w-4xl 2xl:max-w-5xl mx-auto cursor-pointer w-full" onClick={navigateDown}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row xl:flex-col lg:justify-between xl:justify-center lg:items-start xl:items-center 
                     gap-6 sm:gap-8 xl:gap-12 text-center lg:text-left xl:text-center"
        >
          {/* Avatar - Order 1 on mobile/tablet, Order 1 on desktop */}
          <div className="flex justify-center lg:justify-end xl:justify-center order-1 mb-4 lg:mb-0 xl:mb-8">
            <div className="relative">
              <Avatar className="h-24 w-24 xs:h-28 xs:w-28 sm:h-32 sm:w-32 lg:h-40 lg:w-40 xl:h-48 xl:w-48 2xl:h-56 2xl:w-56 shadow-lg">
                <AvatarImage
                  src="/lovable-uploads/8988ca53-0352-4c9a-aa4f-0936db72f7f3.png"
                  alt="Hiram Barsky profile photo"
                  className="object-cover"
                />
                <AvatarFallback>HB</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Content - Order 2 on mobile/tablet, Order 2 on desktop */}
          <div className="flex-1 order-2 xl:order-2">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl
                         font-bold text-gray-900 mb-3 sm:mb-4 xl:mb-6 leading-tight">
              Hiram Barsky
            </h1>
            <a 
              href="https://barskydesign.pro" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg xs:text-xl sm:text-2xl xl:text-3xl 2xl:text-4xl text-blue-600 hover:text-blue-700 
                       transition-colors duration-200 mb-2 xl:mb-4 inline-block font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              barskydesign.pro
            </a>
            <p className="text-base sm:text-lg xl:text-xl 2xl:text-2xl text-gray-600 mb-6 sm:mb-8 xl:mb-12">
              Clifton, NJ
            </p>
          </div>
        </motion.div>

        {/* Contact Icons Row - Order 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center items-center space-x-4 sm:space-x-6 lg:space-x-8 xl:space-x-12
                     mt-6 sm:mt-8 xl:mt-16 order-3"
        >
          <motion.a
            href="mailto:hbarsky01@gmail.com"
            aria-label="Email Hiram Barsky"
            className="p-3 sm:p-4 xl:p-6 rounded-xl hover:bg-blue-50 transition-all duration-300
                       min-w-[44px] min-h-[44px] xl:min-w-[60px] xl:min-h-[60px] flex items-center justify-center
                       hover:scale-110 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Mail className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 text-gray-600 hover:text-blue-600 transition-colors" />
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/hiram-barsky/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit LinkedIn"
            className="p-3 sm:p-4 xl:p-6 rounded-xl hover:bg-blue-50 transition-all duration-300
                       min-w-[44px] min-h-[44px] xl:min-w-[60px] xl:min-h-[60px] flex items-center justify-center
                       hover:scale-110 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Linkedin className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 text-gray-600 hover:text-blue-600 transition-colors" />
          </motion.a>

          <motion.a
            href="https://calendly.com/barskyuxdesignservices/30min"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book Appointment"
            className="p-3 sm:p-4 xl:p-6 rounded-xl hover:bg-green-50 transition-all duration-300
                       min-w-[44px] min-h-[44px] xl:min-w-[60px] xl:min-h-[60px] flex items-center justify-center
                       hover:scale-110 hover:shadow-lg"
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Calendar className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 xl:h-10 xl:w-10 2xl:h-12 2xl:w-12 text-gray-600 hover:text-green-600 transition-colors" />
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
