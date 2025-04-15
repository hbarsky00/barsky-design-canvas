import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useHeaderNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (location.pathname === '/') {
      if (href.startsWith('#')) {
        scrollToSection(href.substring(1));
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (href.startsWith('#')) {
        navigate('/', { state: { scrollTo: href.substring(1) } });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(href);
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isLinkActive = (link: string) => {
    if (link.startsWith('#')) {
      return activeSection === link.substring(1);
    }
    return location.pathname === link;
  };

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
      
      if (location.state && location.state.scrollTo) {
        setTimeout(() => {
          scrollToSection(location.state.scrollTo);
        }, 100);
      }
    } else {
      setActiveSection("");
    }
  }, [location.pathname, location.state]);

  return {
    isScrolled,
    activeSection,
    isMobileMenuOpen,
    navLinks,
    handleLinkClick,
    toggleMobileMenu,
    isLinkActive
  };
};
