
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Briefcase, User, Mail, BookOpen } from "lucide-react";

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
    const iconProps = "h-4 w-4 mr-1 stroke-2 stroke-current fill-none";
    
    switch (linkName.toLowerCase()) {
      case "case studies":
        return <Briefcase className={iconProps} />;
      case "about":
        return <User className={iconProps} />;
      case "blog":
        return <BookOpen className={iconProps} />;
      case "contact me":
        return <Mail className={iconProps} />;
      default:
        return null;
    }
  };

  return (
    <nav className="hidden md:flex items-center space-x-6">
      {links.map((link) => {
        // For external links, use a regular anchor tag
        if (link.href.startsWith('http')) {
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link nav-clean flex items-center transition-colors duration-200 hover:text-primary/80"
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
            onClick={link.href.startsWith('#') ? (e) => {
              e.preventDefault();
              handleLinkClick(link.href);
            } : undefined}
            className={cn(
              "nav-link nav-clean flex items-center transition-colors duration-200 hover:text-primary/80",
              isLinkActive(link.href) && "active text-primary"
            )}
          >
            {getIcon(link.name)}
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Navigation;
