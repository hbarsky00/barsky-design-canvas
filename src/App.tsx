import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import ScrollToTop from "@/components/ScrollToTop";
import BuyMeCoffeeButton from "@/components/shared/BuyMeCoffeeButton";

// Global SEO component
import UnifiedSEO from "@/components/seo/UnifiedSEO";
import SitemapGenerator from "@/components/seo/SitemapGenerator";


// Page imports
import Index from "@/pages/Index";

import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import SimplifiedProjectDetail from "@/components/project/SimplifiedProjectDetail";

// Service page imports
import UxUiDesign from "@/pages/design-services/UxUiDesign";
import MobileAppDesign from "@/pages/design-services/MobileAppDesign";
import WebDevelopment from "@/pages/design-services/WebDevelopment";

// Structured case study imports
import StructuredHerbalinkCaseStudy from "@/pages/StructuredHerbalinkCaseStudy";
import StructuredBusinessManagementCaseStudy from "@/pages/StructuredBusinessManagementCaseStudy";
import StructuredBarskyJointCaseStudy from "@/pages/StructuredBarskyJointCaseStudy";
import StructuredInvestorLoanCaseStudy from "@/pages/StructuredInvestorLoanCaseStudy";
import StructuredCryptoCaseStudy from "@/pages/StructuredCryptoCaseStudy";
import ContentExport from "@/pages/ContentExport";


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ImageMaximizerProvider>
          <ScrollToTop />
          {/* Global Unified SEO System */}
          <UnifiedSEO />
          {/* Sitemap generator */}
          <SitemapGenerator />
          <Routes>
            {/* Home route */}
            <Route path="/" element={<Index />} />
            
            
            {/* Structured case studies - these override the generic ProjectDetail routing */}
            <Route path="/project/crypto" element={<StructuredCryptoCaseStudy />} />
            <Route path="/project/herbalink" element={<StructuredHerbalinkCaseStudy />} />
            <Route path="/project/business-management" element={<StructuredBusinessManagementCaseStudy />} />
            <Route path="/project/barskyjoint" element={<StructuredBarskyJointCaseStudy />} />
            <Route path="/project/investor-loan-app" element={<StructuredInvestorLoanCaseStudy />} />
            <Route path="/project/wholesale-distribution" element={<Navigate to="/project/business-management" replace />} />
            
            {/* Generic project detail for other projects */}
            <Route path="/project/:projectId" element={<SimplifiedProjectDetail />} />
            
            {/* Service pages */}
            <Route path="/design-services/ux-ui-design" element={<UxUiDesign />} />
            <Route path="/design-services/mobile-app-design" element={<MobileAppDesign />} />
            <Route path="/design-services/web-development" element={<WebDevelopment />} />
            
            {/* Other routes */}
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            
            {/* Hidden content export route */}
            <Route path="/admin/content-export-2024" element={<ContentExport />} />
            
            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <BuyMeCoffeeButton />
          <Toaster />
        </ImageMaximizerProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
