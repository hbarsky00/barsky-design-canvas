
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import AnimatedLogo from "./AnimatedLogo";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (location.pathname === '/') {
      if (href.startsWith('#')) {
        scrollToSection(href.substring(1));
      }
    } else {
      // If we're on another page and trying to go to a section on the home page
      if (href.startsWith('#')) {
        // Navigate to home page first, then scroll to section after the page loads
        navigate('/', { state: { scrollTo: href.substring(1) } });
      } else {
        navigate(href);
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
    { name: "Design System", href: "/design-system" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);

      if (location.pathname === '/') {
        const sections = navLinks
          .filter(link => link.href.startsWith('#'))
          .map(link => link.href.substring(1));
        
        for (const section of sections.reverse()) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 150) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks, location.pathname]);

  useEffect(() => {
    if (location.pathname === '/') {
      setActiveSection("home");
      
      // Check if we have a section to scroll to from navigation state
      if (location.state && location.state.scrollTo) {
        // Small timeout to ensure the page has fully loaded
        setTimeout(() => {
          scrollToSection(location.state.scrollTo);
        }, 100);
      }
    } else {
      setActiveSection("");
    }
  }, [location.pathname, location.state]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isLinkActive = (link: string) => {
    if (link.startsWith('#')) {
      return activeSection === link.substring(1);
    }
    return location.pathname === link;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4",
        isScrolled
          ? "bg-white shadow-md py-3 dark:bg-gray-900"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <AnimatedLogo />
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => handleLinkClick(link.href)}
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
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 w-full py-4 px-4 sm:px-6 border-t dark:border-gray-800">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => {
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
    </header>
  );
};

export default Header;
