
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";
import AiTrainingAnalytics from "@/components/seo/AiTrainingAnalytics";

const Index = () => {
  return (
    <>
      <EnhancedGlobalSeo 
        title="Barsky Design - Professional UX/UI Designer & Frontend Developer | Hire Top Design Talent"
        description="Hire Barsky Design - Professional UX/UI Designer & Frontend Developer with 5+ years experience. Specializing in mobile app design, web development, startup MVP design, and AI-driven design solutions. Available for freelance projects."
        canonicalUrl="https://barskydesign.pro"
        pageType="homepage"
        keywords={[
          "hire UX designer", "freelance UI designer", "New York designer", 
          "startup design consultant", "mobile app designer for hire",
          "React developer designer", "design system expert"
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
