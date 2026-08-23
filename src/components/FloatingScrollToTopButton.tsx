import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Back to top, bottom left.
 *
 * Two things had gone wrong with this. It was orphaned — no page imported it,
 * so it rendered nowhere — and it also returned null unless the path was
 * exactly "/", which meant that even once it was wired into a case study it
 * would still have refused to appear. Rendering it is the opt-in now; a
 * component that is only mounted where it is wanted does not need to
 * second-guess the route it finds itself on.
 *
 * Scroll state is read through rAF rather than on every scroll event — this
 * sits on pages several thousand pixels tall, and an unthrottled listener
 * doing setState per event is a guaranteed jank source on exactly the long
 * scrolls it exists to shortcut.
 */
const FloatingScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const frame = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const read = () => {
      frame.current = 0;
      setIsVisible(window.scrollY > 400);
    };

    const onScroll = () => {
      if (!frame.current) frame.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  const scrollToTop = () => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40"
        >
          <Button
            onClick={scrollToTop}
            size="icon"
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingScrollToTopButton;
