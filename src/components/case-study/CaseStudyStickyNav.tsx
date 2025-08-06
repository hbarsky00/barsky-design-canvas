import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavItem {
  label: string;
  anchor: string;
}

interface CaseStudyStickyNavProps {
  navigation: NavItem[];
}

const CaseStudyStickyNav: React.FC<CaseStudyStickyNavProps> = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(nav => 
        document.querySelector(nav.anchor.substring(1))
      );

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigation[i].anchor);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Set initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, [navigation]);

  const scrollToSection = (anchor: string) => {
    const element = document.querySelector(anchor);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="sticky top-16 sm:top-20 z-40 bg-background/95 backdrop-blur-sm border-b border-border"
    >
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex space-x-4 sm:space-x-6 md:space-x-8 py-3 sm:py-4 overflow-x-auto scrollbar-hide">
          {navigation.map((item) => (
            <button
              key={item.anchor}
              onClick={() => scrollToSection(item.anchor)}
              className={`whitespace-nowrap px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 relative min-w-fit touch-manipulation ${
                activeSection === item.anchor
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
              {activeSection === item.anchor && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default CaseStudyStickyNav;