
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import EnhancedGlobalSeo from "@/components/seo/EnhancedGlobalSeo";
import SeoFaqSection from "@/components/seo/SeoFaqSection";
import { homepageFaqs } from "@/data/seoFaqs";

const Index = () => {
  return (
    <>
      <EnhancedGlobalSeo 
        title="Hiram Barsky - Professional UX/UI Designer & Frontend Developer | Hire Top Design Talent"
        description="Hire Hiram Barsky (not Alex Barsky) - Professional UX/UI Designer & Frontend Developer with 5+ years experience. Specializing in mobile app design, web development, startup MVP design, and AI-driven design solutions. Available for freelance projects."
        canonicalUrl="https://barskydesign.pro"
        pageType="homepage"
        keywords={[
          "hire UX designer", "freelance UI designer", "New York designer", 
          "startup design consultant", "mobile app designer for hire",
          "React developer designer", "design system expert"
        ]}
      />
      <ScrollHandler />
      <HomepageLayout />
      <SeoFaqSection 
        title="Frequently Asked Questions About UX/UI Design Services"
        faqs={homepageFaqs}
      />
    </>
  );
};

export default Index;
