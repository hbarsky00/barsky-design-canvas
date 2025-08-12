import React from "react";
import { cn } from "@/lib/utils";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import MobileMenu from "./header/MobileMenu";
import ThemeToggle from "./ThemeToggle";
import ProfileAvatar from "./header/ProfileAvatar";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const {
    isScrolled,
    isScrolledPastHero,
    navLinks,
    isMobileMenuOpen,
    handleLinkClick,
    toggleMobileMenu,
    isLinkActive,
    headerHidden,
  } = useHeaderNavigation();
  const isMobile = useIsMobile();

  // Show logo when: not on homepage (immediate) OR on homepage after scrolling past hero
  const shouldShowLogo = true;

  const headerRef = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    const updateVar = () => {
      const h = headerRef.current?.offsetHeight || 64;
      document.documentElement.style.setProperty('--header-height', `${h}px`);
    };
    updateVar();
    window.addEventListener('resize', updateVar);
    return () => window.removeEventListener('resize', updateVar);
  }, [isScrolled]);

  return (
    <>
      <header ref={headerRef} className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        "pointer-events-auto",
        "py-3 sm:py-4",
        headerHidden ? "md:-translate-y-full" : "md:translate-y-0",
        "bg-background border-b border-border shadow-sm"
      )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("flex justify-between items-center", "h-16 sm:h-18")}>
          <div className="flex items-center justify-start min-w-0 flex-1">
            {shouldShowLogo && (
              <div className="transition-opacity duration-300">
                <ProfileAvatar />
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
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

    </>
  );
};
export default Header;