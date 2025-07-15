import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import AllProjects from "./pages/AllProjects";
import ProjectDetail from "./pages/ProjectDetail";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import UxUiDesign from "./pages/design-services/UxUiDesign";
import WebDevelopment from "./pages/design-services/WebDevelopment";
import MobileAppDesign from "./pages/design-services/MobileAppDesign";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Store from "./pages/Store";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import NotFound from "./pages/NotFound";
import TinyMCEDemo from "@/pages/TinyMCEDemo";
import LeadCapture from "@/pages/LeadCapture";
import AdminDashboard from "@/pages/AdminDashboard";
import FreeAudit from "@/pages/FreeAudit";
import CaseStudies from "@/pages/CaseStudies";
import MvpValidation from "@/pages/services/MvpValidation";
import ConversionAudit from "@/pages/services/ConversionAudit";
import AiRedesign from "@/pages/services/AiRedesign";
import LinkedInVisitors from "@/pages/LinkedInVisitors";
import HerbalinkCaseStudy from "@/pages/HerbalinkCaseStudy";
import SplittimeCaseStudy from "@/pages/SplittimeCaseStudy";
import InvestorLoanAppCaseStudy from "@/pages/InvestorLoanAppCaseStudy";
import StoryDrivenProjectDetail from "@/components/project/StoryDrivenProjectDetail";
import BlogPostPage from "@/components/blog/BlogPostPage";
import ServicePage from "@/components/pages/ServicePage";
import MetaTagManager from "@/components/admin/MetaTagManager";

function AppFresh() {
  console.log("🚀 AppFresh component loading - completely new file");
  return (
    <div>
      <HelmetProvider>
        {/* Temporarily bypass router to isolate React context issues */}
        <main id="main-content" role="main">
          <Index />
        </main>
      </HelmetProvider>
    </div>
  );
}

export default AppFresh;
