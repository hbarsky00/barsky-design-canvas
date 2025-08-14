
import React, { useState, useEffect } from "react";
import { NavigationProps } from "@/types/navigation";

interface HomepageLayoutProps {
  children: React.ReactNode;
}

const HomepageLayout: React.FC<HomepageLayoutProps> = ({ children }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const navigateUp = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const navigateDown = () => {
    const maxSections = 5; // Adjust based on your sections
    if (currentSection < maxSections - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const canNavigateUp = currentSection > 0;
  const canNavigateDown = currentSection < 4; // Adjust based on your sections

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
};

export default HomepageLayout;
