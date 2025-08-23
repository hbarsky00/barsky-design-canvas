import React from "react";
import { cn } from "@/lib/utils";
import { useHeaderNavigation } from "./header/useHeaderNavigation";
import MobileMenu from "./header/MobileMenu";
import Navigation from "./header/Navigation";

import ProfileAvatar from "./header/ProfileAvatar";
import { useLocation, Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { isAuthenticated, isAdmin, signOut } = useAuth();
  
  const {
    isScrolled,
    isScrolledPastHero,
    activeSection,
    navLinks,
    isMobileMenuOpen,
    handleLinkClick,
    toggleMobileMenu,
    isLinkActive,
    headerHidden,
  } = useHeaderNavigation();
  const isMobile = useIsMobile();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('Error signing out');
    } else {
      toast.success('Signed out successfully');
    }
  };

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

          <Navigation 
            links={navLinks}
            activeSection={activeSection}
            handleLinkClick={handleLinkClick}
            isLinkActive={isLinkActive}
          />

          <div className="flex items-center gap-3">
            {/* Desktop auth buttons */}
            <div className="hidden md:flex items-center gap-2">
              {isAdmin && (
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin">Admin</Link>
                </Button>
              )}
              {isAuthenticated ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              ) : (
                <Button asChild variant="outline" size="sm">
                  <Link to="/auth">Sign In</Link>
                </Button>
              )}
            </div>
            
            {/* Mobile menu */}
            <div className="md:hidden">
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