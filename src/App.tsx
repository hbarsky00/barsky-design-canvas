
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import Index from "@/pages/Index";
import Services from "@/pages/Services";
import AllProjects from "@/pages/AllProjects";
import NotFound from "@/pages/NotFound";
import ProjectDetail from "@/pages/ProjectDetail";
import { ImageMaximizerProvider } from "@/context/ImageMaximizerContext";
import { DevModeProvider } from "@/context/DevModeContext";
import GlobalCaptions from "@/pages/GlobalCaptions";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DevModeProvider>
        <ImageMaximizerProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<AllProjects />} />
              <Route path="/project/:projectId" element={<ProjectDetail />} />
              
              {/* Dev Mode Tools */}
              <Route path="/dev/captions" element={<GlobalCaptions />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </Router>
        </ImageMaximizerProvider>
      </DevModeProvider>
    </QueryClientProvider>
  );
}

export default App;
