import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import ScrollToTop from "@/components/ScrollToTop";

// Page imports
import Index from "@/pages/Index";
import Projects from "@/pages/Projects";
import Services from "@/pages/Services";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

// Individual Case Study Pages
import HerbalinkCaseStudy from "@/pages/HerbalinkCaseStudy";
import SplittimeCaseStudy from "@/pages/SplittimeCaseStudy";
import InvestmentAppCaseStudy from "@/pages/InvestmentAppCaseStudy";
import WholesaleDistributionCaseStudy from "@/pages/WholesaleDistributionCaseStudy";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ImageMaximizerProvider>
          <Router>
            <ScrollToTop />
            
            <Routes>
              {/* Home route */}
              <Route path="/" element={<Index />} />
              
              {/* Projects listing */}
              <Route path="/projects" element={<Projects />} />
              
              {/* Individual Case Study Routes - Restored to original detailed pages */}
              <Route path="/project/herbalink" element={<HerbalinkCaseStudy />} />
              <Route path="/project/splittime" element={<SplittimeCaseStudy />} />
              <Route path="/project/investment-app" element={<InvestmentAppCaseStudy />} />
              <Route path="/project/wholesale-distribution" element={<WholesaleDistributionCaseStudy />} />
              <Route path="/project/business-management" element={<WholesaleDistributionCaseStudy />} />
              
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
