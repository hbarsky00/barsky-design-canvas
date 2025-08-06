import React from "react";
import { cn } from "@/lib/utils";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import MobileMenu from "./header/MobileMenu";
import { Link } from "react-router-dom";
const Header: React.FC = () => {
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
            <Link to="/" className="flex items-center gap-2 text-xl sm:text-2xl font-sans font-medium text-[hsl(var(--blue-accent))] truncate">
                <img alt="Hiram Barsky" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-contain flex-shrink-0" src="/lovable-uploads/e52a884d-0e2f-4470-aae9-56e65adb2de0.png" />
                <span className="hidden xs:inline sm:inline">Hiram Barsky</span>
                <span className="inline xs:hidden sm:hidden">H. Barsky</span>
              </Link>
          </div>

          <div className="flex items-center">
            <MobileMenu links={navLinks} isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} handleLinkClick={handleLinkClick} isLinkActive={isLinkActive} />
          </div>
        </div>
      </div>
    </header>;
};
export default Header;