
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
        title="Barsky Design - UX Research & Design Agency | Improving Digital Product Experiences"
        description="Research and design agency helping businesses improve user experience through comprehensive user research, strategic design thinking, and data-driven solutions. Specializing in UX research, design strategy, and digital product optimization."
        canonicalUrl="https://barskydesign.pro/"
        pageType="homepage"
        keywords={[
          "UX research agency", "design strategy consulting", "user experience research", 
          "digital product design", "UX consulting services", "user research methods",
          "design thinking agency", "product strategy design", "user testing services"
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
