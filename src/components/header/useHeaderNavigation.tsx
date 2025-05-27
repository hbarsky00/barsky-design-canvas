
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useHeaderNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "/services" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    // First check if we're on the homepage
    if (location.pathname !== '/') {
      // If not on homepage, navigate there first with scrollTo state
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
    // If we're already on the homepage, just scroll to the section
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      // For anchor links, scroll to the section
      scrollToSection(href.substring(1));
    } else if (href === '/') {
      // For home link, go to homepage and scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate(href);
    } else {
      // For other routes like /services, just navigate
      navigate(href);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isLinkActive = (link: string) => {
    // Special case for home link
    if (link === "/") {
      return location.pathname === "/" && activeSection === "home";
    }
    
    // For blog page
    if (link === "/blog") {
      return location.pathname === "/blog" || location.pathname.startsWith("/blog/");
    }
    
    // For service page
    if (link === "/services") {
      return location.pathname === "/services" || location.pathname.startsWith("/design-services");
    }
    
    // For section links (anchors)
    if (link.startsWith('#')) {
      return activeSection === link.substring(1);
    }
    
    // For other routes
    return location.pathname === link;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Set basic scroll state for background change
      setIsScrolled(scrollPosition > 50);
      
      // Set scrolled past hero state for navigation visibility
      setIsScrolledPastHero(scrollPosition > heroHeight * 0.8);

      // Home section logic - set as active when near the top of the page
      if (location.pathname === '/' && scrollPosition < 200) {
        setActiveSection("home");
        return;
      }

      if (location.pathname === '/') {
        // Get all section elements that correspond to navigation links
        const sections = navLinks
          .filter(link => link.href.startsWith('#'))
          .map(link => ({
            id: link.href.substring(1),
            element: document.getElementById(link.href.substring(1))
          }));
        
        // Find which section is most visible in the viewport
        let mostVisibleSection = { id: "home", visiblePercent: 0 };
        
        for (const { id, element } of sections) {
          if (element) {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Calculate how much of the section is visible in the viewport
            const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
            const sectionHeight = rect.height;
            const visiblePercent = visibleHeight > 0 ? (visibleHeight / sectionHeight) * 100 : 0;
            
            // If this section is more visible than our current most visible section, update
            if (visiblePercent > mostVisibleSection.visiblePercent && rect.top < windowHeight / 2) {
              mostVisibleSection = { id, visiblePercent };
            }
          }
        }
        
        // Only update if we found a visible section
        if (mostVisibleSection.visiblePercent > 0) {
          setActiveSection(mostVisibleSection.id);
        } else if (scrollPosition < 200) {
          // Fallback to home when near the top and no section is visible enough
          setActiveSection("home");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once to set initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks, location.pathname]);

  useEffect(() => {
    if (location.pathname === '/') {
      // Set to home by default when first loading the page
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
    isScrolledPastHero,
    activeSection,
    isMobileMenuOpen,
    navLinks,
    handleLinkClick,
    toggleMobileMenu,
    isLinkActive
  };
};
