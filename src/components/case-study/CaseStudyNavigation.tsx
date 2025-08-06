import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MobileCaseStudyNavigation from "./MobileCaseStudyNavigation";

interface NavItem {
  label: string;
  anchor: string;
}

interface CaseStudyNavigationProps {
  navigation: NavItem[];
}

const CaseStudyNavigation: React.FC<CaseStudyNavigationProps> = ({ navigation }) => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(nav => 
        document.getElementById(nav.anchor.substring(1))
      );

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i] as HTMLElement;
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navigation[i].anchor);
          break;
        }
      }
    };

    const throttledHandleScroll = () => {
      let ticking = false;
      return () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
          });
          ticking = true;
        }
      };
    };

    const throttledScroll = throttledHandleScroll();
    window.addEventListener("scroll", throttledScroll);
    handleScroll(); // Set initial state

    return () => window.removeEventListener("scroll", throttledScroll);
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
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden lg:block fixed left-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
          <div className="space-y-1">
            {navigation.map((item) => (
              <button
                key={item.anchor}
                onClick={() => scrollToSection(item.anchor)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 min-w-[160px] ${
                  activeSection === item.anchor
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation with Drawer */}
      <MobileCaseStudyNavigation
        navigation={navigation}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />
    </>
  );
};

export default CaseStudyNavigation;