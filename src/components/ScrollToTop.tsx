
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, state } = useLocation();
  const prevPathnameRef = useRef<string>('');

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    prevPathnameRef.current = pathname;
    
    // Only scroll to top if:
    // 1. We're actually changing pages (not staying on homepage)
    // 2. There's no scroll state indicating intentional section navigation
    const isChangingPages = prevPathname !== '' && prevPathname !== pathname;
    const hasScrollIntent = state && state.scrollTo;
    
    if (typeof window !== 'undefined' && isChangingPages && !hasScrollIntent) {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
};

export default ScrollToTop;
