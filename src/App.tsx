
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
                    {/* All your routes */}
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

export default App; // ← This line MUST be here!

