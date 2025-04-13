
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "../ThemeToggle";

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
            "nav-link",
            isLinkActive(link.href) && "active"
          )}
        >
          {link.name}
        </Link>
      ))}
      <ThemeToggle />
    </nav>
  );
};

export default Navigation;
