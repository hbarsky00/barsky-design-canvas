
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Owns scroll position across client-side navigation.
 *
 * Three cases, in priority order:
 *  1. `location.state.scrollTo` — the header nav's own smooth scroll. Leave it alone.
 *  2. A URL fragment (`/#case-studies`) — scroll to that section. React Router
 *     does not act on the fragment itself, so without this every `/#section`
 *     link landed at scrollY 0 with the target below the fold.
 *  3. A plain page change — scroll to top.
 */
const ScrollToTop = () => {
  const { pathname, hash, state } = useLocation();
  const prevPathnameRef = useRef<string>('');

  useEffect(() => {
    const prevPathname = prevPathnameRef.current;
    prevPathnameRef.current = pathname;

    if (typeof window === 'undefined') return;

    // The header nav handles its own scrolling via state.scrollTo.
    if (state && (state as { scrollTo?: string }).scrollTo) return;

    const isFirstRender = prevPathname === '';

    if (hash && hash.length > 1) {
      let id: string;
      try {
        id = decodeURIComponent(hash.slice(1));
      } catch {
        id = hash.slice(1);
      }

      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;
      // Jumping on a cold landing is correct; animating a page the visitor has
      // not seen yet reads as a glitch.
      const behavior: ScrollBehavior =
        prefersReducedMotion || isFirstRender ? 'auto' : 'smooth';

      let timer = 0;
      let attempts = 0;

      const findAndScroll = () => {
        const target = document.getElementById(id);
        if (target) {
          // scrollIntoView honours html's scroll-padding-top and the section's
          // own scroll-margin-top, so this lands exactly where the site's
          // in-page anchors already do — no duplicated header maths.
          target.scrollIntoView({ behavior, block: 'start' });
          return;
        }
        // Sections further down the page can mount a tick late behind lazy
        // loading, so retry briefly instead of giving up on the first miss.
        if (attempts++ < 10) {
          timer = window.setTimeout(findAndScroll, 100);
        }
      };

      timer = window.setTimeout(findAndScroll, 0);
      return () => window.clearTimeout(timer);
    }

    if (!isFirstRender && prevPathname !== pathname) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, state]);

  return null;
};

export default ScrollToTop;
