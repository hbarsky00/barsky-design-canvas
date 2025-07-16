
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu, X, Home, Briefcase, Store, User, Mail, BookOpen, FileText, Calendar } from "lucide-react";
import { trackContentEngagement } from "@/lib/analytics";

interface MobileMenuProps {
  links: Array<{ name: string; href: string }>;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  handleLinkClick: (href: string) => void;
  isLinkActive: (link: string) => boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  links,
  isMobileMenuOpen,
  toggleMobileMenu,
  handleLinkClick,
  isLinkActive,
}) => {
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
    trackContentEngagement('mobile-menu', 'consultation-booking', 'Calendly Booking');
    toggleMobileMenu();
  };

  // Function to get the appropriate icon for each link
  const getIcon = (linkName: string) => {
    switch (linkName.toLowerCase()) {
      case "home":
        return <Home className="h-5 w-5 mr-3" />;
      case "projects":
        return <Briefcase className="h-5 w-5 mr-3" />;
      case "about":
        return <User className="h-5 w-5 mr-3" />;
      case "services":
        return <Briefcase className="h-5 w-5 mr-3" />;
      case "store":
        return <Store className="h-5 w-5 mr-3" />;
      case "blog":
        return <BookOpen className="h-5 w-5 mr-3" />;
      case "resume":
        return <FileText className="h-5 w-5 mr-3" />;
      case "contact":
        return <Mail className="h-5 w-5 mr-3" />;
      default:
        return null;
    }
  };

  return (
    <div>
      <button 
        className="text-barsky-dark dark:text-white p-1 transition-colors duration-200 hover:text-[hsl(var(--blue-accent))] focus-visible:text-[hsl(var(--blue-accent))] focus-visible:outline-2 focus-visible:outline-[hsl(var(--blue-accent))] focus-visible:outline-offset-2 focus:outline-none" 
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-navigation"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full bg-white dark:bg-gray-900 w-full py-6 px-4 sm:px-6 border-t dark:border-gray-800 shadow-lg z-50">
          <nav id="mobile-navigation" className="flex flex-col space-y-3 w-full" role="navigation" aria-label="Mobile navigation menu">
            {links.map((link) => {
              // For external links, use a regular anchor tag
              if (link.href.startsWith('http')) {
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={toggleMobileMenu}
                    className="nav-link w-full text-base flex items-center justify-start px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    {getIcon(link.name)}
                    {link.name}
                  </a>
                );
              }
              
              // For internal links, use the existing Link component
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                    toggleMobileMenu(); // Close menu when clicking a link
                  }}
                  className={cn(
                    "nav-link w-full text-base flex items-center justify-start px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-200 transition-colors",
                    isLinkActive(link.href) && "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300"
                  )}
                >
                  {getIcon(link.name)}
                  {link.name}
                </Link>
              );
            })}
            
            <Button
              onClick={openCalendly}
              size="lg"
              className="w-full mt-2 flex items-center justify-start px-4 py-3 text-base"
            >
              <Calendar className="h-5 w-5 mr-3" />
              Schedule a Free Consultation
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
