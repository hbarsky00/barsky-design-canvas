import React from "react";
import { motion } from "framer-motion";

interface CaseStudyNavigationProps {
  activeSection: string;
}

const navigationItems = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "The Problem" },
  { id: "impact", label: "Quantified Impact" },
  { id: "failed", label: "What Didn't Work" },
  { id: "process", label: "My Thought Process" }
];

const CaseStudyNavigation: React.FC<CaseStudyNavigationProps> = ({ activeSection }) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:block fixed left-0 top-1/2 transform -translate-y-1/2 z-40 ml-8">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/20">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Top Navigation */}
      <div className="lg:hidden sticky top-20 z-30 bg-white/90 backdrop-blur-sm border-b border-white/20 px-4 py-3 mb-8">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {navigationItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeSection === item.id
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CaseStudyNavigation;