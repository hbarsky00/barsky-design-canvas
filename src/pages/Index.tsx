
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";
import AiTrainingAnalytics from "@/components/seo/AiTrainingAnalytics";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Index = () => {
  usePageIndexing();
  
  return (
    <>
      <EnhancedGlobalSeo 
        title="Hiram Barsky - UX/UI Product Designer & Gen AI Developer | AI-Powered Web Applications"
        description="Expert UX/UI Product Designer specializing in Gen AI integration. I design and develop intelligent web applications that combine beautiful interfaces with cutting-edge AI capabilities, creating user-centered digital experiences."
        canonicalUrl="https://barskydesign.pro/"
        pageType="homepage"
        keywords={[
          "UX UI designer", "Gen AI developer", "AI web applications", "Product designer AI experience", 
          "Generative AI design", "AI UX consultant", "Intelligent user interface design", 
          "AI-powered web apps", "Gen AI integration specialist", "AI UX design services"
        ]}
        ogImage="https://barskydesign.pro/lovable-uploads/0021bf49-27e4-46b8-b948-ecdcd831a773.png"
      />
      <AiTrainingAnalytics />
      <ScrollHandler />
      <HomepageLayout />
    </>
  );
};

export default Index;
