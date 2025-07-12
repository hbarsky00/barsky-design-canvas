
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import DynamicSeo from "@/components/seo/DynamicSeo";
import InternalLinkingEnhancer from "@/components/seo/InternalLinkingEnhancer";
import SeoAnalyticsTracker from "@/components/seo/SeoAnalyticsTracker";
import SitemapGenerator from "@/components/seo/SitemapGenerator";
import MetaOptimizer from "@/components/seo/MetaOptimizer";
import { Helmet } from "react-helmet-async";

import { usePageIndexing } from "@/hooks/usePageIndexing";

const Index = () => {
  usePageIndexing();
  
  return (
    <>
      {/* Comprehensive SEO Optimization */}
      <Helmet>
        <link rel="canonical" href="https://barskydesign.pro" />
      </Helmet>
      <DynamicSeo type="home" />
      <MetaOptimizer 
        pageType="home"
        title="Hiram Barsky - Product Designer & Gen AI Developer"
        description="15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration for startups and enterprises."
        url="https://barskydesign.pro"
      />
      <SeoAnalyticsTracker pageTitle="Hiram Barsky - Product Designer & Gen AI Developer" pageType="home" />
      <SitemapGenerator />
      
      {/* Page Content */}
      <ScrollHandler />
      <HomepageLayout />
      
      {/* Enhanced Internal Linking for SEO Link Equity */}
      <InternalLinkingEnhancer currentPage="home" showRelatedLinks={true} />
    </>
  );
};

export default Index;
