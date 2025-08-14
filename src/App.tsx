import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

// Page imports
import Home from "@/pages/Home";
import Projects from "@/pages/Projects";
import Services from "@/pages/Services";
import Process from "@/pages/Process";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";

// Project detail components
import SimplifiedProjectDetail from "@/components/project/SimplifiedProjectDetail";
import StructuredHerbalinkCaseStudy from "@/pages/StructuredHerbalinkCaseStudy";
import StructuredBusinessManagementCaseStudy from "@/pages/StructuredBusinessManagementCaseStudy";

const queryClient = new QueryClient();

function QueryClient({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

function App() {
  return (
    <QueryClient>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <Router>
            <Routes>
              {/* Home route */}
              <Route path="/" element={<Home />} />
              
              {/* Projects listing */}
              <Route path="/projects" element={<Projects />} />
              
              {/* Structured case studies - these override the generic ProjectDetail routing */}
              <Route path="/project/herbalink" element={<StructuredHerbalinkCaseStudy />} />
              <Route path="/project/business-management" element={<StructuredBusinessManagementCaseStudy />} />
              
              {/* Generic project detail for other projects */}
              <Route path="/project/:projectId" element={<SimplifiedProjectDetail />} />
              
              {/* Other routes */}
              <Route path="/services" element={<Services />} />
              <Route path="/process" element={<Process />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              
              {/* Catch all - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
          <Toaster />
        </ThemeProvider>
      </HelmetProvider>
    </QueryClient>
  );
}

export default App;
