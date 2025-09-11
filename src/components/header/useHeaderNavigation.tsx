
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
    { name: "Store", href: "/store" },
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
    console.log('Scrolling to section:', sectionId);
    
    // First check if we're on the homepage
    if (location.pathname !== '/') {
      // If not on homepage, navigate there first with scrollTo state
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
    // Set intentional scrolling flag
    setIsIntentionalScrolling(true);
    
    // Simple, foolproof scroll function
    const attemptScroll = (retries = 3) => {
      const section = document.getElementById(sectionId);
      console.log('Found section:', sectionId, section);
      
      if (section) {
        const rect = section.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop - 80; // Fixed 80px offset for header
        
        console.log('Scrolling to position:', targetPosition);
        
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
        
        setIsMobileMenuOpen(false);
        
        // Clear intentional scrolling flag after scroll completes
        setTimeout(() => {
          setIsIntentionalScrolling(false);
        }, 1000);
      } else if (retries > 0) {
        // Element might not be rendered yet due to transitions, retry
        console.log('Section not found, retrying...', retries);
        setTimeout(() => attemptScroll(retries - 1), 50);
      } else {
        console.error('Could not find section:', sectionId);
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
    
    // For section links (anchors) - with debugging
    if (link.startsWith('#')) {
      const sectionId = link.substring(1);
      const isActive = activeSection === sectionId;
      console.log(`Link ${link} active check: activeSection="${activeSection}", sectionId="${sectionId}", isActive=${isActive}`);
      return isActive;
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
        console.log('Skipping section detection - intentional scrolling in progress');
        return;
      }

      // Home section logic - set as active when near the top of the page
      if (location.pathname === '/' && scrollPosition < 200) {
        console.log('Setting active section to "home" (near top)');
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
              
              console.log(`Section "${id}": top=${rect.top.toFixed(0)}, bottom=${rect.bottom.toFixed(0)}, distance=${distanceFromMiddle.toFixed(0)}`);
            }
          }
        }
        
        console.log(`Setting active section to: "${activeSection}"`);
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
  };
};
