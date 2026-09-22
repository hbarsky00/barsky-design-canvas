import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NavItem {
  label: string;
  href: string;
}

const navigationItems: NavItem[] = [
  { label: "Intro", href: "#intro" },
  { label: "Bio", href: "#bio" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Contact", href: "#contact" },
  { label: "Blog", href: "#blog" },
  { label: "FAQ", href: "#faq" },
];

const QuickNavigation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Show navigation after scrolling past 50% of hero section
      setIsVisible(scrollPosition > heroHeight * 0.5);

      // Update active section based on scroll position
      const sections = navigationItems.map(item => item.href.substring(1)); // Remove #
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Account for header offset
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (href: string) => {
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Don't render on mobile
  const isMobile = window.innerWidth < 1024;
  if (isMobile) return null;

  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 20 
      }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50 py-2 px-1">
        <div className="flex flex-col space-y-1">
          {navigationItems.map((item) => (
            <button
              key={item.href}
              onClick={() => handleClick(item.href)}
              className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-200
                         hover:bg-primary/10 hover:text-primary
                         ${activeSection === item.href.substring(1)
                           ? 'bg-primary text-white shadow-sm'
                           : 'text-gray-600'
                         }`}
              aria-label={`Navigate to ${item.label} section`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default QuickNavigation;