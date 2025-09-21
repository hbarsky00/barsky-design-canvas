
import { useState, useEffect } from "react";
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
    { name: "Store", href: "/store" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Me", href: "#contact" },
  ];

  // Header visibility: never auto-hide; keep fixed/visible
  const headerHidden = false;

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
    
    // Simple, unified scroll function using scrollIntoView
    const attemptScroll = (retries = 3) => {
      const section = document.getElementById(sectionId);
      
      if (section) {
        // Use scrollIntoView with block: 'start' for consistent behavior
        section.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start'
        });
        
        setIsMobileMenuOpen(false);
        
        // Clear intentional scrolling flag when scroll completes
        const handleScrollEnd = () => {
          setIsIntentionalScrolling(false);
          window.removeEventListener('scrollend', handleScrollEnd);
        };
        
        // Use scrollend event if available, otherwise fallback to timeout
        if ('onscrollend' in window) {
          window.addEventListener('scrollend', handleScrollEnd);
        } else {
          setTimeout(() => setIsIntentionalScrolling(false), 1000);
        }
      } else if (retries > 0) {
        // Element might not be rendered yet due to lazy loading, retry
        setTimeout(() => attemptScroll(retries - 1), 100);
      } else {
        setIsIntentionalScrolling(false);
      }
    };
    
    attemptScroll();
  };

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false);
    
    // Handle external links (like the resume)
    if (href.startsWith('http')) {
      if (typeof window !== 'undefined') {
        window.open(href, '_blank', 'noopener,noreferrer');
      }
      return;
    }
    
    if (href.startsWith('#')) {
      // For anchor links, scroll to the section
      scrollToSection(href.substring(1));
    } else if (href === '/') {
      // For home link, go to homepage and scroll to top
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
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
    
    // For store page
    if (link === "/store") {
      return location.pathname === "/store" || location.pathname.startsWith("/store/");
    }
    
    // For service page
    if (link === "/services") {
      return location.pathname === "/services" || location.pathname.startsWith("/design-services");
    }
    
    if (link.startsWith('#')) {
      const sectionId = link.substring(1);
      const isActive = activeSection === sectionId;
      return isActive;
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
      
      // For homepage, show header after intro section; compute based on intro bottom vs header height
      const introSection = document.getElementById('intro');
      if (introSection) {
        const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 64;
        const introRect = introSection.getBoundingClientRect();
        setIsScrolledPastHero(introRect.bottom <= headerHeight);
      } else {
        // Fallback if intro section not found
        const slideScrollThreshold = heroHeight * 0.6;
        setIsScrolledPastHero(scrollPosition > slideScrollThreshold);
      }

      // Skip section detection during intentional scrolling to prevent conflicts
      if (isIntentionalScrolling) {
        return;
      }

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
        
        // Simple approach: find the section whose top is closest to the middle of the viewport
        let activeSection = "home";
        let closestDistance = Infinity;
        const viewportMiddle = window.innerHeight / 2;
        
        for (const { id, element } of sections) {
          if (element) {
            const rect = element.getBoundingClientRect();
            
            // Check if section is in viewport (at least partially visible)
            const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;
            
            if (isVisible) {
              // Calculate distance from section top to viewport middle
              const distanceFromMiddle = Math.abs(rect.top - viewportMiddle);
              
              // If this section is closer to the middle than our current best, use it
              if (distanceFromMiddle < closestDistance) {
                closestDistance = distanceFromMiddle;
                activeSection = id;
              }
            }
          }
        }
        
        setActiveSection(activeSection);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener("scroll", handleScroll);
      // Trigger once to set initial state
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
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
    scrollToSection,
  };
};
