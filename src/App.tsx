import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import ScrollToTop from "@/components/ScrollToTop";
import BuyMeCoffeeButton from "@/components/shared/BuyMeCoffeeButton";
import { useRoomTransition } from "@/hooks/useRoomTransition";
import RoomTransition from "@/components/transitions/RoomTransition";
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
const ProjectDetail = React.lazy(() => import("@/pages/ProjectDetail"));

// Service page imports - lazy loaded
const UxUiDesign = React.lazy(() => import("@/pages/design-services/UxUiDesign"));
const MobileAppDesign = React.lazy(() => import("@/pages/design-services/MobileAppDesign"));
const WebDevelopment = React.lazy(() => import("@/pages/design-services/WebDevelopment"));

// Structured case study imports - lazy loaded
const StructuredHerbalinkCaseStudy = React.lazy(() => import("@/pages/StructuredHerbalinkCaseStudy"));
const StructuredBusinessManagementCaseStudy = React.lazy(() => import("@/pages/StructuredBusinessManagementCaseStudy"));
const StructuredBarskyJointCaseStudy = React.lazy(() => import("@/pages/StructuredBarskyJointCaseStudy"));
const StructuredInvestorLoanCaseStudy = React.lazy(() => import("@/pages/StructuredInvestorLoanCaseStudy"));
// const StructuredCryptoCaseStudy = React.lazy(() => import("@/pages/StructuredCryptoCaseStudy")); // DRAFT
const ContentExport = React.lazy(() => import("@/pages/ContentExport"));
const SeoCheckRunner = React.lazy(() => import("@/pages/SeoCheckRunner"));


const queryClient = new QueryClient();

function AppContent() {
  const { isTransitioning, transitionStage, projectTitle } = useRoomTransition();

  return (
    <>
      <ScrollToTop />
      {/* Global Unified SEO System */}
      <UnifiedSEO />
      {/* Sitemap generator */}
      <SitemapGenerator />
      
      {/* Room Transition Overlay */}
      <RoomTransition 
        isVisible={isTransitioning} 
        projectTitle={projectTitle}
        stage={transitionStage}
      />
      
      <SpatialNavigationWrapper isNavigating={isTransitioning}>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <MaterialDesignLoader size="lg" text="Loading page..." />
          </div>
        }>
            <Routes>
              {/* Home route */}
              <Route path="/" element={<Index />} />
              
              
              {/* Structured case studies - these override the generic ProjectDetail routing */}
              {/* <Route path="/project/crypto" element={<StructuredCryptoCaseStudy />} /> DRAFT */}
              <Route path="/project/herbalink" element={<StructuredHerbalinkCaseStudy />} />
              <Route path="/project/business-management" element={<StructuredBusinessManagementCaseStudy />} />
              <Route path="/project/barskyjoint" element={<StructuredBarskyJointCaseStudy />} />
              <Route path="/project/investor-loan-app" element={<StructuredInvestorLoanCaseStudy />} />
              <Route path="/project/wholesale-distribution" element={<Navigate to="/project/business-management" replace />} />
              
              {/* Generic project detail for other projects */}
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              
              {/* Service pages */}
              <Route path="/design-services/ux-ui-design" element={<UxUiDesign />} />
              <Route path="/design-services/mobile-app-design" element={<MobileAppDesign />} />
              <Route path="/design-services/web-development" element={<WebDevelopment />} />
              
              {/* Other routes */}
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/success" element={<StoreSuccess />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              
              {/* Hidden content export route */}
              <Route path="/admin/content-export-2024" element={<ContentExport />} />

              {/* SEO verification route */}
              <Route path="/__seo-check" element={<SeoCheckRunner />} />
              
              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </SpatialNavigationWrapper>
        <BuyMeCoffeeButton />
        <Toaster />
      </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ImageMaximizerProvider>
          <AppContent />
        </ImageMaximizerProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
