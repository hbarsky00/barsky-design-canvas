import React from "react";
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import DynamicSeo from "@/components/seo/DynamicSeo";
import InternalLinkingEnhancer from "@/components/seo/InternalLinkingEnhancer";
import SeoAnalyticsTracker from "@/components/seo/SeoAnalyticsTracker";
import SitemapGenerator from "@/components/seo/SitemapGenerator";
import { ErrorBoundary } from "@/components/ErrorBoundary";

import { usePageIndexing } from "@/hooks/usePageIndexing";
import { useUnifiedOptimization } from "@/hooks/useUnifiedOptimization";
import { initCanonicalMonitoring } from "@/utils/seoCanonicalMonitor";
import { initMobileOptimization } from "@/utils/mobileUsabilityOptimizer";
import { initLinkEquityMonitoring } from "@/utils/linkEquityDistributor";
import { initSEORealTimeMonitoring } from "@/utils/seoMobileMonitor";

const Index = () => {
  usePageIndexing();
  useUnifiedOptimization();
  
  // Initialize SEO and mobile optimizations
  React.useEffect(() => {
    initCanonicalMonitoring();
    initMobileOptimization();
    initLinkEquityMonitoring();
    initSEORealTimeMonitoring();
  }, []);
  
  return (
    <ErrorBoundary>
      {/* Comprehensive SEO Optimization */}
      <DynamicSeo type="home" />
      <SeoAnalyticsTracker pageTitle="Hiram Barsky - Product Designer & Gen AI Developer" pageType="home" />
      <SitemapGenerator />
      
      {/* Page Content */}
      <ScrollHandler />
      <HomepageLayout />
      
      {/* Enhanced Internal Linking for SEO Link Equity */}
      <InternalLinkingEnhancer currentPage="home" showRelatedLinks={true} />
    </ErrorBoundary>
  );
};

export default Index;
