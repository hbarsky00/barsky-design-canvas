
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SectionNavigation from "@/components/navigation/SectionNavigation";
import { useHomepageKeyboardNavigation } from "@/hooks/useHomepageKeyboardNavigation";

const MinimalHero: React.FC = () => {
  const { navigateDown, canNavigateDown } = useHomepageKeyboardNavigation();

  const scrollToBioSection = () => {
    const bioSection = document.getElementById('bio-section');
    if (bioSection) {
      bioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero"
      className="min-h-screen flex flex-col px-4 sm:px-6 bg-white relative"
    >
      {/* Main Hero Content */}
      <div className="flex-1 flex items-center justify-center cursor-pointer" onClick={scrollToBioSection}>
        <div className="max-w-6xl mx-auto">
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
        </div>
      </div>

      {/* Navigation Controls - Separated from main content */}
      <div className="flex-shrink-0">
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
