import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import AdminDashboard from "@/pages/AdminDashboard";
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
import BlogPostPage from "@/components/blog/BlogPostPage";
import ServicePage from "@/components/pages/ServicePage";
import MetaTagManager from "@/components/admin/MetaTagManager";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SafeErrorBoundary } from "@/components/SafeErrorBoundary";
import { ForceRefresh } from "@/components/ForceRefresh";
import CaseStudyPage from "@/components/case-study/CaseStudyPage";

// Create QueryClient with proper configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <SafeErrorBoundary>
      <ForceRefresh />
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <TooltipProvider>
            <ImageMaximizerProvider>
              <Toaster />
              <BrowserRouter>
                <ScrollToTop />
                <main id="main-content" role="main">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/projects" element={<Index />} />
                    
                    {/* Standardized project routes using CaseStudyLayout */}
                    <Route path="/project/herbalink" element={<StructuredHerbalinkCaseStudy />} />
                    <Route path="/project/herbalink-old" element={<HerbalinkCaseStudy />} />
                    <Route path="/project/splittime" element={<SplittimeCaseStudy />} />
                    <Route path="/project/investor-loan-app" element={<InvestorLoanAppCaseStudy />} />
                    <Route path="/project/wholesale-distribution" element={<WholesaleDistributionCaseStudy />} />
                    
                    {/* Legacy redirects - keep for backwards compatibility */}
                    <Route path="/case-studies/herbalink-mobile-herbalist-ux-design" element={<HerbalinkCaseStudy />} />
                    <Route path="/case-studies/splittime-coparenting-app-design" element={<SplittimeCaseStudy />} />
                    <Route path="/case-studies/investor-loan-portfolio-management" element={<InvestorLoanAppCaseStudy />} />
                    <Route path="/case-studies/wholesale-distribution-ai-solution" element={<WholesaleDistributionCaseStudy />} />
                    <Route path="/case-study-herbalink" element={<HerbalinkCaseStudy />} />
                    <Route path="/case-study-splittime" element={<SplittimeCaseStudy />} />
                    <Route path="/case-study-investor-loan" element={<InvestorLoanAppCaseStudy />} />
                    <Route path="/case-study/:id" element={<CaseStudyPage />} />
                    
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
                    <Route path="/admin/leads" element={<AdminDashboard />} />
                    <Route path="/tinymce-demo" element={<TinyMCEDemo />} />
                    <Route path="/free-audit" element={<FreeAudit />} />
                    <Route path="/services/mvp-validation" element={<MvpValidation />} />
                    <Route path="/services/conversion-audit" element={<ConversionAudit />} />
                    <Route path="/services/ai-redesign" element={<AiRedesign />} />
                    <Route path="/linkedin-visitors" element={<LinkedInVisitors />} />
                    <Route path="/meta-tag-manager" element={<MetaTagManager />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </BrowserRouter>
            </ImageMaximizerProvider>
          </TooltipProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </ErrorBoundary>
    </SafeErrorBoundary>
  );
}

export default App;
