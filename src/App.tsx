import React, { Suspense } from "react";
import { MotionConfig, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { HeadingHierarchyProvider } from "@/components/seo/HeadingHierarchyProvider";
import ScrollToTop from "@/components/ScrollToTop";

import SpatialNavigationWrapper from "@/components/transitions/SpatialNavigationWrapper";
import MaterialDesignLoader from "@/components/loading/MaterialDesignLoader";

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
const StructuredCatchBuddyCaseStudy = React.lazy(() => import("@/pages/StructuredCatchBuddyCaseStudy"));
const StructuredCryptoCaseStudy = React.lazy(() => import("@/pages/StructuredCryptoCaseStudy"));
const StructuredDaeSearchCaseStudy = React.lazy(() => import("@/pages/StructuredDaeSearchCaseStudy"));
const StructuredSplittimeCaseStudy = React.lazy(() => import("@/pages/StructuredSplittimeCaseStudy"));
const StructuredStipsCaseStudy = React.lazy(() => import("@/pages/StructuredStipsCaseStudy"));

const NotFound = React.lazy(() => import("@/pages/NotFound"));
const ContentExport = React.lazy(() => import("@/pages/ContentExport"));
const SeoCheckRunner = React.lazy(() => import("@/pages/SeoCheckRunner"));


const queryClient = new QueryClient();

/**
 * A short fade-and-lift on every route change.
 *
 * Navigation used to be an instant DOM swap: hard cut, spinner, content
 * popping in at the top. Keying on pathname gives each page its own mount, so
 * it arrives rather than appears.
 *
 * Fade-in only, not AnimatePresence mode="wait" — routes are lazy, and waiting
 * on an exit while the chunk resolves holds the old page on screen and makes
 * navigation feel slower than it is.
 *
 * The y offset is 8px: enough to read as movement, small enough that it never
 * competes with the scroll-linked reveals further down the page. Under
 * reduced-motion, MotionConfig strips the transform and keeps the opacity.
 */
const RouteFade: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

function AppContent() {
  return (
    <>
      <ScrollToTop />
      {/* Global Unified SEO System */}
      <UnifiedSEO />
      {/* Sitemap generator */}
      <SitemapGenerator />
      
      <SpatialNavigationWrapper isNavigating={false}>
        <Suspense fallback={
          /* Was a full-screen spinner with "Loading page...". Between two
             already-cached route chunks it flashed for a frame or two, which
             reads as a stutter rather than progress. A blank hold of the same
             height is calmer, and the fade below covers the arrival. */
          <div
            role="status"
            aria-live="polite"
            aria-label="Loading page"
            className="min-h-screen"
          />
        }>
            <RouteFade>
            <Routes>
              {/* Home route */}
              <Route path="/" element={<Index />} />
              
              
              {/* Structured case studies - these override the generic ProjectDetail routing */}
              {/* crypto, dae-search, smarterhealth handled by dynamic route below */}
              <Route path="/project/herbalink" element={<StructuredHerbalinkCaseStudy />} />
              <Route path="/project/barskyjoint" element={<Navigate to="/" replace />} />
              <Route path="/project/investor-loan-app" element={<StructuredInvestorLoanCaseStudy />} />
              <Route path="/project/fire-lion" element={<StructuredFireLionCaseStudy />} />
              <Route path="/project/ring-rival" element={<StructuredRingRivalCaseStudy />} />
              <Route path="/project/catchbuddy" element={<StructuredCatchBuddyCaseStudy />} />
              <Route path="/project/email-creation-ai" element={<ManuscriptRxCaseStudy />} />
              <Route path="/project/crypto" element={<StructuredCryptoCaseStudy />} />
              <Route path="/project/dae-search" element={<StructuredDaeSearchCaseStudy />} />
              <Route path="/project/splittime" element={<StructuredSplittimeCaseStudy />} />
              <Route path="/project/stips" element={<StructuredStipsCaseStudy />} />

              
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
            </RouteFade>
          </Suspense>
        </SpatialNavigationWrapper>
        
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
