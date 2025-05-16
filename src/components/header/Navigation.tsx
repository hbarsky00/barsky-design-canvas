
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "../ThemeToggle";
import { Home, Briefcase, Store, User, Mail } from "lucide-react";

interface NavigationProps {
  links: Array<{ name: string; href: string }>;
  activeSection: string;
  handleLinkClick: (href: string) => void;
  isLinkActive: (link: string) => boolean;
}

const Navigation: React.FC<NavigationProps> = ({ 
  links, 
  handleLinkClick, 
  isLinkActive 
}) => {
  // Function to get the appropriate icon for each link
  const getIcon = (linkName: string) => {
    switch (linkName.toLowerCase()) {
      case "home":
        return <Home className="h-4 w-4 mr-1" />;
      case "projects":
        return <Briefcase className="h-4 w-4 mr-1" />;
      case "about":
        return <User className="h-4 w-4 mr-1" />;
      case "services":
        return <Briefcase className="h-4 w-4 mr-1" />;
      case "store":
        return <Store className="h-4 w-4 mr-1" />;
      case "contact":
        return <Mail className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.href}
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick(link.href);
          }}
          className={cn(
            "nav-link flex items-center",
            isLinkActive(link.href) && "active"
          )}
        >
          {getIcon(link.name)}
          {link.name}
        </Link>
      ))}
      <ThemeToggle />
    </nav>
  );
};

export default Navigation;
