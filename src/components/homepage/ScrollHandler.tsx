
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

const ScrollHandler: React.FC = () => {
  let location;
  
  try {
    location = useLocation();
  } catch (error) {
    // If router context is not available, skip scroll handling
    return null;
  }

  useEffect(() => {
    if (!location) return;
    
    // If there's a scrollTo in the state, scroll to that section
    if (location.state && location.state.scrollTo) {
      const section = document.getElementById(location.state.scrollTo);
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    
    // Track homepage view with additional details
    trackPageView('/', 'Homepage - Hiram Barsky Product Designer & Frontend Developer');
  }, [location?.state]);

  return null;
};

export default ScrollHandler;
