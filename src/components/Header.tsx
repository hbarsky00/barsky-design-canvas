import React from "react";
import { cn } from "@/lib/utils";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import MobileMenu from "./header/MobileMenu";
import AnimatedLogo from "./AnimatedLogo";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const {
    isScrolled,
    isScrolledPastHero,
    navLinks,
    activeSection,
    isMobileMenuOpen,
    handleLinkClick,
    toggleMobileMenu,
    isLinkActive,
    headerHidden,
  } = useHeaderNavigation();
  const isMobile = useIsMobile();

  // Show logo when: not on homepage (immediate) OR on homepage after scrolling past hero
  const shouldShowLogo = !isHomePage || isScrolledPastHero;

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

  React.useEffect(() => {
    if (isMobile && isMobileMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobile, isMobileMenuOpen]);
  return (
    <>
      <header ref={headerRef} className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 transform will-change-transform",
        isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none md:pointer-events-auto",
        isScrolled ? "py-2 sm:py-2.5" : "py-3 sm:py-4",
        isMobileMenuOpen ? "translate-y-0" : "-translate-y-full md:translate-y-0",
        headerHidden ? "md:-translate-y-full" : "md:translate-y-0",
        (isScrolled || isMobileMenuOpen) ? "bg-white/95 backdrop-blur-sm shadow-lg dark:bg-gray-900/95" : "bg-transparent"
      )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={cn("flex justify-between items-center", isScrolled ? "h-14 sm:h-16" : "h-16 sm:h-18")}>
          <div className="flex items-center justify-start min-w-0 flex-1">
            {shouldShowLogo && (
              <div className="transition-opacity duration-300">
                <AnimatedLogo />
              </div>
            )}
          </div>

          <div className="flex items-center">
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

    {isMobile && !isMobileMenuOpen && (
      <button
        aria-label="Open menu"
        onClick={toggleMobileMenu}
        className="fixed bottom-4 right-4 z-[60] md:hidden rounded-full p-4 shadow-lg bg-primary text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
        style={{ bottom: "calc(1rem + env(safe-area-inset-bottom))" }}
      >
        <Menu className="h-6 w-6" />
      </button>
    )}
    </>
  );
};
export default Header;