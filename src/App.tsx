
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
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<AllProjects />} />
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              <Route path="/services" element={<Services />} />
              <Route path="/design-services/ux-ui-design" element={<UxUiDesign />} />
              <Route path="/design-services/web-development" element={<WebDevelopment />} />
              <Route path="/design-services/mobile-app-design" element={<MobileAppDesign />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:postId" element={<BlogPost />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/product/:productId" element={<ProductDetailsPage />} />
              <Route path="/get-started" element={<LeadCapture />} />
              <Route path="/admin/leads" element={<AdminDashboard />} />
              <Route path="/tinymce-demo" element={<TinyMCEDemo />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
