
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedLogo from "./AnimatedLogo";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import MobileMenu from "./header/MobileMenu";
import ProfileAvatar from "./header/ProfileAvatar";
import ThemeToggle from "./ThemeToggle";

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-2",
        "bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200/20"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <ProfileAvatar />
            <AnimatedLogo />
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
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
