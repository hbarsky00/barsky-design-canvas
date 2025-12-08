import React, { Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import RouteTransition from "./RouteTransition";
import MaterialDesignLoader from "@/components/loading/MaterialDesignLoader";

// Critical page - load immediately
import Index from "@/pages/Index";

// Lazy load non-critical pages
const Services = React.lazy(() => import("@/pages/Services"));
const About = React.lazy(() => import("@/pages/About"));
const Contact = React.lazy(() => import("@/pages/Contact"));
const Blog = React.lazy(() => import("@/pages/Blog"));
const BlogPost = React.lazy(() => import("@/pages/BlogPost"));
const Store = React.lazy(() => import("@/pages/Store"));
const StoreSuccess = React.lazy(() => import("@/pages/StoreSuccess"));
const ProjectDetail = React.lazy(() => import("@/pages/ProjectDetail"));

// Service page imports
const UxUiDesign = React.lazy(() => import("@/pages/design-services/UxUiDesign"));
const MobileAppDesign = React.lazy(() => import("@/pages/design-services/MobileAppDesign"));
const WebDevelopment = React.lazy(() => import("@/pages/design-services/WebDevelopment"));

// Structured case study imports
const StructuredHerbalinkCaseStudy = React.lazy(() => import("@/pages/StructuredHerbalinkCaseStudy"));
const StructuredBusinessManagementCaseStudy = React.lazy(() => import("@/pages/StructuredBusinessManagementCaseStudy"));
const StructuredBarskyJointCaseStudy = React.lazy(() => import("@/pages/StructuredBarskyJointCaseStudy"));
const ContentExport = React.lazy(() => import("@/pages/ContentExport"));
const SeoCheckRunner = React.lazy(() => import("@/pages/SeoCheckRunner"));

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense
        key={location.pathname}
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            <MaterialDesignLoader size="lg" text="Loading page..." />
          </div>
        }
      >
        <Routes location={location} key={location.pathname}>
          {/* Home route */}
          <Route
            path="/"
            element={
              <RouteTransition>
                <Index />
              </RouteTransition>
            }
          />

          {/* Structured case studies */}
          <Route
            path="/project/herbalink"
            element={
              <RouteTransition>
                <StructuredHerbalinkCaseStudy />
              </RouteTransition>
            }
          />
          <Route
            path="/project/business-management"
            element={
              <RouteTransition>
                <StructuredBusinessManagementCaseStudy />
              </RouteTransition>
            }
          />
          <Route
            path="/project/barskyjoint"
            element={
              <RouteTransition>
                <StructuredBarskyJointCaseStudy />
              </RouteTransition>
            }
          />
          <Route path="/project/investor-loan-app" element={<Navigate to="/" replace />} />
          <Route path="/project/wholesale-distribution" element={<Navigate to="/project/business-management" replace />} />

          {/* Generic project detail */}
          <Route
            path="/project/:projectId"
            element={
              <RouteTransition>
                <ProjectDetail />
              </RouteTransition>
            }
          />

          {/* Service pages */}
          <Route
            path="/design-services/ux-ui-design"
            element={
              <RouteTransition>
                <UxUiDesign />
              </RouteTransition>
            }
          />
          <Route
            path="/design-services/mobile-app-design"
            element={
              <RouteTransition>
                <MobileAppDesign />
              </RouteTransition>
            }
          />
          <Route
            path="/design-services/web-development"
            element={
              <RouteTransition>
                <WebDevelopment />
              </RouteTransition>
            }
          />

          {/* Other routes */}
          <Route
            path="/services"
            element={
              <RouteTransition>
                <Services />
              </RouteTransition>
            }
          />
          <Route
            path="/about"
            element={
              <RouteTransition>
                <About />
              </RouteTransition>
            }
          />
          <Route
            path="/contact"
            element={
              <RouteTransition>
                <Contact />
              </RouteTransition>
            }
          />
          <Route
            path="/store"
            element={
              <RouteTransition>
                <Store />
              </RouteTransition>
            }
          />
          <Route
            path="/store/success"
            element={
              <RouteTransition>
                <StoreSuccess />
              </RouteTransition>
            }
          />
          <Route
            path="/blog"
            element={
              <RouteTransition>
                <Blog />
              </RouteTransition>
            }
          />
          <Route
            path="/blog/:slug"
            element={
              <RouteTransition>
                <BlogPost />
              </RouteTransition>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/content-export-2024"
            element={
              <RouteTransition>
                <ContentExport />
              </RouteTransition>
            }
          />
          <Route
            path="/__seo-check"
            element={
              <RouteTransition>
                <SeoCheckRunner />
              </RouteTransition>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
