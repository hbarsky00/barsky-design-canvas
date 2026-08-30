import React, { Suspense, useRef } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useLocation, useNavigationType } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { HeadingHierarchyProvider } from "@/components/seo/HeadingHierarchyProvider";

// Global SEO component
import UnifiedSEO from "@/components/seo/UnifiedSEO";
import SitemapGenerator from "@/components/seo/SitemapGenerator";

// Critical page - load immediately
import Index from "@/pages/Index";

// Lazy load non-critical pages to reduce initial bundle size
const Services = React.lazy(() => import("@/pages/Services"));
const About = React.lazy(() => import("@/pages/About"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const Blog = React.lazy(() => import("@/pages/Blog"));
const BlogPost = React.lazy(() => import("@/pages/BlogPost"));
const Store = React.lazy(() => import("@/pages/Store"));
const StoreSuccess = React.lazy(() => import("@/pages/StoreSuccess"));
const ProductDetailsPage = React.lazy(() => import("@/pages/ProductDetailsPage"));
const ProjectDetail = React.lazy(() => import("@/pages/ProjectDetail"));

// Service page imports - lazy loaded
const UxUiDesign = React.lazy(() => import("@/pages/design-services/UxUiDesign"));
const MobileAppDesign = React.lazy(() => import("@/pages/design-services/MobileAppDesign"));
const WebDevelopment = React.lazy(() => import("@/pages/design-services/WebDevelopment"));

// Structured case study imports - lazy loaded
const StructuredHerbalinkCaseStudy = React.lazy(() => import("@/pages/StructuredHerbalinkCaseStudy"));

const ManuscriptRxCaseStudy = React.lazy(() => import("@/pages/ManuscriptRxCaseStudy"));
const StructuredInvestorLoanCaseStudy = React.lazy(() => import("@/pages/StructuredInvestorLoanCaseStudy"));
const StructuredFireLionCaseStudy = React.lazy(() => import("@/pages/StructuredFireLionCaseStudy"));
const StructuredRingRivalCaseStudy = React.lazy(() => import("@/pages/StructuredRingRivalCaseStudy"));
const StructuredRecastCaseStudy = React.lazy(() => import("@/pages/StructuredRecastCaseStudy"));
const StructuredBzEssentialsCaseStudy = React.lazy(() => import("@/pages/StructuredBzEssentialsCaseStudy"));
const StructuredCatchBuddyCaseStudy = React.lazy(() => import("@/pages/StructuredCatchBuddyCaseStudy"));
const StructuredCryptoCaseStudy = React.lazy(() => import("@/pages/StructuredCryptoCaseStudy"));
const StructuredDaeSearchCaseStudy = React.lazy(() => import("@/pages/StructuredDaeSearchCaseStudy"));
const StructuredStipsCaseStudy = React.lazy(() => import("@/pages/StructuredStipsCaseStudy"));
const StructuredBusinessManagementCaseStudy = React.lazy(() => import("@/pages/StructuredBusinessManagementCaseStudy"));

const NotFound = React.lazy(() => import("@/pages/NotFound"));
const ContentExport = React.lazy(() => import("@/pages/ContentExport"));
const SeoCheckRunner = React.lazy(() => import("@/pages/SeoCheckRunner"));


const queryClient = new QueryClient();

/**
 * The page transition, rebuilt after it shipped broken.
 *
 * The first version keyed a fade-in INSIDE `<Suspense>`. On any navigation to
 * a not-yet-cached chunk that meant: old page → hard cut to a blank fallback →
 * an 8px fade nobody could feel. Clicking "Services" looked like a plain DOM
 * swap, because effectively it was one.
 *
 * Now the order is inverted — AnimatePresence outside, Suspense inside the
 * animated element — and the transition has an exit, so it reads as a scene
 * change rather than a repaint:
 *
 *   leave:  the old page lifts 14px and fades out (220ms)
 *   arrive: the new page rises 18px into place    (420ms, brand curve)
 *
 * `mode="wait"` holds the old page on screen through its exit; `<Routes>` gets
 * the captured `location` so the exiting tree keeps rendering the OLD route
 * while the new one mounts. The exit doubles as loading cover: a route chunk
 * usually resolves inside those 220ms, so the blank Suspense fallback is
 * almost never seen.
 *
 * Scroll-to-top moved here from the old <ScrollToTop/> component, into
 * `onExitComplete` — resetting on pathname change (the old timing) would yank
 * the outgoing page to its top mid-fade. Same rules as before: never on
 * Back/Forward (the browser restores position), never when navigation state
 * carries a scroll target, and honour a #hash when its element exists.
 *
 * `initial={false}` keeps the first paint animation-free: the server-rendered
 * body is already visible, and hydrating into an opacity-0 wrapper would blank
 * the page React just promised was interactive.
 */
const pageVariants = {
  initial: { opacity: 0, y: 18 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -14,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function AppContent() {
  const location = useLocation();
  const navigationType = useNavigationType();

  // onExitComplete fires after React state has moved on; refs carry the
  // values the scroll decision needs at that moment.
  const navRef = useRef({ navigationType, state: location.state, hash: location.hash });
  navRef.current = { navigationType, state: location.state, hash: location.hash };

  const settleScroll = () => {
    if (typeof window === "undefined") return;
    const { navigationType: nav, state, hash } = navRef.current;
    if (nav === "POP") return; // browser restores Back/Forward positions
    if (state && (state as { scrollTo?: string }).scrollTo) return; // intentional section nav
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
        return;
      }
    }
    // 'instant' overrides the global scroll-behavior:smooth — a new page
    // should land, not glide up through the old one's content.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  };

  return (
    <>
      {/* Global Unified SEO System */}
      <UnifiedSEO />
      {/* Sitemap generator */}
      <SitemapGenerator />

      <AnimatePresence mode="wait" initial={false} onExitComplete={settleScroll}>
        <motion.div
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <Suspense fallback={
            /* Blank, not a spinner: between cached chunks it would flash for a
               frame, and the exit animation above covers real load time. */
            <div
              role="status"
              aria-live="polite"
              aria-label="Loading page"
              className="min-h-screen"
            />
          }>
            <Routes location={location}>
              {/* Home route */}
              <Route path="/" element={<Index />} />
              
              
              {/* Structured case studies - these override the generic ProjectDetail routing */}
              {/* crypto, dae-search, smarterhealth handled by dynamic route below */}
              <Route path="/project/herbalink" element={<StructuredHerbalinkCaseStudy />} />
              <Route path="/project/barskyjoint" element={<Navigate to="/" replace />} />
              <Route path="/project/investor-loan-app" element={<StructuredInvestorLoanCaseStudy />} />
              <Route path="/project/fire-lion" element={<StructuredFireLionCaseStudy />} />
              <Route path="/project/ring-rival" element={<StructuredRingRivalCaseStudy />} />
              <Route path="/project/recast" element={<StructuredRecastCaseStudy />} />
              <Route path="/project/bz-essentials" element={<StructuredBzEssentialsCaseStudy />} />
              <Route path="/project/catchbuddy" element={<StructuredCatchBuddyCaseStudy />} />
              <Route path="/project/email-creation-ai" element={<ManuscriptRxCaseStudy />} />
              <Route path="/project/crypto" element={<StructuredCryptoCaseStudy />} />
              <Route path="/project/dae-search" element={<StructuredDaeSearchCaseStudy />} />
              <Route path="/project/stips" element={<StructuredStipsCaseStudy />} />
              <Route path="/project/business-management" element={<StructuredBusinessManagementCaseStudy />} />

              
              {/* Generic project detail for other projects */}
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              
              {/* Service pages */}
              <Route path="/design-services/ux-ui-design" element={<UxUiDesign />} />
              <Route path="/design-services/mobile-app-design" element={<MobileAppDesign />} />
              <Route path="/design-services/web-development" element={<WebDevelopment />} />
              
              {/* Other routes */}
              <Route path="/projects" element={<Navigate to="/#case-studies" replace />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/product/:productId" element={<ProductDetailsPage />} />
              <Route path="/store/success" element={<StoreSuccess />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              
              {/* Hidden content export route */}
              <Route path="/admin/content-export-2024" element={<ContentExport />} />

              {/* SEO verification route */}
              <Route path="/__seo-check" element={<SeoCheckRunner />} />
              
              {/* Catch all — show a real 404 rather than silently redirecting
                  home, which left users with no idea the URL was wrong (and
                  produced soft-404s for crawlers). */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>

      <Toaster />
    </>
  );
}

function App() {
  return (
    /* One switch for every motion component in the app. There are ~130
       whileInView animations across ~70 components and only three of them
       checked useReducedMotion individually, so anyone with the OS setting on
       was still getting the full slide-up treatment. reducedMotion="user"
       makes framer-motion honour the preference everywhere: transforms are
       dropped, opacity is kept, and nothing has to be audited component by
       component. The CSS block in index.css only ever covered scroll-behavior
       and scroll-snap; it cannot reach JS-driven transforms. */
    <MotionConfig reducedMotion="user">
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <HeadingHierarchyProvider>
          <ImageMaximizerProvider>
            <AppContent />
          </ImageMaximizerProvider>
        </HeadingHierarchyProvider>
      </HelmetProvider>
    </QueryClientProvider>
    </MotionConfig>
  );
}

export default App;
