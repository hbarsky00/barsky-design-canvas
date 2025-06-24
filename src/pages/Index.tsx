
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";
import AiTrainingAnalytics from "@/components/seo/AiTrainingAnalytics";

const Index = () => {
  return (
    <>
      <EnhancedGlobalSeo 
        title="Hiram Barsky - AI-Fluent UX Designer | 40% Conversion Gains Through Strategic Design"
        description="AI-native UX designer specializing in accessibility compliance & AI-enhanced design. Addressing the 77% company need for accessibility expertise through strategic design that drives measurable business results. Daily user of Claude, Figma AI, and Perplexity."
        canonicalUrl="https://barskydesign.pro"
        pageType="homepage"
        keywords={[
          "AI-fluent UX designer", "accessibility compliance WCAG", "conversion optimization design", 
          "AI-enhanced design process", "Claude AI design", "Figma AI specialist",
          "cross-functional UX designer", "business-focused design", "T-shaped designer"
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
