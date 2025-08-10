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

  const getHeaderOffset = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeight = parseInt(rootStyles.getPropertyValue('--header-height')) || 64;
    return headerHeight + 16; // include small margin
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigation.map(nav => 
        document.getElementById(nav.anchor.substring(1))
      );

      const scrollPosition = window.scrollY + getHeaderOffset() + 8;

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
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - getHeaderOffset();
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-background/95 backdrop-blur-sm border-r border-border">
        <div className="sticky p-6" style={{ top: 'calc(var(--header-height, 64px) + 12px)' }}>
          <div className="space-y-1">
            {navigation.map((item) => (
              <button
                key={item.anchor}
                onClick={() => scrollToSection(item.anchor)}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
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
      </aside>

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