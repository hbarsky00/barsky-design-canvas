
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedLogo from "./AnimatedLogo";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import MobileMenu from "./header/MobileMenu";
import ProfileAvatar from "./header/ProfileAvatar";
import { useIsMobile } from "@/hooks/use-mobile";
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
  
  const isMobile = useIsMobile();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2",
        isScrolled
          ? "bg-white shadow-md py-2 dark:bg-gray-900"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <ProfileAvatar />
            {isMobile ? (
              <Link to="/" className="text-xl font-bold text-barsky-blue">
                Barsky Design
              </Link>
            ) : (
              <AnimatedLogo />
            )}
          </div>

          <div className="flex items-center space-x-2">
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
