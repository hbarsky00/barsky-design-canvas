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
      <aside className="hidden lg:block w-64">
        <div className="sticky" style={{ top: 'calc(var(--header-height, 64px) + 12px)' }}>
          <nav aria-label="Case study sections" className="p-4">
            <div className="rounded-xl border border-border bg-background/80 backdrop-blur shadow-sm animate-fade-in">
              <div className="px-3 py-4">
                <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  On this page
                </p>
                <div className="space-y-1.5">
                  {navigation.map((item) => (
                    <button
                      key={item.anchor}
                      onClick={() => scrollToSection(item.anchor)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover-scale ${
                        activeSection === item.anchor
                          ? "text-primary bg-primary/10 ring-1 ring-primary/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </nav>
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