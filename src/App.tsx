import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import ScrollToTop from "@/components/ScrollToTop";
import UnifiedSEO from "@/components/seo/UnifiedSEO";

// Page imports
import Index from "@/pages/Index";
import Projects from "@/pages/Projects";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import SimplifiedProjectDetail from "@/components/project/SimplifiedProjectDetail";

// Structured case study imports
import StructuredHerbalinkCaseStudy from "@/pages/StructuredHerbalinkCaseStudy";
import StructuredBusinessManagementCaseStudy from "@/pages/StructuredBusinessManagementCaseStudy";
import StructuredSplittimeCaseStudy from "@/pages/StructuredSplittimeCaseStudy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ImageMaximizerProvider>
          <Router>
            <ScrollToTop />
            {/* Global SEO - runs on every route change */}
            <UnifiedSEO />
            
            <Routes>
              {/* Home route */}
              <Route path="/" element={<Index />} />
              
              {/* Projects listing */}
              <Route path="/projects" element={<Projects />} />
              
              {/* Structured case studies - these override the generic ProjectDetail routing */}
              <Route path="/project/herbalink" element={<StructuredHerbalinkCaseStudy />} />
              <Route path="/project/business-management" element={<StructuredBusinessManagementCaseStudy />} />
              <Route path="/project/splittime" element={<StructuredSplittimeCaseStudy />} />
              
              {/* Generic project detail for other projects */}
              <Route path="/project/:projectId" element={<SimplifiedProjectDetail />} />
              
              {/* Other routes */}
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              
              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
          <Toaster />
        </ImageMaximizerProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
