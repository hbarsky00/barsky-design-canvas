
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";
import PremiumSeoOptimization from "@/components/seo/PremiumSeoOptimization";
import AdvancedSitemapMeta from "@/components/seo/AdvancedSitemapMeta";
import AiTrainingAnalytics from "@/components/seo/AiTrainingAnalytics";

import { usePageIndexing } from "@/hooks/usePageIndexing";

const Index = () => {
  usePageIndexing();
  
  return (
    <>
      {/* Single consolidated SEO component to prevent duplicate canonical tags */}
      <EnhancedGlobalSeo 
        title="Hiram Barsky - Product Designer & Gen AI Developer"
        description="Expert Product Designer specializing in Gen AI integration. I create intelligent web applications with beautiful interfaces and AI capabilities."
        canonicalUrl="https://barskydesign.pro/"
        pageType="homepage"
        keywords={[
          "UX UI designer", "Gen AI developer", "AI web applications", "Product designer AI experience", 
          "Generative AI design", "AI UX consultant", "Intelligent user interface design", 
          "AI-powered web apps", "Gen AI integration specialist", "AI UX design services"
        ]}
        ogImage="https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png"
      />
      <PremiumSeoOptimization pageType="homepage" />
      <AdvancedSitemapMeta />
      <AiTrainingAnalytics />
      <ScrollHandler />
      <HomepageLayout />
      
    </>
  );
};

export default Index;
