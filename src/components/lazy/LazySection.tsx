import React, { Suspense } from 'react';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  /** Kept for call-site compatibility; no longer gates rendering. */
  threshold?: number;
}

/**
 * Suspense boundary for a code-split page section.
 *
 * This used to gate rendering on an IntersectionObserver, mounting `children`
 * only once the section scrolled into view. That cost the site its homepage
 * content: the prerender capture never scrolls far enough for the observers to
 * fire, so the served HTML froze the 128px `animate-pulse` placeholder in place of
 * the blog preview, contact and FAQ sections — and the homepage shipped zero links
 * to any blog post.
 *
 * Capturing a scrolled DOM alone would not fix it, because React's first client
 * render would still produce the placeholder and mismatch the snapshot — the exact
 * hydration failure capture-prerendered-bodies.ts exists to prevent. So the gate
 * is gone. The children are React.lazy imports, so they are still separate chunks
 * and Suspense still shows the fallback while one loads; the only thing removed is
 * the delay that made the content invisible to crawlers.
 */
const LazySection: React.FC<LazySectionProps> = ({
  children,
  fallback = <div className="h-32 animate-pulse bg-muted/20 rounded-lg" />,
}) => (
  <div>
    <Suspense fallback={fallback}>{children}</Suspense>
  </div>
);

export default LazySection;
