import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import AllProjects from "./pages/AllProjects";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import UxUiDesign from "./pages/design-services/UxUiDesign";
import WebDevelopment from "./pages/design-services/WebDevelopment";
import MobileAppDesign from "./pages/design-services/MobileAppDesign";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Store from "./pages/Store";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFound from "./pages/NotFound";
import TinyMCEDemo from "@/pages/TinyMCEDemo";
import LeadCapture from "@/pages/LeadCapture";

import FreeAudit from "@/pages/FreeAudit";
import MvpValidation from "@/pages/services/MvpValidation";
import ConversionAudit from "@/pages/services/ConversionAudit";
import AiRedesign from "@/pages/services/AiRedesign";
import LinkedInVisitors from "@/pages/LinkedInVisitors";
import HerbalinkCaseStudy from "@/pages/HerbalinkCaseStudy";
import SplittimeCaseStudy from "@/pages/SplittimeCaseStudy";
import InvestorLoanAppCaseStudy from "@/pages/InvestorLoanAppCaseStudy";
import WholesaleDistributionCaseStudy from "@/pages/WholesaleDistributionCaseStudy";
import StructuredHerbalinkCaseStudy from "@/pages/StructuredHerbalinkCaseStudy";
import StructuredSplittimeCaseStudy from "@/pages/StructuredSplittimeCaseStudy";
import StructuredInvestorLoanCaseStudy from "@/pages/StructuredInvestorLoanCaseStudy";
import StructuredWholesaleDistributionCaseStudy from "@/pages/StructuredWholesaleDistributionCaseStudy";
import BlogPostPage from "@/components/blog/BlogPostPage";
import ServicePage from "@/components/pages/ServicePage";

import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SafeErrorBoundary } from "@/components/SafeErrorBoundary";
import { ForceRefresh } from "@/components/ForceRefresh";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";
import PageTransition from "@/components/transitions/PageTransition";
import { usePageTransition } from "@/hooks/usePageTransition";
import { ThemeProvider } from "next-themes";

// Create QueryClient with proper configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const GlobalPageTransition: React.FC = () => {
  const { isTransitioning } = usePageTransition();
  return <PageTransition isVisible={isTransitioning} />;
};

function App() {
  return (
    <SafeErrorBoundary>
      <ForceRefresh />
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" enableSystem={false}>
            <HelmetProvider>
              <TooltipProvider>
                <ImageMaximizerProvider>
                  <Toaster />
                  <BrowserRouter>
                    <GlobalPageTransition />
                    <ScrollToTop />
                    <main id="main-content" role="main">
                      <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/projects" element={<Index />} />
                        
                        {/* Standardized project routes using CaseStudyLayout */}
                        <Route path="/project/herbalink" element={<StructuredHerbalinkCaseStudy />} />
                        <Route path="/project/herbalink-old" element={<HerbalinkCaseStudy />} />
                        <Route path="/project/splittime" element={<StructuredSplittimeCaseStudy />} />
                        <Route path="/project/investor-loan-app" element={<StructuredInvestorLoanCaseStudy />} />
                        <Route path="/project/wholesale-distribution" element={<StructuredWholesaleDistributionCaseStudy />} />
                        
                        {/* Legacy redirects - keep for backwards compatibility */}
                        <Route path="/case-studies/herbalink-mobile-herbalist-ux-design" element={<Navigate to="/project/herbalink" replace />} />
                        <Route path="/case-studies/splittime-coparenting-app-design" element={<Navigate to="/project/splittime" replace />} />
                        <Route path="/case-studies/investor-loan-portfolio-management" element={<Navigate to="/project/investor-loan-app" replace />} />
                        <Route path="/case-studies/wholesale-distribution-ai-solution" element={<Navigate to="/project/wholesale-distribution" replace />} />
                        <Route path="/case-study-herbalink" element={<Navigate to="/project/herbalink" replace />} />
                        <Route path="/case-study-splittime" element={<Navigate to="/project/splittime" replace />} />
                        <Route path="/case-study-investor-loan" element={<Navigate to="/project/investor-loan-app" replace />} />
                        <Route path="/case-study/:id" element={<Navigate to="/projects" replace />} />
                        
                        {/* Generic project route for other projects */}
                        <Route path="/project/:projectId" element={<ProjectDetail />} />
                        
                        <Route path="/services" element={<Services />} />
                        <Route path="/design-services/ux-ui-design" element={<UxUiDesign />} />
                        <Route path="/design-services/web-development" element={<WebDevelopment />} />
                        <Route path="/design-services/mobile-app-design" element={<MobileAppDesign />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:slug" element={<BlogPostPage />} />
                        <Route path="/store" element={<Store />} />
                        <Route path="/store/product/:productId" element={<ProductDetailsPage />} />
                        <Route path="/get-started" element={<LeadCapture />} />
                        
                        <Route path="/tinymce-demo" element={<TinyMCEDemo />} />
                        <Route path="/free-audit" element={<FreeAudit />} />
                        <Route path="/services/mvp-validation" element={<MvpValidation />} />
                        <Route path="/services/conversion-audit" element={<ConversionAudit />} />
                        <Route path="/services/ai-redesign" element={<AiRedesign />} />
                        <Route path="/linkedin-visitors" element={<LinkedInVisitors />} />
                        
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  </BrowserRouter>
                </ImageMaximizerProvider>
              </TooltipProvider>
            </HelmetProvider>
          </ThemeProvider>
        </QueryClientProvider>
    </ErrorBoundary>
    </SafeErrorBoundary>
  );
}

export default App;
