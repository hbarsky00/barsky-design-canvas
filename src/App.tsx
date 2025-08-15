
import { Suspense, lazy, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import { usePageIndexing } from "./hooks/usePageIndexing";
import { useSitemapUpdates } from "./hooks/useSitemapUpdates";

const SimplifiedProjectDetail = lazy(() => import("./components/project/SimplifiedProjectDetail"));
const Services = lazy(() => import("./pages/Services"));
const UXUIDesign = lazy(() => import("./pages/UXUIDesign"));
const WebDevelopment = lazy(() => import("./pages/WebDevelopment"));
const MobileAppDesign = lazy(() => import("./pages/MobileAppDesign"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));

function AppContent() {
  usePageIndexing();
  useSitemapUpdates();

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/project/:id" element={<SimplifiedProjectDetail />} />
      <Route path="/services" element={<Services />} />
      <Route path="/design-services/ux-ui-design" element={<UXUIDesign />} />
      <Route path="/design-services/web-development" element={<WebDevelopment />} />
      <Route path="/design-services/mobile-app-design" element={<MobileAppDesign />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />
    </Routes>
  );
}

const queryClient = new QueryClient();

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
              <AppContent />
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
