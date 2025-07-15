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
import AdminDashboard from "@/pages/AdminDashboard";
import FreeAudit from "@/pages/FreeAudit";
import MvpValidation from "@/pages/services/MvpValidation";
import ConversionAudit from "@/pages/services/ConversionAudit";
import AiRedesign from "@/pages/services/AiRedesign";
import LinkedInVisitors from "@/pages/LinkedInVisitors";
import StoryDrivenProjectDetail from "@/components/project/StoryDrivenProjectDetail";
import BlogPostPage from "@/components/blog/BlogPostPage";
import ServicePage from "@/components/pages/ServicePage";
import MetaTagManager from "@/components/admin/MetaTagManager";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import { useAccessibilityEnhancements } from "@/hooks/useAccessibilityEnhancements";
import { useMobileOptimization } from "@/hooks/useMobileOptimization";
import { useAccessibilityValidator } from "@/hooks/useAccessibilityValidator";
import { initializePerformanceOptimizations } from "@/utils/performanceOptimizer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

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
  // Apply performance, accessibility, and mobile optimizations
  usePerformanceOptimization();
  useAccessibilityEnhancements();
  useMobileOptimization();
  useAccessibilityValidator();
  
  // Initialize real performance optimizations
  React.useEffect(() => {
    initializePerformanceOptimizations();
  }, []);
  
  return (
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
                    <Route path="/projects" element={<AllProjects />} />
                    
                    {/* ✅ Current SEO-friendly case study URLs */}
                    <Route path="/case-studies/herbalink-mobile-herbalist-ux-design" element={<ProjectDetail />} />
                    <Route path="/case-studies/splittime-coparenting-app-design" element={<ProjectDetail />} />
                    <Route path="/case-studies/investor-loan-portfolio-management" element={<ProjectDetail />} />
                    <Route path="/case-studies/wholesale-distribution-ai-solution" element={<StoryDrivenProjectDetail />} />
                    
                    {/* ✅ Proper 301 redirects from legacy URLs to new SEO-friendly URLs */}
                    <Route 
                      path="/project/herbalink" 
                      element={<Navigate to="/case-studies/herbalink-mobile-herbalist-ux-design" replace />} 
                    />
                    <Route 
                      path="/project/splittime" 
                      element={<Navigate to="/case-studies/splittime-coparenting-app-design" replace />} 
                    />
                    <Route 
                      path="/project/investor-loan-app" 
                      element={<Navigate to="/case-studies/investor-loan-portfolio-management" replace />} 
                    />
                    <Route 
                      path="/project/wholesale-distribution" 
                      element={<Navigate to="/case-studies/wholesale-distribution-ai-solution" replace />} 
                    />
                    <Route 
                      path="/case-study-herbalink" 
                      element={<Navigate to="/case-studies/herbalink-mobile-herbalist-ux-design" replace />} 
                    />
                    <Route 
                      path="/case-study-splittime" 
                      element={<Navigate to="/case-studies/splittime-coparenting-app-design" replace />} 
                    />
                    <Route 
                      path="/case-study-investor-loan" 
                      element={<Navigate to="/case-studies/investor-loan-portfolio-management" replace />} 
                    />
                    
                    {/* ✅ Generic project routes */}
                    <Route path="/case-studies/:projectId" element={<ProjectDetail />} />
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
  );
}

export default App;