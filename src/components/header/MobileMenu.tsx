
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Home, Briefcase, Store, User, Mail, BookOpen, FileText } from "lucide-react";

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
        className={cn(
          "p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800",
          "text-barsky-dark dark:text-white border border-gray-200 dark:border-gray-700",
          "shadow-sm hover:shadow-md"
        )}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md dark:bg-gray-900/95 w-full py-6 px-4 sm:px-6 border-t dark:border-gray-800 shadow-lg z-50">
          <nav className="flex flex-col space-y-4 max-w-5xl mx-auto">
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
                    className="nav-link text-lg flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                    "nav-link text-lg flex items-center py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                    isLinkActive(link.href) && "active bg-blue-50 dark:bg-blue-900/20"
                  )}
                >
                  {getIcon(link.name)}
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
