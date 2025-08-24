
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "@/lib/analytics";

const ScrollHandler: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Track homepage view with additional details
    trackPageView('/', 'Homepage - Hiram Barsky Product Designer & Frontend Developer');
  }, [location.state]);

  return null;
};

export default ScrollHandler;
