import React, { Suspense } from "react";
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
const StructuredBusinessManagementCaseStudy = React.lazy(() => import("@/pages/StructuredBusinessManagementCaseStudy"));

const ManuscriptRxCaseStudy = React.lazy(() => import("@/pages/ManuscriptRxCaseStudy"));
const StructuredInvestorLoanCaseStudy = React.lazy(() => import("@/pages/StructuredInvestorLoanCaseStudy"));
const StructuredFireLionCaseStudy = React.lazy(() => import("@/pages/StructuredFireLionCaseStudy"));
const StructuredRingRivalCaseStudy = React.lazy(() => import("@/pages/StructuredRingRivalCaseStudy"));
const StructuredCatchBuddyCaseStudy = React.lazy(() => import("@/pages/StructuredCatchBuddyCaseStudy"));
const StructuredCryptoCaseStudy = React.lazy(() => import("@/pages/StructuredCryptoCaseStudy"));
const StructuredDaeSearchCaseStudy = React.lazy(() => import("@/pages/StructuredDaeSearchCaseStudy"));
const StructuredSplittimeCaseStudy = React.lazy(() => import("@/pages/StructuredSplittimeCaseStudy"));

const ContentExport = React.lazy(() => import("@/pages/ContentExport"));
const SeoCheckRunner = React.lazy(() => import("@/pages/SeoCheckRunner"));

// Promo / product overview pages
const HerbalinkPromo = React.lazy(() => import("@/pages/promos/HerbalinkPromo"));
const NudgeMePromo = React.lazy(() => import("@/pages/promos/NudgeMePromo"));
const RoiDesignPromo = React.lazy(() => import("@/pages/promos/RoiDesignPromo"));
const FireLionPromo = React.lazy(() => import("@/pages/promos/FireLionPromo"));
const QrCodeBuilderCaseStudy = React.lazy(() => import("@/pages/QrCodeBuilderCaseStudy"));
const ValoraBetCaseStudy = React.lazy(() => import("@/pages/ValoraBetCaseStudy"));
const NudgeMeCaseStudy = React.lazy(() => import("@/pages/NudgeMeCaseStudy"));
const RoiDesignBuilderCaseStudy = React.lazy(() => import("@/pages/RoiDesignBuilderCaseStudy"));
const CaseStudies = React.lazy(() => import("@/pages/CaseStudies"));


const queryClient = new QueryClient();

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
          <div className="min-h-screen flex items-center justify-center">
            <MaterialDesignLoader size="lg" text="Loading page..." />
          </div>
        }>
            <Routes>
              {/* Home route */}
              <Route path="/" element={<Index />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              
              
              {/* Structured case studies - these override the generic ProjectDetail routing */}
              {/* crypto, dae-search, smarterhealth handled by dynamic route below */}
              <Route path="/project/herbalink" element={<StructuredHerbalinkCaseStudy />} />
              <Route path="/project/business-management" element={<StructuredBusinessManagementCaseStudy />} />
              <Route path="/project/barskyjoint" element={<Navigate to="/" replace />} />
              <Route path="/project/investor-loan-app" element={<StructuredInvestorLoanCaseStudy />} />
              <Route path="/project/fire-lion" element={<StructuredFireLionCaseStudy />} />
              <Route path="/project/ring-rival" element={<StructuredRingRivalCaseStudy />} />
              <Route path="/project/catchbuddy" element={<StructuredCatchBuddyCaseStudy />} />
              <Route path="/project/email-creation-ai" element={<ManuscriptRxCaseStudy />} />
              <Route path="/project/crypto" element={<StructuredCryptoCaseStudy />} />
              <Route path="/project/dae-search" element={<StructuredDaeSearchCaseStudy />} />
              <Route path="/project/splittime" element={<StructuredSplittimeCaseStudy />} />
              <Route path="/project/qr-code-builder" element={<QrCodeBuilderCaseStudy />} />
              <Route path="/project/roi-design-builder" element={<RoiDesignBuilderCaseStudy />} />
              <Route path="/project/valora-bet" element={<ValoraBetCaseStudy />} />
              <Route path="/project/nudgeme" element={<NudgeMeCaseStudy />} />

              {/* Product overview (promo) pages */}
              <Route path="/project/herbalink/overview" element={<HerbalinkPromo />} />
              <Route path="/project/nudgeme/overview" element={<NudgeMePromo />} />
              <Route path="/project/roi-design-builder/overview" element={<RoiDesignPromo />} />
              <Route path="/project/fire-lion/overview" element={<FireLionPromo />} />


              <Route path="/project/wholesale-distribution" element={<Navigate to="/project/business-management" replace />} />
              
              {/* Generic project detail for other projects */}
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              
              {/* Service pages */}
              <Route path="/design-services/ux-ui-design" element={<UxUiDesign />} />
              <Route path="/design-services/mobile-app-design" element={<MobileAppDesign />} />
              <Route path="/design-services/web-development" element={<WebDevelopment />} />
              
              {/* Other routes */}
              <Route path="/projects" element={<Navigate to="/#projects" replace />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/success" element={<StoreSuccess />} />
              <Route path="/store/product/:productId" element={<ProductDetailsPage />} />
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
        
        <Toaster />
      </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <HeadingHierarchyProvider>
          <ImageMaximizerProvider>
            <AppContent />
          </ImageMaximizerProvider>
        </HeadingHierarchyProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
