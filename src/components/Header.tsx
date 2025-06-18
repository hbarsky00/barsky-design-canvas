
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedLogo from "./AnimatedLogo";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import Navigation from "./header/Navigation";
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

  // Don't show header at all until scrolled on homepage
  if (isHomepage && !isScrolled) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white shadow-md py-3 dark:bg-gray-900"
          : "bg-transparent py-4"
      )}
    >
      <div className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
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
            {/* Show full navigation only when scrolled past hero AND we're not showing mobile menu */}
            {isScrolledPastHero && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="hidden md:block"
              >
                <Navigation 
                  links={navLinks}
                  activeSection={activeSection}
                  handleLinkClick={handleLinkClick}
                  isLinkActive={isLinkActive}
                />
              </motion.div>
            )}
            
            {/* Show theme toggle on homepage when not scrolled */}
            {isHomepage && !isScrolledPastHero && <ThemeToggle />}
            {!isScrolledPastHero && !isHomepage && <ThemeToggle />}
            {isScrolledPastHero && (
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
            )}
            
            {/* Mobile menu - only show when scrolled */}
            {isScrolled && (
              <MobileMenu 
                links={navLinks}
                isMobileMenuOpen={isMobileMenuOpen}
                toggleMobileMenu={toggleMobileMenu}
                handleLinkClick={handleLinkClick}
                isLinkActive={isLinkActive}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
