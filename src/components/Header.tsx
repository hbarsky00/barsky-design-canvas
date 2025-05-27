
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedLogo from "./AnimatedLogo";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import MobileMenu from "./header/MobileMenu";
import ProfileAvatar from "./header/ProfileAvatar";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled
          ? "bg-white shadow-md py-3 dark:bg-gray-900"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <AnimatePresence mode="wait">
              {isScrolledPastHero && (
                <motion.div
                  key="navigation-logo"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center space-x-3"
                >
                  <ProfileAvatar />
                  <AnimatedLogo />
                </motion.div>
              )}
            </AnimatePresence>
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
