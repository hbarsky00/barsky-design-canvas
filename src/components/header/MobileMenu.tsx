
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Home, Briefcase, Store, User, Mail, BookOpen } from "lucide-react";
import ThemeToggle from "../ThemeToggle";

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
        return <Home className="h-5 w-5 mr-2" />;
      case "projects":
        return <Briefcase className="h-5 w-5 mr-2" />;
      case "about":
        return <User className="h-5 w-5 mr-2" />;
      case "services":
        return <Briefcase className="h-5 w-5 mr-2" />;
      case "store":
        return <Store className="h-5 w-5 mr-2" />;
      case "blog":
        return <BookOpen className="h-5 w-5 mr-2" />;
      case "contact":
        return <Mail className="h-5 w-5 mr-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="md:hidden">
      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <button 
          className="text-barsky-dark dark:text-white" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 top-full bg-white dark:bg-gray-900 w-full py-4 px-4 sm:px-6 border-t dark:border-gray-800 shadow-md">
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className={cn(
                  "nav-link text-lg flex items-center",
                  isLinkActive(link.href) && "active"
                )}
              >
                {getIcon(link.name)}
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
