import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Projects from "@/pages/Projects";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/NotFound";
import ProjectDetail from "@/pages/ProjectDetail";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import ImageMaximizer from "@/components/ImageMaximizer";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { ImageReplacementProvider } from "@/context/ImageReplacementContext";
import { DevModeProvider } from "@/context/DevModeContext";
import GlobalCaptions from "@/pages/GlobalCaptions";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DevModeProvider>
        <ImageMaximizerProvider>
          <ImageReplacementProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/project/:projectId" element={<ProjectDetail />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/image-maximizer" element={<ImageMaximizer />} />
                
                {/* Dev Mode Tools */}
                <Route path="/dev/captions" element={<GlobalCaptions />} />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </Router>
          </ImageReplacementProvider>
        </ImageMaximizerProvider>
      </DevModeProvider>
    </QueryClientProvider>
  );
}

export default App;
