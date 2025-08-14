
import React from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";

const MinimalHero: React.FC = () => {
  const scrollToBioSection = () => {
    const bioSection = document.getElementById('bio-section');
    if (bioSection) {
      bioSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 bg-white cursor-pointer relative"
      onClick={scrollToBioSection}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top Section - Name, Website, Location, and Photo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8"
        >
          {/* Left Side - Text Content */}
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

          {/* Right Side - Profile Photo */}
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

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <p className="text-sm mb-2">Click to continue</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default MinimalHero;
