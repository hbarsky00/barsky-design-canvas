
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import DynamicSeo from "@/components/seo/DynamicSeo";
import InternalLinkingEnhancer from "@/components/seo/InternalLinkingEnhancer";
import SeoAnalyticsTracker from "@/components/seo/SeoAnalyticsTracker";
import SitemapGenerator from "@/components/seo/SitemapGenerator";
import { Helmet } from "react-helmet-async";



import { usePageIndexing } from "@/hooks/usePageIndexing";

const Index = () => {
  usePageIndexing();
  
  
  return (
    <>
      {/* Comprehensive SEO Optimization */}
      <DynamicSeo type="home" />
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
