
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MobileCaseStudyNavigation from "./MobileCaseStudyNavigation";

interface NavItem {
  label: string;
  anchor: string;
}

interface CaseStudyNavItem {
  image: string;
  projectName: string;
  results: string[];
  technologies: string[];
  path: string;
  title?: string;
  description?: string;
}

interface CaseStudyNavigationProps {
  navigation?: NavItem[];
  nextProject?: CaseStudyNavItem;
  projectLink?: string;
}

const CaseStudyNavigation: React.FC<CaseStudyNavigationProps> = ({ 
  navigation = [], 
  nextProject, 
  projectLink 
}) => {
  const [activeSection, setActiveSection] = useState("");

  const getHeaderOffset = () => {
    const rootStyles = getComputedStyle(document.documentElement);
    const headerHeight = parseInt(rootStyles.getPropertyValue('--header-height')) || 64;
    return headerHeight + 16; // include small margin
  };

  useEffect(() => {
    if (navigation.length === 0) return;

    const handleScroll = () => {
      const headerOffset = getHeaderOffset();
      const anchorY = headerOffset + 8;
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

    window.addEventListener("scroll", onScroll, { passive: true });
    handleScroll(); // Set initial state

    return () => window.removeEventListener("scroll", onScroll);
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

  // If we have navigation items, show section navigation
  if (navigation.length > 0) {
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
  }

  // If we have nextProject, show project navigation
  if (nextProject) {
    return (
      <div className="mt-16 pt-8 border-t border-border">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Next Project</h3>
          <div className="bg-card border border-border rounded-lg p-6 max-w-md mx-auto">
            <img 
              src={nextProject.image} 
              alt={nextProject.title || nextProject.projectName}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h4 className="font-medium mb-2">{nextProject.title || nextProject.projectName}</h4>
            <p className="text-sm text-muted-foreground mb-4">{nextProject.description}</p>
            {projectLink && (
              <a 
                href={projectLink}
                className="inline-flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                View Project
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CaseStudyNavigation;
