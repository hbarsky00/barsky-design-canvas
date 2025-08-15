
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import SEO from "@/seo/SEO";
import { usePageIndexing } from "@/hooks/usePageIndexing";

const Index = () => {
  usePageIndexing();
  
  return (
    <>
      <SEO
        type="website"
        title="Hiram Barsky – Product Designer & Gen AI Developer"
        description="15+ years creating AI-enhanced digital experiences. Specializing in UX research, design systems, and Gen AI integration for startups and enterprises."
        url="/"
        image="https://barskydesign.pro/lovable-uploads/e8d40a32-b582-44f6-b417-48bdd5c5b6eb.png"
      />
      
      <ScrollHandler />
      <HomepageLayout />
    </>
  );
};

export default Index;
