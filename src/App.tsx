
import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";

// Lazy load pages for better performance
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const CaseStudyPage = lazy(() => import("./components/case-study/CaseStudyPage"));
const UxUiDesign = lazy(() => import("./pages/design-services/UxUiDesign"));
const WebDevelopment = lazy(() => import("./pages/design-services/WebDevelopment"));
const MobileAppDesign = lazy(() => import("./pages/design-services/MobileAppDesign"));

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/project/:projectId" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CaseStudyPage />
                </Suspense>
              } />
              <Route path="/projects" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Projects />
                </Suspense>
              } />
              <Route path="/contact" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Contact />
                </Suspense>
              } />
              <Route path="/blog" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Blog />
                </Suspense>
              } />
              <Route path="/blog/:slug" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <BlogPost />
                </Suspense>
              } />
              <Route path="/case-studies/:id" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CaseStudyPage />
                </Suspense>
              } />
              <Route path="/design-services/ux-ui-design" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <UxUiDesign />
                </Suspense>
              } />
              <Route path="/design-services/web-development" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <WebDevelopment />
                </Suspense>
              } />
              <Route path="/design-services/mobile-app-design" element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MobileAppDesign />
                </Suspense>
              } />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
