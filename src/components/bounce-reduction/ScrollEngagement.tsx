import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

/**
 * The one thing this site remembers about a visitor.
 *
 * It used to be `engagement-shown: 'true'`, written the first time the scroll
 * prompt fired and never expiring — so the site's entire memory of a human
 * being was "have I already interrupted this person", permanently. A founder
 * who read a case study in January and came back in March got *less* than a
 * first-timer, which is the opposite of how a relationship should work.
 *
 * Now it stores a timestamp and forgets after 30 days: long enough to not nag
 * anyone inside one decision cycle, short enough that a genuinely returning
 * visitor is treated as one. Legacy 'true' values are read as "suppressed,
 * start the clock now" so nobody who already saw it gets it again immediately.
 */
const ENGAGEMENT_KEY = 'engagement-shown';
const ENGAGEMENT_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const suppressEngagement = () => {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(ENGAGEMENT_KEY, String(Date.now()));
  } catch {
    /* Safari private mode throws on setItem; the prompt is not worth a crash. */
  }
};

const engagementSuppressed = (): boolean => {
  if (typeof localStorage === 'undefined') return false;
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(ENGAGEMENT_KEY);
  } catch {
    return false;
  }
  if (!raw) return false;
  // Pre-2026-11-26 value: suppress once more, but start the clock from now.
  if (raw === 'true') {
    suppressEngagement();
    return true;
  }
  const shownAt = Number(raw);
  if (!Number.isFinite(shownAt)) return false;
  return Date.now() - shownAt < ENGAGEMENT_TTL_MS;
};

const ScrollEngagement: React.FC = () => {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const [showEngagementPrompt, setShowEngagementPrompt] = useState(false);
  const dismissedThisVisit = useRef(false);

  useEffect(() => {
    if (location.pathname !== '/') return;
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    const contactInView = () => {
      const contactSection = document.getElementById('contact');
      if (!contactSection) return false;
      const r = contactSection.getBoundingClientRect();
      return r.top <= window.innerHeight && r.bottom >= 0;
    };

    const handleScroll = () => {
      /* Already up: the moment they reach the form, the nudge has done its job
         and should get out of the way rather than float over it. */
      if (showEngagementPrompt) {
        if (contactInView()) setShowEngagementPrompt(false);
        return;
      }
      if (dismissedThisVisit.current) return;

      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      /* On this page that lands in the bio section, roughly 60-67%: late
         enough that they have read the work, before the contact form at 71%. */
      if (progress <= 60) return;

      /* This used to stand down whenever the consultation bubble was on
         screen. Now that the bubble is enabled it is on screen for most of
         the page, which would have made this prompt unreachable again, so the
         handoff runs the other way: this fires, and the bubble yields to it
         via the `engagement-prompt` event below. Still only one floating CTA
         at a time -- the rarer message wins the moment. */

      /* No point interrupting someone who has already reached the form. */
      if (contactInView()) return;

      if (engagementSuppressed()) return;

      setShowEngagementPrompt(true);
      suppressEngagement();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, showEngagementPrompt]);

  /* Tells FloatingConsultationBubble to step aside while this is up. An
     event rather than lifted state because the bubble is eagerly rendered and
     this component is lazy-loaded; prop-drilling across that boundary buys
     nothing a one-line listener does not. */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.dispatchEvent(
      new CustomEvent('engagement-prompt', { detail: showEngagementPrompt })
    );
  }, [showEngagementPrompt]);

  const dismiss = () => {
    dismissedThisVisit.current = true;
    setShowEngagementPrompt(false);
  };

  useEffect(() => {
    if (!showEngagementPrompt) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showEngagementPrompt]);

  const scrollToContact = () => {
    dismiss();
    if (typeof document !== 'undefined') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: reduceMotion ? 'auto' : 'smooth',
        });
      }
    }
  };

  return (
    <AnimatePresence>
      {showEngagementPrompt && (
        <motion.aside
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          aria-label="A note from Hiram"
          /* Removed by capture-prerendered-bodies before the snapshot is
             written: this only exists because the visitor scrolled, and must
             never be served in the static HTML. */
          data-transient=""
          /* Sits clear of the scroll-to-top button, which is fixed at
             bottom-6 right-6 with z-50 and would otherwise punch through
             this card. */
          className="fixed bottom-20 left-4 right-4 z-40 rounded-md border border-border
                     bg-white p-4 shadow-xl md:left-auto md:right-6 md:w-80"
          style={{ bottom: 'calc(5rem + env(safe-area-inset-bottom))' }}
        >
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute right-2 top-2 inline-flex h-11 w-11 items-center justify-center
                       rounded-sm text-muted-foreground transition-colors hover:text-foreground
                       focus-visible:outline-2 focus-visible:outline-primary"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-start gap-3">
            <MessageCircle className="mt-1 h-6 w-6 flex-shrink-0 text-primary" aria-hidden="true" />
            <div className="flex-1">
              <p className="mb-1 pr-7 font-semibold text-gray-900">Building something?</p>
              <p className="mb-3 text-sm text-gray-600">
                Tell me what it is and I'll tell you if I'm the right person to build it.
              </p>
              <div className="flex gap-2">
                <Button onClick={scrollToContact} size="sm">
                  Tell me about it
                </Button>
                <Button onClick={dismiss} variant="outline" size="sm">
                  Not now
                </Button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default ScrollEngagement;
