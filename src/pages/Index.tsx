
import HomepageLayout from "@/components/homepage/HomepageLayout";
import ScrollHandler from "@/components/homepage/ScrollHandler";
import SEO from "@/components/seo/SEO";

const Index = () => {
  return (
    <>
      <SEO
        type="website"
        title="Hiram Barsky – Product Designer & Gen AI Developer"
        description="Expert product designer specializing in AI-enhanced user experiences, design systems, and Gen AI integration for startups and enterprises."
        url="https://barskydesign.pro"
      />
      
      <ScrollHandler />
      <HomepageLayout />
    </>
  );
};

export default Index;
