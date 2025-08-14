
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import AutoSeo from "@/components/seo/AutoSeo";
import SeoAnalyticsTracker from "@/components/seo/SeoAnalyticsTracker";
import SitemapGenerator from "@/components/seo/SitemapGenerator";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Index = () => {
  usePageIndexing();
  
  return (
    <>
      {/* Auto-detecting SEO - will use homepage fallbacks */}
      <AutoSeo 
        fallbackTitle="Hiram Barsky - Product Designer & Gen AI Developer"
        fallbackDescription="15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration for startups and enterprises."
      />
      <SeoAnalyticsTracker pageTitle="Hiram Barsky - Product Designer & Gen AI Developer" pageType="home" />
      <SitemapGenerator />
      
      {/* Page Content */}
      <ScrollHandler />
      <HomepageLayout />
    </>
  );
};

export default Index;
