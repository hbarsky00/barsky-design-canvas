import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import ScrollToTop from "@/components/ScrollToTop";
import SEOManager from "@/components/seo/SEOManager";

// Page imports
import Index from "@/pages/Index";
import Projects from "@/pages/Projects";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

// Rich case study imports - restore your original content
import CaseStudyPage from "@/components/case-study/CaseStudyPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ImageMaximizerProvider>
          <Router>
            <ScrollToTop />
            {/* Isolated SEO Manager - no layout impact */}
            <SEOManager />
            
            <Routes>
              {/* Home route */}
              <Route path="/" element={<Index />} />
              
              {/* Projects listing */}
              <Route path="/projects" element={<Projects />} />
              
              {/* Rich case studies - restored to original system */}
              <Route path="/case-studies/:id" element={<CaseStudyPage />} />
              <Route path="/project/herbalink" element={<CaseStudyPage />} />
              <Route path="/project/splittime" element={<CaseStudyPage />} />
              <Route path="/project/business-management" element={<CaseStudyPage />} />
              <Route path="/project/investment-app" element={<CaseStudyPage />} />
              
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
