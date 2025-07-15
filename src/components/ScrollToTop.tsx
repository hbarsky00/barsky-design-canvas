
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  let location;
  
  try {
    location = useLocation();
  } catch (error) {
    // If router context is not available, just return null
    return null;
  }

  useEffect(() => {
    if (location) {
      window.scrollTo(0, 0);
    }
  }, [location?.pathname]);

  return null;
};

export default ScrollToTop;
