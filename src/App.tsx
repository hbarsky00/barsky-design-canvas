
import React, { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { HelmetProvider } from "react-helmet-async";
import { useAnalytics } from "@/hooks/useAnalytics";

// Import the pages directly instead of using lazy loading
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AllProjects from "./pages/AllProjects";
import ProjectDetail from "./pages/ProjectDetail";
import DesignSystem from "./pages/DesignSystem";
import Services from "./pages/Services";
import Store from "./pages/Store";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import UxUiDesign from "./pages/design-services/UxUiDesign";
import WebDevelopment from "./pages/design-services/WebDevelopment";
import MobileAppDesign from "./pages/design-services/MobileAppDesign";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";

// Scroll to top component
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Analytics tracking component
const AnalyticsTracker = () => {
  useAnalytics();
  return null;
};

// Component to handle static file redirects
const StaticFileHandler = () => {
  const location = useLocation();
  
  useEffect(() => {
    // If user tries to access sitemap.xml through React Router, redirect to actual file
    if (location.pathname === '/sitemap.xml') {
      window.location.href = '/sitemap.xml';
    }
  }, [location.pathname]);
  
  return null;
};

const queryClient = new QueryClient();

import { ImageMaximizerProvider } from "./context/ImageMaximizerContext";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <HelmetProvider>
          <TooltipProvider>
            <BrowserRouter>
              <ScrollToTop />
              <AnalyticsTracker />
              <StaticFileHandler />
              <ImageMaximizerProvider>
                {/* Routes */}
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/projects" element={<AllProjects />} />
                  <Route path="/project/:projectId" element={<ProjectDetail />} />
                  <Route path="/design-system" element={<DesignSystem />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/design-services/ux-ui-design" element={<UxUiDesign />} />
                  <Route path="/design-services/web-development" element={<WebDevelopment />} />
                  <Route path="/design-services/mobile-app-design" element={<MobileAppDesign />} />
                  <Route path="/store" element={<Store />} />
                  <Route path="/store/product/:productId" element={<ProductDetailsPage />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:postId" element={<BlogPost />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ImageMaximizerProvider>
            </BrowserRouter>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
