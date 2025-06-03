
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

const ScrollHandler: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
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
    trackPageView('/', 'Homepage - Hiram Barsky UX/UI Designer & Frontend Developer');
  }, [location.state]);

  return null;
};

export default ScrollHandler;
