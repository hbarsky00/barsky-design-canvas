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
  
  return <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2", isScrolled ? "bg-white shadow-md py-2 dark:bg-gray-900" : "bg-transparent")}>
      <div className="max-w-7xl mx-auto pl-2 pr-4 sm:pr-6 lg:pr-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 justify-start">
            <Link to="/" aria-label="Go to homepage" className="flex items-center justify-center hover:opacity-80 transition-opacity duration-300">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[hsl(var(--blue-accent))] to-[hsl(var(--blue-vibrant))] flex items-center justify-center shadow-lg">
                <div className="text-white font-bold text-xl">BD</div>
              </div>
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