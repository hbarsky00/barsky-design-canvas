import React from "react";
import { cn } from "@/lib/utils";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import MobileMenu from "./header/MobileMenu";
import Navigation from "./header/Navigation";

import ProfileAvatar from "./header/ProfileAvatar";
import { useLocation, Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { MainContentSkipLink } from "@/components/ui/skip-link";

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const {
    isScrolled,
    isScrolledPastHero,
    activeSection,
    navLinks,
    isMobileMenuOpen,
    handleLinkClick,
    toggleMobileMenu,
    isLinkActive,
  } = useHeaderNavigation();
  const isMobile = useIsMobile();


  // Show logo when: not on homepage (immediate) OR on homepage after scrolling past hero
  const shouldShowLogo = true;

  // Hide header on homepage until scrolled past hero
  const shouldShowHeader = !isHomePage || isScrolledPastHero;

  const headerRef = React.useRef<HTMLElement | null>(null);
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const updateVar = () => {
      if (typeof document === 'undefined') return;
      const h = headerRef.current?.offsetHeight || 64;
      if (typeof document !== 'undefined') {
        document.documentElement.style.setProperty('--header-height', `${h}px`);
      }
    };
    updateVar();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateVar);
      return () => window.removeEventListener('resize', updateVar);
    }
  }, [isScrolled]);

  // Keep the visually-hidden header (opacity-0 / translated off-screen before
  // scrolling past the hero) out of the tab order so keyboard users don't land
  // on invisible focused links.
  React.useEffect(() => {
    if (headerRef.current) {
      headerRef.current.inert = !shouldShowHeader;
    }
  }, [shouldShowHeader]);

  // Give the skip link a target. There are ~29 separate <main> layouts in this
  // app, so rather than tag each one, tag whichever main this page rendered.
  React.useEffect(() => {
    const main = document.querySelector("main");
    if (main && !main.id) {
      main.id = "main-content";
      main.setAttribute("tabindex", "-1");
    }
  }, [location.pathname]);

  return (
    <>
      <MainContentSkipLink />
      <header ref={headerRef} className={cn(
        // transition-all animated every property on a permanently-mounted
        // fixed element — background, border and shadow included, none of
        // which change. Only transform and opacity do, and limiting it to
        // those keeps the reveal on the compositor. Same curve as the route
        // fade and the section reveals.
        "fixed top-0 left-0 right-0 z-50",
        "transition-[transform,opacity] duration-500 ease-brand",
        "motion-reduce:transition-none",
        "pointer-events-auto",
        "py-3 sm:py-4",
        "md:translate-y-0",
        "bg-background border-b border-border shadow-sm",
        shouldShowHeader ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
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

          <Navigation 
            links={navLinks}
            activeSection={activeSection}
            handleLinkClick={handleLinkClick}
            isLinkActive={isLinkActive}
          />

          <div className="flex items-center gap-3">
            {/* Mobile menu */}
            <div className="lg:hidden">
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
      </div>
    </header>

    </>
  );
};
export default Header;