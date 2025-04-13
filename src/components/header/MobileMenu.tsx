
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
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
  return (
    <>
      <div className="flex items-center md:hidden space-x-2">
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
        <div className="md:hidden bg-white dark:bg-gray-900 w-full py-4 px-4 sm:px-6 border-t dark:border-gray-800">
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
                  "nav-link text-lg",
                  isLinkActive(link.href) && "active"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
