
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const useHeaderNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIntentionalScrolling, setIsIntentionalScrolling] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: "Case Studies", href: "#case-studies" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Me", href: "#contact" },
  ];

  // Track scroll direction and header visibility
  const lastYRef = useRef(0);
  const [headerHidden, setHeaderHidden] = useState(false);
  const isMenuOpenRef = useRef(isMobileMenuOpen);

  useEffect(() => {
    isMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) setHeaderHidden(false);
  }, [isMobileMenuOpen]);

  // Check if we're on the homepage
  const isHomepage = location.pathname === '/';
  const isProjectPage = location.pathname.startsWith('/project/') || location.pathname.startsWith('/case-studies/');

  const scrollToSection = (sectionId: string) => {
    // First check if we're on the homepage
    if (location.pathname !== '/') {
      // If not on homepage, navigate there first with scrollTo state
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
    // Set intentional scrolling flag
    setIsIntentionalScrolling(true);
    
    // If we're already on the homepage, scroll to the section with header offset
    const section = document.getElementById(sectionId);
    if (section) {
      const headerHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height') || '64');
      const elementTop = section.offsetTop;
      const offset = elementTop - headerHeight - 20; // 20px breathing room
      
      window.scrollTo({
        top: Math.max(0, offset),
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
      
      // Clear intentional scrolling flag after scroll completes
      setTimeout(() => {
        setIsIntentionalScrolling(false);
      }, 1000);
    }
  };

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // Handle external links (like the resume)
    if (href.startsWith('http')) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }
    
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
    // External links should not be considered active
    if (link.startsWith('http')) {
      return false;
    }
    
    // Special case for home link
    if (link === "/") {
      return location.pathname === "/" && activeSection === "home";
    }
    
    // For about page
    if (link === "/about") {
      return location.pathname === "/about";
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
      
      // Auto-hide header when scrolling down past threshold
      const goingDown = scrollPosition > lastYRef.current;
      setHeaderHidden(scrollPosition > 120 && goingDown && !isMenuOpenRef.current);
      lastYRef.current = scrollPosition;
      
      // Set basic scroll state for background change
      setIsScrolled(scrollPosition > 50);
      
      // For project pages, always show the navigation
      if (isProjectPage) {
        setIsScrolledPastHero(true);
        return;
      }
      
      // For non-homepage routes, always show the logo
      if (!isHomepage) {
        setIsScrolledPastHero(true);
        return;
      }
      
      // For homepage, hide header completely on first section and only show when scrolling to second section
      // Changed threshold from 0.6 to 0.95 to create slideshow effect
      const slideScrollThreshold = heroHeight * 0.95;
      setIsScrolledPastHero(scrollPosition > slideScrollThreshold);

      // Skip section detection during intentional scrolling to prevent conflicts
      if (isIntentionalScrolling) {
        return;
      }

      // Home section logic - set as active when near the top of the page with bigger buffer
      if (location.pathname === '/' && scrollPosition < 400) {
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
            // Added minimum visibility threshold to prevent false positives
            if (visiblePercent > mostVisibleSection.visiblePercent && visiblePercent > 25 && rect.top < windowHeight / 2) {
              mostVisibleSection = { id, visiblePercent };
            }
          }
        }
        
        // Only update if we found a visible section with significant visibility
        if (mostVisibleSection.visiblePercent > 25) {
          setActiveSection(mostVisibleSection.id);
        } else if (scrollPosition < 400) {
          // Fallback to home when near the top and no section is visible enough
          setActiveSection("home");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once to set initial state
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navLinks, location.pathname, isHomepage, isProjectPage]);

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
      // For non-homepage routes, show logo immediately
      setIsScrolledPastHero(true);
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
    isLinkActive,
    headerHidden,
    setIsIntentionalScrolling,
  };
};
