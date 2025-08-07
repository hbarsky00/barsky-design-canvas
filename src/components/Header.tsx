import React from "react";
import { cn } from "@/lib/utils";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import MobileMenu from "./header/MobileMenu";
import AnimatedLogo from "./AnimatedLogo";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const {
    isScrolled,
    isScrolledPastHero,
    navLinks,
    activeSection,
    isMobileMenuOpen,
    handleLinkClick,
    toggleMobileMenu,
    isLinkActive
  } = useHeaderNavigation();

  // Show logo when: not on homepage (immediate) OR on homepage after scrolling past hero
  const shouldShowLogo = !isHomePage || isScrolledPastHero;

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300", 
      "py-2 sm:py-3", 
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg dark:bg-gray-900/95" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          <div className="flex items-center justify-start min-w-0 flex-1">
            {shouldShowLogo && (
              <div className="transition-opacity duration-300">
                <AnimatedLogo />
              </div>
            )}
          </div>

          <div className="flex items-center">
            <MobileMenu 
              links={navLinks} 
              isMobileMenuOpen={isMobileMenuOpen} 
              toggleMobileMenu={toggleMobileMenu} 
              handleLinkClick={handleLinkClick} 
              isLinkActive={isLinkActive} 
            />
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;