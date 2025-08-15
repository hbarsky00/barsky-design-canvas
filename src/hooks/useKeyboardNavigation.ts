
import { useLocation } from "react-router-dom";
import { useHomepageKeyboardNavigation } from "./useHomepageKeyboardNavigation";
import { useUniversalKeyboardNavigation } from "./useUniversalKeyboardNavigation";

export const useKeyboardNavigation = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  
  // Use homepage-specific navigation for the homepage
  const homepageNav = useHomepageKeyboardNavigation();
  
  // Use universal navigation for other pages
  const universalNav = useUniversalKeyboardNavigation();
  
  // Return the appropriate navigation object based on current route
  if (isHomepage) {
    return {
      ...homepageNav,
      isHomepage: true,
    };
  }
  
  return {
    ...universalNav,
    isHomepage: false,
    // Add homepage-specific properties with default values for consistency
    sections: [],
    isInCaseStudyMode: false,
    transitionDirection: 'none' as const,
    transitionVariation: { intensity: 0, duration: 0 },
    isTouchDevice: () => 'ontouchstart' in window || navigator.maxTouchPoints > 0,
  };
};
