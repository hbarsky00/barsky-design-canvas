
import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, state } = useLocation();
  const navigationType = useNavigationType();
  const prevPathnameRef = useRef<string>('');

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    // Only scroll to top if:
    // 1. We're actually changing pages (not staying on homepage)
    // 2. There's no scroll state indicating intentional section navigation
    // 3. This isn't a Back/Forward navigation — on POP the browser restores
    //    the previous scroll position, and forcing 0 threw people back to the
    //    top of a ~12,000px homepage instead of the card they'd clicked.
    const isChangingPages = prevPathname !== '' && prevPathname !== pathname;
    const hasScrollIntent = state && state.scrollTo;
    const isBackForward = navigationType === 'POP';

    if (typeof window !== 'undefined' && isChangingPages && !hasScrollIntent && !isBackForward) {
      // behavior: 'instant' overrides the global `scroll-behavior: smooth` on
      // html. Without it, arriving on a new page from halfway down the last
      // one animated the viewport all the way to the top — a visible glide
      // over content that already belongs to a different page, and now also
      // fighting the route fade. Anchor links still scroll smoothly; only
      // page changes land immediately, which is what a new page should do.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [pathname, state, navigationType]);

  return null;
};

export default ScrollToTop;
