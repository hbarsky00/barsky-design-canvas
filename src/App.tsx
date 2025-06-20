
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "@/pages/Index";
import AllProjects from "@/pages/AllProjects";
import ProjectDetail from "@/pages/ProjectDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Store from "@/pages/Store";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import Services from "@/pages/Services";
import UxUiDesign from "@/pages/design-services/UxUiDesign";
import MobileAppDesign from "@/pages/design-services/MobileAppDesign";
import WebDevelopment from "@/pages/design-services/WebDevelopment";
import DesignSystem from "@/pages/DesignSystem";
import NotFound from "@/pages/NotFound";
import GlobalCaptions from "@/pages/GlobalCaptions";
import AutoCaptionScanner from "@/components/captions/AutoCaptionScanner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<AllProjects />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/store" element={<Store />} />
              <Route path="/store/product/:id" element={<ProductDetailsPage />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/ux-ui-design" element={<UxUiDesign />} />
              <Route path="/services/mobile-app-design" element={<MobileAppDesign />} />
              <Route path="/services/web-development" element={<WebDevelopment />} />
              <Route path="/design-system" element={<DesignSystem />} />
              <Route path="/global-captions" element={<GlobalCaptions />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <AutoCaptionScanner />
          </div>
        </BrowserRouter>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
