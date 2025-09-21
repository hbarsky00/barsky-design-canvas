import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import FloatingCaseStudyNavigation from "./FloatingCaseStudyNavigation";

interface NavItem {
  label: string;
  anchor: string;
}

interface CaseStudyNavigationProps {
  navigation: NavItem[];
  currentSectionIndex?: number; // From keyboard navigation
}

const CaseStudyNavigation: React.FC<CaseStudyNavigationProps> = ({ 
  navigation, 
  currentSectionIndex 
}) => {
  const [activeSection, setActiveSection] = useState("");
  const [showNavigation, setShowNavigation] = useState(false);

  const getHeaderOffset = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeight = parseInt(rootStyles.getPropertyValue('--header-height')) || 64;
    return headerHeight + 16; // include small margin
  };

  // Sync with keyboard navigation if provided
  useEffect(() => {
    if (currentSectionIndex !== undefined) {
      // Convert keyboard navigation index to navigation anchor
      // Index 0 = hero (no navigation item), Index 1+ = actual navigation items
      if (currentSectionIndex === 0) {
        // Hero section - no active navigation item or default to first
        setActiveSection(navigation[0]?.anchor || "");
      } else if (currentSectionIndex > 0 && currentSectionIndex - 1 < navigation.length) {
        // Regular section - subtract 1 to account for hero section
        setActiveSection(navigation[currentSectionIndex - 1].anchor);
      }
    }
  }, [currentSectionIndex, navigation]);

  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = getHeaderOffset();
      const anchorY = headerOffset + 8;

      // Determine visibility of floating navigation (after hero)
      const heroSection = document.getElementById('hero');
      const overviewSection = document.getElementById('overview');
      
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        // Show once we've scrolled past the hero
        setShowNavigation(rect.bottom <= headerOffset);
      } else if (overviewSection) {
        const rect = overviewSection.getBoundingClientRect();
        // Show once overview section is in view or passed
        setShowNavigation(rect.top <= headerOffset + 100);
      } else {
        // Fallback: show once the user has scrolled past viewport height
        setShowNavigation(window.scrollY > window.innerHeight * 0.8);
      }
      
      // Only update active section from scroll when keyboard navigation isn't controlling it
      if (currentSectionIndex === undefined) {
        const sections = navigation
          .map(nav => document.getElementById(nav.anchor.substring(1)))
          .filter(Boolean) as HTMLElement[];

        let newActive = navigation[0]?.anchor || "";

        // Choose the last section whose top is above the anchor line
        const candidates = sections
          .map((el, idx) => ({ el, idx, rect: el.getBoundingClientRect() }))
          .filter(item => item.rect.top - anchorY <= 0);

        if (candidates.length > 0) {
          const last = candidates[candidates.length - 1];
          newActive = navigation[last.idx].anchor;
        } else if (sections.length > 0) {
          // If we're above the first section, default to the first
          newActive = navigation[0].anchor;
        }

        setActiveSection(prev => (prev === newActive ? prev : newActive));
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", onScroll, { passive: true });
      handleScroll(); // Set initial state

      return () => window.removeEventListener("scroll", onScroll);
    }
  }, [navigation, currentSectionIndex]);

  const scrollToSection = (anchor: string) => {
    if (typeof document === 'undefined' || typeof window === 'undefined') return;
    
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
      {/* Desktop Sidebar - Hidden for structured case studies */}
      <aside className="hidden w-64">
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

      {/* Floating Navigation - Show after overview section */}
      {showNavigation && (
        <FloatingCaseStudyNavigation
          navigation={navigation}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />
      )}
    </>
  );
};

export default CaseStudyNavigation;