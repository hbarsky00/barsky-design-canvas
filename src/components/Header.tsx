import React from "react";
import { cn } from "@/lib/utils";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import MobileMenu from "./header/MobileMenu";
import { Link } from "react-router-dom";
import MaximizableImage from "./project/MaximizableImage";
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
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2", isScrolled ? "bg-white shadow-md py-2 dark:bg-gray-900" : "bg-transparent")}>
      <div className="max-w-7xl mx-auto pl-2 pr-4 sm:pr-6 lg:pr-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 justify-start">
            <Link to="/" className="flex items-center gap-2 text-2xl font-script font-medium text-[hsl(var(--blue-accent))] hover:text-[hsl(var(--blue-vibrant))] transition-colors duration-300 relative group">
                <MaximizableImage 
                  src="/lovable-uploads/e52a884d-0e2f-4470-aae9-56e65adb2de0.png"
                  alt="Barsky UX" 
                  className="w-10 h-10 rounded-full object-contain" 
                  aspectRatio="1/1"
                />
                Barsky Design
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-[hsl(var(--blue-vibrant))] transition-all duration-300 ease-in-out group-hover:w-full"></span>
              </Link>
          </div>

          <div className="flex items-center space-x-2">
            <MobileMenu links={navLinks} isMobileMenuOpen={isMobileMenuOpen} toggleMobileMenu={toggleMobileMenu} handleLinkClick={handleLinkClick} isLinkActive={isLinkActive} />
          </div>
        </div>
      </div>
    </header>;
};
export default Header;