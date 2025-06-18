
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedLogo from "./AnimatedLogo";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import MobileMenu from "./header/MobileMenu";
import ProfileAvatar from "./header/ProfileAvatar";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

const Header: React.FC = () => {
  const { 
    isScrolled,
    navLinks,
    activeSection,
    isMobileMenuOpen,
    handleLinkClick,
    toggleMobileMenu,
    isLinkActive,
    isScrolledPastHero
  } = useHeaderNavigation();

  // Check if we're on the homepage
  const isHomepage = window.location.pathname === '/';

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md py-3 dark:bg-gray-900"
          : "bg-transparent py-4",
        // On homepage, add some padding when not scrolled to move menu closer to content
        isHomepage && !isScrolled ? "pt-8" : ""
      )}
    >
      <div className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        // On homepage, use smaller max-width to bring menu closer to content
        isHomepage && !isScrolled ? "max-w-5xl" : "max-w-7xl"
      )}>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            {isScrolledPastHero && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-center space-x-3"
              >
                <ProfileAvatar />
                <AnimatedLogo />
              </motion.div>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {/* Show theme toggle on homepage when not scrolled */}
            {isHomepage && !isScrolledPastHero && <ThemeToggle />}
            {!isScrolledPastHero && !isHomepage && <ThemeToggle />}
            
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
