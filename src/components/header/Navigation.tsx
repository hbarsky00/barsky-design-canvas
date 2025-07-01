
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "../ThemeToggle";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Home, Briefcase, Store, User, Mail, BookOpen, FileText } from "lucide-react";
import { trackContentEngagement } from "@/lib/analytics";

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
  const openCalendly = () => {
    window.open("https://calendly.com/barskyuxdesignservices/30min", "_blank");
    trackContentEngagement('navigation', 'consultation-booking', 'Calendly Booking');
  };

  // Function to get the appropriate icon for each link
  const getIcon = (linkName: string) => {
    const iconProps = "h-4 w-4 mr-1 stroke-2 stroke-current fill-none";
    
    switch (linkName.toLowerCase()) {
      case "home":
        return <Home className={iconProps} />;
      case "projects":
        return <Briefcase className={iconProps} />;
      case "about":
        return <User className={iconProps} />;
      case "services":
        return <Briefcase className={iconProps} />;
      case "store":
        return <Store className={iconProps} />;
      case "blog":
        return <BookOpen className={iconProps} />;
      case "resume":
        return <FileText className={iconProps} />;
      case "contact":
        return <Mail className={iconProps} />;
      default:
        return null;
    }
  };

  return (
    <nav className="hidden md:flex items-center space-x-4">
      {links.map((link) => {
        // For external links, use a regular anchor tag
        if (link.href.startsWith('http')) {
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link flex items-center"
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
            }}
            className={cn(
              "nav-link flex items-center",
              isLinkActive(link.href) && "active"
            )}
          >
            {getIcon(link.name)}
            {link.name}
          </Link>
        );
      })}
      
      <Button
        onClick={openCalendly}
        size="sm"
        className="[&_svg]:stroke-2 [&_svg]:stroke-current [&_svg]:fill-none"
      >
        <Calendar className="h-4 w-4 mr-1" />
        Book Call
      </Button>
      
      <ThemeToggle />
    </nav>
  );
};

export default Navigation;
