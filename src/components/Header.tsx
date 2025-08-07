import React from "react";
import { cn } from "@/lib/utils";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import MobileMenu from "./header/MobileMenu";
import { Link, useLocation } from "react-router-dom";
const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const {
    isScrolled,
    navLinks,
    activeSection,
    isMobileMenuOpen,
    handleLinkClick,
    toggleMobileMenu,
    isLinkActive
  } = useHeaderNavigation();
return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", 
      "py-3 sm:py-4", 
      isScrolled ? "bg-white shadow-md dark:bg-gray-900" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12 sm:h-16">
          <div className="flex items-center gap-2 justify-start min-w-0 flex-1">
            {!isHomePage && (
              <Link to="/" className="flex items-center gap-3 text-lg sm:text-xl font-sans text-[hsl(var(--blue-accent))] truncate">
                  <img alt="Hiram Barsky" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0" src="/lovable-uploads/e52a884d-0e2f-4470-aae9-56e65adb2de0.png" />
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[hsl(var(--navy-primary))]">Hiram Barsky</span>
                    <span className="hidden sm:inline text-[hsl(var(--neutral-500))]">|</span>
                    <span className="hidden sm:inline text-[hsl(var(--blue-accent))]">Product Design + AI</span>
                  </div>
                </Link>
            )}
          </div>

          <div className="flex items-center">
            <MobileMenu links={navLinks} isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} handleLinkClick={handleLinkClick} isLinkActive={isLinkActive} />
          </div>
        </div>
      </div>
    </header>;
};
export default Header;